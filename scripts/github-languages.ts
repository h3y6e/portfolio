import type { LanguageStat } from '../shared/types/github'
import { execFile } from 'node:child_process'
import { writeFile } from 'node:fs/promises'
import { join } from 'node:path'
import process from 'node:process'
import { promisify } from 'node:util'

const execFileAsync = promisify(execFile)

interface GitHubRepo {
  full_name: string
  fork: boolean
  archived: boolean
  languages_url: string
  owner: { login: string }
}

interface GitHubUser {
  login: string
}

interface GitHubEmail {
  email: string
  verified: boolean
  primary: boolean
}

const CACHE_PATH = join(process.cwd(), 'shared/data/github-languages.json')

function githubHeaders(token: string): HeadersInit {
  return {
    'Accept': 'application/vnd.github+json',
    'User-Agent': 'h3y6e-portfolio',
    'X-GitHub-Api-Version': '2022-11-28',
    'Authorization': `Bearer ${token}`,
  }
}

async function githubJson<T>(url: string | URL, token: string): Promise<T> {
  const res = await fetch(url, { headers: githubHeaders(token) })
  if (!res.ok)
    throw new Error(`${url} ${res.status}: ${await res.text()}`)
  return res.json() as Promise<T>
}

async function resolveToken(): Promise<string> {
  const fromEnv = process.env.NUXT_GITHUB_TOKEN || process.env.GITHUB_TOKEN
  if (fromEnv?.trim())
    return fromEnv.trim()

  try {
    const { stdout } = await execFileAsync('gh', ['auth', 'token'], {
      encoding: 'utf8',
    })
    const token = stdout.trim()
    if (token)
      return token
  }
  catch {}

  throw new Error(
    'GitHub token required for private repos. Set NUXT_GITHUB_TOKEN / GITHUB_TOKEN, or run `gh auth login`.',
  )
}

function assertLocalOnly(): void {
  if (process.env.GITHUB_ACTIONS || process.env.CI === 'true') {
    throw new Error(
      'scripts/github-languages.ts is local-only; refresh shared/data/github-languages.json on your machine and commit it',
    )
  }
}

async function resolveAuthorIdentities(token: string): Promise<string[]> {
  const user = await githubJson<GitHubUser>('https://api.github.com/user', token)
  const fromEnv = (process.env.GITHUB_AUTHOR_LOGINS ?? '')
    .split(',')
    .map(s => s.trim())
    .filter(Boolean)

  let emails: string[] = []
  try {
    const list = await githubJson<GitHubEmail[]>('https://api.github.com/user/emails', token)
    emails = list.filter(e => e.verified).map(e => e.email)
  }
  catch {
    console.warn('warning: could not read /user/emails (need user:email scope); using login only')
  }

  return [...new Set([user.login, ...fromEnv, ...emails])]
}

async function listRelatedRepos(token: string): Promise<GitHubRepo[]> {
  const repos: GitHubRepo[] = []

  for (let page = 1; page <= 20; page++) {
    const url = new URL('https://api.github.com/user/repos')
    url.searchParams.set('per_page', '100')
    url.searchParams.set('page', String(page))
    url.searchParams.set('sort', 'updated')
    url.searchParams.set('visibility', 'all')
    url.searchParams.set('affiliation', 'owner,collaborator,organization_member')

    const batch = await githubJson<GitHubRepo[]>(url, token)
    repos.push(...batch)
    if (batch.length < 100)
      break
  }

  return repos.filter(repo => !repo.fork && !repo.archived)
}

async function hasContributed(
  repo: GitHubRepo,
  authors: string[],
  token: string,
): Promise<boolean> {
  for (const author of authors) {
    const url = new URL(`https://api.github.com/repos/${repo.full_name}/commits`)
    url.searchParams.set('author', author)
    url.searchParams.set('per_page', '1')
    const res = await fetch(url, { headers: githubHeaders(token) })
    // Empty repository — no commits by anyone.
    if (res.status === 409)
      return false
    if (res.status === 404)
      continue
    if (!res.ok)
      throw new Error(`${url} ${res.status}: ${await res.text()}`)
    const commits = await res.json() as unknown[]
    if (commits.length > 0)
      return true
  }
  return false
}

async function filterContributedRepos(
  repos: GitHubRepo[],
  authors: string[],
  token: string,
): Promise<GitHubRepo[]> {
  const kept: GitHubRepo[] = []
  const concurrency = 8
  for (let i = 0; i < repos.length; i += concurrency) {
    const chunk = repos.slice(i, i + concurrency)
    const flags = await Promise.all(
      chunk.map(repo => hasContributed(repo, authors, token)),
    )
    for (let j = 0; j < chunk.length; j++) {
      if (flags[j])
        kept.push(chunk[j]!)
    }
  }
  return kept
}

function toStats(totals: Record<string, number>): LanguageStat[] {
  const sum = Object.values(totals).reduce((a, b) => a + b, 0)
  if (sum <= 0)
    return []
  return Object.entries(totals)
    .map(([name, bytes]) => ({
      name,
      bytes,
      percent: Math.round((bytes / sum) * 1000) / 10,
    }))
    .filter(stat => stat.percent >= 1)
    .sort((a, b) => b.bytes - a.bytes)
}

async function languageTotals(
  repos: GitHubRepo[],
  token: string,
): Promise<Record<string, number>> {
  const totals: Record<string, number> = {}
  const concurrency = 8
  for (let i = 0; i < repos.length; i += concurrency) {
    const chunk = repos.slice(i, i + concurrency)
    const results = await Promise.all(
      chunk.map(repo => githubJson<Record<string, number>>(repo.languages_url, token)),
    )
    for (const languages of results) {
      for (const [name, bytes] of Object.entries(languages))
        totals[name] = (totals[name] ?? 0) + bytes
    }
  }
  return totals
}

export async function refreshGitHubLanguagesCache(): Promise<LanguageStat[]> {
  assertLocalOnly()
  const token = await resolveToken()
  const authors = await resolveAuthorIdentities(token)
  console.warn(`authors: ${authors.join(', ')}`)

  const related = await listRelatedRepos(token)
  const repos = await filterContributedRepos(related, authors, token)
  console.warn(`repos: ${repos.length} contributed / ${related.length} related`)

  const stats = toStats(await languageTotals(repos, token))
  if (!stats.length)
    throw new Error('no language stats returned from GitHub')

  await writeFile(CACHE_PATH, `${JSON.stringify(stats, null, 2)}\n`)
  console.warn(`wrote ${stats.length} languages to ${CACHE_PATH}`)
  return stats
}

if (import.meta.main) {
  try {
    await refreshGitHubLanguagesCache()
  }
  catch (error) {
    console.error(error)
    process.exit(1)
  }
}

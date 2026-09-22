import type { BlogPost } from '../shared/types/blog'
import { writeFile } from 'node:fs/promises'
import { join } from 'node:path'
import process from 'node:process'

const OUT_PATH = join(process.cwd(), 'shared/data/blog-posts.json')

async function main(): Promise<void> {
  const res = await fetch('https://blog.h3y6e.com/posts.json')
  if (!res.ok)
    throw new Error(`blog posts ${res.status}: ${await res.text()}`)

  const posts = await res.json() as BlogPost[]
  await writeFile(OUT_PATH, `${JSON.stringify(posts, null, 2)}\n`)
  console.warn(`wrote ${posts.length} posts to ${OUT_PATH}`)
}

void main().catch((error) => {
  console.error(error)
  process.exitCode = 1
})

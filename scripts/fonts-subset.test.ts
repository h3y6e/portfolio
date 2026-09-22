import { globSync, readFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { describe, expect, it } from 'vitest'

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..')

const TEXT_SOURCES = [
  'app/data/**/*.ts',
  'app/components/**/*.vue',
  'app/error.vue',
  'app/pages/**/*.vue',
  'public/humans.txt',
  'shared/data/**/*.json',
]

const PRIMARY_NAME_FILES = [
  'app/assets/css/font.css',
  'app/assets/css/main.css',
  'uno.config.ts',
]

function codepoints(text: string): string[] {
  return Array.from(text).filter(c => !/\s/.test(c))
}

describe('h3y6e.com Sans subset', () => {
  it('covers every character used in site sources', () => {
    const known = new Set(
      codepoints(readFileSync(join(ROOT, 'public/fonts/h3y6eComSans.chars.txt'), 'utf8')),
    )
    const files = TEXT_SOURCES.flatMap(pattern =>
      globSync(pattern, { cwd: ROOT }),
    )
    const used = new Set(
      files.flatMap(file =>
        codepoints(readFileSync(join(ROOT, file), 'utf8')),
      ),
    )
    const missing = [...used].filter(c => !known.has(c))
    expect(missing, 'regenerate with: node scripts/fonts-subset.ts').toEqual([])
  })

  it('does not present the Juisee RFN as the CSS font-family name', () => {
    for (const rel of PRIMARY_NAME_FILES) {
      const text = readFileSync(join(ROOT, rel), 'utf8')
      expect(text, rel).not.toMatch(/font-family:[^;]*Juisee/i)
      expect(text, rel).not.toMatch(/['"]Juisee['"]/)
    }
    expect(readFileSync(join(ROOT, 'app/assets/css/font.css'), 'utf8')).toContain(
      'h3y6e.com Sans',
    )
  })
})

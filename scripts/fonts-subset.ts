import type * as Opentype from 'opentype.js'
import { Buffer } from 'node:buffer'
import {
  globSync,
  mkdirSync,
  readFileSync,
  writeFileSync,
} from 'node:fs'
import { createRequire } from 'node:module'
import { dirname, join } from 'node:path'
import process from 'node:process'
import { fileURLToPath } from 'node:url'

const require = createRequire(import.meta.url)
const subsetFont = require('subset-font') as (
  buf: Buffer,
  text: string,
  opts: {
    targetFormat: string
    preserveNameIds?: number[]
    keepAllGlyphs?: boolean
  },
) => Promise<Buffer>
const opentype = require('opentype.js') as typeof Opentype
const JSZip = require('jszip') as typeof import('jszip')
const fontverter = require('fontverter') as {
  convert: (buf: Buffer, format: string) => Promise<Buffer>
}

const VERSION = 'v0.2.0'
const RELEASE = `https://github.com/yuru7/juisee/releases/download/${VERSION}/Juisee_${VERSION}.zip`
const LICENSE_URL = `https://raw.githubusercontent.com/yuru7/juisee/${VERSION}/LICENSE`
const FAMILY = 'h3y6e.com Sans'
const FILE_STEM = 'h3y6eComSans'
const WEIGHTS = { Regular: 400, Bold: 700 } as const
const BASE_RANGES = '0020-007E,00A0-00FF,2000-206F,3040-309F,30A0-30FF,FF61-FF9F'

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..')
const PUBLIC = join(ROOT, 'public/fonts')
const CSS = join(ROOT, 'app/assets/css/font.css')
const TEXT_SOURCES = [
  'app/data/**/*.ts',
  'app/components/**/*.vue',
  'app/error.vue',
  'app/pages/**/*.vue',
  'public/humans.txt',
  'shared/data/**/*.json',
]

function parseUnicodes(spec: string): Set<number> {
  const out = new Set<number>()
  for (const part of spec.split(',')) {
    const [a, b] = part.split('-')
    const start = Number.parseInt(a!, 16)
    const end = b ? Number.parseInt(b, 16) : start
    for (let cp = start; cp <= end; cp++)
      out.add(cp)
  }
  return out
}

function siteText(): string {
  const chunks = TEXT_SOURCES.flatMap(pattern =>
    globSync(pattern, { cwd: ROOT }).map(file =>
      readFileSync(join(ROOT, file), 'utf8'),
    ),
  )
  chunks.push(
    'January February March April May June July August '
    + 'September October November December '
    + 'Jan Feb Mar Apr May Jun Jul Aug Sep Oct Nov Dec',
  )
  return chunks.join('')
}

function codepointText(codepoints: Set<number>): string {
  return [...codepoints]
    .sort((a, b) => a - b)
    .map(cp => String.fromCodePoint(cp))
    .join('')
}

function renameFont(sfnt: Buffer, weightName: keyof typeof WEIGHTS): Buffer {
  const font = opentype.parse(
    sfnt.buffer.slice(sfnt.byteOffset, sfnt.byteOffset + sfnt.byteLength),
  )
  const en = (value: string) => ({ en: value })
  const copyright = font.getEnglishName('copyright') || ''
  const named = {
    copyright: en(copyright),
    fontFamily: en(FAMILY),
    fontSubfamily: en(weightName),
    fullName: en(`${FAMILY} ${weightName}`),
    version: en(VERSION),
    postScriptName: en(`${FILE_STEM}-${weightName}`),
    preferredFamily: en(FAMILY),
    preferredSubfamily: en(weightName),
    manufacturer: en('h3y6e'),
    description: en(`Subset of Juisee ${VERSION} by Yuko Otawara for h3y6e.com.`),
    license: en('This Font Software is licensed under the SIL Open Font License, Version 1.1.'),
    licenseURL: en('https://openfontlicense.org'),
  }
  font.names = {
    unicode: { ...named },
    macintosh: { ...named },
    windows: { ...named },
  }

  for (const value of [
    font.getEnglishName('fontFamily'),
    font.getEnglishName('fullName'),
    font.getEnglishName('postScriptName'),
  ]) {
    if (value?.includes('Juisee'))
      throw new Error(`RFN leak in primary name: ${value}`)
  }

  return Buffer.from(font.toArrayBuffer())
}

async function main(): Promise<void> {
  mkdirSync(PUBLIC, { recursive: true })

  const [zipBuf, license] = await Promise.all([
    fetch(RELEASE).then(r => r.arrayBuffer()).then(b => Buffer.from(b)),
    fetch(LICENSE_URL).then(r => r.text()),
  ])
  writeFileSync(join(PUBLIC, 'LICENSE'), license)

  const zip = await JSZip.loadAsync(zipBuf)
  const codepoints = parseUnicodes(BASE_RANGES)
  for (const ch of siteText()) {
    if (!/\s/.test(ch))
      codepoints.add(ch.codePointAt(0)!)
  }
  const text = codepointText(codepoints)

  const faces: string[] = []
  for (const [weightName, weight] of Object.entries(WEIGHTS) as [keyof typeof WEIGHTS, number][]) {
    const entry = zip.file(`Juisee_${VERSION}/Juisee-${weightName}.ttf`)
    if (!entry)
      throw new Error(`missing Juisee-${weightName}.ttf in release zip`)
    const ttf = Buffer.from(await entry.async('nodebuffer'))
    const subsetSfnt = await subsetFont(ttf, text, {
      targetFormat: 'sfnt',
      preserveNameIds: [0],
    })
    const renamed = renameFont(subsetSfnt, weightName)
    const woff2 = await fontverter.convert(renamed, 'woff2')
    const outName = `${FILE_STEM}-${weightName}.woff2`
    writeFileSync(join(PUBLIC, outName), woff2)
    faces.push(
      `@font-face {\n`
      + `  font-family: '${FAMILY}';\n`
      + `  font-style: normal;\n`
      + `  font-weight: ${weight};\n`
      + `  src: url('/fonts/${outName}') format('woff2');\n`
      + `  font-display: swap;\n`
      + `}\n`,
    )
    console.warn(`  ${outName}  ${(woff2.length / 1024).toFixed(1)} KiB`)
  }

  writeFileSync(join(PUBLIC, `${FILE_STEM}.chars.txt`), `${text}\n`)
  writeFileSync(CSS, `/* Generated by scripts/fonts-subset.ts; do not edit. */\n${faces.join('\n')}`)
  console.warn(`wrote app/assets/css/font.css (${codepoints.size} code points)`)
}

main().catch((error) => {
  console.error(error)
  process.exitCode = 1
})

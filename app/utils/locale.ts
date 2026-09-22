import type { Locale } from '../data/types'

export function fromAcceptLanguage(header: string | undefined): Locale {
  if (!header)
    return 'ja'
  const primary = header.split(',')[0]?.trim().toLowerCase() ?? ''
  return primary.startsWith('en') ? 'en' : 'ja'
}

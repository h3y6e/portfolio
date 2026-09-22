import type { Locale } from '~/data/types'

function detectLocale(): Locale {
  if (import.meta.server) {
    const headers = useRequestHeaders(['accept-language'])
    return fromAcceptLanguage(headers['accept-language'])
  }
  return fromAcceptLanguage(navigator.language)
}

export function useLocale() {
  const locale = useCookie<Locale>('locale', {
    sameSite: 'lax',
    maxAge: 60 * 60 * 24 * 365,
    default: detectLocale,
  })

  function setLocale(next: Locale): void {
    const apply = () => {
      locale.value = next
    }
    if (import.meta.client)
      withViewTransition(apply)
    else
      apply()
  }

  function toggleLocale(): void {
    setLocale(locale.value === 'ja' ? 'en' : 'ja')
  }

  return { locale, setLocale, toggleLocale }
}

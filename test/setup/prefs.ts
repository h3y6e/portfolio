import type { Locale } from '~/data/types'
import { nextTick, useColorMode } from '#imports'

export function setLocaleCookie(locale: Locale): void {
  document.cookie = `locale=${locale}; path=/; max-age=31536000; samesite=lax`
}

export async function applyTheme(theme: 'light' | 'dark'): Promise<void> {
  const colorMode = useColorMode()
  colorMode.preference = theme
  window.localStorage.setItem('theme', theme)
  document.documentElement.classList.toggle('light', theme === 'light')
  document.documentElement.classList.toggle('dark', theme === 'dark')
  await nextTick()
}

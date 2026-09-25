import type { Theme } from '~/composables/useTheme'
import type { Locale } from '~/data/types'
import { nextTick, useColorMode } from '#imports'
import { themes } from '~/composables/useTheme'

export function setLocaleCookie(locale: Locale): void {
  document.cookie = `locale=${locale}; path=/; max-age=31536000; samesite=lax`
}

export async function applyTheme(theme: Theme): Promise<void> {
  const colorMode = useColorMode()
  colorMode.preference = theme
  window.localStorage.setItem('theme', theme)
  document.documentElement.classList.remove(...themes)
  document.documentElement.classList.add(theme)
  await nextTick()
}

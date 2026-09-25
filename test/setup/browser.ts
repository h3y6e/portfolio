import { cleanup } from '@nuxt/test-utils/browser/pure'
import { page } from 'vitest/browser'
import { themes } from '~/composables/useTheme'

function resetTestPreferences(): void {
  document.cookie = 'locale=ja; path=/; max-age=31536000; samesite=lax'
  window.localStorage.setItem('theme', 'dark')
  document.documentElement.classList.remove(...themes)
  document.documentElement.classList.add('dark')
}

page.extend({
  [Symbol.for('vitest:component-cleanup')]: () => {
    cleanup()
    resetTestPreferences()
  },
})

resetTestPreferences()

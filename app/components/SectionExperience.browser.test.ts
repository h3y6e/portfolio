import { render } from '@nuxt/test-utils/browser/pure'
import { expect, it } from 'vitest'
import { setLocaleCookie } from '~~/test/setup/prefs'
import SectionExperience from './SectionExperience.vue'

it('wraps timeline with localized title', async () => {
  setLocaleCookie('ja')
  const screen = await render(SectionExperience)

  await expect.element(screen.getByRole('heading', { level: 2, name: 'Experience' })).toBeVisible()
  await expect.element(screen.getByRole('link', { name: '京都大学' })).toBeVisible()
})

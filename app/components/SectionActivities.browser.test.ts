import { render } from '@nuxt/test-utils/browser/pure'
import { expect, it } from 'vitest'
import { setLocaleCookie } from '~~/test/setup/prefs'
import SectionActivities from './SectionActivities.vue'

it('wraps timeline with localized title', async () => {
  setLocaleCookie('ja')
  const screen = await render(SectionActivities)

  await expect.element(screen.getByRole('heading', { level: 2, name: 'Activities' })).toBeVisible()
})

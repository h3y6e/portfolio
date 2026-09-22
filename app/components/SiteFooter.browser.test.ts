import { render } from '@nuxt/test-utils/browser/pure'
import { expect, it } from 'vitest'
import SiteFooter from './SiteFooter.vue'

it('renders copyright year and humans.txt link', async () => {
  const screen = await render(SiteFooter)
  const year = String(new Date().getFullYear())

  await expect.element(screen.getByText(new RegExp(`© ${year} heyhoe`))).toBeVisible()
  await expect.element(screen.getByRole('link', { name: 'humans.txt' })).toBeVisible()
})

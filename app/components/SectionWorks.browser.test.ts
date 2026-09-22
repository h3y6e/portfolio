import { render } from '@nuxt/test-utils/browser/pure'
import { expect, it } from 'vitest'
import { setLocaleCookie } from '~~/test/setup/prefs'
import SectionWorks from './SectionWorks.vue'

it('renders works with source links and defunct strike-through', async () => {
  setLocaleCookie('ja')
  const screen = await render(SectionWorks)

  await expect.element(screen.getByRole('heading', { level: 2, name: 'Works' })).toBeVisible()
  await expect.element(screen.getByRole('link', { name: 'h3y6e.com' })).toBeVisible()
  await expect.element(screen.getByRole('link', { name: 'AR名刺' })).toBeVisible()

  const defunct = screen.getByRole('link', { name: 'AR名刺' })
  await expect.element(defunct).toHaveClass(/line-through/)
})

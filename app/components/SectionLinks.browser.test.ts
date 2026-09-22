import { render } from '@nuxt/test-utils/browser/pure'
import { expect, it } from 'vitest'
import { setLocaleCookie } from '~~/test/setup/prefs'
import SectionLinks from './SectionLinks.vue'

it('lists social and contact links with external targets', async () => {
  setLocaleCookie('ja')
  const screen = await render(SectionLinks)

  await expect.element(screen.getByRole('heading', { level: 2, name: 'Links' })).toBeVisible()
  await expect.element(screen.getByRole('link', { name: /GitHub/i })).toBeVisible()

  const github = screen.getByRole('link', { name: /GitHub/i })
  await expect.element(github).toHaveAttribute('target', '_blank')
  await expect.element(github).toHaveAttribute('rel', 'me')

  const wishlist = screen.getByRole('link', { name: /Wishlist/i })
  await expect.element(wishlist).toHaveAttribute('target', '_blank')
  await expect.element(wishlist).not.toHaveAttribute('rel')

  const bluesky = screen.getByRole('link', { name: /Bluesky/i })
  await expect.element(bluesky).toHaveAttribute('rel', 'me atproto')

  const email = screen.getByRole('link', { name: /Email/i })
  await expect.element(email).not.toHaveAttribute('target')
  await expect.element(email).not.toHaveAttribute('rel')
})

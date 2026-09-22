import { render } from '@nuxt/test-utils/browser/pure'
import { expect, it } from 'vitest'
import { setLocaleCookie } from '~~/test/setup/prefs'
import SiteHero from './SiteHero.vue'

it('renders Japanese hero copy when locale is ja', async () => {
  setLocaleCookie('ja')
  const screen = await render(SiteHero)

  await expect.element(screen.getByRole('heading', { level: 1, name: 'へいほぅ' })).toBeVisible()
  await expect.element(screen.getByText('heyhoe')).toBeVisible()
  await expect.element(screen.getByText(/ソフトウェア開発者/)).toBeVisible()
})

it('renders English hero copy when locale is en', async () => {
  setLocaleCookie('en')
  const screen = await render(SiteHero)

  await expect.element(screen.getByRole('heading', { level: 1, name: 'heyhoe' })).toBeVisible()
  await expect.element(screen.getByText('へいほぅ')).toBeVisible()
  await expect.element(screen.getByText(/Software developer/)).toBeVisible()
})

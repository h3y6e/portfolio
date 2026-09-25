import { render } from '@nuxt/test-utils/browser/pure'
import { expect, it } from 'vitest'
import { applyTheme, setLocaleCookie } from '~~/test/setup/prefs'
import SiteNav from './SiteNav.vue'

it('renders brand link and locale / theme controls', async () => {
  setLocaleCookie('ja')
  const screen = await render(SiteNav)
  await applyTheme('dark')

  await expect.element(screen.getByRole('link', { name: 'h3y6e.com' })).toBeVisible()
  await expect.element(screen.getByRole('button', { name: 'Switch to English' })).toBeVisible()
  await expect.element(screen.getByRole('button', { name: 'Latte テーマに切替' })).toBeVisible()
})

it('toggles locale label when switching language', async () => {
  setLocaleCookie('ja')
  const screen = await render(SiteNav)
  await applyTheme('dark')

  await screen.getByRole('button', { name: 'Switch to English' }).click()

  await expect.element(screen.getByRole('button', { name: '日本語に切替' })).toBeVisible()
  await expect.element(screen.getByText('JA')).toBeVisible()
})

it('when the last theme is active, clicking the theme button wraps around to the first theme', async () => {
  // Arrange
  setLocaleCookie('ja')
  const screen = await render(SiteNav)
  await applyTheme('mocha')

  // Act
  await screen.getByRole('button', { name: 'Light テーマに切替' }).click()

  // Assert
  await expect.element(screen.getByRole('button', { name: 'Dark テーマに切替' })).toBeVisible()
})

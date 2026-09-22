import { render } from '@nuxt/test-utils/browser/pure'
import { expect, it } from 'vitest'
import blogPosts from '~~/shared/data/blog-posts.json'
import { setLocaleCookie } from '~~/test/setup/prefs'
import SectionNotes from './SectionNotes.vue'

it('groups notes by year and exposes rail controls', async () => {
  // Arrange
  setLocaleCookie('ja')
  const latest = [...blogPosts].sort((a, b) => b.date.localeCompare(a.date))[0]
  expect(latest).toBeDefined()
  const latestYear = latest!.date.slice(0, 4)

  // Act
  const screen = await render(SectionNotes)

  // Assert
  await expect.element(screen.getByRole('heading', { level: 2, name: 'Notes' })).toBeVisible()
  await expect.element(screen.getByRole('heading', { level: 3, name: latestYear })).toBeVisible()
  await expect.element(screen.getByRole('link', { name: latest!.title })).toBeVisible()
  await expect.element(screen.getByRole('button', { name: '新しい年へ' })).toBeVisible()
  await expect.element(screen.getByRole('button', { name: '古い年へ' })).toBeVisible()
})

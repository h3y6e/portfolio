import { render } from '@nuxt/test-utils/browser/pure'
import { expect, it } from 'vitest'
import languageStats from '~~/shared/data/github-languages.json'
import { setLocaleCookie } from '~~/test/setup/prefs'
import SectionLanguages from './SectionLanguages.vue'

it('renders language stats with GitHub repository deep links', async () => {
  // Arrange
  setLocaleCookie('ja')
  const typescript = languageStats.find(lang => lang.name === 'TypeScript')
  expect(typescript).toBeDefined()

  // Act
  const screen = await render(SectionLanguages)

  // Assert
  await expect.element(screen.getByRole('heading', { level: 2, name: 'Languages' })).toBeVisible()
  const ts = screen.getByRole('link', { name: 'TypeScript' })
  await expect.element(ts).toBeVisible()
  await expect.element(ts).toHaveAttribute(
    'href',
    'https://github.com/h3y6e?tab=repositories&language=typescript',
  )
  expect(ts.element().closest('li')?.textContent).toContain(`${typescript!.percent}%`)
})

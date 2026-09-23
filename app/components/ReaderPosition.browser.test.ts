import { render } from '@nuxt/test-utils/browser/pure'
import { expect, it } from 'vitest'
import { setLocaleCookie } from '~~/test/setup/prefs'
import ReaderPosition from './ReaderPosition.vue'

it('renders section rail with aria labels from content', async () => {
  setLocaleCookie('ja')

  for (const id of ['top', 'links', 'experience', 'activities', 'notes', 'languages']) {
    const el = document.createElement('section')
    el.id = id
    el.style.height = '800px'
    document.body.appendChild(el)
  }

  const screen = await render(ReaderPosition)

  await expect.element(screen.getByRole('navigation', { name: 'Sections' })).toBeVisible()
  await expect.element(screen.getByRole('link', { name: 'Top' })).toBeVisible()
  await expect.element(screen.getByRole('link', { name: 'Works' })).not.toBeInTheDocument()
})

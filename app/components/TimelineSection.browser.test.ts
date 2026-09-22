import { render } from '@nuxt/test-utils/browser/pure'
import { expect, it } from 'vitest'
import TimelineSection from './TimelineSection.vue'

const items = [
  {
    date: 'April 2016 – September 2020',
    title: '京都大学',
    content: '工学部 電気電子工学科',
    link: 'https://www.s-ee.t.kyoto-u.ac.jp/',
  },
  {
    date: 'January 2022 – Present',
    title: 'Ongoing Role',
    content: 'Still going',
    link: '#ongoing',
  },
]

it('renders titled timeline rows with external and hash links', async () => {
  const screen = await render(TimelineSection, {
    props: {
      id: 'experience',
      title: 'Experience',
      items,
    },
  })

  await expect.element(screen.getByRole('heading', { level: 2, name: 'Experience' })).toBeVisible()
  await expect.element(screen.getByRole('link', { name: '京都大学' })).toBeVisible()
  await expect.element(screen.getByRole('link', { name: 'Ongoing Role' })).toBeVisible()

  const uni = screen.getByRole('link', { name: '京都大学' })
  await expect.element(uni).toHaveAttribute('target', '_blank')

  const ongoing = screen.getByRole('link', { name: 'Ongoing Role' })
  await expect.element(ongoing).not.toHaveAttribute('target')
})

it('marks hovered row as active and dims siblings', async () => {
  const screen = await render(TimelineSection, {
    props: {
      id: 'experience',
      title: 'Experience',
      items,
    },
  })

  await screen.getByRole('link', { name: '京都大学' }).hover()

  const listItems = screen.container.querySelectorAll('.timeline-item')
  expect(listItems[0]?.classList.contains('timeline-item--active')).toBe(true)
  expect(listItems[1]?.classList.contains('timeline-item--dim')).toBe(true)
})

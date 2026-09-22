import type { BlogPost } from '~~/shared/types/blog'
import type { NoteContent } from '~/data/types'
import blogPosts from '~~/shared/data/blog-posts.json'
import { blogOverrides } from '~/data/blog-overrides'

export interface NoteYearGroup {
  year: number
  items: NoteContent[]
}

export function useNotes() {
  const { content } = useContent()

  const notes = computed<NoteContent[]>(() => {
    const blogNotes: NoteContent[] = (blogPosts as BlogPost[]).map((post) => {
      const override = blogOverrides[post.slug]
      return {
        date: post.date,
        title: post.title,
        content: override?.content,
        link: post.url,
      }
    })

    return [...blogNotes, ...content.value.notes].sort((a, b) =>
      b.date.localeCompare(a.date),
    )
  })

  const yearGroups = computed<NoteYearGroup[]>(() => {
    const byYear = new Map<number, NoteContent[]>()
    for (const item of notes.value) {
      const year = Number(item.date.slice(0, 4))
      const list = byYear.get(year)
      if (list)
        list.push(item)
      else
        byYear.set(year, [item])
    }

    return [...byYear.keys()]
      .sort((a, b) => b - a)
      .map(year => ({ year, items: byYear.get(year)! }))
  })

  return { notes, yearGroups, formatNoteDate, formatNoteMonth }
}

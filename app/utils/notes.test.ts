import { describe, expect, it } from 'vitest'
import { formatNoteMonth } from './notes'

describe('formatNoteMonth', () => {
  it('formats UTC month abbreviations', () => {
    expect(formatNoteMonth('2021-12-01')).toBe('Dec')
  })
})

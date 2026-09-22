import { describe, expect, it } from 'vitest'
import { isOngoing, splitDateRange } from './dateRange'

describe('splitDateRange', () => {
  it('splits an en dash range', () => {
    expect(splitDateRange('January 2020 – December 2022')).toEqual({
      start: 'January 2020 –',
      end: 'December 2022',
    })
  })

  it('keeps open-ended ranges', () => {
    expect(isOngoing('April 2024 –')).toBe(true)
    expect(splitDateRange('April 2024 –')).toEqual({
      start: 'April 2024 –',
      end: null,
    })
  })

  it('passes through single dates', () => {
    expect(splitDateRange('2020')).toEqual({ start: '2020', end: null })
    expect(isOngoing('2020')).toBe(false)
  })
})

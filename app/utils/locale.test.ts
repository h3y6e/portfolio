import { describe, expect, it } from 'vitest'
import { fromAcceptLanguage } from './locale'

describe('fromAcceptLanguage', () => {
  it('defaults to ja when missing', () => {
    expect(fromAcceptLanguage(undefined)).toBe('ja')
  })

  it('treats en* as English', () => {
    expect(fromAcceptLanguage('en-US,en;q=0.9')).toBe('en')
    expect(fromAcceptLanguage('en')).toBe('en')
  })

  it('treats other languages as Japanese', () => {
    expect(fromAcceptLanguage('ja,en;q=0.8')).toBe('ja')
    expect(fromAcceptLanguage('fr-FR')).toBe('ja')
  })
})

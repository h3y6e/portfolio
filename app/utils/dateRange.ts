export function isOngoing(date: string): boolean {
  return /[–-]\s*$/.test(date.trim())
}

export function splitDateRange(date: string): { start: string, end: string | null } {
  const trimmed = date.trim()
  const dash = trimmed.search(/[–-]/)
  if (dash === -1)
    return { start: trimmed, end: null }

  const start = trimmed.slice(0, dash).trim()
  const end = trimmed.slice(dash + 1).trim()
  return {
    start: `${start} –`,
    end: end || null,
  }
}

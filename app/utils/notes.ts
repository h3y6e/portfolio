const dateFmt = new Intl.DateTimeFormat('en-US', {
  month: 'long',
  year: 'numeric',
  timeZone: 'UTC',
})

const monthFmt = new Intl.DateTimeFormat('en-US', {
  month: 'short',
  timeZone: 'UTC',
})

export function formatNoteDate(isoDate: string): string {
  return dateFmt.format(new Date(`${isoDate}T00:00:00Z`))
}

export function formatNoteMonth(isoDate: string): string {
  return monthFmt.format(new Date(`${isoDate}T00:00:00Z`))
}

export type Locale = 'ja' | 'en'

export interface HeroContent {
  name: string
  desc: string
  bio: string
}

export type ExperienceKind = 'academic' | 'temporary' | 'permanent'

export interface ExperienceContent {
  date: string
  title: string
  content: string
  link: string
  kind?: ExperienceKind
}

export interface NoteContent {
  /** ISO calendar date `YYYY-MM-DD`. */
  date: string
  title: string
  content?: string
  link: string
}

export interface LinkContent {
  title: string
  link: string
  icon: string
  brand: string
  brandDark?: string
  /** Space-separated HTML `rel` tokens (e.g. `me`, `me atproto`). */
  rel?: string
}

export interface SectionNavItem {
  id: string
  label: string
}

export interface UiCopy {
  sections: {
    links: string
    experience: string
    activities: string
    notes: string
    languages: string
  }
  themeTo: (theme: string) => string
  localeToJa: string
  localeToEn: string
  notesPrev: string
  notesNext: string
}

export interface PortfolioContent {
  hero: HeroContent
  experiences: ExperienceContent[]
  activities: ExperienceContent[]
  notes: NoteContent[]
  links: LinkContent[]
  sectionNav: SectionNavItem[]
  ui: UiCopy
}

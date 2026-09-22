import type { LanguageStat } from '~~/shared/types/github'
import languageStats from '~~/shared/data/github-languages.json'

export function useLanguages() {
  return {
    languages: languageStats as LanguageStat[],
  }
}

import type { PortfolioContent } from '~/data/types'
import { en } from '~/data/en'
import { ja } from '~/data/ja'

const catalogs = { ja, en } as const

export function useContent() {
  const { locale } = useLocale()
  const content = computed<PortfolioContent>(() => catalogs[locale.value])
  return { content, locale }
}

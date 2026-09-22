type Theme = 'light' | 'dark'

export function useTheme() {
  const colorMode = useColorMode()
  const theme = computed<Theme>(() =>
    colorMode.value === 'light' ? 'light' : 'dark',
  )

  function setTheme(next: Theme): void {
    const apply = () => {
      colorMode.preference = next
    }
    if (import.meta.client)
      withViewTransition(apply)
    else
      apply()
  }

  function toggleTheme(): void {
    setTheme(theme.value === 'dark' ? 'light' : 'dark')
  }

  return { theme, setTheme, toggleTheme }
}

export const themes = ['light', 'dark', 'latte', 'frappe', 'macchiato', 'mocha'] as const
export type Theme = typeof themes[number]

export const themeNames: Record<Theme, string> = {
  light: 'Light',
  dark: 'Dark',
  latte: 'Latte',
  frappe: 'Frappé',
  macchiato: 'Macchiato',
  mocha: 'Mocha',
}

function isTheme(value: string): value is Theme {
  return (themes as readonly string[]).includes(value)
}

export function useTheme() {
  const colorMode = useColorMode()
  // During prerender the value is 'system' until the client script resolves it
  const theme = computed<Theme>(() =>
    isTheme(colorMode.value) ? colorMode.value : 'dark',
  )
  const nextTheme = computed<Theme>(() =>
    themes[(themes.indexOf(theme.value) + 1) % themes.length]!,
  )

  function cycleTheme(): void {
    const apply = () => {
      colorMode.preference = nextTheme.value
    }
    if (import.meta.client)
      withViewTransition(apply)
    else
      apply()
  }

  return { nextTheme, cycleTheme }
}

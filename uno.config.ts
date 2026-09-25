import {
  defineConfig,
  presetIcons,
  presetWind4,
  transformerDirectives,
  transformerVariantGroup,
} from 'unocss'
import { links } from './app/data/links'

export default defineConfig({
  theme: {
    // Wind4: fontFamily → font (emits --font-sans / --font-mono)
    font: {
      sans: '"h3y6e.com Sans", "Hiragino Sans", "Noto Sans JP", system-ui, sans-serif',
      mono: '"h3y6e.com Sans", ui-monospace, monospace',
    },
  },
  shortcuts: [
    {
      'color-base': 'color-[var(--color-fg)]',
      'bg-base': 'bg-[var(--color-bg)]',
      'border-base': 'border-#8882',
      'bg-active': 'bg-#8881',
      'op-fade': 'op-[var(--op-fade)]',
      'op-mute': 'op-[var(--op-mute)]',
      'z-top-nav': 'z-60',
      'site-shell': 'mx-auto max-w-180 px-6',
      'section-gap': 'mt-14',
      'section-title': 'mb-4 text-sm font-medium op-mute',
      'btn-icon': 'inline-flex size-8 items-center justify-center op-mute transition-transform duration-160ms hover:op-100 active:scale-97',
      'btn-text': 'inline-flex h-8 min-w-8 items-center justify-center px-1.5 font-mono text-xs tracking-wide op-mute transition-transform duration-160ms hover:op-100 active:scale-97',
      'sr-only': 'absolute w-px h-px p-0 -m-px overflow-hidden whitespace-nowrap border-0',
    },
  ],
  presets: [
    presetWind4(),
    presetIcons({ scale: 1.1 }),
  ],
  transformers: [transformerDirectives(), transformerVariantGroup()],
  safelist: [
    'i-ph-sun-dim',
    'i-ph-moon-stars',
    'i-ph-cat',
    'i-ph-caret-left',
    'i-ph-caret-right',
    ...links.map(link => link.icon),
  ],
})

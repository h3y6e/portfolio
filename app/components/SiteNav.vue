<script setup lang="ts">
const { nextTheme, cycleTheme } = useTheme()
const { locale, toggleLocale } = useLocale()
const { content } = useContent()
</script>

<template>
  <header class="site-shell pb-2 pt-10 flex items-center justify-between">
    <a href="#top" class="text-sm font-mono op-mute no-underline hover:op-100">
      h3y6e.com
    </a>
    <div class="flex gap-1 items-center">
      <button
        type="button"
        class="btn-text"
        :aria-label="locale === 'ja' ? content.ui.localeToEn : content.ui.localeToJa"
        @click="toggleLocale"
      >
        {{ locale === 'ja' ? 'EN' : 'JA' }}
      </button>
      <button
        type="button"
        class="theme-toggle btn-icon"
        :aria-label="content.ui.themeTo(themeNames[nextTheme])"
        @click="cycleTheme"
      >
        <span class="theme-icon theme-icon--light i-ph-sun-dim size-4" aria-hidden="true" />
        <span class="theme-icon theme-icon--dark i-ph-moon-stars size-4" aria-hidden="true" />
        <span class="theme-icon theme-icon--catppuccin i-ph-cat size-4" aria-hidden="true" />
      </button>
    </div>
  </header>
</template>

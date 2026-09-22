<script setup lang="ts">
const { theme, toggleTheme } = useTheme()
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
        class="btn-icon"
        :aria-label="theme === 'dark' ? content.ui.themeToLight : content.ui.themeToDark"
        @click="toggleTheme"
      >
        <span class="i-ph-sun-dim size-4 hidden dark:inline-block" aria-hidden="true" />
        <span class="i-ph-moon-stars size-4 inline-block dark:hidden" aria-hidden="true" />
      </button>
    </div>
  </header>
</template>

<script setup lang="ts">
const config = useRuntimeConfig()
const { content } = useContent()
const { languages } = useLanguages()

function languageReposUrl(name: string): string {
  const user = config.public.githubUsername
  const language = encodeURIComponent(name.toLowerCase())
  return `https://github.com/${user}?tab=repositories&language=${language}`
}
</script>

<template>
  <section v-if="languages?.length" id="languages" class="site-shell section-gap">
    <h2 class="section-title">
      {{ content.ui.sections.languages }}
    </h2>
    <ul class="m-0 p-0 list-none flex flex-wrap gap-x-5 gap-y-3">
      <li
        v-for="lang in languages"
        :key="lang.name"
        class="flex gap-1.5 items-baseline"
      >
        <a
          :href="languageReposUrl(lang.name)"
          class="font-medium"
          target="_blank"
        >{{ lang.name }}</a>
        <span class="text-sm font-mono op-mute tabular-nums">{{ lang.percent }}%</span>
      </li>
    </ul>
  </section>
</template>

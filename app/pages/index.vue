<script setup lang="ts">
import { siteMeta } from '~/data/meta'

const ogImage = `${siteMeta.url}${siteMeta.logo}`

useSeoMeta({
  title: siteMeta.title,
  description: siteMeta.description,
  ogTitle: siteMeta.title,
  ogDescription: siteMeta.description,
  ogImage,
  twitterCard: 'summary',
  twitterTitle: siteMeta.title,
  twitterDescription: siteMeta.description,
  twitterImage: ogImage,
  twitterCreator: siteMeta.twitter,
})
</script>

<template>
  <main>
    <div class="h-card">
      <SiteHero />
      <SectionLinks />
    </div>
    <SectionExperience />
    <SectionActivities />
    <SectionWorks />
    <SectionNotes />
    <SectionLanguages />
  </main>
</template>

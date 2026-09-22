<script setup lang="ts">
const { content } = useContent()
</script>

<template>
  <TimelineSection
    id="experience"
    :title="content.ui.sections.experience"
    :items="content.experiences"
  />
</template>

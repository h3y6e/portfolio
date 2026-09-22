<script setup lang="ts">
const { content } = useContent()
</script>

<template>
  <TimelineSection
    id="activities"
    :title="content.ui.sections.activities"
    :items="content.activities"
  />
</template>

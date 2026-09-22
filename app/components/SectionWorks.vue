<script setup lang="ts">
const { content } = useContent()
</script>

<template>
  <section id="works" class="site-shell section-gap">
    <h2 class="section-title">
      {{ content.ui.sections.works }}
    </h2>
    <ul class="m-0 p-0 list-none space-y-4">
      <li v-for="item in content.products" :key="item.title" class="reveal">
        <div class="flex flex-wrap gap-x-3 gap-y-1 items-baseline">
          <a
            :href="item.link"
            class="font-medium"
            :class="item.defunct ? 'line-through op-fade' : undefined"
            target="_blank"
          >{{ item.title }}</a>
          <a
            v-if="item.code"
            :href="item.code"
            class="text-xs font-mono op-mute no-underline hover:op-100"
            target="_blank"
          >{{ content.ui.source }}</a>
        </div>
        <p class="text-sm m-0 op-fade">
          {{ item.content }}
        </p>
      </li>
    </ul>
  </section>
</template>

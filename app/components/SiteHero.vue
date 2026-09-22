<script setup lang="ts">
import { indieweb } from '~/data/indieweb'
import { siteMeta } from '~/data/meta'

const { content } = useContent()
</script>

<template>
  <section class="site-shell pt-10">
    <a
      class="u-url u-uid sr-only"
      :href="siteMeta.url"
      rel="me"
    >{{ siteMeta.url }}</a>
    <a class="u-email sr-only" :href="indieweb.email">
      {{ indieweb.email.replace('mailto:', '') }}
    </a>

    <div class="flex gap-4 items-start">
      <img
        class="u-photo rounded-sm shrink-0 size-14"
        :src="siteMeta.logo"
        width="56"
        height="56"
        :alt="content.hero.name"
      >
      <div class="min-w-0">
        <h1
          class="p-name text-3xl tracking-tight"
          style="view-transition-name: site-title"
        >
          {{ content.hero.name }}
        </h1>
        <p class="p-nickname text-sm font-mono mt-1 op-mute">
          {{ content.hero.desc }}
        </p>
      </div>
    </div>
    <p class="p-note mt-6 op-fade max-w-prose text-pretty">
      {{ content.hero.bio }}
    </p>
  </section>
</template>

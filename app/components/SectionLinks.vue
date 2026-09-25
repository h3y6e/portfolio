<script setup lang="ts">
import type { LinkContent } from '~/data/types'

const { content } = useContent()

function brandStyle(item: { brand: string, brandDark?: string }) {
  return {
    '--link-brand': `light-dark(${item.brand}, ${item.brandDark ?? item.brand})`,
  }
}

function isIdentity(item: LinkContent): boolean {
  return Boolean(item.rel?.split(/\s+/).includes('me'))
}
</script>

<template>
  <section id="links" class="site-shell section-gap">
    <h2 class="section-title">
      {{ content.ui.sections.links }}
    </h2>
    <ul class="reveal text-sm m-0 p-0 list-none flex flex-wrap gap-x-4 gap-y-2.5">
      <li
        v-for="item in content.links"
        :key="item.title"
      >
        <a
          class="site-link no-underline inline-flex gap-1.5 items-center"
          :class="isIdentity(item) ? 'u-url' : undefined"
          :href="item.link"
          :style="brandStyle(item)"
          :target="item.link.startsWith('mailto:') ? undefined : '_blank'"
          :rel="item.rel"
        >
          <span
            class="site-link-icon shrink-0 size-3.5"
            :class="item.icon"
            aria-hidden="true"
          />
          <span>{{ item.title }}</span>
        </a>
      </li>
    </ul>
  </section>
</template>

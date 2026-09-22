<script setup lang="ts">
import type { ExperienceContent } from '~/data/types'

const props = defineProps<{
  id: string
  title: string
  items: ExperienceContent[]
}>()

const activeKey = shallowRef<string | null>(null)

function rowKey(item: ExperienceContent): string {
  return `${item.date}::${item.title}`
}

const rows = computed(() =>
  props.items.map(item => ({
    item,
    parts: splitDateRange(item.date),
    ongoing: isOngoing(item.date),
  })),
)

function activate(item: ExperienceContent): void {
  activeKey.value = rowKey(item)
}

function clearActive(): void {
  activeKey.value = null
}
</script>

<template>
  <section :id="id" class="site-shell section-gap">
    <h2 class="section-title">
      {{ title }}
    </h2>
    <ol
      class="timeline m-0 p-0 list-none"
      @mouseleave="clearActive"
    >
      <li
        v-for="{ item, parts, ongoing } in rows"
        :key="rowKey(item)"
        class="timeline-item reveal"
        :class="{
          'timeline-item--active': activeKey === rowKey(item),
          'timeline-item--ongoing': ongoing,
          'timeline-item--dim': activeKey && activeKey !== rowKey(item),
        }"
        @mouseenter="activate(item)"
        @focusin="activate(item)"
      >
        <time class="timeline-date text-xs font-mono op-mute tabular-nums">
          <span
            v-if="parts.end"
            class="timeline-date-split"
            aria-hidden="true"
          >
            <span class="timeline-date-start">{{ parts.start }}</span>
            <span class="timeline-date-end">{{ parts.end }}</span>
          </span>
          <span class="timeline-date-full">{{ item.date }}</span>
        </time>
        <div class="timeline-axis" aria-hidden="true">
          <span class="timeline-dot" />
        </div>
        <div class="timeline-body">
          <a
            :href="item.link"
            class="font-medium"
            :target="item.link.startsWith('#') ? undefined : '_blank'"
          >{{ item.title }}</a>
          <p
            v-if="item.content"
            class="timeline-content text-sm m-0 op-fade whitespace-pre-line"
          >
            {{ item.content }}
          </p>
        </div>
      </li>
    </ol>
  </section>
</template>

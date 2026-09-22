<script setup lang="ts">
import { useEventListener, useScroll } from '@vueuse/core'

const { content } = useContent()
const { yearGroups, formatNoteMonth } = useNotes()

const sectionRef = useTemplateRef<HTMLElement>('sectionRef')
const railRef = useTemplateRef<HTMLElement>('railRef')

const COLUMN_STEP = 17 * 16 + 1.75 * 16

const { arrivedState, measure } = useScroll(railRef, {
  offset: { left: 1, right: 1 },
})

const canPrev = computed(() => !arrivedState.left)
const canNext = computed(() => !arrivedState.right)

function scrollByDir(dir: -1 | 1): void {
  const el = railRef.value
  if (!el)
    return
  el.scrollBy({ left: dir * COLUMN_STEP, behavior: 'smooth' })
}

function onWheel(event: WheelEvent): void {
  const rail = railRef.value
  if (!rail)
    return

  if (Math.abs(event.deltaX) > Math.abs(event.deltaY))
    return
  if (event.deltaY === 0)
    return

  const year = (event.target as Element | null)?.closest?.('.notes-year')
  if (year instanceof HTMLElement) {
    const canUp = year.scrollTop > 1
    const canDown = year.scrollTop + year.clientHeight < year.scrollHeight - 1
    if ((event.deltaY < 0 && canUp) || (event.deltaY > 0 && canDown))
      return
  }

  if ((event.deltaY < 0 && arrivedState.left) || (event.deltaY > 0 && arrivedState.right))
    return

  event.preventDefault()
  rail.scrollLeft += event.deltaY
  measure()
}

watch(yearGroups, async () => {
  await nextTick()
  measure()
})

useEventListener(sectionRef, 'wheel', onWheel, { passive: false })
</script>

<template>
  <section id="notes" ref="sectionRef" class="section-gap">
    <div class="site-shell">
      <h2 class="section-title">
        {{ content.ui.sections.notes }}
      </h2>
    </div>
    <div class="notes-rail-wrap">
      <button
        type="button"
        class="notes-rail-btn notes-rail-btn--prev"
        :aria-label="content.ui.notesPrev"
        :disabled="!canPrev"
        @click="scrollByDir(-1)"
      >
        <span class="i-ph-caret-left text-lg" aria-hidden="true" />
      </button>
      <button
        type="button"
        class="notes-rail-btn notes-rail-btn--next"
        :aria-label="content.ui.notesNext"
        :disabled="!canNext"
        @click="scrollByDir(1)"
      >
        <span class="i-ph-caret-right text-lg" aria-hidden="true" />
      </button>
      <div
        ref="railRef"
        class="notes-rail"
        :class="{
          'notes-rail--fade-start': canPrev,
          'notes-rail--fade-end': canNext,
        }"
        tabindex="0"
        aria-label="Notes by year"
      >
        <div
          v-for="group in yearGroups"
          :key="group.year"
          class="notes-year"
        >
          <h3 class="notes-year-heading">
            {{ group.year }}
          </h3>
          <ul class="m-0 p-0 list-none space-y-2.5">
            <li
              v-for="item in group.items"
              :key="`${item.date}-${item.link}`"
            >
              <div class="flex gap-2.5">
                <time class="text-xs font-mono pt-0.5 op-mute shrink-0 w-8 tabular-nums">
                  {{ formatNoteMonth(item.date) }}
                </time>
                <div class="min-w-0">
                  <a
                    :href="item.link"
                    class="text-sm leading-snug font-medium"
                    target="_blank"
                  >{{ item.title }}</a>
                  <p
                    v-if="item.content"
                    class="text-xs m-0 mt-0.5 op-fade truncate"
                    :title="item.content"
                  >
                    {{ item.content }}
                  </p>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </section>
</template>

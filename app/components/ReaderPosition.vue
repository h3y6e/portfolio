<script setup lang="ts">
import { useEventListener } from '@vueuse/core'

const { content } = useContent()
const activeFloat = shallowRef(0)

const PROBE = 0.2
const BLEND_RATIO = 0.3

let lockedUntil = 0
let lockedIndex = -1

const weights = computed(() => {
  const n = content.value.sectionNav.length
  const pos = activeFloat.value
  return Array.from({ length: n }, (_, i) => {
    const w = 1 - Math.abs(pos - i)
    return w > 0 ? w : 0
  })
})

const currentId = computed(() => {
  const nav = content.value.sectionNav
  const i = Math.min(
    nav.length - 1,
    Math.max(0, Math.round(activeFloat.value)),
  )
  return nav[i]?.id ?? 'top'
})

function sectionTops(): number[] {
  return content.value.sectionNav.map((item) => {
    const el = document.getElementById(item.id)
    if (!el)
      return 0
    return el.getBoundingClientRect().top + window.scrollY
  })
}

function activationMarks(tops: number[], maxScroll: number, probe: number): number[] {
  const n = tops.length
  if (n === 0)
    return []
  if (maxScroll <= 0)
    return Array.from({ length: n }, (_, i) => i)

  const marks = tops.map(t => Math.min(maxScroll, Math.max(0, t - probe)))
  marks[0] = 0
  marks[n - 1] = maxScroll

  const minGap = maxScroll / (2 * Math.max(1, n - 1))
  for (let i = 1; i < n; i++)
    marks[i] = Math.max(marks[i]!, marks[i - 1]! + minGap)

  if (marks[n - 1]! > maxScroll) {
    const scale = maxScroll / marks[n - 1]!
    for (let i = 0; i < n; i++)
      marks[i]! *= scale
  }
  marks[0] = 0
  marks[n - 1] = maxScroll
  return marks
}

function measureFloat(): number {
  const tops = sectionTops()
  const n = tops.length
  if (!n)
    return 0

  const maxScroll = Math.max(
    0,
    document.documentElement.scrollHeight - window.innerHeight,
  )
  const y = Math.min(Math.max(0, window.scrollY), maxScroll)
  if (maxScroll <= 0 || y >= maxScroll - 1)
    return n - 1

  const marks = activationMarks(tops, maxScroll, window.innerHeight * PROBE)

  let i = 0
  while (i < n - 1 && marks[i + 1]! <= y)
    i++

  if (i >= n - 1)
    return n - 1

  const span = marks[i + 1]! - marks[i]!
  const blend = Math.max(24, span * BLEND_RATIO)
  const distToNext = marks[i + 1]! - y
  if (distToNext > blend)
    return i

  return i + (1 - distToNext / blend)
}

function syncFromScroll(): void {
  if (performance.now() < lockedUntil) {
    activeFloat.value = lockedIndex
    return
  }
  activeFloat.value = measureFloat()
}

function setCurrent(id: string): void {
  const index = content.value.sectionNav.findIndex(item => item.id === id)
  if (index < 0)
    return
  lockedIndex = index
  activeFloat.value = index
  lockedUntil = performance.now() + 900
}

onMounted(async () => {
  await nextTick()
  syncFromScroll()
})

useEventListener(window, 'scroll', syncFromScroll, { passive: true })
useEventListener(window, 'resize', syncFromScroll, { passive: true })
useEventListener(window, 'scrollend', () => {
  lockedUntil = 0
  syncFromScroll()
})
</script>

<template>
  <nav
    class="reader-rail flex-col gap-3 hidden pointer-events-none items-end right-3 top-1/2 fixed z-top-nav sm:flex sm:pointer-events-auto -translate-y-1/2 md:right-5"
    aria-label="Sections"
  >
    <a
      v-for="(item, index) in content.sectionNav"
      :key="item.id"
      :href="`#${item.id}`"
      :data-section="item.id"
      class="reader-rail-link group no-underline flex gap-2.5 pointer-events-auto items-center justify-end"
      :aria-current="currentId === item.id ? 'true' : undefined"
      :aria-label="item.label"
      :style="{ '--rail-weight': weights[index] }"
      @click="setCurrent(item.id)"
    >
      <span class="reader-rail-label">
        {{ item.label }}
      </span>
      <span class="reader-rail-line" aria-hidden="true" />
    </a>
  </nav>
</template>

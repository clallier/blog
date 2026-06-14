<script setup>
import { computed } from 'vue'

const props = defineProps({
  title: {
    type: String,
    default: 'Note'
  },
  icon: {
    type: String,
    default: ''
  },
  color: {
    type: String,
    default: 'note'
  }
})

// Private constants mapping friendly aliases
const COLOR_MAP = {
  note: 'var(--color-note, #3b82f6)',
  success: 'var(--color-success, #10b981)',
  warning: 'var(--color-warning, #f59e0b)',
  danger: 'var(--color-error, #ef4444)',
  error: 'var(--color-error, #ef4444)',
  important: 'var(--color-important, #8b5cf6)',
  gray: 'var(--color-gray, #6b7280)'
}

const ICON_MAP = {
  note: 'i-carbon-information',
  success: 'i-carbon-checkmark-filled',
  warning: 'i-carbon-warning',
  danger: 'i-carbon-error',
  error: 'i-carbon-error',
  important: 'i-carbon-rocket',
  gray: 'i-carbon-notebook'
}

// Statically declare classes for UnoCSS to ensure they are scanned and bundled at build time:
// i-carbon-information i-carbon-checkmark-filled i-carbon-warning i-carbon-error i-carbon-rocket i-carbon-notebook

const resolvedColor = computed(() => {
  const colorKey = props.color || 'note'
  return COLOR_MAP[colorKey] || props.color
})

const resolvedIcon = computed(() => {
  if (props.icon) {
    return props.icon.startsWith('i-') ? props.icon : `i-${props.icon}`
  }
  const colorKey = props.color || 'note'
  return ICON_MAP[colorKey] || 'i-carbon-information'
})

const containerStyle = computed(() => {
  const colorVal = resolvedColor.value
  return {
    borderColor: colorVal,
    background: `color-mix(in srgb, ${colorVal} 3%, transparent)`
  }
})

const titleStyle = computed(() => {
  return {
    color: resolvedColor.value
  }
})
</script>

<style scoped>
/* Reset default blockquote styling inside our Card content */
.card-content :deep(blockquote) {
  border-left: none !important;
  margin: 0 !important;
  padding: 0 !important;
  box-shadow: none !important;
  background: transparent !important;
  color: inherit !important;
  font-style: normal !important;
  font-weight: normal !important;
}

.card-content :deep(p) {
  margin: 0 !important;
}

.card-content :deep(ul),
.card-content :deep(ol) {
  margin-top: 0.125rem !important;
  margin-bottom: 0.125rem !important;
  padding-left: 0.5rem !important;
}

.card-content :deep(li) {
  margin-left: 0.5rem !important;
  line-height: 1.35 !important;
}
</style>

<template>
  <div class="markdown-alert border-l-4 my-2 rounded-r-lg" :style="containerStyle">
    <div class="markdown-alert-title flex items-center gap-1.5 font-bold text-xs mb-2 select-none" :style="titleStyle">
      <!-- Icon -->
      <span v-if="resolvedIcon" :class="resolvedIcon" class="inline-block w-4.5 h-4.5 align-middle" />
      <!-- Title -->
      <span class="align-middle uppercase tracking-wider">{{ title }}</span>
    </div>
    <div class="card-content text-sm leading-relaxed text-gray-800 dark:text-gray-200">
      <slot />
    </div>
  </div>
</template>

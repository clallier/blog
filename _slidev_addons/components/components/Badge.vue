<script setup>
import { computed } from 'vue'

const props = defineProps({
  color: {
    type: String,
    default: 'primary'
  }
})

const CATPPUCCIN_MAP = {
  rosewater: 'var(--color-rosewater, var(--rosewater, #f5e0dc))',
  flamingo: 'var(--color-flamingo, var(--flamingo, #f2cdcd))',
  pink: 'var(--color-pink, var(--pink, #f5c2e7))',
  mauve: 'var(--color-mauve, var(--mauve, #cba6f7))',
  red: 'var(--color-red, var(--red, #f38ba8))',
  maroon: 'var(--color-maroon, var(--maroon, #eba0ac))',
  peach: 'var(--color-peach, var(--peach, #fab387))',
  yellow: 'var(--color-yellow, var(--yellow, #f9e2af))',
  green: 'var(--color-green, var(--green, #a6e3a1))',
  teal: 'var(--color-teal, var(--teal, #94e2d5))',
  sky: 'var(--color-sky, var(--sky, #89dceb))',
  sapphire: 'var(--color-sapphire, var(--sapphire, #74c7ec))',
  blue: 'var(--color-blue, var(--blue, #89b4fa))',
  lavender: 'var(--color-lavender, var(--lavender, #b4befe))',
  // Helper aliases
  success: 'var(--color-success, var(--color-green, var(--green, #a6e3a1)))',
  danger: 'var(--color-error, var(--color-red, var(--red, #f38ba8)))',
  error: 'var(--color-error, var(--color-red, var(--red, #f38ba8)))',
  note: 'var(--color-note, var(--color-blue, var(--blue, #89b4fa)))',
  warning: 'var(--color-warning, var(--color-yellow, var(--yellow, #f9e2af)))',
  orange: 'var(--color-warning, var(--color-peach, var(--peach, #fab387)))',
  purple: 'var(--color-important, var(--color-mauve, var(--mauve, #cba6f7)))',
  important: 'var(--color-important, var(--color-mauve, var(--mauve, #cba6f7)))'
}

const style = computed(() => {
  const colorKey = props.color || 'primary'
  let resolvedColorVal

  if (colorKey === 'primary') {
    // Simply reference the global CSS variable computed by global-bottom
    resolvedColorVal = 'var(--current-slide-color)'
  } else {
    resolvedColorVal = CATPPUCCIN_MAP[colorKey] || `var(--color-${colorKey}, var(--${colorKey}, ${colorKey}))`
  }

  return {
    backgroundColor: `color-mix(in srgb, ${resolvedColorVal} 10%, transparent)`,
    color: 'currentColor',
    borderRadius: 'var(--slidev-code-radius, 4px)'
  }
})
</script>

<template>
  <span :style="style" class="inline-block px-1.5 font-medium align-middle select-none whitespace-nowrap">
    <slot />
  </span>
</template>

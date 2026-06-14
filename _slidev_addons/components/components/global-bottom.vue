<script setup>
import { computed, watchEffect } from 'vue'
import { useNav, useSlideContext } from '@slidev/client'

const COLORS = [
  'rosewater',
  'flamingo',
  'pink',
  'mauve',
  'red',
  'maroon',
  'peach',
  'yellow',
  'green',
  'teal',
  'sky',
  'sapphire',
  'blue',
  'lavender'
]

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
  lavender: 'var(--color-lavender, var(--lavender, #b4befe))'
}

const { currentSlideNo, currentSlideRoute } = useNav()
const { $slidev } = useSlideContext()

// Dynamically compute the active slide color name based on the theme rotation logic
const currentSlideColor = computed(() => {
  const baseColor = ($slidev.themeConfigs?.baseColor?.toString().toLowerCase()) || COLORS[0]
  const colorPattern = ($slidev.themeConfigs?.colorPattern?.toString().toLowerCase()) || 'rotation'

  const slideBaseColor = currentSlideRoute.value?.meta?.slide?.frontmatter?.themeConfig?.baseColor

  if (colorPattern === 'single') {
    return (
      COLORS.find((color) => color === slideBaseColor) ??
      COLORS.find((color) => color === baseColor) ??
      COLORS[0]
    )
  }

  // Rotation pattern: cycle through the colors list starting from the baseColor
  const startColor = COLORS.find((color) => color === baseColor) ?? COLORS[0]
  const startIndex = COLORS.findIndex((c) => c === startColor)

  const colorIndex = (startIndex + currentSlideNo.value - 1) % COLORS.length
  return COLORS[colorIndex]
})

// Publish the resolved color to a global CSS variable on document root
watchEffect(() => {
  const slideColorName = currentSlideColor.value
  const resolvedColorVal = CATPPUCCIN_MAP[slideColorName] || `var(--color-${slideColorName}, var(--${slideColorName}))`
  document.documentElement.style.setProperty('--current-slide-color', resolvedColorVal)
})
</script>

<template>
  <span style="display: none;" />
</template>

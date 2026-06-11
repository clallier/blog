<script setup>
import { computed } from 'vue'

const props = defineProps({
  idx: {
    type: Number,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  icon: {
    type: String,
    default: ''
  },
  body: {
    type: String,
    required: true
  },
  footer: {
    type: Array,
    default: () => []
  }
})

const orientations = [
  'to bottom right',
  'to bottom left',
  'to top right',
  'to top left',
  'to top',
  'to bottom'
]


const gradientStyle = computed(() => {
  const orientIdx = Math.floor(Math.random() * orientations.length)
  const orientation = orientations[orientIdx]

  const hue = props.idx * 60

  const grad = `linear-gradient(${orientation}, hsla(${hue}deg, 16%, 22%, 0.1) 30%, hsla(${hue}deg, 56%, 91%, 0.2) 100%)`
  console.log(grad)

  return {
    background: grad
  }
})
const renderedBody = computed(() => {
  let text = props.body || ''
  
  // Handle escaped characters (e.g. \* or \()
  text = text.replace(/\\([*_(~`[\]()])/g, '$1')
  
  let html = text
  
  // Bold: **text**
  html = html.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
  // Italic: *text*
  html = html.replace(/\*([^*]+)\*/g, '<em>$1</em>')
  // Italic: _text_
  html = html.replace(/_([^_]+)_/g, '<em>$1</em>')
  // Inline Code: `text`
  html = html.replace(/`([^`]+)`/g, '<code class="px-1 py-0.5 bg-black/15 dark:bg-white/15 rounded font-mono text-[10px]">$1</code>')
  
  return html
})
</script>

<template>
  <div class="mt-4 p-4 rounded-lg flex flex-col justify-between shadow-md min-h-[220px]" :style="gradientStyle">
    <div>
      <div class="flex items-center mb-2 text-current relative">
        <span class="text-base absolute left-0">{{ icon }}</span>
        <div class="font-bold w-full text-center">{{ title }}</div>
      </div>
      <p class="text-xs opacity-80 leading-relaxed" v-html="renderedBody"></p>
    </div>
    <div v-if="footer && footer.length > 0"
      class="mt-4 border-t border-current/10 pt-3 text-[11px] text-left flex flex-col gap-1">
      <div v-for="(item, idx) in footer" :key="idx" class="flex justify-between">
        <span class="font-semibold opacity-75">{{ item.key }}:</span>
        <span class="opacity-90">{{ item.value }}</span>
      </div>
    </div>
  </div>
</template>

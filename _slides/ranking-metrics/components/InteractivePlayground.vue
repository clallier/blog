<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import {
  calculateRR,
  calculateAP,
  calculateNDCG,
  calculatePrecision,
  calculateRecall,
  calculateF1,
  calculateSizeAccuracy,
  runSelfTests
} from './metrics.js'

// Songs database with default expected relevance grades
const songs = ref([
  { id: '1', title: 'Get Lucky', expected: 3, active: true, emoji: '🍀' },
  { id: '2', title: 'One More Time', expected: 2, active: true, emoji: '🔁' },
  { id: '3', title: 'Instant Crush', expected: 1, active: true, emoji: '⚡' },
  { id: '4', title: 'Harder Better Faster', expected: 1, active: false, emoji: '💪' },
  { id: '5', title: 'Around the World', expected: 1, active: false, emoji: '🌍' }
])

// The current retrieved list
const retrieved = ref([
  { id: '2', active: true }, // One More Time
  { id: '1', active: true }, // Get Lucky
  { id: '4', active: true }, // Harder Better Faster
  { id: '3', active: true }, // Instant Crush
  { id: '5', active: false } // Around the World (not retrieved)
])

// Helper to get song title
const getSongTitle = (id) => {
  return songs.value.find(s => s.id === id)?.title || ''
}

// Helper to get song emoji
const getSongEmoji = (id) => {
  return songs.value.find(s => s.id === id)?.emoji || '🎵'
}

// Reordering actions
const moveUp = (index) => {
  if (index > 0) {
    const temp = retrieved.value[index]
    retrieved.value[index] = retrieved.value[index - 1]
    retrieved.value[index - 1] = temp
  }
}

const moveDown = (index) => {
  if (index < retrieved.value.length - 1) {
    const temp = retrieved.value[index]
    retrieved.value[index] = retrieved.value[index + 1]
    retrieved.value[index + 1] = temp
  }
}

// Song reordering inside Ground Truth
const moveSongUp = (index) => {
  if (index > 0) {
    const temp = songs.value[index]
    songs.value[index] = songs.value[index - 1]
    songs.value[index - 1] = temp
  }
}

const moveSongDown = (index) => {
  if (index < songs.value.length - 1) {
    const temp = songs.value[index]
    songs.value[index] = songs.value[index + 1]
    songs.value[index + 1] = temp
  }
}

// Compute metrics
const activeRetrieved = computed(() => {
  return retrieved.value
    .filter(r => r.active)
    .map(r => songs.value.find(s => s.id === r.id))
})

// Extract active retrieved song titles as an array of strings
const activeRetrievedTitles = computed(() => {
  return activeRetrieved.value.map(s => s.title)
})

const binaryExpected = computed(() => {
  return new Set(songs.value.filter(s => s.active && s.expected > 0).map(s => s.title))
})

const gradedExpected = computed(() => {
  const map = {}
  songs.value.forEach(s => {
    if (s.active && s.expected > 0) map[s.title] = s.expected
  })
  return map
})

// RR
const computedRR = computed(() => {
  return calculateRR(activeRetrievedTitles.value, binaryExpected.value)
})

// AP
const computedAP = computed(() => {
  return calculateAP(activeRetrievedTitles.value, binaryExpected.value)
})

// NDCG
const computedNDCG = computed(() => {
  return calculateNDCG(activeRetrievedTitles.value, gradedExpected.value)
})

// Precision
const computedPrecision = computed(() => {
  return calculatePrecision(activeRetrievedTitles.value, binaryExpected.value)
})

// Recall
const computedRecall = computed(() => {
  return calculateRecall(activeRetrievedTitles.value, binaryExpected.value)
})

// F1 Score
const computedF1 = computed(() => {
  return calculateF1(activeRetrievedTitles.value, binaryExpected.value)
})

// Size Accuracy
const computedSizeAccuracy = computed(() => {
  return calculateSizeAccuracy(activeRetrievedTitles.value, binaryExpected.value)
})

// Get active rank of a song in the retrieved list
const getActiveRank = (id) => {
  const activeList = activeRetrieved.value
  const idx = activeList.findIndex(s => s.id === id)
  return idx !== -1 ? idx + 1 : '-'
}

// Get dynamic HSL styles for Ground Truth stars to create a green gradient (vibrant to light green)
const getStarStyle = (expected, active) => {
  if (!active || expected === 0) {
    return {
      backgroundColor: 'rgba(15, 23, 42, 0.2)',
      color: '#475569',
      borderColor: 'transparent',
      opacity: '0.4'
    }
  }
  const N = songs.value.filter(s => s.active).length
  const range = 30
  const steps = N > 1 ? N - 1 : 1
  const lightness = 45 + ((N - expected) * (range / steps))
  return {
    backgroundColor: `hsla(142, 70%, ${lightness}%, 0.08)`,
    color: `hsl(142, 70%, ${lightness}%)`,
    borderColor: `hsla(142, 70%, ${lightness}%, 0.3)`
  }
}

// Watch songs array to auto-update relevance grades based on active order (scales from N down to 1)
const updateExpectedGrades = () => {
  const activeSongs = songs.value.filter(s => s.active)
  const N = activeSongs.length

  songs.value.forEach(song => {
    if (song.active) {
      const activeIndex = activeSongs.findIndex(s => s.id === song.id)
      song.expected = N - activeIndex
    } else {
      song.expected = 0
    }
  })
}

watch(songs, () => {
  updateExpectedGrades()
}, { deep: true, immediate: true })

// Self-test verification suite running on mount
onMounted(() => {
  runSelfTests()
})
</script>

<template>
  <div
    class="grid grid-cols-12 gap-4 h-full p-2 border border-slate-700/50 rounded-xl bg-slate-900/40 backdrop-blur-md">
    <!-- Configuration Column -->
    <div class="col-span-7 flex flex-col justify-between space-y-4">

      <!-- Ground Truth Grades Configuration -->
      <div class="p-3 rounded-lg border border-slate-800 bg-slate-900/60">
        <div class="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">Configure Ground Truth</div>
        <div class="space-y-1">
          <div v-for="(song, index) in songs" :key="song.id"
            class="flex items-center justify-between text-xs p-1.5 rounded transition h-8"
            :class="song.active ? 'bg-slate-800/60 border border-slate-700/30' : 'bg-slate-950/20 opacity-50 border border-transparent'">
            <div class="flex items-center space-x-2">
              <input type="checkbox" v-model="song.active"
                class="rounded border-slate-700 bg-slate-900 text-teal-600 focus:ring-teal-500/30" />
              <span class="font-medium" :class="song.active ? 'text-slate-100' : 'text-slate-500 line-through'">
                <span class="mr-1 text-sm inline-block w-4 text-center">{{ song.emoji }}</span>
                {{ song.title }}
              </span>
            </div>

            <div class="flex items-center space-x-2">
              <!-- Star rating indicator pill (faded if song is inactive) -->
              <div
                class="px-2 py-0.5 rounded text-[10px] font-bold select-none min-w-[52px] text-center border font-mono transition"
                :style="getStarStyle(song.expected, song.active)">
                {{ song.active && song.expected > 0 ? '★'.repeat(song.expected) : '☆' }}
              </div>

              <!-- Reordering buttons -->
              <div class="flex items-center space-x-1" v-if="song.active">
                <button @click="moveSongUp(index)" :disabled="index === 0"
                  class="p-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 disabled:opacity-30 disabled:hover:bg-slate-800">
                  ▲
                </button>
                <button @click="moveSongDown(index)" :disabled="index === songs.length - 1"
                  class="p-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 disabled:opacity-30 disabled:hover:bg-slate-800">
                  ▼
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Retrieved List & Ordering Configuration -->
      <div class="p-3 rounded-lg border border-slate-800 bg-slate-900/60">
        <div class="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">Configure Retrieved Order</div>
        <div class="space-y-1">
          <div v-for="(item, index) in retrieved" :key="item.id"
            class="flex items-center justify-between text-xs p-1.5 rounded transition h-8"
            :class="item.active ? 'bg-slate-800/60 border border-slate-700/30' : 'bg-slate-950/20 opacity-50 border border-transparent'">
            <div class="flex items-center space-x-2">
              <input type="checkbox" v-model="item.active"
                class="rounded border-slate-700 bg-slate-900 text-teal-600 focus:ring-teal-500/30" />
              <span class="font-medium" :class="item.active ? 'text-slate-100' : 'text-slate-500 line-through'">
                <span class="inline-block w-4 text-slate-400 font-mono">{{ item.active ? getActiveRank(item.id) + '.' :
                  '•' }}</span>
                <span class="mr-1 text-sm inline-block w-4 text-center">{{ getSongEmoji(item.id) }}</span>
                {{ getSongTitle(item.id) }}
              </span>
            </div>

            <div class="flex items-center space-x-1" v-if="item.active">
              <button @click="moveUp(index)" :disabled="index === 0"
                class="p-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 disabled:opacity-30 disabled:hover:bg-slate-800">
                ▲
              </button>
              <button @click="moveDown(index)" :disabled="index === retrieved.length - 1"
                class="p-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 disabled:opacity-30 disabled:hover:bg-slate-800">
                ▼
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Live Metrics Column -->
    <div class="col-span-5 flex flex-col justify-between p-3 rounded-lg border border-slate-800 bg-slate-900/60">
      <div class="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-3">Live Metrics Calculation</div>

      <div class="grid grid-cols-1 gap-2.5 my-auto">
        <!-- MRR -->
        <div class="flex items-center justify-between p-2.5 rounded-lg bg-indigo-950/20 border border-indigo-900/30">
          <div class="flex flex-col">
            <span class="text-xs font-bold text-indigo-300">Reciprocal Rank (RR)</span>
            <span class="text-[10px] text-indigo-400/80">Binary First hit position rank reciprocal</span>
          </div>
          <span class="text-lg font-black text-indigo-400">{{ computedRR.toFixed(2) }}</span>
        </div>

        <!-- NDCG -->
        <div class="flex items-center justify-between p-2.5 rounded-lg bg-emerald-950/20 border border-emerald-900/30">
          <div class="flex flex-col">
            <span class="text-xs font-bold text-emerald-300">NDCG Score</span>
            <span class="text-[10px] text-emerald-400/80">Graded relevance position-discounted</span>
          </div>
          <span class="text-lg font-black text-emerald-400">{{ computedNDCG.toFixed(2) }}</span>
        </div>

        <!-- MAP -->
        <div class="flex items-center justify-between p-2.5 rounded-lg bg-sky-950/20 border border-sky-900/30">
          <div class="flex flex-col">
            <span class="text-xs font-bold text-sky-300">Average Precision (AP)</span>
            <span class="text-[10px] text-sky-400/80">Binary Precision average across hits</span>
          </div>
          <span class="text-lg font-black text-sky-400">{{ computedAP.toFixed(2) }}</span>
        </div>

        <!-- F1 Score -->
        <div class="flex items-center justify-between p-2.5 rounded-lg bg-amber-950/20 border border-amber-900/30">
          <div class="flex flex-col">
            <span class="text-xs font-bold text-amber-300">F1 Score</span>
            <span class="text-[10px] text-amber-400/80">Harmonic mean of P & R</span>
          </div>
          <div class="flex flex-col items-end">
            <span class="text-lg font-black text-amber-400 leading-none">{{ computedF1.toFixed(2) }}</span>
            <span class="text-[9px] text-amber-400/70 mt-1 font-mono">P: {{ computedPrecision.toFixed(2) }} | R: {{
              computedRecall.toFixed(2) }}</span>
          </div>
        </div>

        <!-- Size Accuracy -->
        <div class="flex items-center justify-between p-2.5 rounded-lg bg-pink-950/20 border border-pink-900/30">
          <div class="flex flex-col">
            <span class="text-xs font-bold text-pink-300">Size Accuracy</span>
            <span class="text-[10px] text-pink-400/80">List sizes matching ratio</span>
          </div>
          <span class="text-lg font-black text-pink-400">{{ computedSizeAccuracy.toFixed(2) }}</span>
        </div>
      </div>

      <div class="text-[10px] text-center text-slate-500 mt-2 italic">
        Toggle expected grades and retrieved items to see scores update in real time.
      </div>
    </div>
  </div>
</template>

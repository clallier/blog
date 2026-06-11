<script setup>
defineProps({
  steps: {
    type: Array
  }
})
</script>

<template>
  <div class="grid gap-4 items-start" :style="{ gridTemplateColumns: `repeat(${steps.length}, minmax(0, 1fr))` }">
    <div v-for="(step, index) in steps" :key="index" v-click="index > 0" class="flex flex-col">
      <div class="flex items-center w-full h-8">
        <!-- Number Bubble Badge -->
        <div
          class="w-8 h-8 rounded-full border-2 border-current text-current flex items-center justify-center font-bold text-sm shadow-sm flex-shrink-0">
          {{ index + 1 }}
        </div>
        <!-- Connecting Line -->
        <div v-if="index < steps.length - 1" class="flex-grow h-0.5 ml-3 bg-current">
        </div>
      </div>

      <!-- Card Component -->
      <StepCard :idx="index" :key="index" :title="step.title" :icon="step.icon" :body="step.body"
        :footer="step.footer" />
    </div>
  </div>
</template>

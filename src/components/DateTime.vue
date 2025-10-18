<template>
  <div class="text-sm text-gray-400">{{ today }}</div>
</template>

<script setup lang="ts">
import { ref, onBeforeUnmount } from 'vue'

const today = ref('')

function setToday() {
  today.value = new Date().toLocaleDateString('en-US', {
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
    weekday: 'short',
    month: 'short',
    day: 'numeric',
  })
}

setToday()
const interval = setInterval(setToday, 1000)

onBeforeUnmount(() => {
  clearInterval(interval)
})
</script>

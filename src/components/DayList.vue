<template>
  <div class="flex items-stretch justify-between" v-if="selectedDate">
    <DayItem
      v-for="day in days"
      :key="day.toDateString()"
      :day="day"
      @click="handleClick"
      :selected-date="selectedDate"
    />
  </div>
</template>

<script setup lang="ts">
import { computed, ref, onMounted, onBeforeUnmount, watch } from 'vue'
import DayItem from '@/components/DayItem.vue'
import { useAppStore } from '@/stores/app'
import dayjs from 'dayjs'

const appStore = useAppStore()
const selectedDate = computed<Date | null>(() => appStore.getSelectedDate)
const days = ref<Date[]>([])
const emit = defineEmits(['select-date'])

function setupDays() {
  if (!selectedDate.value) return

  const result: Date[] = []
  const startDate = dayjs(selectedDate.value).startOf('week')
  for (let i = 0; i < 7; i++) {
    const date = new Date(startDate.toDate())
    date.setDate(startDate.toDate().getDate() + i)
    result.push(date)
  }

  days.value = result
}

function handleClick(day: Date) {
  appStore.setSelectedDate(day)
  emit('select-date')
}

watch(
  () => selectedDate.value,
  () => {
    setupDays()
  },
)

let updateTimeout: number | null = null
onMounted(() => {
  setupDays()
  updateTimeout = window.setInterval(
    () => {
      setupDays()
    },
    1000 * 60 * 60 * 24,
  )
})

onBeforeUnmount(() => {
  if (updateTimeout) {
    window.clearInterval(updateTimeout)
  }
})
</script>

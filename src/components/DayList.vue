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
const selectedDate = computed<string | null>(() => appStore.getSelectedDate)
const days = ref<Date[]>([])
const emit = defineEmits(['select-date'])

function setupDays() {
  if (!selectedDate.value) return

  const result: Date[] = []
  let startDate = dayjs(new Date()).subtract(
    dayjs(new Date()).diff(dayjs().startOf('week'), 'day'),
    'day',
  )
  for (let i = 0; i < 7; i++) {
    result.push(dayjs(startDate).toDate())
    startDate = startDate.add(1, 'day')
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

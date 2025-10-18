<template>
  <div>
    <div class="flex items-stretch justify-between" v-if="selectedDate">
      <UButton
        size="sm"
        variant="ghost"
        class="cursor-pointer"
        @click="previousWeek"
        :ui="{ base: 'p-1' }"
      >
        <UIcon name="i-lucide-chevron-left" class="size-5" />
      </UButton>
      <DayItem
        v-for="day in days"
        :key="day.toDateString()"
        :day="day"
        @click="handleClick"
        :selected-date="selectedDate"
      />
      <UButton size="sm" variant="ghost" @click="nextWeek" :ui="{ base: 'p-1' }">
        <UIcon name="i-lucide-chevron-right" class="size-5" />
      </UButton>
    </div>
    <div class="flex justify-end" v-if="!dayjs(selectedDate).isSame(dayjs(), 'day')">
      <UButton size="sm" variant="ghost" @click="handleClick(new Date())">Today</UButton>
    </div>
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

function previousWeek() {
  const startDate = dayjs(selectedDate.value).subtract(1, 'week')
  handleClick(startDate.toDate())
}

function nextWeek() {
  const startDate = dayjs(selectedDate.value).add(1, 'week')
  handleClick(startDate.toDate())
}
</script>

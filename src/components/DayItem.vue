<template>
  <UButton
    class="text-xs cursor-pointer flex flex-col items-center justify-center rounded gap-0 min-w-10 max-w-12 flex-grow"
    :class="[isSelected ? 'text-xs sm:text-sm' : '']"
    :color="isPast ? 'neutral' : 'primary'"
    :variant="isSelected ? 'solid' : isToday ? 'outline' : 'ghost'"
    @click="handleClick"
    :ui="{ base: 'p-1' }"
    size="xs"
  >
    <div>{{ day }}</div>
    <div>{{ dayName }}</div>
  </UButton>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import dayjs from 'dayjs'
import { DATE_FORMAT } from '@/utils/constants'

const props = defineProps<{
  day: Date
  selectedDate: string
}>()
const emit = defineEmits(['click'])

const day = computed(() => {
  return props.day.getDate().toString().padStart(2, '0')
})

const isToday = computed(() => {
  return props.day.toDateString() === new Date().toDateString()
})

const isSelected = computed(() => {
  return dayjs(props.day).format(DATE_FORMAT) === props.selectedDate
})

const dayName = computed(() => {
  return props.day.toLocaleDateString('en-US', { weekday: 'short' })
})

const isPast = computed(() => {
  return dayjs(props.day).isBefore(new Date(), 'day')
})

const handleClick = () => {
  emit('click', props.day)
}
</script>

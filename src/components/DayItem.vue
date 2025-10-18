<template>
  <UButton
    class="text-xs cursor-pointer flex flex-col items-center justify-center rounded gap-0 w-12"
    :class="[isSelected ? 'text-xs sm:text-sm' : '']"
    :color="isPast ? 'neutral' : 'primary'"
    :variant="isSelected ? 'solid' : isToday ? 'outline' : 'ghost'"
    @click="handleClick"
    :ui="{ base: 'p-1' }"
  >
    <div>{{ day }}</div>
    <div>{{ dayName }}</div>
  </UButton>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import dayjs from 'dayjs'

const props = defineProps<{
  day: Date
  selectedDate: Date
}>()
const emit = defineEmits(['click'])

const day = computed(() => {
  return props.day.getDate().toString().padStart(2, '0')
})

const isToday = computed(() => {
  return props.day.toDateString() === new Date().toDateString()
})

const isSelected = computed(() => {
  return props.day.toDateString() === props.selectedDate.toDateString()
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

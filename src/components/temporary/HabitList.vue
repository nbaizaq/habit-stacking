<template>
  <div>
    <div class="flex flex-col gap-2" v-if="habits.length > 0">
      <SharedHabitItem
        v-for="habit in habits"
        :key="habit.id"
        :habit="habit.habit"
        :routine-track-id="routineTrackId"
        :routine-habit-id="habit.id"
        :track="getTrack(habit.habit.id)"
        :active="active"
        @track="onTrack"
      />
    </div>
    <div class="text-center text-sm text-gray-400" v-else>No habits added</div>
  </div>
</template>

<script setup lang="ts">
import SharedHabitItem from '@/components/shared/SharedHabitItem.vue'
import { useAppStore } from '@/stores/app'
import { computed, inject } from 'vue'
import type { Habit } from '@/api/habits'
import type { Track } from '@/api/track'
import type { RoutinesHabitsItem } from '@/api/routines-habits'

const appStore = useAppStore()
const props = defineProps<{
  routineId: number
  routineTrackId?: number
  habits: (RoutinesHabitsItem & { habit: Habit })[]
  tracks: Track[]
}>()

const active = inject(
  'active',
  computed(() => false),
)

const selectedDate = computed(() => appStore.getSelectedDate)

const emit = defineEmits<{
  (
    e: 'track',
    value: {
      id?: number
      routineHabitId: number
      date: string
      status: 'completed' | 'skipped' | null
      routineTrackId?: number
    },
  ): void
}>()

function onTrack(value: {
  id?: number
  routineHabitId: number
  status: 'completed' | 'skipped' | null
  routineTrackId?: number
}) {
  emit('track', {
    ...value,
    date: selectedDate.value.toISOString(),
  })
}

function getTrack(habitId: number) {
  const routineHabit = appStore.getRoutinesHabits.find(
    (e) => e.habitId === habitId && e.routineId === props.routineId,
  )
  return props.tracks.find((e) => e.routineHabitId === routineHabit?.id)
}
</script>

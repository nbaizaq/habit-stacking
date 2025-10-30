<template>
  <div class="pt-2">
    <div class="flex flex-col gap-2" v-if="habits.length > 0">
      <SharedHabitItem
        v-for="habit in habits"
        :key="habit.id"
        :routine-habit-id="habit.id"
        :habit="habit.habit"
        :track="habit.track"
        :loading="loadingHabitId === habit.id"
        :loading-action="loadingAction"
        :routine-habit="habit"
        @track="trackHabit($event, habit.id)"
        active
      />
    </div>
    <div class="text-center text-sm text-gray-400" v-else>No habits added</div>
  </div>
</template>

<script setup lang="ts">
import SharedHabitItem from '@/components/shared/SharedHabitItem.vue'
import { createTrack, type Track } from '@/api/track'
import { useAppStore } from '@/stores/app'
import { computed, ref } from 'vue'
import type { RoutinesHabitsItem } from '@/api/routines-habits'
import type { Habit } from '@/api/habits'

const props = defineProps<{
  routineId: number
  routineTrackId?: string
}>()

const appStore = useAppStore()
const selectedDate = computed(() => appStore.getSelectedDate)
const habits = computed((): (RoutinesHabitsItem & { habit?: Habit; track?: Track })[] =>
  appStore.getRoutinesHabits
    .filter((e) => e.routineId === props.routineId)
    .map((e) => {
      const _routineHabitTrack: RoutinesHabitsItem & { habit?: Habit; track?: Track } = {
        ...e,
        habit: appStore.getHabits.find((h) => h.id === e.habitId) ?? null,
        track: appStore.getTracks.find((t) => t.routineHabitId === e.id) ?? null,
      } as RoutinesHabitsItem & { habit: Habit; track: Track }
      return _routineHabitTrack
    }),
)

const loadingHabitId = ref<number | null>(null)
const loadingAction = ref<('completed' | 'skipped' | null) | null>()
function trackHabit(
  payload: {
    id?: number
    routineHabitId: number
    routineTrackId?: number
    status: 'completed' | 'skipped' | null
  },
  habitId: number,
) {
  loadingHabitId.value = habitId
  loadingAction.value = payload.status

  return createTrack({
    ...payload,
    date: selectedDate.value.toISOString(),
  })
    .then(() => {
      return appStore.fetchTracks()
    })
    .finally(() => {
      loadingHabitId.value = null
      loadingAction.value = null
    })
}
</script>

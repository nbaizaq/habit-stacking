<template>
  <div class="space-y-2">
    <div class="text-lg font-semibold text-primary">
      {{ props.routine.name }}
    </div>
    <HabitList
      v-if="hasStarted"
      :habits="linkedHabits"
      :routine-id="props.routine.id"
      :routine-track-id="activeRoutineTrack?.id"
      :tracks="getTracks()"
      @update="onUpdate"
      @track="onTrack"
    />
    <div v-else>
      <div
        v-for="habit in linkedHabits"
        :key="habit.id"
        class="text-sm flex items-center gap-2 text-gray-500"
      >
        <UIcon name="i-lucide-arrow-right" class="size-4" />
        {{ habit.name }}
      </div>
    </div>
    <template v-if="hasStarted || !activeRoutineTrack">
      <div v-if="!hasStarted">
        <UButton variant="outline" @click="startRoutine" class="w-full justify-center"
          >Start routine</UButton
        >
      </div>
      <div v-else>
        <UButton variant="outline" @click="endRoutine" class="w-full justify-center"
          >End routine</UButton
        >
      </div>
    </template>
  </div>
</template>

<script setup lang="ts">
import HabitList from '@/components/temporary/HabitList.vue'
import { computed, provide } from 'vue'
import { useAppStore } from '@/stores/app'
import { createRoutineTrack, endRoutineTrack, type RoutineTrack } from '@/api/routine-tracks'
import { createTrack } from '@/api/track'
import type { Routine } from '@/api/routine'

const props = defineProps<{
  routine: Routine
  routineTracks: RoutineTrack[]
  activeRoutineTrack?: RoutineTrack
}>()

const appStore = useAppStore()

const emit = defineEmits<{
  (e: 'update' | 'track'): void
}>()

const selectedDate = computed(() => appStore.getSelectedDate)

const linkedHabits = computed(() =>
  appStore.getRoutinesHabits
    .filter((e) => e.routineId === props.routine.id)
    .map((e) => appStore.getHabits.find((h) => h.id === e.habitId))
    .filter((e) => e !== undefined),
)

const localActiveRoutineTrack = computed(() => {
  return props.routineTracks.find((e) => !e.endedAt)
})
const hasStarted = computed(() => {
  if (!localActiveRoutineTrack.value) return false
  return localActiveRoutineTrack.value && !localActiveRoutineTrack.value.endedAt
})
provide('active', hasStarted)

function onUpdate() {
  emit('update')
}

function startRoutine() {
  return createRoutineTrack({
    routineId: props.routine.id,
    date: selectedDate.value,
  }).then(() => {
    emit('update')
  })
}

function endRoutine() {
  if (!localActiveRoutineTrack.value) return

  return endRoutineTrack({
    id: localActiveRoutineTrack.value?.id,
  }).then(() => {
    emit('update')
  })
}

function onTrack(value: {
  id?: number
  routineHabitId: number
  date: string
  status: 'completed' | 'skipped' | null
  routineTrackId?: number
}) {
  return createTrack(value).then(() => {
    emit('track')
  })
}

function getTracks() {
  return appStore.getTracks.filter((e) => e.routineTrackId === localActiveRoutineTrack.value?.id)
}
</script>

<style>
/* we will explain what these classes do next! */
.v-enter-active,
.v-leave-active {
  transition: opacity 0.5s linear;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>

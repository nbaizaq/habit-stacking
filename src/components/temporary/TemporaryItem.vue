<template>
  <div class="space-y-4 bg-gray-100 dark:bg-gray-600/20 p-4 rounded-lg">
    <div class="flex justify-between items-center gap-2">
      <div class="text-lg font-semibold text-primary">
        {{ props.routine.name }}
      </div>
      <span>
        {{ totalTime }}
      </span>
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
        {{ habit.habit.name }}
      </div>
    </div>
    <template v-if="hasStarted || !activeRoutineTrack">
      <div v-if="!hasStarted">
        <UButton
          variant="soft"
          @click="startRoutine"
          class="w-full justify-center"
          :loading="loadingStartRoutine"
          size="xl"
          >Start routine</UButton
        >
      </div>
      <div v-else>
        <UButton
          variant="soft"
          @click="endRoutine"
          class="w-full justify-center"
          :loading="loadingEndRoutine"
          size="xl"
          >End routine</UButton
        >
      </div>
    </template>
  </div>
</template>

<script setup lang="ts">
import HabitList from '@/components/temporary/HabitList.vue'
import { computed, provide, ref } from 'vue'
import { useAppStore } from '@/stores/app'
import { createRoutineTrack, endRoutineTrack, type RoutineTrack } from '@/api/routine-tracks'
import { createTrack } from '@/api/track'
import type { Routine } from '@/api/routine'
import ms, { type StringValue } from 'ms'
import type { RoutinesHabitsItem } from '@/api/routines-habits'
import type { Habit } from '@/api/habits'

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

const linkedHabits = computed(
  () =>
    appStore.getRoutinesHabits
      .filter((e) => e.routineId === props.routine.id)
      .map((e) => {
        const habit = appStore.getHabits.find((h) => h.id === e.habitId)
        return {
          ...e,
          habit,
        }
      })
      .filter((e) => e.habit !== undefined) as (RoutinesHabitsItem & { habit: Habit })[],
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

const toast = useToast()

const loadingStartRoutine = ref(false)
function startRoutine() {
  if (!selectedDate.value) {
    console.error('Selected date is not set')
    toast.add({
      title: 'Error',
      description: 'Selected date is not set',
      color: 'error',
    })
    return
  }

  loadingStartRoutine.value = true
  return createRoutineTrack({
    routineId: props.routine.id,
    date: selectedDate.value,
  })
    .then((routineTrack) => {
      appStore.addRoutineTrack(routineTrack)
    })
    .finally(() => {
      loadingStartRoutine.value = false
    })
}

const loadingEndRoutine = ref(false)
function endRoutine() {
  const routineTrackId = localActiveRoutineTrack.value?.id
  if (!routineTrackId) return

  loadingEndRoutine.value = true
  return endRoutineTrack({
    id: routineTrackId,
  })
    .then(() => {
      appStore.deleteRoutineTrack(routineTrackId)
    })
    .finally(() => {
      loadingEndRoutine.value = false
    })
}

function onTrack(value: {
  id?: number
  routineHabitId: number
  date: string
  status: 'completed' | 'skipped' | null
  routineTrackId?: number
}) {
  return createTrack(value).then((track) => {
    if (track) {
      appStore.addTrack(track)
    } else {
      if (value.id) {
        appStore.deleteTrack(value.id)
      }
    }
  })
}

function getTracks() {
  return appStore.getTracks.filter((e) => e.routineTrackId === localActiveRoutineTrack.value?.id)
}

const totalTime = computed(() => {
  const total = linkedHabits.value.reduce((acc, curr) => acc + ms(curr.period as StringValue), 0)
  return ms(total, { long: true })
})
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

<template>
  <div
    class="pl-2.5 pr-1 py-1.5 rounded-lg flex justify-between gap-2 items-center text-lg bg-gray-100 dark:bg-gray-500/50"
    :class="
      status === 'completed'
        ? 'line-through'
        : status === 'skipped'
          ? 'text-gray-500 dark:text-gray-400/50'
          : ''
    "
  >
    <span>
      {{ habit?.name ?? 'Unknown habit' }}
      <UBadge v-if="routineHabit && routineHabit.period" variant="soft" color="neutral" size="sm">
        {{ ms(ms(routineHabit?.period as StringValue), { long: true }) }}
      </UBadge>
    </span>

    <div class="flex gap-2" v-if="active">
      <template v-if="!status">
        <UButton
          @click="trackHabit('completed')"
          class="cursor-pointer"
          variant="soft"
          color="neutral"
          icon="i-lucide-check-circle"
          :loading="loading && loadingAction === 'completed'"
        />
        <UButton
          @click="trackHabit('skipped')"
          class="cursor-pointer"
          variant="soft"
          color="neutral"
          icon="i-lucide-arrow-right"
          :loading="loading && loadingAction === 'skipped'"
        />
      </template>
      <template v-else>
        <UButton
          @click="trackHabit(null)"
          class="cursor-pointer"
          variant="soft"
          color="neutral"
          icon="i-lucide-rotate-ccw"
          :loading="loading && loadingAction === null"
        />
      </template>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { Habit } from '@/api/habits'
import type { Track } from '@/api/track'
import type { RoutinesHabitsItem } from '@/api/routines-habits'
import ms, { type StringValue } from 'ms'

const props = defineProps<{
  routineHabitId: number
  habit?: Habit
  track?: Track
  routineTrackId?: number
  active?: boolean
  loading?: boolean
  loadingAction?: 'completed' | 'skipped' | null
  routineHabit?: RoutinesHabitsItem
}>()
const emit = defineEmits<{
  (
    e: 'track',
    value: {
      id?: number
      routineTrackId?: number
      routineHabitId: number
      status: 'completed' | 'skipped' | null
    },
  ): void
}>()

const status = computed(() => props.track?.status ?? null)

function trackHabit(status: 'completed' | 'skipped' | null) {
  const payload: {
    id?: number
    routineHabitId: number
    status: 'completed' | 'skipped' | null
    routineTrackId?: number
  } = {
    routineHabitId: props.routineHabitId,
    status,
  }
  if (props.routineTrackId) {
    payload.routineTrackId = props.routineTrackId
  }
  if (props.track) {
    payload.id = props.track.id
  }
  emit('track', payload)
}
</script>

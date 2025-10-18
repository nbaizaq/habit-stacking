<template>
  <div
    class="pl-2 pr-1 py-1 rounded-lg border-1 border-gray-700 flex justify-between gap-2 items-center"
    :class="status === 'completed' ? 'line-through' : status === 'skipped' ? 'text-gray-500' : ''"
  >
    {{ habit?.name ?? 'Unknown habit' }}
    <div class="flex gap-1" v-if="active">
      <template v-if="!status">
        <UButton
          @click="trackHabit('completed')"
          class="cursor-pointer"
          variant="soft"
          color="neutral"
          icon="i-lucide-check-circle"
        />
        <UButton
          @click="trackHabit('skipped')"
          class="cursor-pointer"
          variant="soft"
          color="neutral"
          icon="i-lucide-arrow-right"
        />
      </template>
      <template v-else>
        <UButton
          @click="trackHabit(null)"
          class="cursor-pointer"
          variant="soft"
          color="neutral"
          icon="i-lucide-rotate-ccw"
        />
      </template>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { Habit } from '@/api/habits'
import type { Track } from '@/api/track'

const props = defineProps<{
  routineHabitId: number
  habit?: Habit
  track?: Track
  routineTrackId?: number
  active?: boolean
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

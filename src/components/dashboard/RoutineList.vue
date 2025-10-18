<template>
  <div class="flex flex-col gap-4 h-100% overflow-y-auto pb-2">
    <RoutineItem v-for="routine in defaultRoutines" :key="routine.id" :routine="routine" />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import RoutineItem from '@/components/dashboard/RoutineItem.vue'
import type { Routine } from '@/api/routine'
import type { RoutinesHabitsItem } from '@/api/routines-habits'
import type { Habit } from '@/api/habits'
import type { Track } from '@/api/track'

const props = defineProps<{
  routines: Routine[]
  routinesHabits: RoutinesHabitsItem[]
  habits: Habit[]
  tracks: Track[]
}>()

const defaultRoutines = computed(() => props.routines.filter((e) => !e.temporary))
</script>

<style scoped>
.routine-list::-webkit-scrollbar {
  display: none;
}
</style>

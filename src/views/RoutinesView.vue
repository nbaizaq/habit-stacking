<template>
  <div class="space-y-8 overflow-y-auto h-full pb-4">
    <TemporaryItem
      v-if="activeRoutineTrack && activeRoutine"
      :routine="activeRoutine"
      :routine-tracks="getRoutineTracks(activeRoutine.id)"
      :active-routine-track="activeRoutineTrack"
      @update="appStore.fetch()"
      @track="appStore.fetchTracks()"
    />
    <USeparator v-if="activeRoutineTrack && activeRoutine" />
    <TemporaryItem
      v-for="routine in notActiveRoutines"
      :key="routine.id"
      :routine="routine"
      :routine-tracks="getRoutineTracks(routine.id)"
      :active-routine-track="activeRoutineTrack"
      @update="appStore.fetch()"
      @track="appStore.fetchTracks()"
    />
  </div>
</template>

<script setup lang="ts">
import TemporaryItem from '@/components/temporary/TemporaryItem.vue'
import { useAppStore } from '@/stores/app'
import { computed } from 'vue'

const appStore = useAppStore()

const routines = computed(() => appStore.getTemporaryRoutines)
const routineTracks = computed(() => appStore.getRoutineTracks)

const notActiveRoutines = computed(() => {
  return routines.value.filter((e) => e.id !== activeRoutine.value?.id)
})
const activeRoutineTrack = computed(() => {
  return routineTracks.value.find((e) => !e.endedAt)
})
const activeRoutine = computed(() => {
  return routines.value.find((e) => e.id === activeRoutineTrack.value?.routineId)
})

function getRoutineTracks(routineId: number) {
  return routineTracks.value.filter((e) => e.routineId === routineId)
}

appStore.fetch()
appStore.fetchRoutineTracks()
</script>

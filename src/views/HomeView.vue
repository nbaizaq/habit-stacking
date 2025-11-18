<template>
  <div class="h-full flex flex-col gap-4">
    <DayList
      v-if="selectedDate"
      @select-date="onSelectDate"
      class="sticky top-4 backdrop-blur-xl rounded-lg"
    />
    <template v-if="loading">
      <div class="flex justify-center items-center py-4">
        <UIcon name="i-lucide-loader-circle" class="size-6 animate-spin text-gray-500" />
      </div>
    </template>
    <template v-else>
      <RoutineList
        v-if="selectedDate"
        :routines="routines"
        :routines-habits="routinesHabits"
        :habits="habits"
        :tracks="tracks"
      />
    </template>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import DayList from '@/components/DayList.vue'
import RoutineList from '@/components/dashboard/RoutineList.vue'
import { useAppStore } from '@/stores/app'

const appStore = useAppStore()

const selectedDate = computed(() => appStore.getSelectedDate)
const routines = computed(() => appStore.getDefaultRoutines)
const habits = computed(() => appStore.getHabits)
const routinesHabits = computed(() => appStore.getRoutinesHabits)
const tracks = computed(() => appStore.getTracks)

const loading = ref(false)

function onSelectDate() {
  if (appStore.getTracks.length === 0) {
    loading.value = true
  }
  appStore.fetchTracks().finally(() => {
    loading.value = false
  })
}

if (appStore.getSelectedDate === null) {
  loading.value = true
}
const now = new Date()
if (now.getHours() < 5) {
  now.setDate(now.getDate() - 1)
}
appStore.setSelectedDate(now)
appStore.fetch().finally(() => {
  loading.value = false
})
</script>

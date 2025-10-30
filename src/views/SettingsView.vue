<template>
  <div class="pb-4">
    <UTabs
      v-model="tab"
      :items="tabs"
      class="h-[calc(100%-32px)]"
      :ui="{ list: 'sticky top-4 mb-4' }"
      @update:model-value="onUpdateTab"
    >
      <template #routines>
        <template v-if="loading">
          <div class="flex justify-center items-center py-4">
            <UIcon name="i-lucide-loader-circle" class="size-6 animate-spin text-gray-500" />
          </div>
        </template>
        <template v-else>
          <RoutineList />
        </template>
      </template>
      <template #habits>
        <template v-if="loading">
          <div class="flex justify-center items-center py-4">
            <UIcon name="i-lucide-loader-circle" class="size-6 animate-spin text-gray-500" />
          </div>
        </template>
        <template v-else>
          <HabitList />
        </template>
      </template>
    </UTabs>
  </div>
</template>

<script setup lang="ts">
import RoutineList from '@/components/routines/RoutineSettings.vue'
import HabitList from '@/components/habits/HabitSettings.vue'
import { useAppStore } from '@/stores/app'
import { ref } from 'vue'

const tab = ref('routines')
const tabs = [
  {
    value: 'routines',
    label: 'Routines',
    slot: 'routines',
  },
  {
    value: 'habits',
    label: 'Habits',
    slot: 'habits',
  },
]

const appStore = useAppStore()
const loading = ref(false)
function fetchRoutines() {
  loading.value = true
  Promise.all([appStore.fetchRoutines(), appStore.fetchRoutinesHabits()]).finally(() => {
    loading.value = false
  })
}

function fetchHabits() {
  loading.value = true
  appStore.fetchHabits().finally(() => {
    loading.value = false
  })
}

fetchRoutines()

function onUpdateTab(tab: string | number) {
  if (tab === 'routines') {
    fetchRoutines()
  } else {
    fetchHabits()
  }
}
</script>

<template>
  <div class="pb-4">
    <UTabs :items="tabs" class="h-[calc(100%-32px)]" :ui="{ list: 'sticky top-4 mb-4' }">
      <template #routines>
        <RoutineList />
      </template>
      <template #habits>
        <HabitList />
      </template>
    </UTabs>
  </div>
</template>

<script setup lang="ts">
import RoutineList from '@/components/routines/RoutineSettings.vue'
import HabitList from '@/components/habits/HabitSettings.vue'
import { useAppStore } from '@/stores/app'

const tabs = [
  {
    label: 'Routines',
    slot: 'routines',
  },
  {
    label: 'Habits',
    slot: 'habits',
  },
]

const appStore = useAppStore()
appStore.fetch()
</script>

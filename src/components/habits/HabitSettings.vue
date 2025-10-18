<template>
  <div class="space-y-4">
    <div class="space-y-4">
      <div class="flex justify-end mt-4">
        <UButton variant="outline" icon="i-lucide-plus" @click="openHabitForm(null)"
          >Add habit</UButton
        >
      </div>
      <div class="space-y-4">
        <HabitItem
          v-for="habit in habits"
          :key="habit.id"
          :habit="habit"
          @edit="openHabitForm(habit)"
          @delete="onDelete(habit.id)"
        />
      </div>
    </div>
    <UModal
      :title="habitForm ? 'Edit habit' : 'Add habit'"
      :description="habitForm ? 'Edit the habit' : 'Add a new habit'"
      v-model:open="habitDialog"
    >
      <template #body>
        <HabitForm v-model="habitDialog" :habit="habitForm" @update="onUpdated" />
      </template>
    </UModal>
  </div>
</template>

<script setup lang="ts">
import HabitItem from '@/components/habits/HabitItem.vue'
import HabitForm from '@/components/habits/HabitForm.vue'
import { computed, ref } from 'vue'
import { useAppStore } from '@/stores/app'
import { deleteHabit, type Habit } from '@/api/habits'

const appStore = useAppStore()
const habits = computed(() => appStore.getHabits)

const habitDialog = ref(false)
const habitForm = ref<Habit | null>(null)
function openHabitForm(habit: Habit | null) {
  habitDialog.value = true
  habitForm.value = habit
}

function onUpdated() {
  habitDialog.value = false
  setTimeout(() => {
    habitForm.value = null
  }, 150)
  appStore.fetchHabits()
}

function onDelete(habitId: number) {
  deleteHabit(habitId).then(() => {
    appStore.fetchHabits()
  })
}
</script>

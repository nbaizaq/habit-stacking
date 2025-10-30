<template>
  <div class="space-y-4">
    <div class="space-y-4">
      <div class="flex justify-end mt-4">
        <UButton size="lg" variant="outline" icon="i-lucide-plus" @click="openHabitForm(null)"
          >Add habit</UButton
        >
      </div>
      <div class="space-y-4">
        <HabitItem
          v-for="habit in habits"
          :key="habit.id"
          :habit="habit"
          @edit="openHabitForm(habit)"
        />
      </div>
    </div>
    <UModal
      :title="habitForm ? 'Edit habit' : 'Add habit'"
      :description="habitForm ? 'Edit the habit' : 'Add a new habit'"
      v-model:open="habitDialog"
    >
      <template #body>
        <HabitForm v-model="habitDialog" :habit="habitForm" @close="onClose" />
      </template>
    </UModal>
  </div>
</template>

<script setup lang="ts">
import HabitItem from '@/components/habits/HabitItem.vue'
import HabitForm from '@/components/habits/HabitForm.vue'
import { computed, ref } from 'vue'
import { useAppStore } from '@/stores/app'
import { type Habit } from '@/api/habits'

const appStore = useAppStore()
const habits = computed(() => appStore.getHabits)

const habitDialog = ref(false)
const habitForm = ref<Habit | null>(null)
function openHabitForm(habit: Habit | null) {
  habitDialog.value = true
  habitForm.value = habit
}

function onClose() {
  habitDialog.value = false
  setTimeout(() => {
    habitForm.value = null
  }, 150)
}
</script>

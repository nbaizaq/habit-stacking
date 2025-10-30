<template>
  <UCard variant="subtle" :ui="{ header: 'p-2 pl-4 sm:p-2 sm:pl-4' }">
    <template #header>
      <div class="flex justify-between items-center">
        <div class="flex gap-2 items-center">
          <div class="text-xl font-bold">{{ habit.name }}</div>
        </div>
        <div class="flex gap-2 items-center">
          <UButton variant="ghost" icon="i-lucide-edit" @click="editHabit"></UButton>
          <UButton
            variant="ghost"
            icon="i-lucide-trash"
            color="error"
            :loading="deleteLoading"
            @click="onDeleteHabit"
          ></UButton>
        </div>
      </div>
    </template>
  </UCard>
</template>

<script setup lang="ts">
import { deleteHabit, type Habit } from '@/api/habits'
import { useAppStore } from '@/stores/app'
import { ref } from 'vue'

const props = defineProps<{
  habit: Habit
  readonly?: boolean
}>()

const appStore = useAppStore()

const emit = defineEmits<{
  (e: 'edit' | 'delete'): void
}>()

function editHabit() {
  emit('edit')
}

const deleteLoading = ref(false)

function onDeleteHabit() {
  deleteLoading.value = true
  deleteHabit(props.habit.id)
    .then(() => {
      appStore.deleteHabit(props.habit.id)
    })
    .finally(() => {
      deleteLoading.value = false
    })
}
</script>

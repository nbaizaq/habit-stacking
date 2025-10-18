<template>
  <UCard variant="subtle" :ui="{ header: 'p-2 pl-4 sm:p-2 sm:pl-4' }">
    <template #header>
      <div class="flex justify-between items-center">
        <div class="flex gap-2 items-center">
          <div class="text-lg font-bold">{{ habit.name }}</div>
        </div>
        <div class="flex gap-2 items-center">
          <UButton variant="ghost" size="xs" icon="i-lucide-edit" @click="editHabit"></UButton>
          <UButton
            variant="ghost"
            size="xs"
            icon="i-lucide-trash"
            color="error"
            @click="deleteHabit"
          ></UButton>
        </div>
      </div>
    </template>
  </UCard>
</template>

<script setup lang="ts">
import type { Habit } from '@/api/habits'

defineProps<{
  habit: Habit
  readonly?: boolean
}>()

const emit = defineEmits<{
  (e: 'edit' | 'delete'): void
}>()

function editHabit() {
  emit('edit')
}

function deleteHabit() {
  emit('delete')
}
</script>

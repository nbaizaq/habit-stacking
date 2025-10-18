<template>
  <UCard variant="subtle" :ui="{ body: 'p-2 sm:p-4' }">
    <div class="flex justify-between items-center">
      <div class="flex gap-2 items-center">
        <div class="text-lg font-bold">{{ routine.name }}</div>
        <UBadge v-if="routine.temporary" variant="subtle" size="xs">Temporary</UBadge>
      </div>
      <div class="flex gap-2 items-center">
        <UButton
          v-if="linkedHabits && linkedHabits.length > 0"
          variant="ghost"
          size="xs"
          @click="hidden = !hidden"
          :icon="hidden ? 'i-lucide-chevron-down' : 'i-lucide-chevron-up'"
        ></UButton>
        <UButton variant="ghost" size="xs" @click="addHabit" icon="i-lucide-plus"></UButton>
        <UButton
          v-if="!readonly"
          variant="ghost"
          size="xs"
          @click="editRoutine"
          icon="i-lucide-edit"
        ></UButton>
        <UButton
          v-if="!readonly"
          variant="ghost"
          size="xs"
          color="error"
          @click="deleteRoutine"
          icon="i-lucide-trash"
        ></UButton>
      </div>
    </div>
    <div class="space-y-2" v-if="readonly">
      <div class="flex gap-2 items-center">
        <div class="text-sm text-gray-400">{{ routine.startTime }} - {{ routine.endTime }}</div>
      </div>
    </div>
    <template v-if="linkedHabits && linkedHabits.length > 0 && !hidden">
      <USeparator class="my-2" />
      <div class="space-y-2">
        <LinkedHabit
          v-for="linkedHabit in linkedHabits"
          :key="linkedHabit.id"
          :linked-habit="linkedHabit"
          @unlink="onUpdate"
        />
      </div>
    </template>
  </UCard>
</template>

<script setup lang="ts">
import LinkedHabit from '@/components/habits/LinkedHabit.vue'
import { ref } from 'vue'
import type { Routine } from '@/api/routine'
import type { RoutinesHabitsItem } from '@/api/routines-habits'
import type { Habit } from '@/api/habits'

defineProps<{
  readonly?: boolean
  routine: Routine
  linkedHabits?: (RoutinesHabitsItem & { habit: Habit })[]
}>()

const hidden = ref(true)

const emit = defineEmits<{
  (e: 'edit' | 'delete' | 'habit:add' | 'update'): void
}>()

function editRoutine() {
  emit('edit')
}

function deleteRoutine() {
  emit('delete')
}

function addHabit() {
  emit('habit:add')
}

function onUpdate() {
  emit('update')
}
</script>

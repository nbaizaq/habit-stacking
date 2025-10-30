<template>
  <UCard class="space-y-2" :ui="{ body: 'p-2 sm:pl-4 sm:pr-2 sm:py-2' }">
    <div class="flex justify-between items-center">
      <div v-if="linkedHabit.habit" class="font-bold">
        {{ linkedHabit.habit.name }}
      </div>
      <UButton
        variant="ghost"
        size="sm"
        icon="i-lucide-trash"
        color="error"
        :loading="unlinkLoading"
        :disabled="unlinkLoading"
        @click="unlinkHabit"
      ></UButton>
    </div>
    <USeparator class="my-1" />
    <div class="space-y-2">
      <div class="space-y-1">
        <div class="text-sm">
          Frequency:
          {{ linkedHabit.frequency }}
          <div class="inline-flex gap-2 items-center">
            <template v-if="frequencyValue && Array.isArray(frequencyValue)">
              <UBadge v-for="value in frequencyValue" :key="value" variant="soft" size="xs">{{
                value
              }}</UBadge>
            </template>
          </div>
        </div>
        <div class="text-sm">
          Period: {{ ms(ms(linkedHabit.period as StringValue), { long: true }) }}
        </div>
      </div>
    </div>
  </UCard>
</template>

<script setup lang="ts">
import type { Habit } from '@/api/habits'
import { deleteRoutineHabit } from '@/api/routines-habits'
import type { RoutinesHabitsItem } from '@/api/routines-habits'
import { useAppStore } from '@/stores/app'
import { computed, ref } from 'vue'
import ms, { type StringValue } from 'ms'

const props = defineProps<{
  linkedHabit: RoutinesHabitsItem & { habit: Habit }
}>()
const appStore = useAppStore()
const unlinkLoading = ref(false)

const frequencyValue = computed(() => {
  try {
    return JSON.parse(props.linkedHabit.frequencyValue)
  } catch {
    return null
  }
})

function unlinkHabit() {
  unlinkLoading.value = true
  deleteRoutineHabit(props.linkedHabit.id)
    .then(() => {
      appStore.deleteRoutineHabit(props.linkedHabit.id)
    })
    .finally(() => {
      unlinkLoading.value = false
    })
}
</script>

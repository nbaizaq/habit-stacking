<template>
  <div class="space-y-8">
    <div class="space-y-4">
      <div>
        <div class="text-xl">Default routines</div>
        <USeparator class="my-4" />
        <div class="space-y-4">
          <RoutineItem
            v-for="routine in defaultRoutines"
            :key="routine.id"
            :routine="routine"
            :linked-habits="getLinkedHabits(routine.id)"
            readonly
            @habit:add="openRoutineHabitLink(routine)"
            @update="appStore.fetch()"
          />
        </div>
      </div>
    </div>
    <div class="space-y-4">
      <div class="flex justify-between items-center gap-2">
        <div class="text-xl">Temporary routines</div>
        <UButton variant="outline" icon="i-lucide-plus" @click="openRoutineForm(null)"
          >Add routine</UButton
        >
      </div>
      <USeparator />
      <div class="space-y-4">
        <RoutineItem
          v-for="routine in temporaryRoutines"
          :key="routine.id"
          :routine="routine"
          :linked-habits="getLinkedHabits(routine.id)"
          @habit:add="openRoutineHabitLink(routine)"
          @edit="openRoutineForm(routine)"
          @delete="onDeleteRoutine(routine.id)"
          @update="appStore.fetch()"
        />
      </div>
    </div>
    <UModal
      :title="routineForm ? 'Edit routine' : 'Add routine'"
      :description="routineForm ? 'Edit the routine' : 'Add a new routine'"
      v-model:open="routineDialog"
    >
      <template #body>
        <RoutineForm v-model="routineDialog" :routine="routineForm" @close="onClose" />
      </template>
    </UModal>
    <UModal
      title="Add a habit to routine"
      description="Add a new habit to the routine"
      v-model:open="routineHabitLinkDialog"
    >
      <template #body>
        <RoutineHabitLink
          v-if="routineHabitLinkForm"
          v-model="routineHabitLinkDialog"
          :routine="routineHabitLinkForm"
          @close="onCloseRoutineHabitLink"
        />
      </template>
    </UModal>
  </div>
</template>

<script setup lang="ts">
import RoutineItem from '@/components/routines/RoutineItem.vue'
import RoutineForm from '@/components/routines/RoutineForm.vue'
import { computed, ref } from 'vue'
import { deleteRoutine } from '@/api/routine'
import RoutineHabitLink from '@/components/routines/RoutineHabitLink.vue'
import { useAppStore } from '@/stores/app'
import type { Routine } from '@/api/routine'
import type { RoutinesHabitsItem } from '@/api/routines-habits'
import type { Habit } from '@/api/habits'

const appStore = useAppStore()

const routines = computed(() => appStore.getRoutines)
const routinesHabits = computed(() => appStore.getRoutinesHabits)
const habits = computed(() => appStore.getHabits)

const defaultRoutines = computed(() => routines.value.filter((e) => !Boolean(e.temporary)))
const temporaryRoutines = computed(() => routines.value.filter((e) => Boolean(e.temporary)))

const routineDialog = ref(false)
const routineForm = ref<Routine | null>(null)

function openRoutineForm(routine: Routine | null) {
  routineDialog.value = true
  routineForm.value = routine
}

function onClose() {
  routineDialog.value = false
  setTimeout(() => {
    routineForm.value = null
  }, 150)
}

function onDeleteRoutine(routineId: number) {
  deleteRoutine(routineId).then(() => {
    appStore.fetchRoutines()
  })
}

const routineHabitLinkDialog = ref(false)
const routineHabitLinkForm = ref<Routine | null>(null)
function openRoutineHabitLink(routine: Routine) {
  routineHabitLinkDialog.value = true
  routineHabitLinkForm.value = routine
}

function onCloseRoutineHabitLink() {
  routineHabitLinkDialog.value = false
  setTimeout(() => {
    routineHabitLinkForm.value = null
  }, 150)
}

function getLinkedHabits(routineId: number): (RoutinesHabitsItem & { habit: Habit })[] {
  const _routinesHabits = routinesHabits.value
    .filter((e) => e.routineId === routineId)
    .map((e) => {
      const _habit = habits.value.find((h) => h.id === e.habitId)
      const _routineHabit = {
        ...e,
        habit: _habit,
      }
      return _routineHabit as RoutinesHabitsItem & { habit: Habit }
    })
  return _routinesHabits
}
</script>

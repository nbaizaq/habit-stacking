<template>
  <div>
    <UButton
      @click="toggleHidden"
      class="w-full justify-between cursor-pointer"
      variant="soft"
      size="xl"
    >
      {{ props.routine.name }}
      <UIcon
        name="i-lucide-chevron-down"
        class="size-5"
        :class="hidden ? 'rotate-180 transition duration-200' : 'rotate-0 transition duration-200'"
      />
    </UButton>
    <Transition>
      <HabitList v-if="!hidden" :habits="linkedHabits" :routine-id="props.routine.id" />
    </Transition>
  </div>
</template>

<script setup lang="ts">
import HabitList from '@/components/dashboard/HabitList.vue'
import type { Routine } from '@/api/routine'
import { computed, ref } from 'vue'
import dayjs from 'dayjs'
import { useAppStore } from '@/stores/app'

const props = defineProps<{
  routine: Routine
}>()

const appStore = useAppStore()

const hidden = ref(true)
if (!props.routine.temporary) {
  const now = new Date()
  const startDateTime = dayjs(
    dayjs().format('YYYY-MM-DD') + ' ' + props.routine.startTime,
    'YYYY-MM-DD HH:mm:ss',
  ).toDate()
  const endDateTime = dayjs(
    dayjs().format('YYYY-MM-DD') + ' ' + props.routine.endTime,
    'YYYY-MM-DD HH:mm:ss',
  ).toDate()
  hidden.value = now < startDateTime || now > endDateTime
}

const linkedHabits = computed(() =>
  appStore.getRoutinesHabits.filter((e) => e.routineId === props.routine.id),
)

function toggleHidden() {
  hidden.value = !hidden.value
}
</script>

<style>
/* we will explain what these classes do next! */
.v-enter-active,
.v-leave-active {
  transition: opacity 0.5s linear;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>

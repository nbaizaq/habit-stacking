<template>
  <UForm class="space-y-4" :state="form" :schema="schema" @submit="onSubmit">
    <div class="text-lg font-bold">Link a habit to {{ routine?.name }}</div>
    <UFormField label="Habit" name="habitId">
      <USelect
        v-model="form.habitId"
        :items="habits"
        :label-key="'name'"
        :value-key="'id'"
        class="w-full"
        size="lg"
      />
    </UFormField>
    <template v-if="routine && !routine.temporary">
      <UFormField label="Frequency" name="frequency">
        <URadioGroup
          v-model="form.frequency"
          :items="frequencies"
          :label-key="'label'"
          :value-key="'id'"
          class="w-full"
          size="lg"
        />
      </UFormField>
      <UFormField v-if="form.frequency === 'weekly'" label="Frequency value" name="frequencyValue">
        <USelect
          v-model="form.frequencyValue"
          :items="daysOfWeek"
          :label-key="'label'"
          :value-key="'id'"
          class="w-full"
          size="lg"
          multiple
        />
      </UFormField>
    </template>
    <UFormField label="Period" name="period">
      <UInput v-model="form.period" class="w-full" size="lg" />
    </UFormField>
    <div class="flex justify-end gap-2 items-center">
      <UButton size="lg" variant="ghost" @click="emit('update:modelValue', false)">
        Cancel
      </UButton>
      <UButton size="lg" type="submit" :disabled="loading"> Save </UButton>
    </div>
  </UForm>
</template>

<script setup lang="ts">
import { computed, reactive, ref, watch } from 'vue'
import * as v from 'valibot'
import type { FormSubmitEvent } from '@nuxt/ui'
import { createRoutineHabit, type RoutinesHabitsItem } from '@/api/routines-habits'
import type { Routine } from '@/api/routine'
import { useAppStore } from '@/stores/app'

const appStore = useAppStore()

const props = defineProps<{
  modelValue?: boolean
  routine: Routine
}>()

const habits = computed(() => appStore.getHabits)

const emit = defineEmits<{
  (e: 'close'): void
  (e: 'update:modelValue', value: boolean): void
}>()

const form = reactive({
  routineId: props.routine.id,
  habitId: undefined,
  frequency: undefined,
  frequencyValue: [],
  period: '',
})

const schema = v.object({
  routineId: v.pipe(v.number('Routine ID is required')),
  habitId: v.pipe(v.number('Habit ID is required')),
  frequency: props.routine?.temporary
    ? v.optional(v.string())
    : v.pipe(v.string(), v.minLength(1, 'Frequency is required')),
  frequencyValue: props.routine?.temporary
    ? v.optional(v.array(v.string()))
    : v.pipe(v.array(v.string())),
  period: v.pipe(v.string(), v.minLength(1, 'Period is required')),
})

type Schema = v.InferOutput<typeof schema>

const frequencies = [
  {
    label: 'Daily',
    id: 'daily',
  },
  {
    label: 'Weekly',
    id: 'weekly',
  },
]

const daysOfWeek = [
  {
    label: 'Monday',
    id: 'monday',
  },
  {
    label: 'Tuesday',
    id: 'tuesday',
  },
  {
    label: 'Wednesday',
    id: 'wednesday',
  },
  {
    label: 'Thursday',
    id: 'thursday',
  },
  {
    label: 'Friday',
    id: 'friday',
  },
  {
    label: 'Saturday',
    id: 'saturday',
  },
  {
    label: 'Sunday',
    id: 'sunday',
  },
]

watch(
  () => form.frequency,
  (newVal: Schema['frequency']) => {
    if (newVal === 'daily') {
      form.frequencyValue = []
    }
  },
)

const loading = ref(false)
function onSubmit(event: FormSubmitEvent<Schema>) {
  loading.value = true

  createRoutineHabit({
    ...(event.data as unknown as RoutinesHabitsItem),
    frequencyValue: JSON.stringify(event.data.frequencyValue),
  })
    .then((routineHabit) => {
      appStore.addRoutineHabit(routineHabit)
      emit('close')
    })
    .finally(() => {
      loading.value = false
    })
}

appStore.fetchHabits()
</script>

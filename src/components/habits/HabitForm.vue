<template>
  <UForm class="space-y-4" :state="form" :schema="schema" @submit="onSubmit">
    <UFormField label="Name" name="name">
      <UInput v-model="form.name" class="w-full" />
    </UFormField>
    <div class="flex justify-end gap-2 items-center">
      <UButton variant="ghost" @click="emit('update:modelValue', false)"> Cancel </UButton>
      <UButton type="submit"> Save </UButton>
    </div>
  </UForm>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import * as v from 'valibot'
import type { FormSubmitEvent } from '@nuxt/ui'
import { createHabit, updateHabit } from '@/api/habits'
import type { Habit } from '@/api/habits'

const props = defineProps<{
  habit: Habit | null
}>()

const emit = defineEmits<{
  (e: 'update'): void
  (e: 'update:modelValue', value: boolean): void
}>()

const schema = v.object({
  name: v.pipe(v.string(), v.minLength(1, 'Name is required')),
})

const form = reactive({
  name: props.habit?.name ?? '',
})

type Schema = v.InferOutput<typeof schema>

const loading = ref(false)
function onSubmit(event: FormSubmitEvent<Schema>) {
  loading.value = true
  if (props.habit?.id) {
    updateHabit({ ...props.habit, ...(event.data as unknown as Habit) })
      .then(() => {
        emit('update')
      })
      .finally(() => {
        loading.value = false
      })
  } else {
    createHabit({ ...(event.data as unknown as Habit) })
      .then(() => {
        emit('update')
      })
      .finally(() => {
        loading.value = false
      })
  }
}
</script>

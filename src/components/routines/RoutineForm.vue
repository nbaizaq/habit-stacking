<template>
  <UForm class="space-y-4" :state="form" :schema="schema" @submit="onSubmit">
    <UFormField label="Name" name="name">
      <UInput v-model="form.name" class="w-full" />
    </UFormField>
    <div class="flex justify-end gap-2 items-center">
      <UButton variant="ghost" @click="emit('update:modelValue', false)"> Cancel </UButton>
      <UButton type="submit" :loading="loading"> Save </UButton>
    </div>
  </UForm>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import * as v from 'valibot'
import type { FormSubmitEvent } from '@nuxt/ui'
import { createRoutine, updateRoutine, type Routine } from '@/api/routine'
import { useAppStore } from '@/stores/app'

const props = defineProps<{
  modelValue?: boolean
  routine: Routine | null
}>()

const appStore = useAppStore()

const emit = defineEmits<{
  (e: 'close'): void
  (e: 'update:modelValue', value: boolean): void
}>()

const form = reactive({
  name: props.routine?.name ?? '',
})

const schema = v.object({
  name: v.pipe(v.string(), v.minLength(1, 'Name is required')),
})

type Schema = v.InferOutput<typeof schema>

const loading = ref(false)
function onSubmit(event: FormSubmitEvent<Schema>) {
  loading.value = true
  if (props.routine?.id) {
    updateRoutine({ ...props.routine, ...event.data, id: props.routine?.id } as Routine)
      .then((routine) => {
        appStore.updateRoutine(routine)
        emit('close')
      })
      .finally(() => {
        loading.value = false
      })
  } else {
    createRoutine({ ...(props.routine ?? {}), ...event.data } as Routine)
      .then((routine) => {
        appStore.addRoutine(routine)
        emit('close')
      })
      .finally(() => {
        loading.value = false
      })
  }
}
</script>

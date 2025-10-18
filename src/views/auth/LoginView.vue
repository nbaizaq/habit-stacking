<template>
  <div class="space-y-4 w-full px-4 sm:w-1/2 max-w-96">
    <div class="text-2xl font-bold text-center">Login</div>
    <div class="w-full">
      <UForm @submit="onSubmit" :state="state" :schema="schema" class="space-y-4">
        <UFormField label="Email" name="email">
          <UInput
            v-model="state.email"
            class="w-full"
            :disabled="loading"
            type="email"
            autocomplete="email"
          />
        </UFormField>
        <UFormField label="Password" name="password">
          <UFieldGroup class="w-full">
            <UInput
              v-model="state.password"
              :type="type"
              :disabled="loading"
              class="w-full"
              autocomplete="current-password"
            />
            <UButton
              color="neutral"
              variant="subtle"
              :icon="type === 'password' ? 'i-lucide-eye' : 'i-lucide-eye-off'"
              :disabled="loading"
              @click="type = type === 'password' ? 'text' : 'password'"
            />
          </UFieldGroup>
        </UFormField>
        <UButton type="submit" :loading="loading" class="w-full justify-center" size="lg"
          >Login</UButton
        >
      </UForm>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import * as v from 'valibot'
import type { FormSubmitEvent } from '@nuxt/ui'
import { useAuthStore } from '@/stores/auth'
import { useRouter } from 'vue-router'
import { login } from '@/api/auth'

const schema = v.object({
  email: v.pipe(v.string(), v.email('Invalid email')),
  password: v.pipe(v.string(), v.minLength(8, 'Must be at least 8 characters')),
})

type Schema = v.InferOutput<typeof schema>

const state = reactive({
  email: '',
  password: '',
})
const type = ref<'password' | 'text'>('password')
const toast = useToast()
const authStore = useAuthStore()
const router = useRouter()

const loading = ref(false)
function onSubmit(event: FormSubmitEvent<Schema>) {
  loading.value = true
  login({ email: event.data.email, password: event.data.password })
    .then(async ({ user }) => {
      authStore.setUser(user)
      router.push('/')
      return true
    })
    .catch((error) => {
      authStore.setUser(null)
      toast.add({
        title: 'Error',
        description: error instanceof Error ? error.message : 'Unknown error',
        color: 'error',
      })
    })
    .finally(() => {
      loading.value = false
    })
}
</script>

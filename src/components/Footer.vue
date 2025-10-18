<template>
  <UFieldGroup class="w-full flex justify-center gap-2">
    <RouterLink to="/temporary" class="w-full">
      <UButton
        :variant="router.currentRoute.value.path === '/temporary' ? 'subtle' : 'ghost'"
        class="w-full justify-center"
        >Routine</UButton
      >
    </RouterLink>
    <RouterLink to="/" class="w-full">
      <UButton
        :variant="router.currentRoute.value.path === '/' ? 'subtle' : 'ghost'"
        class="w-full justify-center"
        >Home</UButton
      >
    </RouterLink>
    <RouterLink to="/settings" class="w-full">
      <UButton
        :variant="router.currentRoute.value.path === '/settings' ? 'subtle' : 'ghost'"
        class="w-full justify-center"
        >Settings</UButton
      >
    </RouterLink>
  </UFieldGroup>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'

const router = useRouter()
</script>

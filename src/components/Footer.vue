<template>
  <UFieldGroup class="w-full flex justify-center gap-2">
    <RouterLink to="/temporary" class="w-full">
      <UButton
        :variant="router.currentRoute.value.path === '/temporary' ? 'solid' : 'ghost'"
        class="w-full justify-center rounded-full"
        >Routine</UButton
      >
    </RouterLink>
    <RouterLink to="/" class="w-full">
      <UButton
        :variant="router.currentRoute.value.path === '/' ? 'solid' : 'ghost'"
        class="w-full justify-center rounded-full"
        >Home</UButton
      >
    </RouterLink>
    <RouterLink to="/settings" class="w-full">
      <UButton
        :variant="router.currentRoute.value.path === '/settings' ? 'solid' : 'ghost'"
        class="w-full justify-center rounded-full"
        >Settings</UButton
      >
    </RouterLink>
  </UFieldGroup>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'

const router = useRouter()
</script>

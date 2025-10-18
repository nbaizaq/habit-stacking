<script setup lang="ts">
import DefaultLayout from '@/layouts/default.vue'
import { computed } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const layout = computed(() => {
  if (route.meta.layout) {
    return route.meta.layout
  }
  return DefaultLayout
})
</script>

<template>
  <UApp>
    <component :is="layout">
      <RouterView />
    </component>
  </UApp>
</template>

<template>
  <div class="p-4 w-full sm:max-w-112 mx-auto pb-24">
    <slot />
    <div class="fixed bottom-4 left-0 right-0 h-16 flex justify-center items-center">
      <UTabs v-model="tab" :items="tabs" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const router = useRouter()
const route = useRoute()

watch(
  () => route.path,
  (newPath) => {
    tab.value = newPath
  },
)

const tab = ref('/')
const tabs = [
  {
    label: 'Home',
    icon: 'i-lucide-home',
    value: '/',
    to: '/',
  },
  {
    label: 'Routines',
    icon: 'i-lucide-timer',
    value: '/temporary',
  },
  {
    label: 'Settings',
    icon: 'i-lucide-settings',
    value: '/settings',
  },
]

watch(tab, (newTab) => {
  router.push(newTab)
})
</script>

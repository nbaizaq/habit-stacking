<template>
  <div class="p-4 py-8 w-full sm:max-w-112 mx-auto pb-20">
    <slot />
    <div class="fixed bottom-4 left-0 right-0 h-16 flex justify-center items-center">
      <Footer class="max-w-96 mx-auto px-4 py-2 rounded-2xl backdrop-blur-xl bg-zinc-700/50" />
    </div>
  </div>
</template>

<script setup lang="ts">
import Footer from '@/components/Footer.vue'
</script>

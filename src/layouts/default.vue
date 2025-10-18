<template>
  <div class="p-4 w-full sm:max-w-112 mx-auto pb-12">
    <slot />
    <div
      class="fixed bottom-0 left-0 right-0 h-12 flex justify-center items-center backdrop-blur-xl"
    >
      <Footer class="max-w-96 mx-auto" />
    </div>
  </div>
</template>

<script setup lang="ts">
import Footer from '@/components/Footer.vue'
</script>

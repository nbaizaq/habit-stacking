<template>
  <shared-dialog :open="modelValue"> </shared-dialog>
</template>

<script setup lang="ts">
import SharedDialog from './SharedDialog.vue'

const props = defineProps<{
  modelValue?: boolean
}>()
</script>

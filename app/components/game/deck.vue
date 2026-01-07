<script setup lang="ts">
import type { IStack } from "~~/shared/types";

const { value, stack } = defineProps<{ value?: number; stack?: IStack }>();
</script>

<template>
  <div class="relative w-12 h-20">
    <div
      class="absolute top-0 rounded-sm border border-primary-foreground bg-primary w-12 h-20 flex justify-center items-center text-primary-foreground text-2xl hover:cursor-pointer"></div>
    <div
      class="absolute left-1 rounded-sm border border-primary-foreground bg-primary w-12 h-20 flex justify-center items-center text-primary-foreground text-2xl hover:cursor-pointer"></div>
    <div
      class="absolute left-2 rounded-sm border border-primary-foreground bg-primary w-12 h-20 flex justify-center items-center text-primary-foreground text-2xl hover:cursor-pointer">
      {{ value }}
    </div>
  </div>
</template>

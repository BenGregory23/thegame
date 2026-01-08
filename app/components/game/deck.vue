<script setup lang="ts">
import type { IStack } from "~~/shared/types";

const { value } = defineProps<{ value?: number; stack?: IStack }>();
</script>

<template>
  <div class="relative w-14 h-20 lg:w-16 lg:h-24">
    <div
      class="absolute top-0 rounded-md border border-primary-foreground bg-primary w-14 h-20 lg:w-16 lg:h-24 flex justify-center items-center text-primary-foreground text-2xl hover:cursor-pointer"></div>
    <div
      class="absolute left-1 rounded-md border border-primary-foreground bg-primary w-14 h-20 lg:w-16 lg:h-24 flex justify-center items-center text-primary-foreground text-2xl hover:cursor-pointer"></div>
    <div
      class="absolute left-2 font-semibold rounded-md border border-primary-foreground bg-primary w-14 h-20 lg:w-16 lg:h-24 flex justify-center items-center text-primary-foreground text-2xl hover:cursor-pointer">
      {{ value }}
    </div>
  </div>
</template>

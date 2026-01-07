<script setup lang="ts">
import { Circle } from "lucide-vue-next";
const { value, selected } = defineProps<{ value?: number; selected?: boolean }>();
</script>

<template>
  <div
    v-if="value"
    :class="selected ? '  -translate-y-2 mx-1.5 ring-accent ring-4' : ''"
    class="rounded-sm font-semibold transition-all duration-100 select-none border bg-primary w-12 h-20 flex justify-center items-center text-primary-foreground text-2xl hover:cursor-pointer">
    {{ value }}
  </div>
  <div
    v-else
    class="rounded-sm border border-dashed border-primary bg-background w-12 h-20 flex justify-center items-center text-primary-foreground text-2xl">
    <Circle class="text-foreground" />
  </div>
</template>

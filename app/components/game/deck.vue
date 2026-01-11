<script setup lang="ts">
import type { IStack } from "~~/shared/types/types";

const { value } = defineProps<{ value?: number; stack?: IStack }>();
</script>

<template>
  <div class="relative w-fit h-fit">
    <!-- Card 3 (bottom) - only show if 3+ cards -->
    <div v-if="stack && stack?.cards.length >= 3" class="absolute top-0 left-0 transition-all duration-200">
      <GameCard :value="value" class="opacity-40 scale-95 rotate-2" />
    </div>

    <!-- Card 2 (middle) - only show if 2+ cards -->
    <div class="absolute top-0 left-1.5 transition-all duration-200">
      <GameCard :value="value" class="opacity-60 scale-[0.97] -rotate-1" />
    </div>

    <!-- Card 1 (top) - always show -->
    <div class="relative left-2.5 transition-all duration-300" :class="'translate-y-1.5'">
      <GameCard :value="value" class="shadow-xl" />
    </div>
  </div>
</template>

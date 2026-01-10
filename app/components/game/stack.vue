<script setup lang="ts">
import { ArrowDown, ArrowUp, Circle } from "lucide-vue-next";
import { StackType, type IFrontendStack, type IStack } from "~~/shared/types";

const { stack } = defineProps<{ stack: IFrontendStack }>();
const { selectStack, selectedStack } = useGame();
</script>

<template>
  <div class="flex flex-col gap-4">
    <div @click="() => selectStack(stack.id!)" class="hover:cursor-pointer rounded-md">
      <div class="relative w-14 h-20 lg:w-16 lg:h-24">
        <!-- Card 3 (bottom) - only show if 3+ cards -->
        <div class="absolute top-0 left-1.5 transition-all duration-200">
          <GameCard
            v-if="stack.cards.length >= 3"
            :value="stack.cards.at(stack.cards.length - 3)?.value"
            class="opacity-40 scale-95 rotate-3" />
        </div>

        <!-- Card 2 (middle) - only show if 2+ cards -->
        <div class="absolute top-0 left-1 transition-all duration-200">
          <GameCard
            v-if="stack.cards.length >= 2"
            :value="stack.cards.at(stack.cards.length - 2)?.value"
            class="opacity-60 scale-[0.97] -rotate-1" />
        </div>

        <!-- Card 1 (top) - always show -->
        <div class="absolute top-0 left-0 transition-all duration-200 rounded-md">
          <GameCard
            :value="stack.cards.at(stack.cards.length - 1)?.value"
            :class="[
              stack.cards.length >= 3 && '-translate-1.5 left-1',
              selectedStack?.id === stack.id && 'ring-accent ring-4 rounded-md',
            ]" />
        </div>
      </div>
    </div>

    <div
      class="relative rounded-md border-2 bg-primary w-14 h-20 lg:w-16 lg:h-24 flex flex-col font-semibold justify-center items-center text-primary-foreground text-2xl">
      <!-- top left value -->
      <span class="text-xs absolute left-1.5 top-1.5"> {{ stack.type == StackType.INCREASE ? 1 : 100 }}</span>
      <div v-if="stack.type == StackType.INCREASE" class="flex flex-col items-center">
        <span class="rounded-full w-8 text-center h-8 flex items-center justify-center text-sm">
          <ArrowUp stroke-width="3" />
        </span>
      </div>
      <div v-if="stack.type == StackType.DECREASE" class="flex flex-col items-center">
        <span class="rounded-full size-6 w-10 text-center h-10 flex items-center justify-center text-sm">
          <ArrowDown stroke-width="3" />
        </span>
      </div>
      <!-- bottom right value -->
      <span class="text-xs absolute right-1.5 bottom-1.5">
        {{ stack.type == StackType.INCREASE ? 1 : 100 }}
      </span>
    </div>
  </div>
</template>

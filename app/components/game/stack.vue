<script setup lang="ts">
import { ArrowDown, ArrowUp, Circle } from "lucide-vue-next";
import { StackType, type IFrontendStack, type IStack } from "~~/shared/types";

const { stack } = defineProps<{ stack: IFrontendStack }>();
const { selectStack, selectedStack } = useGame();
</script>

<template>
  <div class="flex flex-col gap-4">
    <GameDeck v-if="stack.cards.length >= 3" :value="stack.cards.at(stack.cards.length - 1)?.value" />
    <GameCard v-else :value="stack.cards.at(stack.cards.length - 1)?.value" />
    <div
      @click="() => selectStack(stack.id!)"
      :class="selectedStack?.id === stack.id ? 'ring-accent ring-4' : 'ring-0'"
      class="rounded-sm border bg-primary w-12 h-20 flex flex-col font-semibold justify-center items-center text-primary-foreground text-2xl hover:cursor-pointer">
      <div v-if="stack.type == StackType.INCREASE" class="flex flex-col items-center">
        <ArrowUp />
        <span
          class="rounded-full bg-background size-6 text-foreground w-10 text-center h-10 flex items-center justify-center text-sm"
          >1</span
        >
      </div>
      <div v-if="stack.type == StackType.DECREASE" class="flex flex-col items-center">
        <ArrowDown />
        <span
          class="rounded-full bg-background size-6 text-foreground w-10 text-center h-10 flex items-center justify-center text-sm">
          100
        </span>
      </div>
    </div>
  </div>
</template>

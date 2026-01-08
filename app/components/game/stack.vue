<script setup lang="ts">
import { ArrowDown, ArrowUp, Circle } from "lucide-vue-next";
import { StackType, type IFrontendStack, type IStack } from "~~/shared/types";

const { stack } = defineProps<{ stack: IFrontendStack }>();
const { selectStack, selectedStack } = useGame();
</script>

<template>
  <div class="flex flex-col gap-4">
    <div
      @click="() => selectStack(stack.id!)"
      :class="selectedStack?.id === stack.id ? 'ring-accent ring-4' : 'ring-0'"
      class="hover:cursor-pointer rounded-md">
      <GameDeck v-if="stack.cards.length >= 3" :value="stack.cards.at(stack.cards.length - 1)?.value" />
      <GameCard v-else :value="stack.cards.at(stack.cards.length - 1)?.value" />
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

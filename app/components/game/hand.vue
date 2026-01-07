<script setup lang="ts">
import type { ICard } from "~~/shared/types";

const { hand, selectCard, selectedCard, isPlayertTurn } = useGame();
const { username } = useUser();

function isSelected(card: ICard, selected: ICard | null) {
  if (selected && selected.value !== null) {
    return selectedCard.value == card;
  }
}
</script>

<template>
  <section class="flex flex-col items-center">
    <span class="text-sm font-semibold" :class="isPlayertTurn() ? 'animate-bounce' : ''">{{ username }}</span>
    <section class="flex gap-1 w-full justify-center py-4">
      <GameCard
        :selected="isSelected(card, selectedCard)"
        v-for="card in hand"
        :value="card.value"
        v-if="hand.length > 0"
        @click="() => selectCard(card)" />
      <div v-else>No Cards in hand</div>
    </section>
  </section>
</template>

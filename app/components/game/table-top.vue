<script setup lang="ts">
const { selectedCard, selectedStack, minimumCardsPlaced, placeCard, placedCards, endTurn } = useGame();
</script>

<template>
  <section class="flex-1 flex flex-col justify-center items-center space-y-4">
    <div class="flex items-center gap-20">
      <GameStacks />
      <!-- <GameDeck /> -->
    </div>
    <div class="flex space-x-2">
      <Button v-if="selectedCard?.value && selectedCard.value" @click="placeCard"> Place card </Button>
      <Button v-if="minimumCardsPlaced()" @click="endTurn"> End turn </Button>
    </div>
  </section>
</template>

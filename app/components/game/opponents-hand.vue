<script setup lang="ts">
import Hand from "./hand.vue";
import OpponentCard from "./opponent-card.vue";

const { players, yourId, currentTurn } = useGame();

function filterOpponents() {
  return players.value.filter((p) => p.id !== yourId.value);
}

const opponents = computed(() => filterOpponents());
</script>

<template>
  <section class="flex space-x-5 w-full justify-center p-5">
    <div class="flex flex-col items-center space-y-2" v-for="opponent in opponents">
      <span :class="currentTurn == opponent.id ? 'animate-bounce' : ''">{{ opponent.username }}</span>
      <div class="flex space-x-1">
        <OpponentCard v-for="index in opponent.handSize" :key="index" />
      </div>
    </div>
  </section>
</template>

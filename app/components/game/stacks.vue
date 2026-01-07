<script setup lang="ts">
const { stacks } = useGame();
</script>
<template>
  <section class="flex space-x-15">
    <GameStack v-for="stack of stacks" :stack="stack" />
  </section>
</template>

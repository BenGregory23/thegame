<script setup lang="ts">
const { data, status, error, refresh, clear } = await useFetch("/api/games");
</script>

<template>
  ADMIN

  <div v-for="game in data">
    {{ game }}
  </div>
</template>

<script setup lang="ts">
import { generateRoomNumber } from "~/lib/utils.js";

const room = generateRoomNumber();
</script>

<template>
  <NuxtLink :to="'/room/' + room">
    <Button> Create a game </Button>
  </NuxtLink>
</template>

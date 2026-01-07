<script setup lang="ts">
import { Bug } from "lucide-vue-next";
import { socket } from "./socket";
import Badge from "./ui/badge/Badge.vue";

const { username } = useUser();
const { room, hand, yourId, hostId, status, players, stacks, currentTurn } = useGame();
const open = ref(false);

function toggle() {
  open.value = !open.value;
}
</script>

<template>
  <div class="absolute bottom-2 left-2">
    <div v-if="open" class="relative top-0 flex flex-col border-white border-2 p-1 max-w-xl">
      <span>room :{{ room }}</span>
      <span>username : {{ username }}</span>
      <span>is socket connected : {{ socket.active }}</span>
      <span>
        hand : <span class="mx-1" v-for="c in hand"> {{ c.value }}</span>
      </span>
      <span>player id : {{ yourId }}</span>
      <span>host id : {{ hostId }}</span>
      <span>players : {{ players }}</span>
      <span>stacks: {{ stacks }}</span>
      <span>my turn : {{ currentTurn === socket.id ? true : false }}</span>
      <span class="text-white">
        <Badge>{{ status }}</Badge>
      </span>
      <NuxtLink class="text-center bg-primary text-primary-foreground" to="/"> HOME </NuxtLink>
    </div>
    <Button class="relative bottom-0" size="icon" @click="() => toggle()"> <Bug /> </Button>
  </div>
</template>

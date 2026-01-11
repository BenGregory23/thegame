<script setup lang="ts">
import ChatClient from "~/components/chat.client.vue";
import { socket } from "~/components/socket.js";
import { Events, GameStatus, type IPayload } from "../../../shared/types";
import TableTop from "~/components/game/table-top.vue";
import OpponentsHand from "~/components/game/opponents-hand.vue";

const { username } = useUser();
const { status, setupListeners, cleanup, room, setRoom } = useGame();
const { joinRoom, leaveRoom } = useRoom();
const route = useRoute();

definePageMeta({
  layout: "game",
});

onBeforeUnmount(() => {
  leaveRoom();
  cleanup();
});

function enterRoom(roomCode: string) {
  if (!username.value || username.value.length < 2) return;
  setRoom(roomCode);
}

onMounted(() => {
  setupListeners();

  enterRoom(route.params.room);
  joinRoom(room.value, username.value);

  const handler = () => {
    leaveRoom();
    cleanup();
  };

  window.addEventListener("beforeunload", handler);

  onBeforeUnmount(() => {
    window.removeEventListener("beforeunload", handler);
  });
});
</script>

<template>
  <section v-if="status === GameStatus.IN_PROGRESS" class="flex-1 flex flex-col justify-between h-full">
    <OpponentsHand />
    <TableTop />
    <GameHand />
  </section>
  <section v-else class="flex-1 flex justify-center">
    <PreGame v-if="status == GameStatus.WAITING" />
    <LostGame v-if="status == GameStatus.LOST" />
  </section>

  <ChatClient />
</template>

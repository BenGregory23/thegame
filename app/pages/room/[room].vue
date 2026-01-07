<script setup lang="ts">
import ChatClient from "~/components/chat.client.vue";
import { socket } from "~/components/socket.js";
import { Events, GameStatus, type IPayload } from "../../../shared/types";
import TableTop from "~/components/game/table-top.vue";

const route = useRoute();
const { username } = useUser();
const { room, hostId, yourId, status, isPlayerHost, canGameStart, setupListeners, cleanup } = useGame();

const payload: IPayload = {
  roomID: route.params.room,
  content: {
    username: username.value,
  },
};

cleanup();
setupListeners();

onUnmounted(() => {
  console.log(payload);
  socket.emit(Events.ROOM_LEAVE, payload);
  cleanup();
});

function start() {
  socket.emit(Events.GAME_START, payload);
}

socket.emit(Events.ROOM_JOIN, payload);
</script>

<template>
  <section v-if="status === GameStatus.IN_PROGRESS" class="flex-1 flex flex-col justify-between h-full">
    <TableTop />
    <GameHand />
  </section>
  <section v-else class="flex-1 flex justify-center">
    <Button v-if="status === GameStatus.WAITING && isPlayerHost()" @click="start">
      Commencer la partie
    </Button>
  </section>

  <ChatClient />
</template>

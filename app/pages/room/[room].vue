<script setup lang="ts">
import ChatClient from "~/components/chat.client.vue";
import { socket } from "~/components/socket.js";
import { Events, GameStatus, type IPayload } from "../../../shared/types";
import TableTop from "~/components/game/table-top.vue";
import OpponentsHand from "~/components/game/opponents-hand.vue";

const { username } = useUser();
const { status, setupListeners, cleanup, room } = useGame();

const payload: IPayload = {
  roomID: room.value,
  content: {
    username: username.value,
  },
};

setupListeners();

onUnmounted(() => {
  console.log(payload);
  socket.emit(Events.ROOM_LEAVE, payload);
  cleanup();
});

socket.emit(Events.ROOM_JOIN, payload);
</script>

<template>
  <section v-if="status === GameStatus.IN_PROGRESS" class="flex-1 flex flex-col justify-between h-full">
    <OpponentsHand />
    <TableTop />
    <GameHand />
  </section>
  <section v-else class="flex-1 flex justify-center">
    <PreGame />
  </section>

  <ChatClient />
</template>

<script setup lang="ts">
import { MessageCircle } from "lucide-vue-next";
import { socket } from "~/components/socket";
import { Events, type IMessage, type IPayload, type IPlayer } from "~~/shared/types";

const messages = ref<IMessage[]>([]);
const newMessage = ref<string>("");
const { username } = useUser();
const { room } = useGame();
const open = ref(false);

function sendMessage() {
  if (!newMessage.value.trim()) return;

  const message = {
    text: newMessage.value,
    author: username.value,
    timestamp: Date.now(),
  };

  const payload: IPayload = {
    socketID: socket.id!,
    roomID: room.value,
    player: username.value,
    content: message,
  };

  socket.emit(Events.CHAT_SEND, payload);
  console.log("chat:send", payload);
  messages.value.push(message);

  newMessage.value = "";
}

onMounted(() => {
  socket.on(Events.CHAT_RECEIVE, (msg: IMessage) => {
    console.log("chat:receive", msg);
    messages.value.push(msg);
  });

  socket.on(Events.PLAYER_JOINED, (player: IPlayer) => {
    console.log("Player joined");
    const msg: IMessage = {
      text: "New player joined " + player.username,
      author: "theGamo 🃁",
      timestamp: Date.now(),
    };
    messages.value.push(msg);
  });

  socket.on(Events.PLAYER_LEFT, (payload: IPayload) => {
    const msg: IMessage = {
      text: "Player left the game  " + payload.content.username,
      author: "theGamo",
      timestamp: Date.now(),
    };
    messages.value.push(msg);
  });

  // socket.on(Events.PLAYER_STATE, (payload: IPayload) => {
  //   const msg: IMessage = {
  //     text: payload.content,
  //     author: "theGamo",
  //     timestamp: Date.now(),
  //   };
  //   messages.value.push(msg);
  // });
});

function toggle() {
  open.value = !open.value;
}
</script>

<template>
  <div class="flex items-center">
    <Button class="rounded-r-none h-20" @click="toggle"><MessageCircle /></Button>
    <Card
      :class="open ? 'w-md p-4' : 'w-0 hidden p-0'"
      class="max-w-md mx-auto mt-4 flex flex-col gap-4 h-screen transition-all duration-300">
      <CardContent
        class="flex-1 flex flex-col gap-2 overflow-y-auto h-64 p-0 rounded"
        :class="open ? '' : 'hidden'">
        <div v-for="(msg, index) in messages" :key="index" class="rounded px-2 py-1 flex flex-col">
          <span class="text-xs">
            {{ msg.author }}
          </span>
          <span>
            {{ msg.text }}
          </span>
        </div>
      </CardContent>

      <form @submit.prevent="sendMessage" class="flex gap-2" :class="open ? 'flex' : 'hidden'">
        <Input v-model="newMessage" placeholder="Type a message..." class="flex-1" />
        <Button type="submit" variant="default">Send</Button>
      </form>
    </Card>
  </div>
</template>

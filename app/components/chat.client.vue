<script setup lang="ts">
import { MessageCircle, Users, X } from "lucide-vue-next";
import { socket } from "~/components/socket";
import { Events, type IMessage, type IPayload, type IPlayer } from "~~/shared/types";

const messages = ref<IMessage[]>([]);
const newMessage = ref<string>("");
const { username } = useUser();
const { room, players } = useGame();
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

  socket.on(Events.PLAYER_JOINED, (payload: IPayload) => {
    console.log("Player joined");
    const msg: IMessage = {
      text: "New player joined " + payload.content.username,
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
});

onBeforeUnmount(() => {
  socket.off(Events.CHAT_RECEIVE);
  socket.off(Events.PLAYER_JOINED);
  socket.off(Events.PLAYER_LEFT);
});

function toggle() {
  open.value = !open.value;
}
</script>

<template>
  <div
    class="fixed right-0 top-0 h-screen z-50 transition-transform duration-300 ease-in-out"
    :class="open ? 'translate-x-0' : 'translate-x-full'">
    <div class="relative h-full flex">
      <!-- Toggle Button - Sticks out to the left -->
      <Button
        class="absolute -left-12 top-1/2 -translate-y-1/2 h-20 w-12 rounded-none rounded-l-lg border-r-0 px-4"
        @click="toggle"
        :aria-label="open ? 'Close chat' : 'Open chat'">
        <MessageCircle />
      </Button>

      <!-- Chat Panel -->
      <Card class="h-full w-96 rounded-none rounded-l-lg border-r-0 flex flex-col shadow-2xl">
        <CardHeader class="border-b space-y-3 shrink-0">
          <div class="flex items-center justify-between">
            <div class="flex items-center gap-2">
              <MessageCircle class="w-5 h-5 text-primary" />
              <CardTitle class="text-lg">Game Chat</CardTitle>
            </div>
            <Button variant="ghost" size="icon" class="h-8 w-8 -mr-2" @click="open = false">
              <X class="w-4 h-4" />
            </Button>
          </div>

          <!-- Players List -->
          <div class="space-y-2">
            <div class="flex items-center gap-2 text-sm text-muted-foreground">
              <Users class="w-4 h-4" />
              <span>Players ({{ players.length }})</span>
            </div>
            <div class="flex flex-wrap gap-2">
              <Badge v-for="player in players" :key="player.id" variant="secondary" class="text-xs">
                {{ player.username }}
              </Badge>
            </div>
          </div>
        </CardHeader>

        <CardContent class="flex-1 overflow-y-auto p-4">
          <div class="space-y-2">
            <div v-for="(msg, index) in messages" :key="index" class="rounded px-2 py-1 flex flex-col">
              <span class="text-xs text-muted-foreground">
                {{ msg.author }}
              </span>
              <span>
                {{ msg.text }}
              </span>
            </div>
          </div>
        </CardContent>

        <CardFooter class="border-t p-4 shrink-0">
          <form @submit.prevent="sendMessage" class="flex gap-2 w-full">
            <Input v-model="newMessage" placeholder="Type a message..." class="flex-1" />
            <Button type="submit" variant="default">Send</Button>
          </form>
        </CardFooter>
      </Card>
    </div>
  </div>
</template>

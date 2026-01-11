<script setup lang="ts">
import type { IPayload } from "~~/shared/types/types";
import { socket } from "./socket";
import { Dices, Share2, Sparkles, Users } from "lucide-vue-next";
import { Events } from "~/lib/events";

const { room, status, isPlayerHost, canGameStart, cleanup, players, settings } = useGame();
const config = useRuntimeConfig();
const isCodeShared = ref(false);
const isLinkShared = ref(false);

function shareCode() {
  const promise = navigator.clipboard.writeText(room.value);
  promise.then(() => {
    isCodeShared.value = true;
    setTimeout(() => (isCodeShared.value = false), 10000);
  });
}

function shareLink() {
  const promise = navigator.clipboard.writeText(config.public.baseURL + `/join-room/${room.value}`);
  promise.then(() => {
    isLinkShared.value = true;
    setTimeout(() => (isLinkShared.value = false), 10000);
  });
}

function start() {
  const payload: IPayload = {
    roomID: room.value,
  };
  socket.emit(Events.GAME_START, payload);
}
</script>

<template>
  <div class="max-w-2xl flex flex-1 justify-center space-x-6">
    <Card class="border-2 w-1/2" v-if="isPlayerHost()">
      <CardHeader>
        <CardTitle class="flex items-center gap-2">
          <Sparkles class="w-5 h-5 text-primary" />
          Start the game
        </CardTitle>
        <CardDescription> Start a new game </CardDescription>
      </CardHeader>
      <CardContent class="space-y-4">
        <p class="text-sm mb-1">Players ({{ players.length }}) :</p>
        <div class="flex gap-2">
          <div v-for="player in players">
            <Badge variant="secondary">{{ player.username }}</Badge>
          </div>
        </div>
        <div>
          <Button
            v-if="isPlayerHost()"
            :disabled="!canGameStart()"
            class="h-12 w-full text-base"
            @click="start">
            Start game
          </Button>
          <span class="text-xs text-muted-foreground">
            A minimum of {{ settings.minPlayers }} players are required to start the game.
          </span>
        </div>
      </CardContent>
    </Card>
    <Card class="border-2 hover:border-primary/50 transition-colors w-1/2">
      <CardHeader>
        <CardTitle class="flex items-center gap-2">
          <Users class="w-5 h-5 text-primary" />
          Share game
        </CardTitle>
        <CardDescription>Invite friends to play with you</CardDescription>
      </CardHeader>
      <CardContent class="space-y-4">
        <div class="bg-muted rounded-lg p-4 space-y-2">
          <Label class="text-xs text-muted-foreground">Room Code</Label>
          <div class="flex items-center gap-2">
            <Dices class="w-4 h-4 text-accent" />
            <code class="text-2xl font-bold tracking-wider">{{ room }}</code>
          </div>
        </div>
        <div class="flex gap-2">
          <Button class="w-1/2 h-12 text-base transition-all duration-150" @click="shareLink">
            <span v-if="!isLinkShared" class="flex gap-2 items-center"
              ><Share2 /> <span>Share link</span></span
            >
            <span v-else>Link copied!</span>
          </Button>
          <Button class="w-1/2 h-12 text-base transition-all duration-150" @click="shareCode">
            <span v-if="!isCodeShared" class="flex gap-2 items-center"
              ><Share2 /> <span>Share code</span></span
            >
            <span v-else>Code copied!</span>
          </Button>
        </div>
      </CardContent>
    </Card>
  </div>
</template>

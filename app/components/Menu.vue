<script setup lang="ts">
import { generateRoomNumber } from "~/lib/utils.js";
import { User, Plus, LogIn, Dices } from "lucide-vue-next";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "~/components/ui/card";

const room = generateRoomNumber();
const typedRoom = ref("");
const router = useRouter();
const { username } = useUser();
const { setRoom } = useGame();

const canCreateGame = computed(() => username.value && username.value.length >= 2);
const canJoinGame = computed(
  () => username.value && username.value.length >= 2 && typedRoom.value.length >= 6
);

function enterRoom(roomCode: string) {
  if (!username.value || username.value.length < 2) return;
  router.push("/room/" + roomCode);
  setRoom(roomCode);
}
</script>

<template>
  <div class="max-w-2xl mx-auto p-6 space-y-8">
    <!-- Title Section -->
    <div class="text-center space-y-3">
      <h1 class="text-5xl md:text-6xl font-bold">the<span class="text-primary">Gamo</span></h1>
      <p class="text-muted-foreground text-lg">Stack your way to victory</p>
    </div>

    <!-- Player Identity Card -->
    <Card class="border-2">
      <CardHeader>
        <CardTitle class="flex items-center gap-2">
          <User class="w-5 h-5" />
          Player Identity
        </CardTitle>
        <CardDescription>Choose your username to start playing</CardDescription>
      </CardHeader>
      <CardContent>
        <div class="space-y-2">
          <Label htmlFor="username">Username</Label>
          <Input
            id="username"
            placeholder="Enter your username..."
            v-model="username"
            class="text-lg h-12"
            :class="{ 'border-destructive': username && username.length < 2 }" />
          <p class="text-xs text-muted-foreground" v-if="!username || username.length < 2">
            Username must be at least 2 characters
          </p>
        </div>
      </CardContent>
    </Card>

    <!-- Game Actions -->
    <div class="grid md:grid-cols-2 gap-6">
      <!-- Create Game Card -->
      <Card class="border-2 hover:border-primary/50 transition-colors">
        <CardHeader>
          <CardTitle class="flex items-center gap-2">
            <Plus class="w-5 h-5 text-primary" />
            Create Game
          </CardTitle>
          <CardDescription>Start a new game and invite friends</CardDescription>
        </CardHeader>
        <CardContent class="space-y-4">
          <div class="bg-muted rounded-lg p-4 space-y-2">
            <Label class="text-xs text-muted-foreground">Room Code</Label>
            <div class="flex items-center gap-2">
              <Dices class="w-4 h-4 text-accent" />
              <code class="text-2xl font-bold tracking-wider">{{ room }}</code>
            </div>
          </div>
          <Button class="w-full h-12 text-base" @click="enterRoom(room)" :disabled="!canCreateGame">
            <Plus class="w-4 h-4 mr-2" />
            Create Room
          </Button>
        </CardContent>
      </Card>

      <!-- Join Game Card -->
      <Card class="border-2 hover:border-accent/50 transition-colors">
        <CardHeader>
          <CardTitle class="flex items-center gap-2">
            <LogIn class="w-5 h-5 text-accent" />
            Join Game
          </CardTitle>
          <CardDescription>Enter a room code to join friends</CardDescription>
        </CardHeader>
        <CardContent class="space-y-4">
          <div class="space-y-2">
            <Label htmlFor="roomCode">Room Code</Label>
            <Input
              id="roomCode"
              placeholder="e.g. abc123"
              v-model="typedRoom"
              class="text-lg h-12 font-mono tracking-wider uppercase"
              maxlength="6" />
          </div>
          <Button
            variant="secondary"
            class="w-full h-12 text-base"
            @click="enterRoom(typedRoom)"
            :disabled="!canJoinGame">
            <LogIn class="w-4 h-4 mr-2" />
            Join Room
          </Button>
        </CardContent>
      </Card>
    </div>

    <!-- Quick Info -->
    <div class="text-center text-sm text-muted-foreground">
      <p>Room codes are <span class="font-semibold">6 characters</span> long</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Dices, Plus } from "lucide-vue-next";

const route = useRoute();
const router = useRouter();
const { joinRoom } = useRoom();
const { username } = useUser();
const { setRoom } = useGame();

function enterRoom(roomCode: string) {
  if (!username.value || username.value.length < 2) return;
  router.push("/room/" + roomCode);
  joinRoom(roomCode, username.value);
  setRoom(roomCode);
}
const room = route.params.room;
</script>
<template>
  <div class="max-w-2xl mx-auto p-6 space-y-8">
    <!-- Title Section -->
    <div class="text-center space-y-3">
      <h1 class="text-5xl md:text-6xl font-bold">the<span class="text-primary">Gamo</span></h1>
      <p class="text-muted-foreground text-lg">Stack your way to victory</p>
    </div>
    <Card class="border-2 hover:border-primary/50 transition-colors w-96">
      <CardHeader>
        <CardTitle class="flex items-center gap-2">
          <Plus class="w-5 h-5 text-primary" />
          Join game
        </CardTitle>
        <CardDescription>Join an already existing room to play.</CardDescription>
      </CardHeader>
      <CardContent class="space-y-4">
        <div class="bg-muted rounded-lg p-4 space-y-2">
          <Label class="text-xs text-muted-foreground">Room Code</Label>
          <div class="flex items-center gap-2">
            <Dices class="w-4 h-4 text-accent" />
            <code class="text-2xl font-bold tracking-wider">{{ room }}</code>
          </div>
        </div>
        <Button class="w-full h-12 text-base" @click="enterRoom(room)"> Join Room </Button>
      </CardContent>
    </Card>
  </div>
</template>

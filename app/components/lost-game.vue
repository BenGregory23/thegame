<script setup lang="ts">
import { Frown } from "lucide-vue-next";

const { isPlayerHost, canGameStart, restartGame, settings } = useGame();
</script>

<template>
  <div class="max-w-2xl flex flex-1 justify-center space-x-6">
    <Card class="border-2 w-1/2">
      <CardHeader>
        <CardTitle class="flex items-center gap-2">
          <Frown class="w-5 h-5 text-primary" />
          You lost
        </CardTitle>
        <CardDescription> Start a new game and try again ! </CardDescription>
      </CardHeader>
      <CardContent class="space-y-4">
        <div>
          <Button
            v-if="isPlayerHost()"
            :disabled="!canGameStart()"
            class="h-12 w-full text-base"
            @click="restartGame">
            Start again
          </Button>
          <span class="text-xs text-muted-foreground">
            A minimum of {{ settings.minPlayers }} players are required to start the game.
          </span>
        </div>
      </CardContent>
    </Card>
  </div>
</template>

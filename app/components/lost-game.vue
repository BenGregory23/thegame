<script setup lang="ts">
import { Frown, Trophy, ThumbsUp, Meh, ThumbsDown, Target } from "lucide-vue-next";

const { isPlayerHost, canGameStart, restartGame, settings, remainingCards } = useGame();

// Total cards in game (2-99 = 98 cards)
const totalCards = 98;

// Simple percentage of cards remaining (more = worse)
const remainingPercentage = computed(() => {
  return (remainingCards.value / totalCards) * 100;
});

// Get score evaluation
const scoreEvaluation = computed(() => {
  if (remainingCards.value === 0) {
    return {
      title: "Perfect! 🎉",
      message: "You've mastered the game!",
      color: "text-accent",
      bgColor: "bg-accent/10",
      borderColor: "border-accent/30",
      icon: Trophy,
    };
  } else if (remainingCards.value < 15) {
    return {
      title: "Excellent!",
      message: "That's a really good score!",
      color: "text-accent",
      bgColor: "bg-accent/10",
      borderColor: "border-accent/30",
      icon: ThumbsUp,
    };
  } else if (remainingCards.value < 35) {
    return {
      title: "Not bad!",
      message: "You're getting the hang of it",
      color: "text-primary",
      bgColor: "bg-primary/10",
      borderColor: "border-primary/30",
      icon: Meh,
    };
  } else {
    return {
      title: "Keep trying!",
      message: "Practice makes perfect",
      color: "text-muted-foreground",
      bgColor: "bg-muted",
      borderColor: "border-muted-foreground/30",
      icon: ThumbsDown,
    };
  }
});
</script>

<template>
  <div class="max-w-3xl mx-auto flex flex-1 justify-center items-center p-6">
    <Card class="border-2 w-full">
      <CardHeader class="text-center space-y-3 pb-6">
        <div class="flex justify-center">
          <div class="w-16 h-16 rounded-full bg-muted flex items-center justify-center">
            <Frown class="w-8 h-8 text-muted-foreground" />
          </div>
        </div>
        <CardTitle class="text-3xl">Game Over</CardTitle>
        <CardDescription class="text-base"> Don't give up! Every game makes you better. </CardDescription>
      </CardHeader>

      <CardContent class="space-y-6">
        <!-- Score Display -->
        <div class="text-center space-y-2">
          <div class="flex items-center justify-center gap-2">
            <Target class="w-5 h-5 text-muted-foreground" />
            <span class="text-sm font-medium text-muted-foreground uppercase tracking-wide">
              Cards Remaining
            </span>
          </div>
          <div class="text-6xl font-bold" :class="scoreEvaluation.color">
            {{ remainingCards }}
          </div>
          <div class="text-sm text-muted-foreground">out of {{ totalCards }} cards</div>
        </div>

        <!-- Visual Score Scale -->
        <div class="space-y-4">
          <!-- Progress Bar (more full = worse score) -->
          <div class="relative h-8 rounded-full bg-muted overflow-hidden">
            <!-- Fill - changes color based on how bad the score is -->
            <div
              class="absolute inset-y-0 left-0 rounded-full transition-all duration-1000 ease-out"
              :class="[
                remainingCards === 0
                  ? 'bg-linear-to-r from-accent to-accent/80'
                  : remainingCards < 15
                  ? 'bg-linear-to-r from-accent/80 to-accent/60'
                  : remainingCards < 35
                  ? 'bg-linear-to-r from-primary to-primary/80'
                  : 'bg-linear-to-r from-destructive/60 to-destructive/40',
              ]"
              :style="{ width: `${remainingPercentage}%` }" />
          </div>

          <!-- Scale Labels -->
          <div class="flex justify-between text-xs font-medium">
            <div class="flex flex-col items-center gap-1">
              <Trophy class="w-4 h-4 text-accent" />
              <span class="text-accent">Perfect</span>
              <span class="text-muted-foreground">0</span>
            </div>
            <div class="flex flex-col items-center gap-1">
              <ThumbsUp class="w-4 h-4 text-accent/70" />
              <span class="text-accent/70">Great</span>
              <span class="text-muted-foreground">&lt;15</span>
            </div>
            <div class="flex flex-col items-center gap-1">
              <Meh class="w-4 h-4 text-primary" />
              <span class="text-primary">Good</span>
              <span class="text-muted-foreground">&lt;35</span>
            </div>
            <div class="flex flex-col items-center gap-1">
              <ThumbsDown class="w-4 h-4 text-destructive" />
              <span class="text-destructive">Try Again</span>
              <span class="text-muted-foreground">50+</span>
            </div>
          </div>
        </div>

        <!-- Score Evaluation Card -->
        <div
          class="p-4 rounded-lg border-2 transition-all duration-300"
          :class="[scoreEvaluation.bgColor, scoreEvaluation.borderColor]">
          <div class="flex items-center gap-3">
            <component
              :is="scoreEvaluation.icon"
              class="w-8 h-8 flex-shrink-0"
              :class="scoreEvaluation.color" />
            <div class="flex-1">
              <div class="font-bold text-lg" :class="scoreEvaluation.color">
                {{ scoreEvaluation.title }}
              </div>
              <div class="text-sm text-muted-foreground">
                {{ scoreEvaluation.message }}
              </div>
            </div>
          </div>
        </div>

        <Separator />

        <!-- Actions -->
        <div class="space-y-3">
          <Button
            v-if="isPlayerHost()"
            :disabled="!canGameStart()"
            class="h-12 w-full text-base"
            @click="restartGame">
            Start New Game
          </Button>

          <p class="text-xs text-center text-muted-foreground">
            {{
              isPlayerHost()
                ? `Minimum ${settings.minPlayers} players required to start`
                : "Waiting for host to start a new game..."
            }}
          </p>
        </div>
      </CardContent>
    </Card>
  </div>
</template>

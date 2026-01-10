<script setup lang="ts">
import { ArrowUp, ArrowUp01, ArrowUp10, ArrowUpCircle } from "lucide-vue-next";
</script>

<template>
  <div class="flex flex-col items-center justify-center min-h-screen gap-12 px-4">
    <!-- Title -->
    <div class="text-center space-y-4">
      <h1 class="text-7xl md:text-9xl font-bold tracking-tight relative">
        the<span class="text-primary">Gamo</span>
        <Badge variant="secondary" class="w-16 absolute bottom-4 -right-4 tracking-normal font-bold">
          Beta
        </Badge>
      </h1>
      <p class="text-xl md:text-2xl text-muted-foreground max-w-2xl">
        Stack your way to victory. Play cards, beat the numbers.
      </p>
    </div>

    <!-- Big Card Visual -->
    <div class="relative">
      <!-- Card with 3D effect -->
      <Card
        class="w-64 h-96 md:w-80 md:h-[480px] relative transform hover:scale-105 hover:rotate-2 transition-all duration-300 cursor-pointer bg-card border-4 border-primary/20 shadow-2xl">
        <CardContent class="h-full flex flex-col items-center justify-between p-8">
          <!-- Top corner value -->
          <div class="self-start">
            <div class="text-6xl font-black text-primary">42</div>
          </div>

          <!-- Center symbol/logo -->
          <div class="flex-1 flex items-center justify-center">
            <div
              class="w-32 h-32 rounded-full bg-linear-to-br from-primary to-accent flex items-center justify-center">
              <span class="text-6xl"> <ArrowUpCircle class="text-5xl size-20 text-white" /></span>
            </div>
          </div>

          <!-- Bottom corner value (upside down) -->
          <div class="self-end rotate-180">
            <div class="text-6xl font-black text-primary">42</div>
          </div>
        </CardContent>
      </Card>

      <!-- Card shadow/stack effect -->
      <div
        class="absolute inset-0 bg-card border-4 border-primary/10 rounded-lg -z-10 translate-x-4 translate-y-4" />
      <div
        class="absolute inset-0 bg-card border-4 border-primary/5 rounded-lg -z-20 translate-x-8 translate-y-8" />
    </div>

    <!-- CTA Button -->
    <div class="flex flex-col sm:flex-row gap-4">
      <NuxtLink to="/create">
        <Button size="lg" class="text-lg px-8 py-6"> Start Playing </Button>
      </NuxtLink>
      <GameRules size="lg" />
    </div>
  </div>
</template>

<style scoped>
/* Add subtle glow effect in dark mode */
.dark .bg-card {
  box-shadow: 0 0 60px rgba(72, 187, 120, 0.1);
}
</style>

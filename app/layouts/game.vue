<script setup lang="ts"></script>

<template>
  <main class="h-screen w-screen flex justify-center items-center z-10 relative">
    <div class="absolute top-2 left-2 flex gap-4">
      <ModeToggle />
      <LeaveRoom />
      <GameRules />
    </div>

    <slot />
  </main>
</template>

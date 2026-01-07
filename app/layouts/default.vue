<script setup lang="ts"></script>

<template>
  <main class="h-screen w-screen flex justify-center items-center z-50">
    <ModeToggle />
    <slot />
  </main>
  <div class="background fixed h-screen w-screen"></div>
</template>

<style scoped>
.background {
  z-index: 0;
  opacity: 0.5;
  background-image: linear-gradient(#924343 2px, transparent 2px),
    linear-gradient(90deg, #924343 2px, transparent 2px), linear-gradient(#924343 1px, transparent 1px),
    linear-gradient(90deg, #924343 1px, #e5e5f7 1px);
  background-size: 50px 50px, 50px 50px, 10px 10px, 10px 10px;
  background-position: -2px -2px, -2px -2px, -1px -1px, -1px -1px;
}
</style>

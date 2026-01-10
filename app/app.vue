<script setup lang="ts">
import "vue-sonner/style.css";
import { Toaster } from "@/components/ui/sonner";
import Debug from "./components/debug.vue";
</script>

<template>
  <div>
    <BackgroundPattern />
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
    <Toaster />
    <Debug class="z-50" />
    <a
      href="https://www.buymeacoffee.com/tnyggdjhjxo"
      target="_blank"
      class="fixed bottom-6 left-6 z-50 bg-orange-500 text-white px-4 py-2 rounded-full">
      ☕ Support me
    </a>
  </div>
</template>

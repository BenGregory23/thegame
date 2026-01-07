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
  </div>
</template>

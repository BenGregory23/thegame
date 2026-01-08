<script setup lang="ts">
import { LogOut } from "lucide-vue-next";
const { leaveRoom } = useRoom();
</script>

<template>
  <Button @click="leaveRoom">
    <LogOut />
    Leave room
  </Button>
</template>

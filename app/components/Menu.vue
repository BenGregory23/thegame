<script setup lang="ts">
import { generateRoomNumber } from "~/lib/utils.js";
import Input from "./ui/input/Input.vue";

const room = generateRoomNumber();
const typedRoom = ref("dstgz6");
const router = useRouter();
const { username } = useUser();
const { setRoom } = useGame();

function enterRoom(room: string) {
  router.push("/room/" + room);
  setRoom(room);
}
</script>

<template>
  <div class="p-5 flex flex-col gap-4">
    <div class="flex flex-col items-center justify-center gap-8">
      <div class="rounded-full size-24 bg-amber-300"></div>
      <Input placeholder="Username" v-model="username" />
    </div>

    <div class="flex gap-4">
      <Button class="w-1/2" @click="enterRoom(room)"> Create a game </Button>
      <InputGroup class="w-1/2">
        <InputGroupInput :placeholder="typedRoom" v-model="typedRoom" />
        <InputGroupAddon align="inline-end">
          <InputGroupButton variant="secondary" @click="enterRoom(typedRoom)"> Join Game </InputGroupButton>
        </InputGroupAddon>
      </InputGroup>
    </div>
  </div>
</template>

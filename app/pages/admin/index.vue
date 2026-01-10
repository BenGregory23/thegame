<script setup lang="ts">
import { Trash2 } from "lucide-vue-next";
import { gameManager } from "~~/server/socket/managers/GameManager";

const { data, status, error, refresh, clear } = await useFetch("/api/games");
</script>

<template>
  <main class="flex flex-col w-full h-screen">
    <section class="h-32 p-8 flex gap-4">
      <div class="border-2 rounded-lg w-56 h-fit p-3 flex flex-col gap-2">
        <span class="text-base font-semibold w-full">
          Data fetching : <Badge>{{ status }}</Badge>
        </span>

        <Button class="w-full" @click="refresh()"> Refresh </Button>
      </div>
      <span>{{ error }}</span>

      <Button variant="destructive" @click="gameManager.cleanupInactiveGames()">
        <Trash2 />
        Cleanup inactive games
      </Button>
    </section>
    <Table class="w-1/2">
      <TableCaption>List of current games</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead class="w-25"> Room number </TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Number of players</TableHead>
          <TableHead>Last Activity</TableHead>
          <TableHead class="text-left">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow v-for="game in data">
          <TableCell class="font-medium"> {{ game.roomId }} </TableCell>
          <TableCell
            ><Badge>{{ game.status }}</Badge></TableCell
          >
          <TableCell>{{ game.players.length ?? 0 }}</TableCell>
          <TableCell class="">
            {{ new Date(game.lastActivity).toLocaleTimeString() }}
            -
            {{ new Date(game.lastActivity).toLocaleDateString() }}
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
  </main>
</template>

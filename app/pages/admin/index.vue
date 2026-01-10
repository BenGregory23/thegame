<script setup lang="ts">
import { Trash2, RefreshCw, Gamepad2, Users, Clock, TrendingUp, Search, Filter } from "lucide-vue-next";
import { Badge } from "~/components/ui/badge";
import { Input } from "~/components/ui/input";

const { data, status, error, refresh } = await useFetch("/api/games");

// Auto-refresh every 10 seconds
const autoRefresh = ref(true);
const searchQuery = ref("");
const statusFilter = ref<string>("all");

let refreshInterval: NodeJS.Timeout | null = null;

onMounted(() => {
  if (autoRefresh.value) {
    refreshInterval = setInterval(() => {
      refresh();
    }, 10000);
  }
});

onBeforeUnmount(() => {
  if (refreshInterval) {
    clearInterval(refreshInterval);
  }
});

watch(autoRefresh, (newVal) => {
  if (newVal) {
    refreshInterval = setInterval(() => {
      refresh();
    }, 10000);
  } else if (refreshInterval) {
    clearInterval(refreshInterval);
    refreshInterval = null;
  }
});

// Stats
const totalGames = computed(() => data.value?.length ?? 0);
const activeGames = computed(() => data.value?.filter((g) => g.status === "in_progress").length ?? 0);
const waitingGames = computed(() => data.value?.filter((g) => g.status === "waiting").length ?? 0);
const totalPlayers = computed(() => data.value?.reduce((sum, game) => sum + game.players.length, 0) ?? 0);

// Filtered games
const filteredGames = computed(() => {
  if (!data.value) return [];

  return data.value.filter((game) => {
    const matchesSearch = game.roomId.toLowerCase().includes(searchQuery.value.toLowerCase());
    const matchesStatus = statusFilter.value === "all" || game.status === statusFilter.value;
    return matchesSearch && matchesStatus;
  });
});

// Time since last activity
const getTimeSince = (timestamp: number) => {
  const seconds = Math.floor((Date.now() - timestamp) / 1000);

  if (seconds < 60) return `${seconds}s ago`;
  if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`;
  if (seconds < 86400) return `${Math.floor(seconds / 3600)}h ago`;
  return `${Math.floor(seconds / 86400)}d ago`;
};

const cleanupGames = async () => {
  await $fetch("/api/games/cleanup", { method: "POST" });
  refresh();
};

// Status badge variant
const getStatusVariant = (status: string) => {
  switch (status) {
    case "waiting":
      return "secondary";
    case "in_progress":
      return "default";
    case "finished":
      return "outline";
    default:
      return "secondary";
  }
};
</script>

<template>
  <div class="min-h-screen w-full bg-background p-6 lg:p-8">
    <!-- Header -->
    <div class="mb-8">
      <h1 class="text-4xl font-bold mb-2">Game Dashboard</h1>
      <p class="text-muted-foreground">Monitor and manage active game sessions</p>
    </div>

    <!-- Stats Cards -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      <!-- Total Games -->
      <Card>
        <CardHeader class="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle class="text-sm font-medium">Total Games</CardTitle>
          <Gamepad2 class="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div class="text-2xl font-bold">{{ totalGames }}</div>
          <p class="text-xs text-muted-foreground">All game rooms</p>
        </CardContent>
      </Card>

      <!-- Active Games -->
      <Card>
        <CardHeader class="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle class="text-sm font-medium">Active Games</CardTitle>
          <TrendingUp class="h-4 w-4 text-accent" />
        </CardHeader>
        <CardContent>
          <div class="text-2xl font-bold text-accent">{{ activeGames }}</div>
          <p class="text-xs text-muted-foreground">Currently playing</p>
        </CardContent>
      </Card>

      <!-- Waiting Rooms -->
      <Card>
        <CardHeader class="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle class="text-sm font-medium">Waiting Rooms</CardTitle>
          <Clock class="h-4 w-4 text-secondary" />
        </CardHeader>
        <CardContent>
          <div class="text-2xl font-bold">{{ waitingGames }}</div>
          <p class="text-xs text-muted-foreground">In lobby</p>
        </CardContent>
      </Card>

      <!-- Total Players -->
      <Card>
        <CardHeader class="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle class="text-sm font-medium">Total Players</CardTitle>
          <Users class="h-4 w-4 text-primary" />
        </CardHeader>
        <CardContent>
          <div class="text-2xl font-bold text-primary">{{ totalPlayers }}</div>
          <p class="text-xs text-muted-foreground">Across all games</p>
        </CardContent>
      </Card>
    </div>

    <!-- Controls -->
    <Card class="mb-6">
      <CardHeader>
        <div class="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div class="space-y-1">
            <CardTitle>Active Games</CardTitle>
            <CardDescription>
              {{ filteredGames.length }} game{{ filteredGames.length !== 1 ? "s" : "" }} found
            </CardDescription>
          </div>

          <div class="flex flex-col sm:flex-row gap-2">
            <!-- Search -->
            <div class="relative w-full sm:w-64">
              <Search class="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input v-model="searchQuery" placeholder="Search room ID..." class="pl-9" />
            </div>

            <!-- Status Filter -->
            <Select v-model="statusFilter">
              <SelectTrigger class="w-full sm:w-40">
                <SelectValue placeholder="Filter status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="waiting">Waiting</SelectItem>
                <SelectItem value="in_progress">In Progress</SelectItem>
                <SelectItem value="finished">Finished</SelectItem>
              </SelectContent>
            </Select>

            <!-- Refresh Button -->
            <Button variant="outline" size="icon" @click="refresh()" :disabled="status === 'pending'">
              <RefreshCw class="h-4 w-4" :class="{ 'animate-spin': status === 'pending' }" />
            </Button>

            <!-- Cleanup Button -->
            <Button variant="destructive" @click="cleanupGames" class="gap-2">
              <Trash2 class="h-4 w-4" />
              <span class="hidden sm:inline">Cleanup</span>
            </Button>
          </div>
        </div>
      </CardHeader>

      <CardContent>
        <!-- Auto-refresh toggle -->
        <div class="flex items-center justify-between mb-4 p-3 rounded-lg bg-muted/50">
          <div class="flex items-center gap-2">
            <RefreshCw class="h-4 w-4 text-muted-foreground" />
            <span class="text-sm font-medium">Auto-refresh</span>
            <span class="text-xs text-muted-foreground">(every 10s)</span>
          </div>
          <Switch v-model:checked="autoRefresh" />
        </div>

        <!-- Error State -->
        <Alert v-if="error" variant="destructive" class="mb-4">
          <AlertDescription>{{ error }}</AlertDescription>
        </Alert>

        <!-- Loading State -->
        <div v-if="status === 'pending' && !data" class="text-center py-12">
          <RefreshCw class="h-8 w-8 animate-spin mx-auto mb-4 text-muted-foreground" />
          <p class="text-muted-foreground">Loading games...</p>
        </div>

        <!-- Empty State -->
        <div v-else-if="filteredGames.length === 0" class="text-center py-12">
          <Gamepad2 class="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
          <h3 class="text-lg font-semibold mb-1">No games found</h3>
          <p class="text-muted-foreground text-sm">
            {{
              searchQuery || statusFilter !== "all"
                ? "Try adjusting your filters"
                : "Create a game to get started"
            }}
          </p>
        </div>

        <!-- Games Table -->
        <div v-else class="rounded-lg border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead class="w-32">Room ID</TableHead>
                <TableHead>Status</TableHead>
                <TableHead class="text-center">Players</TableHead>
                <TableHead>Last Activity</TableHead>
                <TableHead class="text-right">Age</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow
                v-for="game in filteredGames"
                :key="game.roomId"
                class="hover:bg-muted/50 transition-colors">
                <!-- Room ID -->
                <TableCell class="font-mono font-semibold">
                  {{ game.roomId }}
                </TableCell>

                <!-- Status -->
                <TableCell>
                  <Badge :variant="getStatusVariant(game.status)">
                    {{ game.status.replace("_", " ") }}
                  </Badge>
                </TableCell>

                <!-- Players -->
                <TableCell class="text-center">
                  <div class="flex items-center justify-center gap-2">
                    <Users class="h-4 w-4 text-muted-foreground" />
                    <span class="font-semibold">{{ game.players.length }}</span>
                  </div>
                </TableCell>

                <!-- Last Activity Time -->
                <TableCell class="text-sm text-muted-foreground">
                  {{ new Date(game.lastActivity).toLocaleString() }}
                </TableCell>

                <!-- Time Since -->
                <TableCell class="text-right">
                  <Badge variant="outline" class="font-mono text-xs">
                    {{ getTimeSince(game.lastActivity) }}
                  </Badge>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  </div>
</template>

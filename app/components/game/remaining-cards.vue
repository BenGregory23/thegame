<script setup lang="ts">
import { Layers } from "lucide-vue-next";

const { players, deckSize } = useGame();

// Total remaining cards across deck and all player hands
const remainingCount = computed(
    () =>
        deckSize.value +
        players.value.reduce(
            (acc: number, val: IPlayer) => (acc += val.handSize!),
            0,
        ),
);

// How many cards to visually show in stack (max 6 for clean look)
const displayCount = computed(() => {
    if (remainingCount.value === 0) return 0;
    if (remainingCount.value < 5) return Math.max(remainingCount.value, 1);
    if (remainingCount.value < 20) return 4;
    if (remainingCount.value < 50) return 5;
    return 6;
});
</script>

<template>
    <TooltipProvider>
        <Tooltip>
            <TooltipTrigger>
                <div class="space-y-3">
                    <!-- Card Stack Counter -->
                    <div
                        class="relative w-fit mx-auto"
                        style="padding-bottom: 80px; padding-right: 56px"
                    >
                        <!-- Stacked cards (back to front) -->
                        <div
                            v-for="index in displayCount"
                            :key="index"
                            class="absolute rounded-md border-2 bg-card text-card-foreground border-border shadow-md select-none pointer-events-none w-14 h-20 lg:w-16 lg:h-24 flex justify-center items-center"
                            :style="{
                                left: `${(index - 1) * 2}px`,
                                top: `${(index - 1) * 2}px`,
                                opacity:
                                    index === displayCount
                                        ? 1
                                        : 0.6 - (displayCount - index) * 0.1,
                                transform:
                                    index % 2 === 0
                                        ? 'rotate(2deg)'
                                        : 'rotate(-2deg)',
                            }"
                        >
                            <!-- Only show number on top card -->
                            <template v-if="index === displayCount">
                                <!-- Center number -->
                                <div class="flex flex-col items-center gap-1">
                                    <span
                                        class="text-3xl lg:text-4xl font-black text-muted-foreground"
                                    >
                                        {{ remainingCount }}
                                    </span>
                                </div>
                            </template>

                            <!-- Back cards are just blank -->
                            <template v-else>
                                <div
                                    class="w-full h-full flex items-center justify-center opacity-20"
                                >
                                    <Layers
                                        class="w-6 h-6 text-muted-foreground"
                                    />
                                </div>
                            </template>
                        </div>
                    </div>
                </div>
            </TooltipTrigger>
            <TooltipContent>
                <p>Remaining cards to place</p>
            </TooltipContent>
        </Tooltip>
    </TooltipProvider>
</template>

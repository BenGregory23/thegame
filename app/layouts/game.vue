<script setup lang="ts"></script>

<template>
    <main
        class="h-screen w-screen flex justify-center items-center z-10 relative"
    >
        <div class="absolute top-2 left-2 flex gap-4">
            <ModeToggle />
            <LeaveRoom />
            <GameRules />
            <!-- <ReportBug /> -->
        </div>

        <slot />
    </main>

    <a
        href="https://www.buymeacoffee.com/tnyggdjhjxo"
        target="_blank"
        class="fixed bottom-6 left-6 z-50 font-medium"
        aria-label="Soutenez mon travail en m'offrant un café"
    >
        <Button
            size="lg"
            class="bg-linear-to-r from-blue-600 to-indigo-600 text-white transition-all duration-300 flex items-center gap-2 px-5 py-2.5 shadow-md hover:shadow-lg hover:from-blue-700 hover:to-indigo-700 border border-blue-800"
        >
            <span>☕</span>
            <span>Support me</span>
        </Button>
    </a>
</template>

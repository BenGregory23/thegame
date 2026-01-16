<script setup lang="ts">
import { Github } from "lucide-vue-next";
</script>

<template>
    <main
        class="h-screen w-screen flex justify-center items-center z-10 relative"
    >
        <div class="absolute top-2 left-2">
            <ModeToggle />
        </div>
        <slot />
    </main>

    <div class="fixed bottom-6 left-6 z-50 font-medium flex space-x-4">
        <a
            href="https://www.buymeacoffee.com/tnyggdjhjxo"
            target="_blank"
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

        <a
            href="https://github.com/BenGregory23/thegame"
            target="_blank"
            class=""
            aria-label="Soutenez mon travail en m'offrant un café"
        >
            <Button
                size="lg"
                class="bg-linear-to-r from-blue-600 to-indigo-600 text-white transition-all duration-300 flex items-center gap-2 px-5 py-2.5 shadow-md hover:shadow-lg hover:from-blue-700 hover:to-indigo-700 border border-blue-800"
            >
                <span><Github /></span>
                <span>Project source</span>
            </Button>
        </a>
    </div>
</template>

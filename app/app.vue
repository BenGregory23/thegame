<script setup lang="ts">
import "vue-sonner/style.css";
import { Toaster } from "@/components/ui/sonner";

useSeoMeta({
    title: "The Gamo",
    ogTitle: "The Gamo, the game's web version",
    description: "Play the game online with your friends!",
    ogDescription: "Play the game online with your friends!",
    ogImage: "https://example.com/image.png",
    twitterCard: "summary_large_image",
});

useHead({
    htmlAttrs: {
        lang: "en",
    },
});
</script>

<template>
    <div>
        <BackgroundPattern />
        <NuxtLayout>
            <NuxtPage />
        </NuxtLayout>
        <Toaster />
        <!-- <Debug class="z-50" /> -->

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
    </div>
</template>

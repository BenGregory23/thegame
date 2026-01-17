<script setup lang="ts">
import "vue-sonner/style.css";
import { Toaster } from "@/components/ui/sonner";

useSeoMeta({
    title: "The Gamo",
    ogTitle: "The Gamo, The Game's web version",
    description: "Play the game online with your friends!",
    ogDescription: "Play the game online with your friends!",
    ogImage: "https://thegamo.app/presentation_card.png",
    ogImageWidth: "1200",
    ogImageHeight: "630",
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
    </div>
</template>

<!-- error.vue -->
<script setup lang="ts">
import {
    AlertCircle,
    Home,
    RefreshCw,
    ArrowLeft,
    HelpCircle,
    ServerCrash,
    Wifi,
} from "lucide-vue-next";

const error = useError();

const errorConfig = computed(() => {
    const statusCode = error.value?.statusCode || 500;

    if (statusCode === 404) {
        return {
            icon: HelpCircle,
            code: "404",
            title: "Page Not Found",
            message:
                "Oops! The page you're looking for doesn't exist. It might have been moved or deleted.",
            color: "text-primary",
            bgColor: "bg-primary/10",
        };
    } else if (statusCode >= 500) {
        return {
            icon: ServerCrash,
            code: String(statusCode),
            title: "Server Error",
            message:
                "Something went wrong on our end. We're working to fix it. Please try again in a moment.",
            color: "text-destructive",
            bgColor: "bg-destructive/10",
        };
    } else {
        return {
            icon: AlertCircle,
            code: String(statusCode),
            title: error.value?.statusMessage || "Something Went Wrong",
            message:
                error.value?.message ||
                "An unexpected error occurred. Please try again or contact support if the problem persists.",
            color: "text-destructive",
            bgColor: "bg-destructive/10",
        };
    }
});

const handleError = () => {
    clearError({ redirect: "/" });
};

const goBack = () => {
    clearError();
    navigateTo("/");
};

const retry = () => {
    clearError({ redirect: useRoute().fullPath });
};
</script>

<template>
    <NuxtLayout>
        <div class="min-h-screen w-full flex items-center justify-center p-6">
            <Card class="max-w-2xl w-full border-2">
                <CardContent class="pt-12 pb-8 px-6 space-y-8">
                    <!-- Icon & Code -->
                    <div class="text-center space-y-6">
                        <!-- Error Icon -->
                        <div class="flex justify-center">
                            <div
                                class="w-24 h-24 rounded-full flex items-center justify-center border-4 transition-all"
                                :class="[errorConfig.bgColor]"
                            >
                                <component
                                    :is="errorConfig.icon"
                                    class="w-12 h-12"
                                    :class="errorConfig.color"
                                />
                            </div>
                        </div>

                        <!-- Error Code -->
                        <div v-if="errorConfig.code" class="space-y-2">
                            <div
                                class="text-8xl font-black tracking-tighter"
                                :class="errorConfig.color"
                            >
                                {{ errorConfig.code }}
                            </div>
                            <Separator class="max-w-24 mx-auto" />
                        </div>

                        <!-- Title & Message -->
                        <div class="space-y-3">
                            <h1 class="text-3xl font-bold">
                                {{ errorConfig.title }}
                            </h1>
                            <p
                                class="text-muted-foreground text-lg max-w-md mx-auto"
                            >
                                {{ errorConfig.message }}
                            </p>
                        </div>

                        <!-- Stack trace in dev mode -->
                        <div
                            v-if="error?.stack && $config.public.dev"
                            class="mt-8"
                        >
                            <details class="text-left">
                                <summary
                                    class="cursor-pointer text-sm text-muted-foreground hover:text-foreground"
                                >
                                    Show error details
                                </summary>
                                <pre
                                    class="mt-4 p-4 bg-muted rounded-lg text-xs overflow-auto max-h-64"
                                    >{{ error.stack }}</pre
                                >
                            </details>
                        </div>
                    </div>

                    <!-- Action Buttons -->
                    <div class="flex flex-col sm:flex-row gap-3 justify-center">
                        <Button @click="handleError" size="lg" class="gap-2">
                            <Home class="w-4 h-4" />
                            Go Home
                        </Button>

                        <Button
                            @click="goBack"
                            variant="outline"
                            size="lg"
                            class="gap-2"
                        >
                            <ArrowLeft class="w-4 h-4" />
                            Go Back
                        </Button>

                        <Button
                            v-if="error?.statusCode && error.statusCode >= 500"
                            @click="retry"
                            variant="secondary"
                            size="lg"
                            class="gap-2"
                        >
                            <RefreshCw class="w-4 h-4" />
                            Try Again
                        </Button>
                    </div>

                    <!-- Additional Help Text -->
                    <div class="text-center pt-4 border-t">
                        <p class="text-sm text-muted-foreground">
                            Need help?
                            <a
                                href="mailto:support@thegame.com"
                                class="text-primary hover:underline font-medium"
                            >
                                Contact Support
                            </a>
                        </p>
                    </div>
                </CardContent>
            </Card>
        </div>
    </NuxtLayout>
</template>

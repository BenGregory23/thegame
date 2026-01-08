<script setup lang="ts">
import { Circle } from "lucide-vue-next";

interface Props {
  value?: number;
  selected?: boolean;
  disabled?: boolean;
  variant?: "default" | "empty" | "back";
}

const props = withDefaults(defineProps<Props>(), {
  selected: false,
  disabled: false,
  variant: "default",
});

const emit = defineEmits<{
  click: [];
}>();

const handleClick = () => {
  if (!props.disabled) {
    emit("click");
  }
};
</script>

<template>
  <div class="relative group">
    <div
      v-if="value"
      @click="handleClick"
      :class="[
        'relative rounded-md font-bold transition-all duration-200 select-none border-2',
        'w-14 h-20 lg:w-16 lg:h-24',
        'flex justify-center items-center text-3xl lg:text-4xl',
        'shadow-lg active:shadow-sm',

        // Default state
        !selected &&
          !disabled &&
          'bg-card text-card-foreground border-border hover:border-primary/50 hover:-translate-y-1 hover:shadow-xl cursor-pointer',

        // Selected state
        selected &&
          'bg-primary text-primary-foreground border-primary -translate-y-2 ring-4 ring-accent shadow-2xl scale-105',

        // Disabled state
        disabled && 'opacity-50 cursor-not-allowed',

        // Hover on unselected
        !selected && !disabled && 'hover:scale-[1.02]',
      ]"
      :aria-label="`Card with value ${value}`"
      :aria-pressed="selected"
      :tabindex="disabled ? -1 : 0"
      role="button">
      <!-- Corner value (top left) -->
      <span class="absolute top-1 left-1.5 text-xs lg:text-sm font-bold opacity-70">
        {{ value }}
      </span>

      <!-- Main value (center) -->
      <span class="font-black">{{ value }}</span>

      <!-- Corner value (bottom right, upside down) -->
      <span class="absolute bottom-1 right-1.5 text-xs lg:text-sm font-bold opacity-70 rotate-180">
        {{ value }}
      </span>

      <!-- Shine effect on hover -->
      <div
        v-if="!selected && !disabled"
        class="absolute inset-0 rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none"
        style="background: linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, transparent 50%)" />
    </div>

    <!-- Empty card slot -->
    <div
      v-else
      class="rounded-md border-2 border-dashed border-muted-foreground/30 bg-muted/20 w-14 h-20 lg:w-16 lg:h-24 flex justify-center items-center transition-colors duration-200"
      :aria-label="'Empty card slot'">
      <Circle class="text-muted-foreground/40 w-6 h-6" :stroke-width="1.5" />
    </div>

    <!-- Card shadow for depth -->
    <div
      v-if="value && !selected"
      class="absolute inset-0 bg-card border-2 border-border/50 rounded-md -z-10 translate-y-1 opacity-30" />
  </div>
</template>

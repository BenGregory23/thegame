<template>
  <div class="dotted-grid fixed top-0 left-0 w-full h-screen z-0" />
</template>

<style scoped>
.dotted-grid {
  background-image: radial-gradient(circle at 1px 1px, var(--color-secondary) 1px, transparent 0);
  background-size: 20px 20px;
}

.dashed-grid {
  background-image: linear-gradient(to right, var(--color-secondary) 1px, transparent 1px),
    linear-gradient(to bottom, var(--color-secondary) 1px, transparent 1px);
  background-size: 20px 20px;
  mask-image: repeating-linear-gradient(to right, black 0px, black 3px, transparent 3px, transparent 8px),
    repeating-linear-gradient(to bottom, black 0px, black 3px, transparent 3px, transparent 8px);
  -webkit-mask-image: repeating-linear-gradient(
      to right,
      black 0px,
      black 3px,
      transparent 3px,
      transparent 8px
    ),
    repeating-linear-gradient(to bottom, black 0px, black 3px, transparent 3px, transparent 8px);
  mask-composite: intersect;
  -webkit-mask-composite: source-in;
}
</style>

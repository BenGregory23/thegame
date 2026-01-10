<script setup lang="ts">
import { Bug } from "lucide-vue-next";

const content = ref<string>();

function sendBug() {
  // TODO call backend
}
</script>

<template>
  <Dialog>
    <DialogTrigger>
      <Button variant="outline" size="lg"> <Bug />Signaler un bug</Button>
    </DialogTrigger>
    <DialogContent>
      <DialogHeader>
        <DialogTitle class="text-xl">Signaler un bug</DialogTitle>
        <DialogDescription class="space-y-4">
          <Textarea :rows="7" placeholder="Décrivez le bug que vous avez rencontré" />

          <Button>Valider</Button>
        </DialogDescription>
      </DialogHeader>
    </DialogContent>
  </Dialog>
</template>

<script setup lang="ts">
import {
  HelpCircle,
  Target,
  Play,
  Lightbulb,
  CheckCircle,
  TrendingUp,
  TrendingDown,
  X,
} from "lucide-vue-next";

const { size } = defineProps<{
  size?: "default" | "lg";
}>();
</script>

<template>
  <Dialog>
    <DialogTrigger as-child>
      <Button :class="size && size == 'lg' && 'text-lg px-8 py-6'" variant="outline" size="lg" class="gap-2">
        <HelpCircle class="w-5 h-5" />
        How to Play
      </Button>
    </DialogTrigger>

    <DialogContent class="max-w-3xl max-h-[85vh] overflow-y-auto">
      <DialogHeader>
        <DialogTitle class="text-3xl font-bold">
          How to Play <span class="text-primary">The Gamo</span>
        </DialogTitle>
        <DialogDescription> A cooperative card game where teamwork is key to victory </DialogDescription>
      </DialogHeader>

      <Tabs default-value="rules" class="w-full">
        <TabsList class="grid w-full grid-cols-2">
          <TabsTrigger value="rules" class="gap-2">
            <Play class="w-4 h-4" />
            Rules
          </TabsTrigger>
          <TabsTrigger value="hints" class="gap-2">
            <Lightbulb class="w-4 h-4" />
            Tips & Tricks
          </TabsTrigger>
        </TabsList>

        <!-- Rules Tab -->
        <TabsContent value="rules" class="space-y-6 mt-6">
          <!-- Objective -->
          <Card>
            <CardHeader>
              <CardTitle class="flex items-center gap-2 text-xl">
                <Target class="w-5 h-5 text-primary" />
                Objective
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p class="text-base leading-relaxed">
                Work together to play all cards from the deck onto four piles. The goal is to empty your hands
                and the draw pile without getting stuck!
              </p>
            </CardContent>
          </Card>

          <!-- Setup -->
          <Card>
            <CardHeader>
              <CardTitle class="text-xl">Setup</CardTitle>
            </CardHeader>
            <CardContent class="space-y-3">
              <div class="flex items-start gap-3">
                <div
                  class="mt-1 shrink-0 w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-bold">
                  1
                </div>
                <p>Each player starts with <strong>7 cards</strong></p>
              </div>
              <div class="flex items-start gap-3">
                <div
                  class="mt-1 shrink-0 w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-bold">
                  2
                </div>
                <p>Cards are numbered from <strong>2 to 99</strong></p>
              </div>
              <div class="flex items-start gap-3">
                <div
                  class="mt-1 shrink-0 w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-bold">
                  3
                </div>
                <p>There are <strong>4 piles</strong>: 2 ascending and 2 descending</p>
              </div>
            </CardContent>
          </Card>

          <!-- The Four Piles -->
          <Card>
            <CardHeader>
              <CardTitle class="text-xl">The Four Piles</CardTitle>
            </CardHeader>
            <CardContent class="space-y-4">
              <!-- Ascending Piles -->
              <div class="p-4 rounded-lg bg-accent/10 border-2 border-accent/30">
                <div class="flex items-center gap-2 mb-3">
                  <TrendingUp class="w-5 h-5 text-accent" />
                  <h4 class="font-bold text-lg">Ascending Piles (×2)</h4>
                </div>
                <div class="space-y-2 text-sm">
                  <p>• Start at <strong>1</strong> (imaginary)</p>
                  <p>• Play cards in <strong>increasing</strong> order</p>
                  <p>• Example: 5 → 12 → 34 → 67</p>
                  <p class="text-accent font-semibold">
                    <strong>Special:</strong> You can play a card exactly <strong>10 lower</strong> (e.g., 50
                    → 40)
                  </p>
                </div>
              </div>

              <!-- Descending Piles -->
              <div class="p-4 rounded-lg bg-destructive/10 border-2 border-destructive/30">
                <div class="flex items-center gap-2 mb-3">
                  <TrendingDown class="w-5 h-5 text-destructive" />
                  <h4 class="font-bold text-lg">Descending Piles (×2)</h4>
                </div>
                <div class="space-y-2 text-sm">
                  <p>• Start at <strong>100</strong> (imaginary)</p>
                  <p>• Play cards in <strong>decreasing</strong> order</p>
                  <p>• Example: 95 → 78 → 43 → 21</p>
                  <p class="text-destructive font-semibold">
                    <strong>Special:</strong> You can play a card exactly <strong>10 higher</strong> (e.g., 40
                    → 50)
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <!-- Gameplay -->
          <Card>
            <CardHeader>
              <CardTitle class="text-xl">Your Turn</CardTitle>
            </CardHeader>
            <CardContent class="space-y-3">
              <div class="flex items-start gap-3">
                <div
                  class="mt-1 shrink-0 w-6 h-6 rounded-full bg-secondary text-secondary-foreground flex items-center justify-center text-sm font-bold">
                  1
                </div>
                <p>Play <strong>at least 2 cards</strong> from your hand onto any of the 4 piles</p>
              </div>
              <div class="flex items-start gap-3">
                <div
                  class="mt-1 shrink-0 w-6 h-6 rounded-full bg-secondary text-secondary-foreground flex items-center justify-center text-sm font-bold">
                  2
                </div>
                <p>Draw back up to <strong>7 cards</strong> (if cards remain in deck)</p>
              </div>
              <div class="flex items-start gap-3">
                <div
                  class="mt-1 shrink-0 w-6 h-6 rounded-full bg-secondary text-secondary-foreground flex items-center justify-center text-sm font-bold">
                  3
                </div>
                <p>Pass turn to the next player</p>
              </div>

              <Alert class="mt-4">
                <AlertDescription>
                  <strong>Important:</strong> You cannot discuss specific card numbers with other players!
                </AlertDescription>
              </Alert>
            </CardContent>
          </Card>

          <!-- Winning and Losing -->
          <Card>
            <CardHeader>
              <CardTitle class="text-xl">Winning & Losing</CardTitle>
            </CardHeader>
            <CardContent class="space-y-3">
              <div class="p-3 rounded-lg bg-accent/10 border border-accent/50">
                <div class="flex items-center gap-2 mb-2">
                  <CheckCircle class="w-5 h-5 text-accent" />
                  <strong>You WIN if:</strong>
                </div>
                <p class="text-sm">All cards from the deck and all hands are played!</p>
              </div>

              <div class="p-3 rounded-lg bg-destructive/10 border border-destructive/50">
                <div class="flex items-center gap-2 mb-2">
                  <X class="w-5 h-5 text-destructive" />
                  <strong>You LOSE if:</strong>
                </div>
                <p class="text-sm">A player cannot play their required 2 cards on their turn</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <!-- Tips & Tricks Tab -->
        <TabsContent value="hints" class="space-y-4 mt-6">
          <Card>
            <CardHeader>
              <CardTitle class="flex items-center gap-2 text-xl">
                <Lightbulb class="w-5 h-5 text-accent" />
                Pro Tips
              </CardTitle>
            </CardHeader>
            <CardContent class="space-y-4">
              <div class="space-y-3">
                <div class="flex items-start gap-3">
                  <Badge variant="secondary" class="mt-1">1</Badge>
                  <div>
                    <strong>Keep gaps small</strong>
                    <p class="text-sm text-muted-foreground">
                      Try to minimize the jumps between cards to leave more options for others
                    </p>
                  </div>
                </div>

                <Separator />

                <div class="flex items-start gap-3">
                  <Badge variant="secondary" class="mt-1">2</Badge>
                  <div>
                    <strong>Save your backwards moves</strong>
                    <p class="text-sm text-muted-foreground">
                      The -10/+10 tricks are powerful. Use them wisely when you're stuck!
                    </p>
                  </div>
                </div>

                <Separator />

                <div class="flex items-start gap-3">
                  <Badge variant="secondary" class="mt-1">3</Badge>
                  <div>
                    <strong>Communicate creatively</strong>
                    <p class="text-sm text-muted-foreground">
                      You can't say "I have 42" but you can say "I have low cards" or "I'm stuck on ascending
                      piles"
                    </p>
                  </div>
                </div>

                <Separator />

                <div class="flex items-start gap-3">
                  <Badge variant="secondary" class="mt-1">4</Badge>
                  <div>
                    <strong>Think ahead</strong>
                    <p class="text-sm text-muted-foreground">
                      Don't just play your lowest/highest cards. Consider what ranges others might need
                    </p>
                  </div>
                </div>

                <Separator />

                <div class="flex items-start gap-3">
                  <Badge variant="secondary" class="mt-1">5</Badge>
                  <div>
                    <strong>Middle cards are flexible</strong>
                    <p class="text-sm text-muted-foreground">
                      Cards around 50 can often be played on any pile. Save extreme cards (very low/high) for
                      when you need them
                    </p>
                  </div>
                </div>

                <Separator />

                <div class="flex items-start gap-3">
                  <Badge variant="secondary" class="mt-1">6</Badge>
                  <div>
                    <strong>Watch the deck size</strong>
                    <p class="text-sm text-muted-foreground">
                      As the deck gets smaller, be more conservative. You'll have fewer chances to draw
                      helpful cards
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card class="bg-primary/5 border-primary/20">
            <CardContent class="pt-6">
              <p class="text-center text-sm font-medium">
                💡 <strong>Remember:</strong> This is a cooperative game. Work together and you'll master it!
              </p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </DialogContent>
  </Dialog>
</template>

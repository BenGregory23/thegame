import consola from "consola";
import { GameStatus, IPlayer, ICard, IStack, StackType } from "~~/shared/types";

export class Game {
    roomId: string;
    hostId: string;
    deck: ICard[] = [];
    stacks: Map<string, IStack> = new Map();
    players: Map<string, IPlayer> = new Map();
    status: GameStatus = GameStatus.WAITING;
    turnIndex: number = 0;
    currentTurn: string | null = null;
    lastActivity: number = Date.now();
    settings: {
        maxPlayers: number;
        minPlayers: number;
    };
    MINIMUM_HAND_LENGTH = 7;

    constructor(roomId: string, hostId: string) {
        this.roomId = roomId;
        this.hostId = hostId;
        this.settings = {
            maxPlayers: 4,
            minPlayers: 2
        };
    }

    addPlayer(socketId: string, username: string) {
        if (this.players.size >= this.settings.maxPlayers) {
            throw new Error("Game is full");
        }
        if (this.status !== GameStatus.WAITING) {
            throw new Error("Game already started");
        }

        this.players.set(socketId, { username: username, id: socketId, hand: [], isReady: false })
    }

    removePlayer(socketId: string) {
        this.players.delete(socketId);

        // If host leaves, assign new host
        if (this.hostId === socketId && this.players.size > 0) {
            this.hostId = Array.from(this.players.keys())[0];
        }

        // End game if not enough players
        if (this.status === GameStatus.IN_PROGRESS && this.players.size < this.settings.minPlayers) {
            this.status = GameStatus.FINISHED;
        }
    }

    // Game Lifecycle
    canStart(): boolean {
        console.log(this.players.size)
        return (
            this.status === GameStatus.WAITING &&
            this.players.size >= this.settings.minPlayers
            //  &&
            // Array.from(this.players.values()).every(p => p.isReady)
        );
    }

    startGame(): void {
        if (!this.canStart()) {
            throw new Error("Cannot start game");
        }

        this.status = GameStatus.IN_PROGRESS;
        this.initDeck();
        this.initPlayersHands();
        this.initStacks()
        this.setFirstTurn()
    }

    private setFirstTurn(): void {
        const playerIds = Array.from(this.players.keys());
        this.currentTurn = playerIds[0];
        this.turnIndex = 0;
    }

    nextTurn(): void {

        this.replenishPlayerHand(this.currentTurn!);
        // set next player to play
        const playerIds = Array.from(this.players.keys());
        this.turnIndex = (this.turnIndex + 1) % playerIds.length;
        this.currentTurn = playerIds[this.turnIndex];

        this.updateActivity();
    }

    private replenishPlayerHand(socketId: string) {
        // draw cards to replenish player hand
        const numberOfCardsToDraw = this.MINIMUM_HAND_LENGTH - this.players.get(socketId)!.hand!.length;
        if (!numberOfCardsToDraw) {
            throw new Error("Could not get number of cards to draw")
        }
        if (this.deck.length > 0) {
            for (let i = 0; i < numberOfCardsToDraw; i++) {
                this.drawCard(socketId)
            }
        }
    }

    private initDeck() {
        for (let i = 2; i <= 99; i++) {
            this.deck.push({ value: i });
        }
    }

    private initPlayersHands() {
        const FULL_HAND_LENGTH = 7;
        for (let player of this.players.values()) {
            for (let y = 0; y < FULL_HAND_LENGTH; y++) {
                const randomIndex = Math.floor(Math.random() * this.deck.length);
                const popped = this.deck.splice(randomIndex, 1);
                player.hand!.push(popped[0])
            }
        }
    }

    private initStacks() {
        this.stacks.set("UP_1", { type: StackType.INCREASE, cards: [] })
        this.stacks.set("UP_2", { type: StackType.INCREASE, cards: [] })
        this.stacks.set("DOWN_1", { type: StackType.DECREASE, cards: [] })
        this.stacks.set("DOWN_2", { type: StackType.DECREASE, cards: [] })
    }


    playCard(socketId: string, card: ICard, stackId: string) {
        const stack = this.stacks.get(stackId);
        if (!stack) {
            throw new Error("Stack not found");
        }

        const lastCard = stack.cards.at(stack.cards.length - 1)
        consola.info("stack", stack)
        consola.info("last card", lastCard)
        consola.info("card", card)

        if (stack.type === StackType.INCREASE) {
            if (lastCard) {
                if (card.value > lastCard?.value || card.value === (lastCard?.value - 10)) {
                    stack.cards.push(card);
                    this.removePlayerCard(socketId, card)
                }
            } else {
                stack.cards.push(card);
                this.removePlayerCard(socketId, card);
            }
        }
        else if (stack.type === StackType.DECREASE) {
            if (lastCard) {
                if (card.value < lastCard.value || card.value === (lastCard.value + 10)) {
                    stack.cards.push(card);
                    this.removePlayerCard(socketId, card);
                }
            } else {
                stack.cards.push(card);
                this.removePlayerCard(socketId, card);
            }
        }

        this.updateActivity();
    }

    private removePlayerCard(socketId: string, card: ICard) {
        const player = this.players.get(socketId);
        if (!player) {
            throw new Error("Player not found");
        }
        const index = player.hand!.findIndex(c => c.value == card.value);
        player.hand!.splice(index, 1);
        this.updateActivity();
    }

    drawCard(socketId: string): ICard {
        if (this.deck.length === 0) {
            throw new Error("No cards in deck.")
        }

        // Get random index instead of just popping from end
        const randomIndex = Math.floor(Math.random() * this.deck.length);
        const drawn: ICard = this.deck.splice(randomIndex, 1)[0];

        const player = this.players.get(socketId);
        if (!player) {
            throw new Error("Player not found");
        }

        player.hand!.push(drawn);
        this.updateActivity();

        return drawn;
    }

    getPublicState(): object {
        return {
            roomId: this.roomId,
            hostId: this.hostId,
            status: this.status,
            players: Array.from(this.players.values()).map(p => ({
                id: p.id,
                username: p.username,
                handSize: p.hand!.length,
                isReady: p.isReady
            })),
            stacks: Array.from(this.stacks.entries()).map(([id, stack]) => ({
                id,
                ...stack
            })),
            deckSize: this.deck.length,
            currentTurn: this.currentTurn,
            settings: this.settings
        };
    }

    getPlayerState(playerId: string) {
        const player = this.players.get(playerId);
        if (!player) return null;

        return {
            ...this.getPublicState(),
            yourHand: player.hand,
            yourId: playerId
        };
    }

    private updateActivity(): void {
        this.lastActivity = Date.now();
    }
}

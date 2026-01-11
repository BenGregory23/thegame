import consola from "consola";
import { GameStatus, IPlayer, ICard, IStack, StackType, IPublicState } from "~~/shared/types/types";

export class Game {
    roomId: string;
    hostId: string;
    deck: ICard[] = [];
    stacks: Map<string, IStack> = new Map();
    players: Map<string, IPlayer> = new Map();
    status: GameStatus = GameStatus.WAITING;
    turnIndex: number = 0;
    currentTurn: string | null = null;
    currentNumberOfCardsPlaced = 0;
    lastActivity: number = Date.now();
    settings: {
        maxPlayers: number;
        minPlayers: number;
    };
    MINIMUM_HAND_LENGTH = 7;
    NUMBER_OF_CARDS_TO_PLACE = 98;
    MIN_NUMBER_OF_CARDS_TO_PLACE_WITH_DECK = 2;

    constructor(roomId: string, hostId: string) {
        this.roomId = roomId;
        this.hostId = hostId;
        this.settings = {
            maxPlayers: 4,
            minPlayers: 2,
        };
    }

    addPlayer(socketId: string, username: string) {
        if (this.players.size >= this.settings.maxPlayers) {
            throw new Error("Game is full");
        }
        if (this.status !== GameStatus.WAITING) {
            throw new Error("Game already started");
        }

        this.players.set(socketId, { username: username, id: socketId, hand: [], isHost: socketId == this.hostId ? true : false })
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
        return (
            [GameStatus.WAITING, GameStatus.LOST].includes(this.status) &&
            this.players.size >= this.settings.minPlayers
        );
    }

    // Initialisation

    /**
     * Fills the deck with cards from 2 to 99
     */
    private initDeck() {
        this.deck = [];
        for (let i = 2; i <= 99; i++) {
            this.deck.push({ value: i });
        }
    }

    /**
     * Takes 7 cards for each player from the deck at random;
     */
    private initPlayersHands() {
        const FULL_HAND_LENGTH = 7;
        for (let player of this.players.values()) {
            if (player.hand && player.hand?.length > 0) player.hand = [];

            for (let y = 0; y < FULL_HAND_LENGTH; y++) {
                const randomIndex = Math.floor(Math.random() * this.deck.length);
                const popped = this.deck.splice(randomIndex, 1);
                player.hand!.push(popped[0])
            }
        }
    }

    /**
     * Initializes the 4 stacks the players will play on : 
     * UP_1 : an increase stack
     * UP_2 : a second increase stack
     * DOWN_1 : a decrease stack
     * DOWN_2 : a second decrease stack
     */
    private initStacks() {
        this.stacks.set("UP_1", { type: StackType.INCREASE, cards: [] })
        this.stacks.set("UP_2", { type: StackType.INCREASE, cards: [] })
        this.stacks.set("DOWN_1", { type: StackType.DECREASE, cards: [] })
        this.stacks.set("DOWN_2", { type: StackType.DECREASE, cards: [] })
    }

    // Player actions
    startGame(): void {
        consola.warn("starting game", this.status)
        if (!this.canStart()) {
            throw new Error("Cannot start game");
        }

        this.status = GameStatus.IN_PROGRESS;
        this.initDeck();
        this.initPlayersHands();
        this.initStacks()
        this.setFirstTurn()
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

    playCard(socketId: string, card: ICard, stackId: string): boolean {
        const stack = this.stacks.get(stackId);
        if (!stack) {
            throw new Error("Stack not found");
        }

        const isPlacable = this.canCardBePlacedOnStack(card, stack);
        if (isPlacable) {
            stack.cards.push(card);
            this.removePlayerCard(socketId, card);
            this.currentNumberOfCardsPlaced++;

            if (this.currentNumberOfCardsPlaced < this.MIN_NUMBER_OF_CARDS_TO_PLACE_WITH_DECK && !this.canPlayerPlaceAnyCard()) {
                consola.warn("current player cannot place any card - game lost");
                this.status = GameStatus.LOST;
            }

            return true;

        }

        if (this.currentNumberOfCardsPlaced < this.MIN_NUMBER_OF_CARDS_TO_PLACE_WITH_DECK && !this.canPlayerPlaceAnyCard()) {
            consola.warn("current player cannot place any card - game lost");
            this.status = GameStatus.LOST;
        }


        this.updateGameState();
        this.updateActivity();

        // The card could not be placed 
        return false;
    }

    nextTurn(): void {

        this.replenishPlayerHand(this.currentTurn!);
        // set next player to play
        const playerIds = Array.from(this.players.keys());
        this.turnIndex = (this.turnIndex + 1) % playerIds.length;
        this.currentTurn = playerIds[this.turnIndex];
        this.currentNumberOfCardsPlaced = 0;

        consola.info("can player place card ? ", this.canPlayerPlaceAnyCard())
        if (!this.canPlayerPlaceAnyCard()) {
            this.status = GameStatus.LOST;
            consola.info("Game is lost")
        }
        this.updateActivity();
    }

    // Private methods

    private setFirstTurn(): void {
        const playerIds = Array.from(this.players.keys());
        this.currentTurn = playerIds[0];
        this.turnIndex = 0;
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

    private updateGameState() {

        if (this.deck.length == 0 && [...this.players.values()].reduce(
            (acc, player) => acc + (player.handSize ?? 0),
            0
        )) {
            if (this.validStacks()) {
                this.status = GameStatus.FINISHED;
            }
            else {
                this.status = GameStatus.ERROR;
            }
        }
    }



    private canPlayerPlaceAnyCard() {
        let canPlaceAnyCard = false;
        if (!this.currentTurn) {
            throw new Error("no player in currentTurn")
        }
        const player = this.players.get(this.currentTurn);
        if (!player) {
            throw new Error("No Player found");
        }

        for (let card of player?.hand!) {
            if (this.canCardBePlaced(card)) {
                canPlaceAnyCard = true;
                break;
            }
        }

        return canPlaceAnyCard;
    }

    /**
     * Checks if a card can be placed or not on any stack.
     * @param card to check
     */
    private canCardBePlaced(card: ICard): boolean {
        for (let stack of this.stacks.values()) {
            if (this.canCardBePlacedOnStack(card, stack)) {
                return true;
            }
        }
        return false;
    }

    private canCardBePlacedOnStack(card: ICard, stack: IStack): boolean {
        const lastCard = stack.cards.at(- 1);
        if (!lastCard) return true;

        switch (stack.type) {
            case StackType.INCREASE: {
                return (
                    card.value > lastCard.value ||
                    card.value === lastCard.value - 10
                )
            }
            case StackType.DECREASE: {
                return (
                    card.value < lastCard.value ||
                    card.value === lastCard.value + 10
                );
            }
            default:
                return false;
        }
    }

    private validStacks(): boolean {

        // check if total length of all stacks is equal to 98 (all the cards to place)
        let totalStacksLength = 0;
        let inOrder = true;

        for (let stack of this.stacks.values()) {
            totalStacksLength += stack.cards.length;

            if (stack.type == StackType.INCREASE) {
                stack.cards.forEach((c, i) => {
                    if (i == 0) return;
                    if (c.value < stack.cards[i - 1].value) {
                        inOrder = false;
                    }
                })
            }
            else if (stack.type == StackType.DECREASE) {
                stack.cards.forEach((c, i) => {
                    if (i == 0) return;
                    if (c.value > stack.cards[i - 1].value) {
                        inOrder = false;
                    }
                })
            }
        }
        return totalStacksLength == this.NUMBER_OF_CARDS_TO_PLACE && inOrder;
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

    private updateActivity(): void {
        this.lastActivity = Date.now();
    }


    // Getters 
    /**
     * Returns the public state of the game (room number, players, stacks etc)
     * @returns 
     */
    getPublicState(): IPublicState {
        return {
            roomId: this.roomId,
            hostId: this.hostId,
            status: this.status,
            players: Array.from(this.players.values()).map(p => ({
                id: p.id,
                username: p.username,
                handSize: p.hand!.length,
            })),
            stacks: Array.from(this.stacks.entries()).map(([id, stack]) => ({
                id,
                ...stack
            })),
            deckSize: this.deck.length,
            currentTurn: this.currentTurn ? this.currentTurn : '',
            settings: this.settings
        };
    }

    /**
     * Returns the public state of the game & the player specific information (cards/hand, id)
     * @param playerId the id of the player getting the state
     * @returns An object containing all public state + player specific data
     */
    getPlayerState(playerId: string) {
        const player = this.players.get(playerId);
        if (!player) return null;

        return {
            ...this.getPublicState(),
            yourHand: player.hand,
            yourId: playerId
        };
    }


    setStatus(status: GameStatus) {
        this.status = status;
    }
}

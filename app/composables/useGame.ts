import consola from "consola";
import { socket } from "~/components/socket";
import type { ICard, IFrontendStack, IPayload, IPlayer, IPlayerState, IPublicState, IStack } from "~~/shared/types";
import { Events, GameStatus, type ISettings } from "~~/shared/types";
import { toast } from 'vue-sonner'

export const useGame = () => {

    // Shared state
    const room = useState<string>('game-room', () => "");
    const hostId = useState<string>('game-host', () => "");
    const players = useState<IPlayer[]>('game-players', () => []);
    const hand = useState<ICard[]>('player-hand', () => []);
    const currentTurn = useState<string>('game-current-turn', () => "");
    const stacks = useState<IFrontendStack[]>('game-stacks', () => [])
    const status = useState<string>('game-status', () => "WAITING");
    const deckSize = useState<number>('game-deck-size', () => 0)
    const settings = useState<ISettings>('game-settings', () => ({ minPlayers: 2 }));
    const yourId = useState<string>('game-player-id', () => "")

    // Local state
    const selectedCard = useState<ICard | null>('game-selected-card', () => null)
    const selectedStack = useState<IFrontendStack | null>('game-selected-stack', () => null)
    const placedCards = useState<number>('game-cards-payed', () => 0);


    // Initialisation
    function setRoom(r: string) {
        room.value = r;
    }

    function setupListeners() {
        socket.on(Events.GAME_START, (payload: IPayload) => {
            console.log("game:start", payload)
            updatePublicState(payload.content);
        });

        socket.on(Events.GAME_STATE, (payload: IPayload) => {
            console.log("game:state", payload)
            updatePublicState(payload.content);
        })

        socket.on(Events.PLAYER_JOINED, (payload: IPayload) => {
            players.value.push({
                id: payload.content.id,
                username: payload.content.username,
            })
        })

        // When a card is placed (and valid) the player is notified so we update the numbers of cards placed
        socket.on(Events.CARD_PLACE_VALID, () => placedCards.value++);
        socket.on(Events.CARD_PLACE_INVALID, () => toast.info("This card cannot be placed on this stack"));

        socket.on(Events.GAME_WIN, () => {
            toast("YOU WIN!")
        })

        socket.on(Events.GAME_LOOSE, () => {
            toast("YOU LOOSE!")
        })

        socket.on(Events.ERROR, (payload: { error: string }) => {
            toast(payload.error);
        })

        socket.on(Events.PLAYER_STATE, (payload: IPayload) => updatePlayerState(payload.content));
    }

    function cleanup() {
        status.value = GameStatus.WAITING;
        players.value = [];
        hostId.value = "";
        yourId.value = "";
        room.value = "";

        // remove all listeners
        socket.off(Events.GAME_START);
        socket.off(Events.GAME_STATE);
        socket.off(Events.PLAYER_JOINED);
    }

    // Player actions

    function selectStack(stackId: string) {
        if (!isPlayerTurn()) {
            return;
        }
        const stack = stacks.value.find((s) => s.id === stackId);
        if (!stack) {
            consola.error("Stack not found");
            return;
        }
        selectedStack.value = stack;
    }

    function selectCard(card: ICard) {
        if (!isPlayerTurn()) {
            return;
        }
        selectedCard.value = card;
    }

    function placeCard() {
        if (selectedCard.value && selectedStack.value) {
            const payload: IPayload = {
                roomID: room.value,
                content: {
                    card: selectedCard.value,
                    stackId: selectedStack.value.id
                }
            }
            socket.emit(Events.CARD_PLACE, payload);
        }
    }

    function endTurn() {
        const payload: IPayload = {
            roomID: room.value,
            content: {}
        }
        socket.emit(Events.TURN_FINISH, payload)
        resetState()
    }

    // State updates
    function updatePublicState(state: IPublicState) {
        consola.info("public:state", state)
        status.value = state.status;
        players.value = state.players;
        stacks.value = state.stacks;
        deckSize.value = state.deckSize;
        currentTurn.value = state.currentTurn;
        settings.value = state.settings;
        hostId.value = state.hostId;
    }

    function updatePlayerState(state: IPlayerState) {
        consola.info("player:state", state)
        updatePublicState(state);
        hand.value = state.yourHand;
        yourId.value = state.yourId;
    }

    /**
     * Resets the local states variables after each rounded
     */
    function resetState() {
        selectedCard.value = null;
        selectedStack.value = null;
        placedCards.value = 0;
    }


    // Conditions
    function isPlayerHost(): boolean {
        return yourId.value === hostId.value
    }

    function canGameStart(): boolean {
        console.log("can game start :", status.value, players.value.length, settings.value.minPlayers)
        return status.value === GameStatus.WAITING && players.value.length >= settings.value.minPlayers;
    }

    function isPlayerTurn() {
        return currentTurn.value === yourId.value;
    }

    function minimumCardsPlaced() {
        return placedCards.value >= 2;
    }

    return {
        room,
        hostId,
        players,
        hand,
        yourId,
        isPlayerHost,
        canGameStart,
        isPlayerTurn,
        currentTurn,
        stacks,
        status,
        deckSize,
        settings,
        setRoom,
        setupListeners,
        cleanup,
        selectCard,
        selectedCard,
        selectStack,
        selectedStack,
        endTurn,
        placeCard,
        placedCards,
        minimumCardsPlaced
    }
}


export enum Events {
    ROOM_JOIN = "room:join",
    ROOM_LEAVE = "room:leave",
    CHAT_SEND = "chat:send",
    CHAT_RECEIVE = "chat:receive",


    GAME_START = "game:start",
    GAME_WIN = "game:win",
    GAME_LOOSE = "game:loose",
    GAME_RESTART = "game:restart",
    GAME_STATE = "game:state",

    PLAYER_STATE = "player:state",
    TURN_FINISH = "turn:finish",
    TURN_START = "turn:start",
    CARD_PLACE = "card:place",
    CARD_PLACE_VALID = "card:place-valid",
    CARD_PLACE_INVALID = "card:place-invalid",
    CARD_DRAW = "card:draw",

    PLAYER_JOINED = "player:joined",
    PLAYER_LEFT = "player:left",

    DISCONNECT = "disconnect",
    ERROR = "error",
}

export enum GameStatus {
    WAITING = "waiting",
    STARTING = "starting",
    IN_PROGRESS = "in_progress",
    FINISHED = "finished",
    LOST = "lost",
    ERROR = "error"
}
export interface IMessage {
    text: string
    author: string,
    timestamp: number
}

export interface ICard {
    value: number
}


export enum StackType {
    INCREASE = "increase",
    DECREASE = "decrease"
}

export interface IStack {
    type: StackType,
    cards: ICard[]
}

export interface IFrontendStack extends IStack {
    id: "UP_1" | "UP_2" | "DOWN_1" | "DOWN_2" | undefined | string
}

export interface IPayload {
    roomID: string,
    socketID?: string,
    player?: string,
    content?: IMessage | any
}

export interface IPlayer {
    id: string // socket id
    username: string,
    hand?: ICard[],
    handSize?: number,
    isHost?: boolean
}

export interface IPublicState {
    roomId: string,
    hostId: string,
    status: GameStatus,
    players: IPlayer[],
    stacks: IFrontendStack[],
    deckSize: number,
    currentTurn: string,
    settings: ISettings
}

export interface IPlayerState extends IPublicState {
    yourHand: ICard[],
    yourId: string
}

export interface ISettings {
    maxPlayers?: number,
    minPlayers: number,
}





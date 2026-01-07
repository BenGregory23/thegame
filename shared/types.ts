export enum Events {
    ROOM_JOIN = "room:join",
    ROOM_LEAVE = "room:leave",
    CHAT_SEND = "chat:send",
    CHAT_RECEIVE = "chat:receive",


    GAME_START = "game:start",
    GAME_STATE = "game:state",
    PLAYER_STATE = "player:state",
    TURN_FINISH = "turn:finish",
    TURN_START = "turn:start",
    CARD_PLACE = "card:place",
    CARD_DRAW = "card:draw",

    PLAYER_JOINED = "player:joined",
    PLAYER_LEFT = "player:left",

    ERROR = "error",
}

export enum GameStatus {
    WAITING = "waiting",
    STARTING = "starting",
    IN_PROGRESS = "in_progress",
    FINISHED = "finished"
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
    id: "UP_1" | "UP_2" | "DOWN_1" | "DOWN_2" | undefined
}

export interface IPayload {
    socketID?: string,
    roomID: string,
    player?: string,
    content: IMessage | any
}

export interface IPlayer {
    id: string // socket id
    username: string,
    hand?: ICard[],
    isReady?: boolean,
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
    minPlayers?: number,
}



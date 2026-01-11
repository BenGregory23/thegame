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





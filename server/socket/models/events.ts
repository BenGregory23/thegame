export enum Events {
    ROOM_JOIN = "room:join",
    ROOM_LEAVE = "room:leave",
    CHAT_SEND = "chat:send",
    CHAT_RECEIVE = "chat:receive",


    GAME_START = "game:start",
    GAME_WIN = "game:win",
    GAME_LOSE = "game:lose",
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
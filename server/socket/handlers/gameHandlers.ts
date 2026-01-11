import { DisconnectReason, Server, Socket } from "socket.io"
import { gameManager } from "../managers/GameManager";
import { consola } from "consola"
import { Game } from "../models/Game";
import { Events } from "../models/events";
export const gameHandler = (io: Server) => {


    const joinRoom = function (this: Socket, payload: IPayload) {
        consola.info("requesting to join room : ", payload.roomID);
        const socket = this;

        // Add data directly to socket to access them even without payload
        socket.data.username = payload.content.username
        socket.data.roomID = payload.roomID

        const playerJoined: IPayload = {
            roomID: payload.roomID,
            content: {
                id: socket.id,
                username: payload.content.username,
            }
        }

        socket.join(payload.roomID);

        let game = gameManager.getGame(payload.roomID);
        if (game) {
            consola.info("game already exists - adding player");
            game.addPlayer(socket.id, payload.content.username)
        } else {
            consola.info("game does not exist - creating game")
            game = gameManager.createGame(payload.roomID, socket.id);
            game.addPlayer(socket.id, payload.content.username)
        }
        socket.join(payload.roomID);
        socket.to(payload.roomID).emit(Events.PLAYER_JOINED, playerJoined)
        payload.content = game.getPlayerState(socket.id)
        socket.emit(Events.PLAYER_STATE, payload)
    };

    const leaveRoom = function (this: Socket, payload: { reason: DisconnectReason, description?: any }) {
        const socket = this;
        const game = gameManager.getGame(socket.data.roomID);
        if (game) {
            consola.info("removing player from game " + socket.data.username)
            game.removePlayer(socket.id);

            if (game.players.size === 0) {
                consola.warn("No players left in game {} - deleting room", game.roomId,)
                gameManager.deleteGame(game.roomId)
            }
        }

        socket.to(socket.data.roomID).emit(Events.PLAYER_LEFT, payload)
    };

    const startGame = function (this: Socket, payload: IPayload) {
        const socket = this;
        const game = gameManager.getGame(payload.roomID);
        if (socket.id == game?.hostId) {
            game?.startGame();
            socket.to(payload.roomID).emit(Events.GAME_START, { roomId: payload.roomID, content: game.getPublicState() })
            for (let player of game.players.values()) {
                io.to(player.id).emit(Events.PLAYER_STATE, { roomId: payload.roomID, content: game.getPlayerState(player.id) })
            }
        }
    }

    const playCard = function (this: Socket, payload: IPayload) {
        const socket = this;
        const game = gameManager.getGame(payload.roomID);

        if (!game) {
            handleError(socket, "Game not found");
            return;
        }


        const isPlaced = game.playCard(socket.id, payload.content.card, payload.content.stackId);
        if (isPlaced) {
            socket.emit(Events.CARD_PLACE_VALID)
        }
        else {
            socket.emit(Events.CARD_PLACE_INVALID)
        }
        updateState(socket, game);
    }

    const drawCard = function (this: Socket, payload: IPayload) {
        const socket = this;
        const game = gameManager.getGame(payload.roomID);
        if (!game) {
            handleError(socket, "Game not found");
            return;
        }

        try {
            game.drawCard(socket.id);
            updateState(socket, game);
        } catch (error: any) {
            handleError(socket, error.message);
        }
    }

    const nextTurn = function (this: Socket, payload: IPayload) {
        const socket = this;
        const game = gameManager.getGame(payload.roomID);
        if (!game) {
            handleError(socket, "Game not found");
            return;
        }

        try {
            game.nextTurn();
            updateState(socket, game);
        } catch (error: any) {
            handleError(socket, error.message);
        }
    }

    function handleError(socket: Socket, message: string) {
        socket.emit(Events.ERROR, { message: message });
        throw new Error(message);
    }

    function updateState(socket: Socket, game: Game) {

        if (game.status === GameStatus.FINISHED) {
            io.to(game.roomId).emit(Events.GAME_WIN);
        }
        else if (game.status === GameStatus.LOST) {
            io.to(game.roomId).emit(Events.GAME_LOSE, {
                roomID: game.roomId, content: {
                    remainingCards: game.deck.length + Array.from(game.players.values()).reduce((acc, curr) => acc + (curr.handSize ?? 0), 0),
                }
            });
        }
        socket.emit(Events.PLAYER_STATE, { roomId: game.roomId, content: game.getPlayerState(socket.id) })
        socket.to(game.roomId).emit(Events.GAME_STATE, { roomId: game.roomId, content: game.getPublicState() })
    }

    return {
        joinRoom,
        leaveRoom,
        startGame,
        playCard,
        drawCard,
        nextTurn
    };
}
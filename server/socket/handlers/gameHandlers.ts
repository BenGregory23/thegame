import { Server, Socket } from "socket.io"
import { Events, IPayload, IPlayer } from "~~/shared/types";
import { gameManager } from "../managers/GameManager";
import { consola } from "consola"
import { Game } from "../models/Game";
export const gameHandler = (io: Server) => {


    const joinRoom = function (this: Socket, payload: IPayload) {
        const socket = this;
        const player: IPlayer = {
            id: socket.id,
            username: payload.content.username,
        }

        socket.join(payload.roomID);

        let game = gameManager.getGame(payload.roomID);
        if (game) {
            consola.info("game already exists - adding player");
            game.addPlayer(socket.id, player.username)
        } else {
            consola.info("game does not exist - creating game")
            game = gameManager.createGame(payload.roomID, socket.id);
            game.addPlayer(socket.id, player.username)
        }
        socket.join(payload.roomID);
        socket.to(payload.roomID).emit(Events.PLAYER_JOINED, player)
        payload.content = game.getPlayerState(socket.id)
        socket.emit(Events.PLAYER_STATE, payload)

    };

    const leaveRoom = function (this: Socket, payload: IPayload) {
        const socket = this;
        const game = gameManager.getGame(payload.roomID);
        if (game) {
            consola.info("removing player from game " + payload.content.username)
            game.removePlayer(socket.id);

            if (game.players.size === 0) {
                consola.warn("No players left in game {} - deleting room", game.roomId,)
                gameManager.deleteGame(game.roomId)
            }
        }



        socket.to(payload.roomID).emit(Events.PLAYER_LEFT, payload)
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

        game.playCard(socket.id, payload.content.card, payload.content.stackId);
        updatePlayers(socket, game);
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
            updatePlayers(socket, game);
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
            updatePlayers(socket, game);
        } catch (error: any) {
            handleError(socket, error.message);
        }
    }

    function handleError(socket: Socket, message: string) {
        socket.emit(Events.ERROR, { message: message });
        throw new Error(message);
    }

    function updatePlayers(socket: Socket, game: Game) {
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
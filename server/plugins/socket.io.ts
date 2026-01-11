import type { NitroApp } from "nitropack";
import { Server as Engine } from "engine.io";
import { Server } from "socket.io";
import { defineEventHandler } from "h3";
import { IPayload } from "../../shared/types/types";
import { chatHandler } from "../socket/handlers/chatHandler";
import { gameHandler } from "../socket/handlers/gameHandlers";
import { Events } from "../socket/models/events";


export default defineNitroPlugin((nitroApp: NitroApp) => {
    const engine = new Engine();
    const io = new Server();

    io.bind(engine);

    io.on("connection", (socket) => {
        console.log("connection ", socket.id)
        const { sendChat } = chatHandler(io);
        const { joinRoom, leaveRoom, startGame, playCard, drawCard, nextTurn } = gameHandler(io);

        // Game
        socket.on(Events.ROOM_JOIN, joinRoom);
        socket.on(Events.DISCONNECT, leaveRoom)
        socket.on(Events.ROOM_LEAVE, leaveRoom);
        socket.on(Events.GAME_START, startGame);
        socket.on(Events.CARD_PLACE, playCard);
        socket.on(Events.CARD_DRAW, drawCard);
        socket.on(Events.TURN_FINISH, nextTurn);

        // Other
        socket.on(Events.CHAT_SEND, sendChat);
    });

    nitroApp.router.use("/socket.io/", defineEventHandler({
        handler(event) {
            engine.handleRequest(event.node.req, event.node.res);
            event._handled = true;
        },
        websocket: {
            open(peer) {
                // @ts-expect-error private method and property
                engine.prepare(peer._internal.nodeReq);
                // @ts-expect-error private method and property
                engine.onWebSocket(peer._internal.nodeReq, peer._internal.nodeReq.socket, peer.websocket);
            }
        }
    }));
});
import { Server, Socket } from "socket.io";
import type { IPayload } from "~~/shared/types/types";
import { Events } from "../models/events";

export const chatHandler = (io: Server) => {
    const sendChat = function (this: Socket, payload: IPayload) {
        const socket = this;
        const { text, author } = payload.content;

        if (!payload.roomID) {
            const message = "Missing room ID"
            socket.emit(Events.ERROR, { error: message })
            throw new Error(message);
        }
        if (!text || !author) return;
        socket.to(payload.roomID!).emit(Events.CHAT_RECEIVE, payload.content);
        console.log("chat:send", payload)
    };

    return {
        sendChat,
    };
};
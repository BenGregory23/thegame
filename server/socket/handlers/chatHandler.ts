import { Server, Socket } from "socket.io";
import { Events, IPayload } from "~~/shared/types";

export const chatHandler = (io: Server) => {
    const sendChat = function (this: Socket, payload: IPayload) {
        const socket = this;
        const { text, author } = payload.content;

        if (!payload.roomID) {
            throw new Error("Missing room ID");
        }
        if (!text || !author) return;
        socket.to(payload.roomID!).emit(Events.CHAT_RECEIVE, payload.content);
        console.log("chat:send", payload)
    };

    return {
        sendChat,
    };
};
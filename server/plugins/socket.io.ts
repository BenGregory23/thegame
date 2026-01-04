import type { NitroApp } from "nitropack";
import { Server as Engine } from "engine.io";
import { Server } from "socket.io";
import { defineEventHandler } from "h3";
import { Events } from "~/lib/types"


export default defineNitroPlugin((nitroApp) => {
    const io = new Server({ cors: { origin: "*" } });

    nitroApp.hooks.hook("listen", (server) => {
        io.attach(server); // ⚡ Socket.IO is now served by Nitro
        console.log("Socket.IO attached");
    });

    io.on("connection", (socket) => {
        console.log("User connected:", socket.id);
    });
});
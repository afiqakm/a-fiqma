import express from "express";
import http from "http";
import { Server } from "socket.io";

const app = express();
const server = http.createServer(app);

// Allow frontend dev server (Vite runs on 5173 by default)
const io = new Server(server, {
    cors: {
        origin: "http://localhost:5173", // frontend URL
        methods: ["GET", "POST"],
    },
});

io.on("connection", (socket) => {
    console.log(`✅ User connected: ${socket.id}`);

    // handle cursor movement
    socket.on("cursor-move", (data: { x: number; y: number }) => {
        socket.broadcast.emit("cursor-move", { id: socket.id, ...data });
    });

    // handle disconnect
    socket.on("disconnect", () => {
        console.log(`❌ User disconnected: ${socket.id}`);
        io.emit("cursor-leave", socket.id);
    });
});

server.listen(4000, () => {
    console.log("🚀 Server running on http://localhost:4000");
});

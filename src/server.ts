import { Server } from "socket.io";

const io = new Server(3000, {
  cors: {
    origin: "*", // Allow frontend connections
  },
});

io.on("connection", (socket) => {
  console.log(`✅ User connected: ${socket.id}`);

  socket.on("cursor-move", (data) => {
    socket.broadcast.emit("cursor-move", { id: socket.id, ...data });
  });

  socket.on("disconnect", () => {
    console.log(`❌ User disconnected: ${socket.id}`);
    socket.broadcast.emit("cursor-remove", socket.id);
  });
});
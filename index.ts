import express from "express";
import { createServer } from "http";
import { socketHandler } from "./src/socket";
import { Server } from "socket.io";

const app = express();
const server = createServer(app);
const io = new Server(server);
const port = 3000;

io.on("connection", (socket) => {
   socketHandler(socket, io);
});

server.listen(port, () =>
   console.log(`Example app listening on port ${port}!`)
);

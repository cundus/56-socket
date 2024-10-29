import { IncomingMessage, ServerResponse, Server as HttpServer } from "http";
import { Http2Server } from "http2";
import { Server } from "socket.io";

export let io: Server;

export const ioServer = (
   server: HttpServer<typeof IncomingMessage, typeof ServerResponse>
) => {
   const ioServer = new Server(server);
   io = ioServer;
};

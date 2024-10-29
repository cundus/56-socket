import { Server, Socket } from "socket.io";

const idAdmin = "2";
let socketAdmin: Socket;
const chatUsers: string[] = [];

export const socketHandler = (socket: Socket, io: Server) => {
   console.log(socket.id + " connected");
   const userId = socket.handshake.query.userId;

   if (userId !== idAdmin) {
      chatUsers.push(userId as string);
      socket.join(`${userId}${idAdmin}`);
      socket.emit("connected", { rooms: [`${userId}${idAdmin}`] });
      if (socketAdmin) {
         socketAdmin.join(`${userId}${idAdmin}`);
      }
   } else {
      socketAdmin = socket;
      const listRooms = chatUsers.map((user) => `${user}${idAdmin}`);
      socketAdmin.join(listRooms);
      socketAdmin.emit("connected", { rooms: listRooms });
   }

   //    when user connected send room details

   socket.on("disconnect", () => {
      console.log(socket.id + " disconnected");
   });

   socket.on("chat message", (data: { message: string; roomId: string }) => {
      io.to(data.roomId).emit("chat message", data.message);
   });
};

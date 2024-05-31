import { Server, type ServerOptions, type Socket } from "socket.io";
import type { H3Event } from "h3";
import type { User } from "../types";

const options: Partial<ServerOptions> = {
  path: "/api/socket.io",
  serveClient: false,
};

export const io = new Server(options);

export function initSocket(event: H3Event) {
  // @ts-ignore
  io.attach(event.node.res.socket?.server);
  io.on("connection", (socket: Socket) => {
    // Join Room
    socket.on("joinRom", (payload: User) => {
      console.log("WS Connected joinRom", socket.id);
    });
  });
}

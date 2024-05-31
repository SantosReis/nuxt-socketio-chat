import { Server, type ServerOptions, type Socket } from "socket.io";
import moment from "moment";
import type { H3Event } from "h3";
import type { User } from "../types";
import { userJoin } from "./users";
const options: Partial<ServerOptions> = {
  path: "/api/socket.io",
  serveClient: false,
};

export const io = new Server(options);

const botName = "NuxtChatapp Admin";
export function initSocket(event: H3Event) {
  // @ts-ignore
  io.attach(event.node.res.socket?.server);
  io.on("connection", (socket: Socket) => {
    // Join Room
    socket.on("joinRom", (payload: User) => {
      console.log("WS Connected joinRom", socket.id);

      const user = userJoin({ ...payload, id: socket.id });
      socket.join(user.room);

      socket.broadcast
        .to(user.room)
        .emit(
          "message",
          formnatMessage(botName, `${user.username} has joined the chat`)
        );
    });
  });
}

export function formnatMessage(username: string, text: string) {
  return {
    username,
    text,
    time: moment().format("h:mm a"),
  };
}

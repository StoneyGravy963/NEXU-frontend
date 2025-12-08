import { io, Socket } from "socket.io-client";

export const createSocket = (jwt: string): Socket => {
  return io("http://192.168.1.74:5000", {
    extraHeaders: {
      Authorization: `Bearer ${jwt}`,
    },
    autoConnect: false,
  });
};

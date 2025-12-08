import { io, Socket } from "socket.io-client";

export const createSocket = (jwt: string): Socket => {
  return io("http://25.0.19.60:5000", {
    extraHeaders: {
      Authorization: `Bearer ${jwt}`,
    },
    autoConnect: false,
  });
};

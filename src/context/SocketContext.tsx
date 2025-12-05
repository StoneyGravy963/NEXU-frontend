import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { createSocket } from "../sockets/sockets";
import { AuthContext } from "./AuthContext";
import type { Socket } from "socket.io-client";

interface Notification {
  chat_id: string;
  sender_id: string;
  sender_name: string;
  message: string;
}

interface SocketContextType {
  socket: Socket | null;
  notifications: Notification[];
}

export const SocketContext = createContext<SocketContextType | undefined>(undefined);

export const SocketProvider = ({ children }: { children: ReactNode }) => {
  const { jwt } = useContext(AuthContext)!;

  const [socket, setSocket] = useState<Socket | null>(null);
  const [notifications, setNotifications] = useState<Notification[]>([]);

  useEffect(() => {
    if (!jwt) return;

    const s = createSocket(jwt);

    s.connect();

    s.on("connect", () => console.log("Socket conectado:", s.id));

    s.on("message", (msg: string) => {
      console.log("Mensaje del servidor:", msg);
    });

    s.on("new_notification", (data: Notification) => {
      console.log("Nueva notificacion ha llegado!, Data:");
      console.log(data);
      setNotifications((prev) => [...prev, data]);
    });

    s.on("client_error", console.log);
    s.on("server_error", console.log);

    setSocket(s);

    return () => {
      s.disconnect();
    };
  }, [jwt]);

  return (
    <SocketContext.Provider value={{ socket, notifications }}>
      {children}
    </SocketContext.Provider>
  );
};

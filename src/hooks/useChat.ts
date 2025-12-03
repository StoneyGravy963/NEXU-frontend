// Hook for chat socket-related logic
import { useContext } from "react";
import { SocketContext } from "../context/SocketContext";

export const useChat = () => {
  const { socket } = useContext(SocketContext)!;


  const startChat = (targetId: string, content: string) => {
    console.log("Enviando evento startChat con targetId:" + targetId + " y content: " + content)
    socket?.emit("start_chat", { target_id: targetId, content });
  };
  
  const sendMessage = (chatId: string, content: string) => {
    console.log("Enviando evento dm con chatId:" + chatId + " y content: " + content)
    socket?.emit("dm", { target_id: chatId, content });
  };

  return { startChat, sendMessage };
};

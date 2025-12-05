import React, { useState } from "react";
import { useChat } from "../../hooks/useChat";
import type { ChatMessage } from "../../types/chat";
interface props {
  isFirst: boolean;
  targetId?: string;
  userId: string | undefined;
  chatId?: string;
  onNewMessage: any;
}
const ChatInput: React.FC<props> = ({
  isFirst,
  targetId,
  userId,
  chatId,
  onNewMessage,
}) => {
  const [text, setText] = useState("");
  const { startChat, sendMessage } = useChat();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (text.trim()) {
      console.log("Mensaje enviado:", text);
      console.log("ConvId: " + chatId);
      console.log("targetId: " + targetId);

      // Logica de Sockets
      if (isFirst && targetId) {
        console.log("usando el evento startChat");
        startChat(targetId, text);
      }
      if (!isFirst && chatId) {
        console.log("usando el evento dm");
        sendMessage(chatId, text);
      }

      // Logica de UI
      const message: ChatMessage = {
        id: "",
        authorId: userId ? userId : "",
        text: text,
        timestamp: new Date().toISOString(),
      };
      onNewMessage(message);

      setText("");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex items-center space-x-2">
      <input
        type="text"
        placeholder="Escribe un mensaje..."
        className="flex-1 bg-gray-700 text-white rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <button
        type="submit"
        className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
      >
        Enviar
      </button>
    </form>
  );
};

export default ChatInput;

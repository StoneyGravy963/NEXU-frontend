import React, { useState } from "react";
import { useChat } from "../../hooks/useChat";
import type { ChatMessage } from "../../types/chat";
interface props {
  isFirst: boolean;
  targetId?: string;
  userId: string | undefined;
  chatId?: string;
  onNewMessage: any;
  onMessageSent?: (text: string) => void;
}
const ChatInput: React.FC<props> = ({
  isFirst,
  targetId,
  userId,
  chatId,
  onNewMessage,
  onMessageSent,
}) => {
  const [text, setText] = useState("");
  const { startChat, sendMessage } = useChat();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (text.trim()) {
      console.log("Mensaje enviado:", text);
      console.log("ConvId: " + chatId);
      console.log("targetId: " + targetId);

      // Generar ID único temporal para el mensaje local
      const tempId = `temp_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

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
        id: tempId,
        authorId: userId ? userId : "",
        text: text,
        timestamp: new Date().toISOString(),
      };
      onNewMessage(message);

      // Notificar al padre que se envió un mensaje (para actualizar lista de chats)
      if (onMessageSent) {
        onMessageSent(text);
      }

      setText("");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex items-center space-x-2">
      <input
        type="text"
        placeholder="Escribe un mensaje..."
        className="flex-1 bg-theme-alt text-theme rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-zomp"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <button
        type="submit"
        className="bg-zomp hover:bg-zomp-dark text-theme font-bold py-2 px-4 rounded-full"
      >
        Enviar
      </button>
    </form>
  );
};

export default ChatInput;

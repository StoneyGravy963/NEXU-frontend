import React, { useContext, useEffect, useState, useRef } from "react";
import { AuthContext } from "../../context/AuthContext";
import Message from "./Message";
import ChatInput from "./ChatInput";
import { SocketContext } from "../../context/SocketContext";
import type { ChatMessage } from "../../types/chat";

interface MessagePanelProps {
  conversation: any | null;
  onMessageSent?: (text: string) => void;
}

const MessagePanel: React.FC<MessagePanelProps> = ({ conversation, onMessageSent }) => {
  const { socket } = useContext(SocketContext)!;
  const [newMessages, setNewMessages] = useState<ChatMessage[]>([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Determinar si es primer mensaje basado en si la conversación es nueva o está vacía
  const isFirstMessage = conversation?.isNew === true || (conversation?.messages && conversation.messages.length === 0);

  // Mapear mensajes que vienen del backend
  const mappedMessages = (conversation?.messages || []).map((msg: any) => ({
    id: msg.id,
    authorId: msg.sender_id,
    text: msg.content,
    timestamp: msg.timestamp,
  })) as ChatMessage[];

  // Combinar mensajes del backend + mensajes nuevos en tiempo real
  const allMessages = [...mappedMessages, ...newMessages];

  // Limpiar mensajes locales cuando cambia la conversación
  useEffect(() => {
    setNewMessages([]);
  }, [conversation?.id]);

  // Scroll al fondo cuando cambian los mensajes
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [allMessages]);

  // Socket listener para nuevos mensajes en tiempo real
  useEffect(() => {
    if (!socket || !conversation?.id) return;

    const handler = (data: any) => {
      // Filtrar mensajes solo si pertenecen a la conversación actual
      if (data.chat_id === conversation.id) {
        const newMessage: ChatMessage = {
          id: data.id,
          authorId: data.sender_id,
          text: data.message,
          timestamp: new Date().toISOString(),
        };
        setNewMessages((prev) => [...prev, newMessage]);
      }
    };

    socket.on("new_notification", handler);
    return () => {
      socket.off("new_notification", handler);
    };
  }, [socket, conversation?.id]);

  // Datos del usuario desde el contexto
  const otherUser = conversation?.other_user;
  const auth = useContext(AuthContext);
  const user = auth?.user;
  const currentUserId = user?.id;

  const handleNewMessage = (msg: ChatMessage) => {
    setNewMessages((prev) => [...prev, msg]);
  };

  return (
    <div className="flex-1 flex flex-col h-full">
      {/* Header */}
      <div className="flex items-center p-4 bg-gray-800 border-b border-gray-700 flex-shrink-0">
        {otherUser && (
          <>
            <img
              src={
                otherUser.avatar_url ||
                `https://ui-avatars.com/api/?name=${otherUser.name}`
              }
              alt={otherUser.name}
              className="w-10 h-10 rounded-full mr-4"
            />
            <h2 className="text-xl font-semibold">{otherUser.name}</h2>
          </>
        )}
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto bg-gray-900 p-4">
        {allMessages.length > 0 ? (
          allMessages.map((msg: any) => (
            <Message key={msg.id} message={msg} currentUserId={currentUserId} />
          ))
        ) : (
          <div className="text-gray-400">
            No hay mensajes en esta conversación.
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Chat Input */}
      <div className="p-4 bg-gray-800 border-t border-gray-700 flex-shrink-0">
        <ChatInput
          onNewMessage={handleNewMessage}
          isFirst={isFirstMessage}
          userId={currentUserId}
          targetId={conversation?.other_user?.id || conversation?.targetUserId}
          chatId={conversation?.id}
          onMessageSent={onMessageSent}
        />
      </div>
    </div>
  );
};

export default MessagePanel;

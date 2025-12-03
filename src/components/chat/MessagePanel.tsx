import React, { useContext, useEffect, useState } from 'react';
import type { ChatMessage, ChatConversation } from '../../types/chat';
import Message from './Message';
import ChatInput from './ChatInput';
import { SocketContext } from '../../context/SocketContext';

interface MessagePanelProps {
  conversation: ChatConversation | null;
}

const MessagePanel: React.FC<MessagePanelProps> = ({ conversation }) => {
  const [messages, setMessages] = useState(conversation?.messages)
  const { socket } = useContext(SocketContext)!;
  useEffect(() => {
    if (!socket) return;

    const handler = (data: any) => {
      console.log("Notificacion recibida desde el MessagePanel");
      console.log(data);
      const newMessage: ChatMessage ={
        id: "3456783456",
        authorId: "2",
        text: data.message,
        timestamp: new Date().toISOString()
      };
      setMessages((prev) => [...(prev ?? []), newMessage]);
    }
    socket.on("new_notification", handler);

    return () => { socket.off("new_notificacion", handler) };
  }, [socket]);


  // TODO: manejar la manera en que se muestra un mensaje propio o de otro user de manera completamente diferente
  const handleNewMessage = (msg: ChatMessage) => {
    setMessages((prev) => [...(prev ?? []), msg]);
  }

  if (!conversation) {
    return (
      <div className="flex-1 flex items-center justify-center text-gray-400">
        Selecciona una conversación para empezar a chatear.
      </div>
    );
  }

  // Assuming the current user is mockUsers[0] (id: 1)
  const otherParticipant = conversation.participants.find(p => p.id !== '1');

  return (
    <div className="flex-1 flex flex-col">
      {/* Header */}
      <div className="flex items-center p-4 bg-gray-800 border-b border-gray-700">
        {otherParticipant && (
          <>
            <img
              src={otherParticipant.avatarUrl}
              alt={otherParticipant.name}
              className="w-10 h-10 rounded-full mr-4"
            />
            <h2 className="text-xl font-semibold">{otherParticipant.name}</h2>
          </>
        )}
      </div>

      {/* Message Body */}
      <div className="flex-1 p-4 overflow-y-auto bg-gray-900">
        {messages?.map(msg => (
          <Message key={msg.id} message={msg} />
        ))}
      </div>

      {/* Chat Input */}
      <div className="p-4 bg-gray-800">
        <ChatInput onNewMessage={handleNewMessage} isFirst={true} targetId='dd6e8497-550b-4951-a796-036ca00adac9' />
      </div>
    </div>
  );
};

export default MessagePanel;

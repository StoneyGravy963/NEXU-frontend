import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../context/AuthContext';
import Message from './Message';
import ChatInput from './ChatInput';
import { SocketContext } from '../../context/SocketContext';

interface MessagePanelProps {
  conversation: any | null;
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

  const otherUser = conversation.other_user;
  // Obtener el id del usuario actual desde el contexto de forma segura
  const auth = useContext(AuthContext);
  const user = auth?.user;
  const currentUserId = user?.id;

  console.log('MessagePanel - conversation:', conversation);
  console.log('MessagePanel - conversation.messages:', conversation.messages);

  // Mapear los mensajes del backend al tipo del frontend
  const messages = (conversation.messages || []).map((msg: any) => ({
    id: msg.id,
    authorId: msg.sender_id,
    text: msg.content,
    timestamp: msg.timestamp,
  }));

  // Debug: Verificar el valor de currentUserId
  console.log('currentUserId:', currentUserId);
  console.log('Mapped messages:', messages);

  return (
    <div className="flex-1 flex flex-col">
      {/* Header */}
      <div className="flex items-center p-4 bg-gray-800 border-b border-gray-700">
        {otherUser && (
          <>
            <img
              src={otherUser.avatar_url || `https://ui-avatars.com/api/?name=${otherUser.name}`}
              alt={otherUser.name}
              className="w-10 h-10 rounded-full mr-4"
            />
            <h2 className="text-xl font-semibold">{otherUser.name}</h2>
          </>
        )}
      </div>

      {/* Message Body */}
      <div className="flex-1 p-4 overflow-y-auto bg-gray-900">
        {messages.length > 0 ? (
          messages.map((msg: any) => (
            <Message key={msg.id} message={msg} currentUserId={currentUserId} />
          ))
        ) : (
          <div className="text-gray-400">No hay mensajes en esta conversación.</div>
        )}
      </div>

      {/* Chat Input */}
      <div className="p-4 bg-gray-800">
        <ChatInput onNewMessage={handleNewMessage} isFirst={true} targetId='dd6e8497-550b-4951-a796-036ca00adac9' />
      </div>
    </div>
  );
};

export default MessagePanel;

import React from 'react';
import type { ChatMessage } from '../../types/chat';

interface MessageProps {
  message: ChatMessage;
  currentUserId?: string;
}

const Message: React.FC<MessageProps> = ({ message, currentUserId }) => {
  // Comparar con el id real del usuario actual
  // console.log('Message authorId:', message.authorId, 'currentUserId:', currentUserId);
  const isCurrentUser = String(message.authorId) === String(currentUserId);

  return (
    <div className={`flex ${isCurrentUser ? 'justify-end' : 'justify-start'} mb-4`}>
      <div
        className={`max-w-md p-3 rounded-2xl ${
          isCurrentUser
            ? 'bg-zomp text-theme'
            : 'bg-theme-alt text-theme'
        }`}
      >
        <p className="text-sm">{message.text}</p>
        <span className={`text-xs ${isCurrentUser ? 'text-theme-2' : 'text-theme-2'} mt-1 block text-right`}>
          {new Date(message.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </span>
      </div>
    </div>
  );
};

export default Message;

import React from 'react';
import type { ChatMessage } from '../../types/chat';

interface MessageProps {
  message: ChatMessage;
}

const Message: React.FC<MessageProps> = ({ message }) => {
  // Assuming the current user's ID is '1'
  const isCurrentUser = message.authorId === '1';

  return (
    <div className={`flex ${isCurrentUser ? 'justify-end' : 'justify-start'} mb-4`}>
      <div
        className={`max-w-md p-3 rounded-2xl ${
          isCurrentUser
            ? 'bg-blue-600 text-white'
            : 'bg-gray-700 text-gray-200'
        }`}
      >
        <p className="text-sm">{message.text}</p>
        <span className={`text-xs ${isCurrentUser ? 'text-blue-200' : 'text-gray-400'} mt-1 block text-right`}>
          {new Date(message.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </span>
      </div>
    </div>
  );
};

export default Message;

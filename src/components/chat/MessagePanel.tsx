import React from 'react';
import type { ChatConversation } from '../../types/chat';
import Message from './Message';
import ChatInput from './ChatInput';

interface MessagePanelProps {
  conversation: ChatConversation | null;
}

const MessagePanel: React.FC<MessagePanelProps> = ({ conversation }) => {
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
        {conversation.messages.map(msg => (
          <Message key={msg.id} message={msg} />
        ))}
      </div>

      {/* Chat Input */}
      <div className="p-4 bg-gray-800">
        <ChatInput />
      </div>
    </div>
  );
};

export default MessagePanel;

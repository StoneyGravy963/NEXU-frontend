import React from 'react';
import type { ChatConversation } from '../../types/chat';

interface ConversationListItemProps {
  conversation: ChatConversation;
  isSelected: boolean;
  onSelect: () => void;
}

const ConversationListItem: React.FC<ConversationListItemProps> = ({ conversation, isSelected, onSelect }) => {
  // Assuming the current user is mockUsers[0] (id: 1), the other participant is the one we want to display.
  const otherParticipant = conversation.participants.find(p => p.id !== '1');
  const lastMessage = conversation.messages[conversation.messages.length - 1];

  if (!otherParticipant) {
    return null; // Or some fallback UI
  }

  return (
    <div
      className={`flex items-center p-4 cursor-pointer border-l-4 ${
        isSelected
          ? 'border-blue-500 bg-gray-700'
          : 'border-transparent hover:bg-gray-700'
      }`}
      onClick={onSelect}
    >
      <img
        src={otherParticipant.avatarUrl}
        alt={otherParticipant.name}
        className="w-12 h-12 rounded-full mr-4"
      />
      <div className="flex-1 min-w-0">
        <div className="flex justify-between">
          <h3 className="font-semibold">{otherParticipant.name}</h3>
          <span className="text-xs text-gray-400">
            {new Date(lastMessage.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </span>
        </div>
        <div className="flex justify-between">
          <p className="text-sm text-gray-400 truncate">{lastMessage.text}</p>
          {conversation.unreadCount && conversation.unreadCount > 0 && (
            <span className="bg-blue-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center ml-2 flex-shrink-0">
              {conversation.unreadCount}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default ConversationListItem;

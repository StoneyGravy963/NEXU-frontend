import React from 'react';

interface ConversationListItemProps {
  conversation: any;
  isSelected: boolean;
  onSelect: () => void;
}

const ConversationListItem: React.FC<ConversationListItemProps> = ({ conversation, isSelected, onSelect }) => {
  const otherUser = conversation.other_user;
  const lastMessage = conversation.last_message;
  const unreadMessages = conversation.unread_messages;

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
        src={otherUser.avatar_url || `https://ui-avatars.com/api/?name=${otherUser.name}`}
        alt={otherUser.name}
        className="w-12 h-12 rounded-full mr-4"
      />
      <div className="flex-1 min-w-0">
        <div className="flex justify-between">
          <h3 className="font-semibold">{otherUser.name}</h3>
          <span className="text-xs text-gray-400">
            {lastMessage ? new Date(lastMessage.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : ''}
          </span>
        </div>
        <div className="flex justify-between">
          <p className="text-sm text-gray-400 truncate">{lastMessage ? lastMessage.content : 'Sin mensajes'}</p>
          {unreadMessages > 0 && (
            <span className="bg-blue-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center ml-2 flex-shrink-0">
              {unreadMessages}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default ConversationListItem;

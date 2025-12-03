import React, { useState } from 'react';
// import type { ChatConversation } from '../../types/chat';
import ConversationListItem from './ConversationListItem';

interface ConversationListProps {
  conversations: any[];
  selectedConversation: any | null;
  onSelectConversation: (conversation: any) => void;
}

const ConversationList: React.FC<ConversationListProps> = ({ conversations, selectedConversation, onSelectConversation }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredConversations = conversations.filter(convo =>
    convo.other_user && convo.other_user.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex flex-col h-full">
      {}
      <div className="p-4 border-b border-gray-700">
        <input
          type="text"
          placeholder="Buscar conversación..."
          className="w-full bg-gray-700 text-white rounded-lg px-4 py-2 focus:outline-none"
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
        />
      </div>

      {}
      <div className="flex-1 overflow-y-auto">
        {filteredConversations.map(convo => (
          <ConversationListItem
            key={convo.id}
            conversation={convo}
            isSelected={selectedConversation?.id === convo.id}
            onSelect={() => onSelectConversation(convo)}
          />
        ))}
      </div>
    </div>
  );
};

export default ConversationList;

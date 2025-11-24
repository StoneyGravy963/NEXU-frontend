import React, { useState } from 'react';
import type { ChatConversation } from '../../types/chat';
import ConversationListItem from './ConversationListItem';

interface ConversationListProps {
  conversations: ChatConversation[];
  selectedConversation: ChatConversation | null;
  onSelectConversation: (conversation: ChatConversation) => void;
}

const ConversationList: React.FC<ConversationListProps> = ({ conversations, selectedConversation, onSelectConversation }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredConversations = conversations.filter(convo =>
    convo.participants.some(p => p.nombre_completo.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="flex flex-col h-full">
      {/* Search Bar */}
      <div className="p-4 border-b border-gray-700">
        <input
          type="text"
          placeholder="Buscar conversación..."
          className="w-full bg-gray-700 text-white rounded-lg px-4 py-2 focus:outline-none"
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Conversation List */}
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

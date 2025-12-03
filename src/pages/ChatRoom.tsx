import React, { useState } from 'react';
import type { ChatConversation } from '../types/chat';
import { mockConversations } from '../data/mocks';
import ConversationList from '../components/chat/ConversationList';
import MessagePanel from '../components/chat/MessagePanel';

const ChatRoom: React.FC = () => {
  const [conversations] = useState<ChatConversation[]>(mockConversations);
  const [selectedConversation, setSelectedConversation] = useState<ChatConversation | null>(conversations[0] || null);

  const handleSelectConversation = (conversation: ChatConversation) => {
    setSelectedConversation(conversation);
  };

  return (
    <div className="flex h-[calc(100vh-120px)]">
      {}
      <div className="w-1/3 bg-gray-800 border-r border-gray-700">
        <ConversationList
          conversations={conversations}
          selectedConversation={selectedConversation}
          onSelectConversation={handleSelectConversation}
        />
      </div>

      {}
      <div className="w-2/3 flex flex-col">
        <MessagePanel conversation={selectedConversation} />
      </div>
    </div>
  );
};

export default ChatRoom;

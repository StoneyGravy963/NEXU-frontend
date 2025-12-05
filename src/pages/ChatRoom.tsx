import React, { useEffect, useState } from 'react';
import ConversationList from '../components/chat/ConversationList';
import MessagePanel from '../components/chat/MessagePanel';
import { getChats, getMessages } from '../services/api/chatApi';

const ChatRoom: React.FC = () => {
  const [conversations, setConversations] = useState<any[]>([]);
  const [selectedConversation, setSelectedConversation] = useState<any | null>(null);
  const [messages, setMessages] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchChats = async () => {
      setLoading(true);
      setError(null);
      try {
        const chats = await getChats();
        setConversations(chats || []);
        if (chats && chats.length > 0) {
          setSelectedConversation(chats[0]);
        }
      } catch (err: any) {
        setError(err?.message || 'Error al obtener los chats');
      } finally {
        setLoading(false);
      }
    };
    fetchChats();
  }, []);

  useEffect(() => {
    const fetchMessages = async () => {
      if (selectedConversation) {
        try {
          console.log(selectedConversation)
          const response = await getMessages(selectedConversation.id);
          console.log('Response from getMessages:', response);
          const msgs = response?.data || [];
          console.log('Messages extracted:', msgs);
          setMessages(msgs);
        } catch (err) {
          console.error('Error fetching messages:', err);
          setMessages([]);
        }
      } else {
        setMessages([]);
      }
    };
    fetchMessages();
  }, [selectedConversation]);

  const handleSelectConversation = (conversation: any) => {
    setSelectedConversation(conversation);
  };

  if (loading) {
    return <div className="text-white text-center mt-8">Cargando chats...</div>;
  }
  if (error) {
    return <div className="text-red-400 text-center mt-8">{error}</div>;
  }

  return (
    <div className="flex h-[calc(100vh-120px)]">
      <div className="w-1/3 bg-gray-800 border-r border-gray-700">
        <ConversationList
          conversations={conversations}
          selectedConversation={selectedConversation}
          onSelectConversation={handleSelectConversation}
        />
      </div>
      <div className="w-2/3 flex flex-col">
        <MessagePanel
          conversation={selectedConversation ? {
            other_user: selectedConversation.other_user,
            messages: messages,
            id: selectedConversation.id,
          } : null}
        />
      </div>
    </div>
  );
};

export default ChatRoom;

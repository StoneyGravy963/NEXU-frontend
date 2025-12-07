import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import ConversationList from '../components/chat/ConversationList';
import MessagePanel from '../components/chat/MessagePanel';
import { getChats, getMessages } from '../services/api/chatApi';

const ChatRoom: React.FC = () => {
  const location = useLocation();
  const navigationState = (location.state as any) || {};

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
        
        // Si llegamos por navegación (enviar mensaje desde perfil)
        if (navigationState.isFirst === true) {
          // Crear una conversación temporal para nuevo chat
          const newConversation = {
            id: navigationState.chatId || `temp_${Date.now()}`,
            other_user: navigationState.otherUser,
            messages: [],
            isNew: true,
            targetUserId: navigationState.targetUserId,
          };
          setSelectedConversation(newConversation);
          setMessages([]);
        } else if (navigationState.chatId && navigationState.otherUser) {
          // Chat existente, buscar en la lista o crear temporal
          const existingChat = chats?.find((c: any) => c.id === navigationState.chatId);
          if (existingChat) {
            setSelectedConversation(existingChat);
          } else {
            // Chat no encontrado en lista, crear temporal
            const tempConversation = {
              id: navigationState.chatId,
              other_user: navigationState.otherUser,
              messages: [],
            };
            setSelectedConversation(tempConversation);
          }
        } else if (chats && chats.length > 0) {
          // Comportamiento normal: seleccionar primer chat
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
          const response = await getMessages(selectedConversation.id);
          const msgs = response?.data || [];
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
      <div className="w-1/3 bg-gray-800 border-r border-gray-700 overflow-hidden">
        <ConversationList
          conversations={conversations}
          selectedConversation={selectedConversation}
          onSelectConversation={handleSelectConversation}
        />
      </div>
      <div className="w-2/3 flex flex-col overflow-hidden">
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

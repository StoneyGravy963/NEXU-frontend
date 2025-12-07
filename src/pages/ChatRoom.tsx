import React, { useEffect, useState, useContext, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import ConversationList from '../components/chat/ConversationList';
import MessagePanel from '../components/chat/MessagePanel';
import { getChats, getMessages } from '../services/api/chatApi';
import { SocketContext } from '../context/SocketContext';
import { AuthContext } from '../context/AuthContext';

const ChatRoom: React.FC = () => {
  const location = useLocation();
  const navigationState = (location.state as any) || {};
  const { socket } = useContext(SocketContext)!;
  const authContext = useContext(AuthContext);
  const user = authContext?.user;

  const [conversations, setConversations] = useState<any[]>([]);
  const [selectedConversation, setSelectedConversation] = useState<any | null>(null);
  const [messages, setMessages] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const conversationsRef = useRef(conversations);
  const selectedConversationRef = useRef(selectedConversation);

  useEffect(() => {
    conversationsRef.current = conversations;
  }, [conversations]);

  useEffect(() => {
    selectedConversationRef.current = selectedConversation;
  }, [selectedConversation]);

  useEffect(() => {
    if (!socket) return;

    const handleIncomingMessage = async (data: any) => {
      // Ignorar mensajes propios para evitar duplicados si ya se manejan optimísticamente
      if (user && data.sender_id === user.id) return;

      const exists = conversationsRef.current.find((c) => c.id === data.chat_id);

      if (exists) {
        setConversations((prevConversations) => {
          const existingIndex = prevConversations.findIndex((c) => c.id === data.chat_id);
          if (existingIndex === -1) return prevConversations;

          const isCurrentChat = selectedConversationRef.current?.id === data.chat_id;
          const currentUnread = prevConversations[existingIndex].unread_messages || 0;

          const updatedConversation = {
            ...prevConversations[existingIndex],
            last_message: {
              content: data.message,
              timestamp: new Date().toISOString(),
            },
            unread_messages: isCurrentChat ? 0 : currentUnread + 1,
          };
          const otherConvos = prevConversations.filter((c) => c.id !== data.chat_id);
          return [updatedConversation, ...otherConvos];
        });
      } else {
        // Chat nuevo para el receptor, recargar la lista completa para obtener datos del usuario, etc.
        try {
          const chats = await getChats();
          setConversations(chats || []);
        } catch (err) {
          console.error("Error updating chats list:", err);
        }
      }
    };

    socket.on('new_notification', handleIncomingMessage);
    return () => {
      socket.off('new_notification', handleIncomingMessage);
    };
  }, [socket, user]);

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
            unread_messages: 0,
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
              unread_messages: 0,
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
        // Reset unread count for the selected conversation locally
        setConversations((prev) =>
          prev.map((c) =>
            c.id === selectedConversation.id ? { ...c, unread_messages: 0 } : c
          )
        );

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

  const handleMessageSent = (text: string) => {
    if (!selectedConversation) return;

    setConversations((prevConversations) => {
      // Check if conversation already exists in the list
      const existingIndex = prevConversations.findIndex((c) => c.id === selectedConversation.id);

      let updatedConversation;

      if (existingIndex >= 0) {
        // Update existing conversation with new last message
        updatedConversation = {
          ...prevConversations[existingIndex],
          last_message: {
            content: text,
            timestamp: new Date().toISOString(),
          },
        };
        // Move to top
        const otherConvos = prevConversations.filter((c) => c.id !== selectedConversation.id);
        return [updatedConversation, ...otherConvos];
      } else {
        // Add new conversation to the list
        updatedConversation = {
          ...selectedConversation,
          isNew: false,
          last_message: {
            content: text,
            timestamp: new Date().toISOString(),
          },
        };
        return [updatedConversation, ...prevConversations];
      }
    });
  };

  if (loading) {
    return <div className="text-white text-center mt-8">Cargando chats...</div>;
  }
  if (error) {
    return <div className="text-red-400 text-center mt-8">{error}</div>;
  }

  return (
    <div className="flex h-[calc(100vh-120px)]">
      <div className="w-1/3 bg-theme-alt border-r border-theme-2 overflow-hidden">
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
            isNew: selectedConversation.isNew,
            targetUserId: selectedConversation.targetUserId
          } : null}
          onMessageSent={handleMessageSent}
        />
      </div>
    </div>
  );
};

export default ChatRoom;

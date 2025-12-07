import React, { useEffect, useState, useContext, useRef, useCallback } from 'react';
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

  // This function will fetch all chats and update the state
  const fetchAllChats = useCallback(async () => {
    // Only show full loading spinner for initial page load, not for refreshes
    // setLoading(true); // No, handle loading externally for refresh.
    try {
      const chats = await getChats();
      setConversations(chats || []);
      return chats;
    } catch (err: any) {
      console.error('Error fetching chats:', err);
      setError(err?.message || 'Error al obtener los chats');
      return [];
    }
  }, []); // Dependencies for useCallback. Empty means it won't re-create unless components mount.


  // Socket listener for new messages in real-time
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
            // Optimistic UI update: if current chat, set to 0. Otherwise, increment.
            // This will be overwritten by fetchAllChats later, but provides immediate feedback.
            unread_messages: isCurrentChat ? 0 : currentUnread + 1,
          };
          const otherConvos = prevConversations.filter((c) => c.id !== data.chat_id);
          return [updatedConversation, ...otherConvos];
        });
      } else {
        // Chat nuevo para el receptor, recargar la lista completa para obtener datos del usuario, etc.
        await fetchAllChats(); // Refresh all chats to include the new one
      }
    };

    socket.on('new_notification', handleIncomingMessage);
    return () => {
      socket.off('new_notification', handleIncomingMessage);
    };
  }, [socket, user, fetchAllChats]); // fetchAllChats added to dependencies


  // Initial load of chats and handling navigation state
  useEffect(() => {
    const loadInitialData = async () => {
      setLoading(true); // Show full loading spinner for initial data fetch
      const chats = await fetchAllChats(); // Use the reusable function to get all chats

      // Logic to set selectedConversation based on navigationState
      if (navigationState.isFirst === true) {
        const newConversation = {
          id: navigationState.chatId || `temp_${Date.now()}`,
          other_user: navigationState.otherUser,
          messages: [],
          isNew: true,
          targetUserId: navigationState.targetUserId,
          unread_messages: 0, // Initial new chats have 0 unread
        };
        setSelectedConversation(newConversation);
        setMessages([]);
      } else if (navigationState.chatId && navigationState.otherUser) {
        const existingChat = chats?.find((c: any) => c.id === navigationState.chatId);
        if (existingChat) {
          setSelectedConversation(existingChat);
        } else {
          const tempConversation = {
            id: navigationState.chatId,
            other_user: navigationState.otherUser,
            messages: [],
            unread_messages: 0, // Temp chats have 0 unread
          };
          setSelectedConversation(tempConversation);
        }
      } else if (chats && chats.length > 0) {
        setSelectedConversation(chats[0]);
      }
      setLoading(false); // End full loading once initial data and selection is done
    };
    loadInitialData();
  }, [fetchAllChats]); // fetchAllChats and navigationState added to dependencies. Removed navigationState from dependencies

  // Effect for fetching messages when selectedConversation changes
  useEffect(() => {
    const fetchAndMarkMessages = async () => {
      if (selectedConversation) {
        try {
          const response = await getMessages(selectedConversation.id); // This implicitly marks as read in backend
          const msgs = response?.data || [];
          setMessages(msgs);

          // After fetching messages (which marked them as read in backend),
          // re-fetch the list of chats to get updated unread counts
          await fetchAllChats(); // Refresh all chats to reflect updated read status

        } catch (err) {
          console.error('Error fetching messages:', err);
          setMessages([]);
        }
      } else {
        setMessages([]);
      }
    };
    fetchAndMarkMessages();
  }, [selectedConversation, fetchAllChats]); // Dependencies: re-run when selected chat changes or fetchAllChats is re-created

  const handleSelectConversation = (conversation: any) => {
    setSelectedConversation(conversation);
    // No need to locally reset unread_messages here, fetchAndMarkMessages will do it via backend refresh
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
          // Ensure unread_messages is 0 for the sender's own view of their active chat
          unread_messages: 0,
        };
        // Move to top
        const otherConvos = prevConversations.filter((c) => c.id !== selectedConversation.id);
        return [updatedConversation, ...otherConvos];
      } else {
        // Add new conversation to the list (optimistic update)
        updatedConversation = {
          ...selectedConversation,
          isNew: false,
          last_message: {
            content: text,
            timestamp: new Date().toISOString(),
          },
          unread_messages: 0, // New chats start with 0 unread
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

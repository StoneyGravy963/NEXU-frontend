import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { getMessages } from "../services/api/chatApi";

export const useMessageNavigation = () => {
  const navigate = useNavigate();
  const authContext = useContext(AuthContext);
  const currentUser = authContext?.user;

  /**
   * Calcula el chat_id de forma determinística basado en los IDs de dos usuarios
   */
  const calculateChatId = useCallback((userId1: string, userId2: string): string => {
    const userIds = [userId1, userId2].sort();
    return `${userIds[0]}-${userIds[1]}`;
  }, []);

  /**
   * Intenta abrir una conversación existente o crea una nueva
   * Navega a ChatRoom y establece la conversación apropiada
   */
  const navigateToChat = useCallback(
    async (targetUserId: string, targetUser: any) => {
      if (!currentUser?.id) {
        console.error("Current user ID not available");
        return;
      }

      const chatId = calculateChatId(currentUser.id, targetUserId);

      try {
        // Intentar obtener los mensajes del chat
        await getMessages(chatId);
        
        // El chat existe (200 OK)
        // Navegar a ChatRoom con el chat existente
        navigate("/chat", {
          state: {
            newConversation: false,
            chatId: chatId,
            otherUser: targetUser,
            isFirst: false,
          },
        });
      } catch (error: any) {
        // El chat no existe (404)
        if (error?.response?.status === 404) {
          // Navegar a ChatRoom en modo "New Conversation"
          // NO pasar chatId calculado, dejar que el backend lo genere
          navigate("/chat", {
            state: {
              newConversation: true,
              targetUserId: targetUserId,
              otherUser: targetUser,
              isFirst: true,
            },
          });
        } else {
          console.error("Error checking chat existence:", error);
          // Aún así navegar a ChatRoom en modo nuevo
          navigate("/chat", {
            state: {
              newConversation: true,
              targetUserId: targetUserId,
              otherUser: targetUser,
              isFirst: true,
            },
          });
        }
      }
    },
    [calculateChatId, navigate, currentUser?.id]
  );

  return { calculateChatId, navigateToChat };
};

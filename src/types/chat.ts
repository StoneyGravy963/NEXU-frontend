import type { User } from './user';

export interface ChatMessage {
  id: string; // Puede ser un UUID
  authorId: number; // ID del usuario que envía el mensaje
  text: string;
  timestamp: Date;
}

export interface ChatConversation {
  id: string; // Puede ser un UUID
  participants: User[]; // Lista de usuarios en la conversación
  messages: ChatMessage[];
  unreadCount?: number;
}
import type { User } from './user';

export interface ChatMessage {
  id: string;
  authorId: string; 
  text: string;
  timestamp: string; 
}

export interface ChatConversation {
  id: string;
  participants: User[];
  messages: ChatMessage[];
  unreadCount?: number;
}

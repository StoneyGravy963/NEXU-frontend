import type { User } from './user';

export interface ChatMessage {
  id: string;
  authorId: string; // Changed to string to match User.id
  text: string;
  timestamp: string; // Changed to string for easier serialization/mocking
}

export interface ChatConversation {
  id: string;
  participants: User[];
  messages: ChatMessage[];
  unreadCount?: number;
}

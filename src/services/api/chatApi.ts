import api from './requestApi';

// Get all chats for the current user
export const getChats = async () => {
  const res = await api.get('/chats/');
  return res.data?.data;
};

// Get all messages for a chat (nuevo endpoint: GET /chats/<chat_id>)
export const getMessages = async (chatId: string) => {
  const res = await api.get(`/chats/${chatId}`);
  return res.data?.data;
};

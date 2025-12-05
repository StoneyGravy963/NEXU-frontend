import api from './requestApi';


export const getChats = async () => {
  const res = await api.get('/chats/');
  return res.data?.data;
};


export const getMessages = async (chatId: string) => {
  const res = await api.get(`/chats/${chatId}`);
  return res.data;
};

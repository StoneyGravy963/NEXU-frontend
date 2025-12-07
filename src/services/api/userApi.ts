import api from './requestApi';
import type { User, AuthResponse, UpdateProfileData, Tag } from '../../types/user';

// Helper para transformar campos del backend (snake_case) a camelCase
const transformUserData = (data: any): User => {
  return {
    ...data,
    avatarUrl: data.avatar_url || data.avatarUrl,
    tag_ids: data.tag_ids,
    date_of_birth: data.date_of_birth,
    is_active: data.is_active,
  };
};

export const login = async (credentials: Pick<User, 'email' | 'password'>): Promise<AuthResponse> => {
  const response = await api.post('/users/login', credentials);
  return response.data?.data as AuthResponse;
};

export const signup = async (userData: User): Promise<AuthResponse> => {
  const response = await api.post('/users/signup', userData);
  return response.data?.data as AuthResponse;
};

export const getProfile = async (): Promise<User> => {
  const response = await api.get('/users/me');
  return transformUserData(response.data?.data);
};

export const getUserById = async (userId: string): Promise<User> => {
  const response = await api.get(`/users/${userId}`);
  return transformUserData(response.data?.data);
};

export const updateProfile = async (profileData: UpdateProfileData): Promise<User> => {
  const response = await api.put('/users/me', profileData);
  return transformUserData(response.data?.data);
};

export const uploadAvatar = async (file: File): Promise<User> => {
  const formData = new FormData();
  formData.append('avatar', file);
  
  const response = await api.post('/users/upload_avatar', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return transformUserData(response.data?.data);
};

export const getTags = async (): Promise<Tag[]> => {
  const response = await api.get('/tags/');
  return response.data?.data as Tag[];
};

export const createPost = async (postData: { tag_id: string; description: string }) => {
  const response = await api.post('/posts/', postData);
  return response.data?.data;
};

export const deletePost = async (postId: string) => {
  const response = await api.delete(`/posts/${postId}`);
  return response.data;
};

export const getAllPosts = async (tagId?: string): Promise<any[]> => {
  const response = await api.get('/posts/', {
    params: tagId ? { filter: tagId } : {}
  });
  return response.data?.data as any[];
};

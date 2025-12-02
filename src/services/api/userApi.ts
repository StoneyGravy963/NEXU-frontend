import api from './requestApi';
import type { User, AuthResponse } from '../../types/user';

export const login = async (credentials: Pick<User, 'email' | 'password'>): Promise<AuthResponse> => {
  const response = await api.post<AuthResponse>('/users/login', credentials);
  return response.data;
};

export const signup = async (userData: User): Promise<AuthResponse> => {
  const response = await api.post<AuthResponse>('/users/signup', userData);
  return response.data;
};

export const getProfile = async (): Promise<User> => {
  const response = await api.get<User>('/users/me');
  return response.data;
};
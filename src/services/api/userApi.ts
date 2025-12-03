import api from './requestApi';
import type { User, AuthResponse } from '../../types/user';

export const login = async (credentials: Pick<User, 'email' | 'password'>): Promise<AuthResponse> => {
  const response = await api.post('/users/login', credentials);
  // Backend wraps payload in { data: { access_token, token_type } }
  return response.data?.data as AuthResponse;
};

export const signup = async (userData: User): Promise<AuthResponse> => {
  const response = await api.post('/users/signup', userData);
  return response.data?.data as AuthResponse;
};

export const getProfile = async (): Promise<User> => {
  const response = await api.get('/users/me');
  // Backend returns { data: <User> }
  return response.data?.data as User;
};
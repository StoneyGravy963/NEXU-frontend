import React, { createContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import type { User, AuthResponse } from '../types/user';
import { login as apiLogin, signup as apiSignup, getProfile } from '../services/api/userApi';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  isAuthenticated: boolean;
  login: (credentials: Pick<User, 'email' | 'password'>) => Promise<void>;
  signup: (userData: User) => Promise<void>;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem('token');
      if (token) {
        try {
          const userData = await getProfile();
          setUser(userData);
          setIsAuthenticated(true);
        } catch (error) {
          console.error("Failed to fetch profile:", error);
          localStorage.removeItem('token');
          setUser(null);
          setIsAuthenticated(false);
        }
      }
      setLoading(false);
    };

    checkAuth();
  }, []);

  const login = async (credentials: Pick<User, 'email' | 'password'>) => {
    try {
      const response: AuthResponse = await apiLogin(credentials);
      if (!response || !response.access_token) {
        throw new Error('No access token received from login');
      }
      localStorage.setItem('token', response.access_token);
      const userData = await getProfile();
      setUser(userData);
      setIsAuthenticated(true);
    } catch (error) {
      console.error("Login failed:", error);
      throw error;
    }
  };

  const signup = async (userData: User) => {
    try {
      const response: AuthResponse = await apiSignup(userData);
      if (!response || !response.access_token) {
        throw new Error('No access token received from signup');
      }
      localStorage.setItem('token', response.access_token);
      const profile = await getProfile();
      setUser(profile);
      setIsAuthenticated(true);
    } catch (error) {
      console.error("Signup failed:", error);
      throw error;
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ user, loading, isAuthenticated, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
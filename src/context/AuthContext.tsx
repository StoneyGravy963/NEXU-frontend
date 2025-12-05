import { createContext, useState, useEffect, type ReactNode } from "react";
import { login as apiLogin, signup as apiSignup, getProfile } from "../services/api/userApi";
import type { User, AuthResponse } from "../types/user";

export interface AuthContextType {
  user: User | null;
  loading: boolean;
  isAuthenticated: boolean;
  jwt: string | null;
  login: (credentials: Pick<User, "email" | "password">) => Promise<void>;
  signup: (userData: User) => Promise<void>;
  logout: () => void;
  updateUser: (updatedUser: User) => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [jwt, setJwt] = useState<string | null>(localStorage.getItem("token"));
  const [loading, setLoading] = useState<boolean>(true);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  useEffect(() => {
    const checkAuth = async () => {
      if (!jwt) {
        setLoading(false);
        return;
      }

      try {
        const userData = await getProfile();
        setUser(userData);
        setIsAuthenticated(true);
      } catch (error) {
        console.error("Failed to fetch profile:", error);
        localStorage.removeItem("token");
        setJwt(null);
        setIsAuthenticated(false);
      }

      setLoading(false);
    };

    checkAuth();
  }, [jwt]);

  const login = async (credentials: Pick<User, "email" | "password">) => {
    const response: AuthResponse = await apiLogin(credentials);

    if (!response.access_token) {
      throw new Error("No access token received");
    }

    localStorage.setItem("token", response.access_token);
    setJwt(response.access_token);

    const profile = await getProfile();
    setUser(profile);
    setIsAuthenticated(true);
  };

  const signup = async (userData: User) => {
    const response: AuthResponse = await apiSignup(userData);

    if (!response.access_token) {
      throw new Error("No access token received");
    }

    localStorage.setItem("token", response.access_token);
    setJwt(response.access_token);

    const profile = await getProfile();
    setUser(profile);
    setIsAuthenticated(true);
  };

  const logout = () => {
    localStorage.removeItem("token");
    setJwt(null);
    setUser(null);
    setIsAuthenticated(false);
  };

  const updateUser = (updatedUser: User) => {
    setUser(updatedUser);
  };

  return (
    <AuthContext.Provider
      value={{ user, loading, isAuthenticated, jwt, login, signup, logout, updateUser }}
    >
      {children}
    </AuthContext.Provider>
  );
};

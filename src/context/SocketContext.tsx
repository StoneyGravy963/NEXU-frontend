import React, { createContext, useContext, useEffect, useState } from 'react';
import { io, Socket } from 'socket.io-client';

interface SocketContextType {
  socket: Socket | null;
  connected: boolean;
}

const SocketContext = createContext<SocketContextType>({ socket: null, connected: false });

export const useSocket = () => useContext(SocketContext);

export const SocketProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [connected, setConnected] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token') || localStorage.getItem('access_token');
    if (!token) return;

    // Usar el parámetro 'auth' para enviar el token (sin 'Bearer')
    const newSocket = io('http://localhost:5000', {
      auth: { token },
      transports: ['websocket'],
    });

    newSocket.on('connect', () => {
      setConnected(true);
      console.log('✅ Socket conectado');
    });
    newSocket.on('disconnect', () => {
      setConnected(false);
      console.log('❌ Socket desconectado');
    });

    setSocket(newSocket);
    return () => {
      newSocket.close();
    };
  }, []);

  return (
    <SocketContext.Provider value={{ socket, connected }}>
      {children}
    </SocketContext.Provider>
  );
};

import { useAuth } from "./hooks/useAuth";
import UserProfile from "./pages/Profile";
import UserView from "./pages/UserView";
import ChatRoom from "./pages/ChatRoom";
import Home from "./pages/Home";
import { ThemeProvider } from "./context/ThemeContext";
import SignupPage from './pages/SignupPage';
import ProtectedLayout from './components/resources/ProtectedLyout';
import LoginSignupPage from './pages/LoginSignupPage';
import type { ReactElement } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { SocketProvider } from './context/SocketContext';



const ProtectedRoute = ({ children }: { children: ReactElement }) => {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-900 text-white">
        Loading...
      </div>
    );
  }


  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return children;
};

const PublicRoute = ({ children }: { children: ReactElement }) => {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-900 text-white">
        Loading...
      </div>
    );
  }

  if (isAuthenticated) {
    return <Navigate to="/home" replace />;
  }

  return children;
};

function App() {
  return (
    <AuthProvider>
     <ThemeProvider>
      <SocketProvider>
      <Routes>
        <Route
          path="/"
          element={
            <PublicRoute>
              <LoginSignupPage />
            </PublicRoute>
          }
        />
        <Route
          path="/signup"
          element={
            <PublicRoute>
              <SignupPage />
            </PublicRoute>
          }
        />

        <Route
          element={
            <ProtectedRoute>
              <ProtectedLayout />
            </ProtectedRoute>
          }
        >
          <Route path="/home" element={<Home />} />
          <Route path="/profile" element={<UserProfile />} />
          <Route path="/profile/:userId" element={<UserView />} />
          <Route path="/chat" element={<ChatRoom />} />
        </Route>
        {}
        <Route path="*" element={<Navigate to="/home" replace />} />
      </Routes>
      </SocketProvider>
      </ThemeProvider>
      
    </AuthProvider>
  );
}

export default App;

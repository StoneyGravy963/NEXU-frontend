import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link, Navigate, Outlet } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { useAuth } from './hooks/useAuth';
import UserProfile from './pages/Profile';
import ChatRoom from './pages/ChatRoom';
import Home from './pages/Home';
import LoginSignup from './components/auth/LoginSignin';

const ProtectedLayout = () => {
  const { user, logout } = useAuth();
  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <nav className="bg-gray-800 p-4 flex justify-between items-center sticky top-0 z-50 shadow-md">
        <ul className="flex space-x-6">
            <li><Link to="/" className="hover:text-blue-400 font-medium transition-colors">Inicio</Link></li>
            <li><Link to="/profile" className="hover:text-blue-400 font-medium transition-colors">Perfil</Link></li>
            <li><Link to="/chat" className="hover:text-blue-400 font-medium transition-colors">Chats</Link></li>
        </ul>
         <div className="flex items-center space-x-4">
             {user && <span className="text-gray-200 font-semibold">Hola, {user.name}</span>}
             <button 
                onClick={logout} 
                className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md transition-colors text-sm font-medium"
             >
                Logout
             </button>
         </div>
      </nav>
      <main className="p-8">
        <Outlet />
      </main>
    </div>
  );
};

const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
      return <div className="flex items-center justify-center h-screen bg-gray-900 text-white">Loading...</div>;
  }
  
  if (!isAuthenticated) {
      return <Navigate to="/login" replace />;
  }

  return children;
};

const PublicRoute = ({ children }: { children: JSX.Element }) => {
   const { isAuthenticated, loading } = useAuth();
   
   if (loading) {
       return <div className="flex items-center justify-center h-screen bg-gray-900 text-white">Loading...</div>;
   }

   if (isAuthenticated) {
       return <Navigate to="/" replace />;
   }
   
   return children;
};

function App() {
  return (
    <AuthProvider>
      <Router>
          <Routes>
            <Route path="/login" element={
                <PublicRoute>
                    <LoginSignup />
                </PublicRoute>
            } />
            
            <Route element={
                <ProtectedRoute>
                    <ProtectedLayout />
                </ProtectedRoute>
            }>
                <Route path="/" element={<Home />} />
                <Route path="/profile" element={<UserProfile />} />
                <Route path="/chat" element={<ChatRoom />} />
            </Route>
             {/* Redirect any unknown route to home (which will redirect to login if needed) */}
             <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
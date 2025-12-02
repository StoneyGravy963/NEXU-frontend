import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import UserProfile from './pages/Profile';
import ChatRoom from './pages/ChatRoom';
import Home from './pages/Home';
import LoginSignup from './components/auth/LoginSignin';

function App() {
  return (
    <Router>
      <div className="bg-gray-900 text-white min-h-screen">
        <nav className="bg-gray-800 p-4">
          <ul className="flex space-x-4">
            <li>
              <Link to="/" className="hover:text-blue-400">Inicio</Link>
            </li>
            <li>
              <Link to="/profile" className="hover:text-blue-400">Perfil</Link>
            </li>
            <li>
              <Link to="/chat" className="hover:text-blue-400">Chats</Link>
            </li>
            <li>
              <Link to="/login" className="hover:text-blue-400">Login</Link>
            </li>
          </ul>
        </nav>

        <main className="p-8">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/profile" element={<UserProfile />} />
            <Route path="/chat" element={<ChatRoom />} />
            <Route path="/login" element={<LoginSignup />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;

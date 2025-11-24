import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import UserProfile from './pages/Profile';
import ChatRoom from './pages/ChatRoom';
import Home from './pages/Home'; // Assuming you have a Home component

function App() {
  return (
    <Router>
      <div className="bg-gray-900 text-white min-h-screen">
        <nav className="bg-gray-800 p-4">
          <ul className="flex space-x-4">
            <li>
              <Link to="/" className="hover:text-blue-400">Home</Link>
            </li>
            <li>
              <Link to="/profile" className="hover:text-blue-400">Profile</Link>
            </li>
            <li>
              <Link to="/chat" className="hover:text-blue-400">Chat</Link>
            </li>
          </ul>
        </nav>

        <main className="p-8">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/profile" element={<UserProfile />} />
            <Route path="/chat" element={<ChatRoom />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;

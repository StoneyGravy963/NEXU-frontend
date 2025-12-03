import { Route, Routes } from 'react-router-dom';
import SignupPage from './pages/SignupPage';
import LoginSignupPage from './pages/LoginSignupPage';

function App() {
  return (
    <Routes>
      <Route path="/" element={<LoginSignupPage />} />
      <Route path="/signup" element={<SignupPage />} />
    </Routes>
  );
}

export default App;

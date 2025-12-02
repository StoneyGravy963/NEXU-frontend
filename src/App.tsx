import { Route, Routes } from 'react-router-dom';
import LoginSignin from './pages/LoginSignin';
import Signup from './pages/Signup';

function App() {
  return (
    <Routes>
      <Route path="/" element={<LoginSignin />} />
      <Route path="/signup" element={<Signup />} />
    </Routes>
  );
}

export default App;

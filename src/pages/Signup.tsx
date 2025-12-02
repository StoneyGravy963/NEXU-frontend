import { useAuth } from '../hooks/useAuth';
import { useNavigate } from 'react-router-dom';

export default function Signup() {
  const { email, setEmail, password, setPassword, handleSignup } = useAuth();
  const navigate = useNavigate();

  const onSignupClick = async () => {
    try {
      await handleSignup();
      // Navigate to the login page on successful signup
      navigate('/');
    } catch (error) {
      // Handle signup failure (e.g., show an error message)
      alert('Signup failed. Please try again.');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-linear-to-b from-(--oxford-blue) to-(--oxford-two)">
      <div className="bg-opacity-20 backdrop-blur-xs p-8 rounded-lg shadow-lg w-2/5">
        <h1 className="text-3xl text-white text-center mb-6">Create Account</h1>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full mb-4 p-2 rounded bg-(--oxford-blue) bg-opacity-50 placeholder-gray-300 text-white"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full mb-4 p-2 rounded bg-(--oxford-blue) bg-opacity-50 placeholder-gray-300 text-white"
        />
        {/* We can add a "Confirm Password" field later if needed */}
        <button
          onClick={onSignupClick}
          className="w-full mt-4 bg-(--zomp) text-white py-2 rounded hover:bg-(--emerald) transition-colors"
        >
          Sign Up
        </button>
      </div>
    </div>
  );
}
import { useState } from "react";

export default function LoginSignup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    alert(`Login: ${email}`);
  };

  const handleSignup = () => {
    alert(`Sign Up: ${email}`);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-80">
        <h2 className="text-center text-2xl font-bold mb-4">Login</h2>

        <input
          type="email"
          placeholder="Correo"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-2 border rounded-lg mb-3"
        />

        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-2 border rounded-lg mb-3"
        />

        <button
          onClick={handleLogin}
          className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 mb-3"
        >
          Login
        </button>

        <button
          onClick={handleSignup}
          className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700"
        >
          Sign Up
        </button>
      </div>
    </div>
  );
}

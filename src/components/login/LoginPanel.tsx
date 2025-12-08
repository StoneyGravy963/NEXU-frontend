import React from "react";

interface LoginPanelProps {
  email: string;
  setEmail: React.Dispatch<React.SetStateAction<string>>;
  password: string;
  setPassword: React.Dispatch<React.SetStateAction<string>>;
  onLogin: () => void;
  onSignupNavigate: () => void;
}

export default function LoginPanel({
  email,
  setEmail,
  password,
  setPassword,
  onLogin,
  onSignupNavigate,
}: LoginPanelProps) {
  return (
    <div className="w-[92%] sm:w-3/4 md:w-2/3 lg:w-4/5 bg-[rgba(255,255,255,0.04)] backdrop-blur-md p-6 sm:p-8 rounded-xl shadow-xl">
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="w-full mb-3 p-3 rounded-md bg-[rgba(0,0,0,0.25)] placeholder-gray-300 text-white outline-none"
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="w-full mb-4 p-3 rounded-md bg-[rgba(0,0,0,0.25)] placeholder-gray-300 text-white outline-none"
      />
      <button
        onClick={onLogin}
        className="w-full py-3 rounded-md bg-midnight-green hover:bg-emerald transition text-white bold-font"
      >
        Login
      </button>
      <button
        onClick={onLogin}
        className="w-full py-3 text-black rounded-md bg-white hover:bg-gray-200 transition my-2 "
      >
        <img src="img/googleIcon.webp" alt="Google icon" className="inline-block mr-2 w-8 h-8" />
        Sign Up with Google
      </button>

      <button
        onClick={onSignupNavigate}
        className="w-full  py-3 rounded-md bg-zomp hover:bg-emerald transition text-white bold-font"
      >
        Sign Up
      </button>
    </div>
  );
}

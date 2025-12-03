import { FiHome, FiUser, FiMessageCircle } from "react-icons/fi";
import { Link, useLocation } from "react-router-dom";

export default function MobileMenu() {
  const location = useLocation();

  const isActive = (path: string) =>
    location.pathname === path ? "text-emerald" : "text-gray-400";

  return (
    <div className="
      fixed bottom-0 left-0 w-full 
      bg-oxford-two dark:bg-oxford-blue 
      border-t border-white/10 
      flex justify-around items-center 
      py-3 
      md:hidden
    ">
      <Link to="/home" className={`flex flex-col items-center ${isActive("/home")}`}>
        <FiHome size={24} />
      </Link>

      <Link to="/chat" className={`flex flex-col items-center ${isActive("/chat")}`}>
        <FiMessageCircle size={24} />
      </Link>

      <Link to="/profile" className={`flex flex-col items-center ${isActive("/profile")}`}>
        <FiUser size={24} />
      </Link>
    </div>
  );
}

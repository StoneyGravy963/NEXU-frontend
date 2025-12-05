import { Link, Outlet } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import ThemeToggle from "../resources/ThemeToggle";


const ProtectedLayout = () => {
  const {  logout } = useAuth();

  return (
    <div
      className="
        min-h-screen 
        bg-light_bg_start text-light_text
        dark:bg-oxford-blue dark:text-white
        transition-colors duration-300
      "
    >
      {/* NAVBAR */}
      <nav
        className="
          p-4 flex justify-between items-center
          sticky top-0 z-50 shadow-md
          bg-oxford-two 
          transition-colors duration-300
        "
      >
        {/* LINKS */}
        <ul className="flex space-x-6 text-white">
          <li>
            <Link
              to="/home"
              className="
                 transition  hover:text-zomp"
            >
              Inicio
            </Link>
          </li>

          <li>
            <Link
              to="/profile"
              className="
                transition  hover:text-zomp"
            >
              Perfil
            </Link>
          </li>

          <li>
            <Link
              to="/chat"
              className="
                transition  hover:text-zomp"
            >
              Chats
            </Link>
          </li>
        </ul>

        {/* RIGHT SECTION */}
        <div className="flex items-center gap-4">

          <ThemeToggle />

          <button
            onClick={logout}
            className="
              px-4 py-2 rounded font-semibold
              bg-zomp text-white
              hover:bg-emerald
              transition-colors
            "
          >
            Logout
          </button>
        </div>
      </nav>

      {/* MAIN CONTENT */}
      <main className="p-2">
        <Outlet />
      </main>
    </div>
  );
};

export default ProtectedLayout;

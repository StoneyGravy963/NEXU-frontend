import { useAuth } from "../hooks/useAuth";
import { FiSearch, FiHome, FiUser, FiMessageSquare } from "react-icons/fi";
import { HomeHeader, } from "../components/home/HomeHeader";
import { SearchBar } from "../components/home/SearchBar";
import { PostCard } from "../components/home/PostCard";
import MobileMenu from "../components/home/BottomNav";

export default function Home() {
  const { user } = useAuth();

  return (
<div className="flex flex-col min-h-screen bg-oxford-blue text-white dark:bg-oxford-two">
      
      {/* HEADER */}
      <HomeHeader username={user?.name || "Usuario"} />

      {/* SEARCH BAR */}
      <SearchBar />

      {/* POSTS CONTAINER */}
      <div className="flex flex-col gap-4 p-4 max-w-xl mx-auto w-full">
        <PostCard />
        <PostCard />
        <PostCard />
      </div>

      {/* NAVBAR INFERIOR (solo móvil) */}
      <MobileMenu />
    </div>
  );
}

import { useAuth } from "../hooks/useAuth";
import { HomeHeader } from "../components/home/HomeHeader";
import { SearchBar } from "../components/home/SearchBar";
import MobileMenu from "../components/home/BottomNav";
import { mockPosts } from "../mocks/posts";
import { useState } from "react";
import Feed from "./Feed";

export default function Home() {
  const { user } = useAuth();
  const [search, setSearch] = useState("");


  return (
    <div className="flex flex-col min-h-screen bg-theme text-theme transition-colors">
      {/* HEADER */}
      <HomeHeader username={user?.name || "Usuario"} />

      {/* SEARCH BAR */}
      <SearchBar onSearchChange={(value) => setSearch(value)} />

      {/* POSTS */}
      <Feed />
     
     

      {/* NAVBAR INFERIOR (solo móvil) */}
      <MobileMenu />
    </div>
  );
}

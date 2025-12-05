import { useAuth } from "../hooks/useAuth";
import { HomeHeader } from "../components/home/HomeHeader";
import { SearchBar } from "../components/home/SearchBar";
import { PostCard } from "../components/home/PostCard";
import MobileMenu from "../components/home/BottomNav";
import { mockPosts } from "../mocks/posts";
import { useState } from "react";

export default function Home() {
  const { user } = useAuth();
  const [search, setSearch] = useState("");

  // 🔍 FILTRO — busca por: categoría, nombre, carrera o contenido
  const filteredPosts = mockPosts.filter((post) => {
    const text = search.toLowerCase();
    return (
      post.categoria.toLowerCase().includes(text)
    );
  });
  return (
    <div className="flex flex-col min-h-screen bg-theme text-theme transition-colors">
      {/* HEADER */}
      <HomeHeader username={user?.name || "Usuario"} />

      {/* SEARCH BAR */}
      <SearchBar onSearchChange={setSearch} />

      {/* POSTS */}
      {filteredPosts.map((post) => (
        <PostCard
          key={post.id}
          nombre={post.nombre}
          carrera={post.carrera}
          categoria={post.categoria}
          contenido={post.contenido}
        />
      ))}

      {/* NAVBAR INFERIOR (solo móvil) */}
      <MobileMenu />
    </div>
  );
}

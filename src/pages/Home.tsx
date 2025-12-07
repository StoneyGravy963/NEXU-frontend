import { useAuth } from "../hooks/useAuth";
import { HomeHeader } from "../components/home/HomeHeader";
import MobileMenu from "../components/home/BottomNav";
import Feed from "./Feed";

export default function Home() {
  const { user } = useAuth();


  return (
    <div className="flex flex-col min-h-screen bg-theme text-theme transition-colors">
      {/* HEADER */}
      <HomeHeader username={user?.name || "Usuario"} avatar_url={user?.avatarUrl || "/default-avatar.png"} />

     

      {/* POSTS */}
      <Feed />
     
     

      {/* NAVBAR INFERIOR (solo móvil) */}
      <MobileMenu />
    </div>
  );
}

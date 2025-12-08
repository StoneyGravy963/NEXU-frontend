import { useAuth } from "../hooks/useAuth";
import { HomeHeader } from "../components/home/HomeHeader";
import MobileMenu from "../components/home/BottomNav";
import Feed from "./Feed";
import { usePosts } from "../hooks/usePosts";

export default function Home() {
  const { user } = useAuth();
  const { posts, setPosts, loading, filterTag, setFilterTag, reload } = usePosts();

  const handlePostCreated = (newPost: any) => {
    // Inject current user info into the new post
    const enrichedPost = {
      ...newPost,
      user: {
        id: user?.id,
        name: user?.name,
        avatar_url: user?.avatarUrl,
        career: user?.career
      }
    };
    setPosts(prevPosts => [enrichedPost, ...prevPosts]);
  };

  return (
    <div className="flex flex-col min-h-screen bg-theme text-theme transition-colors">
      {/* HEADER */}
      <HomeHeader 
        username={user?.name || "Usuario"} 
        avatar_url={user?.avatarUrl || null} 
        onPostCreated={handlePostCreated}
      />

      {/* POSTS */}
      <Feed 
        posts={posts} 
        setPosts={setPosts}
        loading={loading} 
        filterTag={filterTag} 
        setFilterTag={setFilterTag} 
        reload={reload} 
      />
     
      {/* NAVBAR INFERIOR (solo móvil) */}
      <MobileMenu />
    </div>
  );
}

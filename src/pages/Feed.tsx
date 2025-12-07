import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { usePosts } from "../hooks/usePosts";
import { getTags } from "../services/api/userApi";
import type { Tag } from "../types/user";
import { PostCard } from "../components/home/PostCard";

export default function Feed() {
  const { posts, loading, filterTag, setFilterTag } = usePosts();
  const [tags, setTags] = useState<Tag[]>([]);

  useEffect(() => {
    loadTags();
  }, []);

  const loadTags = async () => {
    const data = await getTags();
    setTags(data);
  };

  return (
    <div className="w-full p-4 ">
      {/* Buscador por tag */}
      <select
        className="w-full p-2 mb-4 rounded-lg bg-theme-alt border border-white text-theme hover:border-zomp transition-colors"
        value={filterTag}
        onChange={(e) => setFilterTag(e.target.value)}
      >
        <option value="">Todos los posts</option>

        {tags.map((tag: any) => (
          <option key={tag.id} value={tag.id}>
            {tag.name}
          </option>
        ))}
      </select>

      {/* Feed */}
      {loading && <p className="text-theme">Cargando publicaciones...</p>}

      {!loading && posts.length === 0 && (
        <p className="text-theme">No hay publicaciones.</p>
      )}

      <div className="flex flex-col gap-4">
        {posts.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>
    </div>
  );
}

import { useEffect, useState } from "react";
import { usePosts } from "../hooks/usePosts";
import { getTags } from "../services/api/userApi";
import type { Tag } from "../types/user";

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
          <div
            key={post.id}
            className="
              bg-theme-alt p-4 rounded-lg shadow-md transition hover:backdrop-blur-2xl hover:border-zomp/50 border-2 border-transparent
            "
          >
            <div className="flex flex-row justify-between">
              {/* Header */}
              <div className="">
                <div className="flex items-center gap-3 mb-2">
                  <img
                    src={post.user.avatar_url}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  <div>
                    <p className="font-semibold text-theme">{post.user.name}</p>
                    <p className="text-sm text-theme-2">{post.user.career}</p>
                  </div>
                </div>
                {/* Contenido */}
                <p className="text-theme mb-2">{post.description}</p>
                {/* Fecha */}
                <p className="text-xs text-theme-2">
                  {new Date(post.timestamp).toLocaleString()}
                </p>
              </div>
              <div className="">
                <p
                  className="
                    text-sm text-theme-2 bg-zomp/20 border-2 border-zomp p-2 rounded-full text-center
                    truncate max-w-[100px]     
                    md:truncate-none md:max-w-none  
                  ">
                  {post.tag.name}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

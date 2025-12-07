import { useEffect, useState } from "react";
import { getAllPosts } from "../services/api/userApi";

export function usePosts() {
  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [filterTag, setFilterTag] = useState<string>("");

  const loadPosts = async () => {
    try {
      setLoading(true);
      const result = await getAllPosts(filterTag ? filterTag : undefined);
      setPosts(result);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadPosts();
  }, [filterTag]);

  return {
    posts,
    setPosts, // Export setPosts
    loading,
    filterTag,
    setFilterTag,
    reload: loadPosts
  };
}

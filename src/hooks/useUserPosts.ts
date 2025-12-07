import { useState, useEffect } from 'react';
import { getAllPosts } from '../services/api/userApi';

export const useUserPosts = (userId: string | undefined) => {
  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUserPosts = async () => {
      if (!userId) {
        setLoading(false);
        return;
      }
      
      setLoading(true);
      setError(null);
      try {
        const allPosts = await getAllPosts();
        // Filtrar en el cliente los posts que pertenecen al usuario
        const userPosts = allPosts.filter((post: any) => post.user && post.user.id === userId);
        setPosts(userPosts);
      } catch (err: any) {
        setError(err.message || 'Error al obtener los posts del usuario');
      } finally {
        setLoading(false);
      }
    };

    fetchUserPosts();
  }, [userId]);

  return { posts, setPosts, loading, error };
};

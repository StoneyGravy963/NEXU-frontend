import React, { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import type { User } from '../types/user';
import { getUserById } from '../services/api/userApi';
import { AuthContext } from '../context/AuthContext';
import { useMessageNavigation } from '../hooks/useMessageNavigation';
import { useUserPosts } from '../hooks/useUserPosts';
import { PostCard } from '../components/home/PostCard';

function formatDateToDDMMYYYY(dateStr?: string) {
  if (!dateStr) return '';
  const d = new Date(dateStr);
  if (isNaN(d.getTime())) {
    const parsed = Date.parse(dateStr);
    if (isNaN(parsed)) return dateStr;
    const dd = new Date(parsed);
    const day = String(dd.getDate()).padStart(2, '0');
    const month = String(dd.getMonth() + 1).padStart(2, '0');
    const year = dd.getFullYear();
    return `${day}/${month}/${year}`;
  }
  const day = String(d.getDate()).padStart(2, '0');
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const year = d.getFullYear();
  return `${day}/${month}/${year}`;
}

const UserView: React.FC = () => {
  const { userId } = useParams();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const authContext = useContext(AuthContext);
  const currentUser = authContext?.user;
  const { navigateToChat } = useMessageNavigation();
  const { posts, loading: loadingPosts } = useUserPosts(userId);

  useEffect(() => {
    const fetchUser = async () => {
      if (!userId) return;
      setLoading(true);
      setError(null);
      try {
        const data = await getUserById(userId);
        setUser(data);
      } catch (err: any) {
        console.error('Failed to fetch user by id', err);
        setError(err?.response?.data?.error || err?.message || 'Error fetching user');
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [userId]);

  const handleSendMessage = async () => {
    if (!user || !currentUser?.id) return;
    await navigateToChat(user.id, user);
  };

  if (loading) return <div className="text-white text-center mt-8">Cargando perfil...</div>;
  if (error) return <div className="text-red-400 text-center mt-8">Error: {error}</div>;
  if (!user) return <div className="text-white text-center mt-8">No se encontró el usuario</div>;

  // backend may return `avatar_url` or `avatarUrl` depending on mapping
  const avatar = (user as any).avatarUrl || (user as any).avatar_url || `https://ui-avatars.com/api/?name=${encodeURIComponent(user.name)}&background=random`;

  return (
    <div className="max-w-4xl mx-auto p-6 bg-gray-800 rounded-lg shadow-xl mt-10 text-white">
      <div className="flex items-center justify-between space-x-6 mb-8">
        <div className="flex items-center space-x-6 flex-1">
          <div className="relative w-28 h-28">
            <img
              src={avatar}
              alt={user.name}
              className="w-full h-full rounded-full object-cover border-4 border-blue-500"
            />
          </div>
          <div>
            <h1 className="text-3xl font-bold">{user.name}</h1>
            <p className="text-gray-300 text-lg">@{user.name.replace(/\s+/g, '').toLowerCase()}</p>
            {user.career && <p className="text-gray-300 mt-1">Carrera: {user.career}</p>}
            {user.gender && <p className="text-gray-300">Género: {user.gender}</p>}
            {user.date_of_birth && (
              <p className="text-gray-300">Nacimiento: {formatDateToDDMMYYYY(user.date_of_birth)}</p>
            )}
          </div>
        </div>

        {/* Botón Enviar Mensaje - Solo aparece si no es tu propio perfil */}
        {currentUser?.id !== user.id && (
          <button
            onClick={handleSendMessage}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition flex items-center gap-2 whitespace-nowrap h-fit"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            Enviar Mensaje
          </button>
        )}
      </div>

      <div className="mt-8">
        <h2 className="text-2xl font-semibold border-b border-gray-600 pb-2">Sobre mí</h2>
        <p className="text-gray-300 mt-4">{user.bio || 'No hay información disponible.'}</p>
      </div>

      {user.skills && user.skills.length > 0 && (
        <div className="mt-8">
          <h2 className="text-2xl font-semibold border-b border-gray-600 pb-2">Skills</h2>
          <div className="flex flex-wrap gap-2 mt-4">
            {user.skills.map((skill: string, index: number) => (
              <span key={index} className="bg-blue-600 text-white text-sm px-3 py-1 rounded-full">
                {skill}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Sección de Posts */}
      <div className="mt-8">
        <h2 className="text-2xl font-semibold border-b border-gray-600 pb-2">Posts</h2>
        <div className="mt-4 flex flex-col gap-4">
          {loadingPosts ? (
            <p className="text-gray-400">Cargando posts...</p>
          ) : posts.length > 0 ? (
            posts.map((post) => (
              <PostCard key={post.id} post={post} />
            ))
          ) : (
            <p className="text-gray-400">Este usuario no ha publicado nada aún.</p>
          )}
        </div>
      </div>

      <div className="mt-8">
        <h2 className="text-2xl font-semibold border-b border-gray-600 pb-2">Contacto</h2>
        <p className="text-gray-300 mt-4">
          Email:{' '}
          <a href={`mailto:${user.email}`} className="text-blue-400 hover:underline">
            {user.email}
          </a>
        </p>
      </div>
    </div>
  );
};

export default UserView;

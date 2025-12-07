import React, { useState, useEffect } from 'react';
import { useAuth } from '../hooks/useAuth';
import { useSearchParams } from 'react-router-dom';
import EditProfileModal from '../components/profile/EditProfileModal';
import type { User } from '../types/user';

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

const UserProfile: React.FC = () => {
  const { user, updateUser } = useAuth();
  const [searchParams, setSearchParams] = useSearchParams();
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  useEffect(() => {
    if (searchParams.get('edit') === 'true') {
      setIsEditModalOpen(true);
      searchParams.delete('edit');
      setSearchParams(searchParams, { replace: true });
    }
  }, [searchParams, setSearchParams]);

  const handleProfileUpdated = (updatedUser: User) => {
    updateUser(updatedUser);
  };

  if (!user) {
    return <div className="text-center text-theme text-lg">Cargando Perfil...</div>;
  }

  const displayTags = user.tags || user.skills || [];

  return (
    <>
      <div className="max-w-4xl mx-auto p-6 bg-theme rounded-lg shadow-xl mt-10">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-6">
            <div className="relative w-28 h-28">
              <img
                src={user.avatarUrl || `https://ui-avatars.com/api/?name=${user.name}&background=random`}
                alt={user.name}
                className="w-full h-full rounded-full object-cover border-4 border-accent"
              />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-theme">{user.name}</h1>
              <p className="text-theme-2 text-lg">@{user.name.replace(/\s+/g, '').toLowerCase()}</p>
              {user.career && <p className="text-theme-2 mt-1">Carrera: {user.career}</p>}
              {user.gender && <p className="text-theme-2">Género: {user.gender}</p>}
              {user.date_of_birth && (
                <p className="text-theme-2">Fecha de Nacimiento: {formatDateToDDMMYYYY(user.date_of_birth)}</p>
              )}
            </div>
          </div>

          <button
            onClick={() => setIsEditModalOpen(true)}
            className="btn-theme px-6 py-2 rounded-lg font-medium transition flex items-center gap-2"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 
              112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
            </svg>
            Editar Perfil
          </button>
        </div>

        <div className="mt-8">
          <h2 className="text-2xl font-semibold text-theme border-b border-theme-2 pb-2">Descripción</h2>
          <p className="text-theme-2 mt-4">{user.bio || "No hay descripción disponible."}</p>
        </div>

        {displayTags.length > 0 && (
          <div className="mt-8">
            <h2 className="text-2xl font-semibold text-theme border-b border-theme-2 pb-2">Habilidades</h2>
            <div className="flex flex-wrap gap-2 mt-4">
              {displayTags.map((skill: string, index: number) => (
                <span key={index} className="bg-accent text-theme text-sm px-3 py-1 rounded-full shadow">
                  {skill}
                </span>
              ))}
            </div>
          </div>
        )}

        <div className="mt-8">
          <h2 className="text-2xl font-semibold text-theme border-b border-theme-2 pb-2">Contacto</h2>
          <p className="text-theme-2 mt-4">
            Email:{" "}
            <a href={`mailto:${user.email}`} className="text-accent hover:underline">
              {user.email}
            </a>
          </p>
        </div>
      </div>

      <EditProfileModal
        user={user}
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        onProfileUpdated={handleProfileUpdated}
      />
    </>
  );
};

export default UserProfile;

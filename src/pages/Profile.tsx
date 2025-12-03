import React from 'react';
import { useAuth } from '../hooks/useAuth';

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
  const { user } = useAuth();

  if (!user) {
    return <div className="text-center text-white text-lg">Cargando Perfil...</div>;
  }

  return (
    <div className="max-w-4xl mx-auto p-6 bg-gray-800 rounded-lg shadow-xl mt-10">
      <div className="flex items-center space-x-6">
        <div className="relative w-28 h-28">
          <img
            src={user.avatarUrl || `https://ui-avatars.com/api/?name=${user.name}&background=random`}
            alt={user.name}
            className="w-full h-full rounded-full object-cover border-4 border-blue-500"
          />
        </div>
        <div>
          <h1 className="text-3xl font-bold text-white">{user.name}</h1>
          <p className="text-gray-400 text-lg">@{user.name.replace(/\s+/g, '').toLowerCase()}</p> {}
          {user.career && <p className="text-gray-400 mt-1">Carrera: {user.career}</p>}
          {user.gender && <p className="text-gray-400">Genero: {user.gender}</p>}
          {user.date_of_birth && (
            <p className="text-gray-400">Fecha de Nacimiento: {formatDateToDDMMYYYY(user.date_of_birth)}</p>
          )}
        </div>
      </div>

      <div className="mt-8">
        <h2 className="text-2xl font-semibold text-white border-b border-gray-600 pb-2">Descripcion</h2>
        <p className="text-gray-300 mt-4">{user.bio || "No bio available."}</p>
      </div>

      {user.skills && user.skills.length > 0 && (
        <div className="mt-8">
          <h2 className="text-2xl font-semibold text-white border-b border-gray-600 pb-2">Habilidades</h2>
          <div className="flex flex-wrap gap-2 mt-4">
            {user.skills.map((skill: string, index: number) => (
              <span key={index} className="bg-blue-600 text-white text-sm px-3 py-1 rounded-full">
                {skill}
              </span>
            ))}
          </div>
        </div>
      )}

      <div className="mt-8">
        <h2 className="text-2xl font-semibold text-white border-b border-gray-600 pb-2">Contact</h2>
        <p className="text-gray-300 mt-4">
          Email:{" "}
          <a href={`mailto:${user.email}`} className="text-blue-400 hover:underline">
            {user.email}
          </a>
        </p>
      </div>
    </div>
  );
};

export default UserProfile;
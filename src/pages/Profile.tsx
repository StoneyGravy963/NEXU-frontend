import React from 'react';
import { mockUsers } from '../data/mocks';
import type { User } from '../types/user';


const UserProfile: React.FC = () => {
  const user: User = mockUsers[0]; 

  return (
    <div className="bg-oxford-blue text-white min-h-screen p-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-gray-800 rounded-lg shadow-lg p-8">
          <div className="flex flex-col items-center md:flex-row md:items-start">
            <img
              src={user.avatarUrl}
              alt="Avatar"
              className="w-32 h-32 rounded-full border-4 border-gray-700"
            />
            <div className="mt-4 md:mt-0 md:ml-6 text-center md:text-left">
              <h1 className="text-3xl font-bold">{user.nombre_completo}</h1>
              <p className="text-gray-400">@{user.nombre_usuario}</p>
              {user.carrera && <p className="text-gray-400 mt-1">Carrera: {user.carrera}</p>}
              {user.genero && <p className="text-gray-400">Género: {user.genero}</p>}
              {user.fecha_nacimiento && <p className="text-gray-400">Fecha de Nacimiento: {user.fecha_nacimiento}</p>}
            </div>
            <div className="flex flex-col md:ml-auto mt-6 md:mt-0 space-y-2">
              <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg transition-colors">
                Enviar Mensaje
              </button>
              <button className="bg-gray-700 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded-lg">
                Editar Perfil
              </button>
            </div>
          </div>

          <div className="mt-8">
            <h2 className="text-2xl font-semibold">Descripción</h2>
            <p className="text-gray-300 mt-2">{user.descripcion}</p>
          </div>

          <div className="mt-8">
            <h2 className="text-2xl font-semibold">Habilidades</h2>
            <div className="flex flex-wrap mt-2">
              {user.habilidades.map((skill, index) => (
                <span key={index} className="bg-blue-500 text-white px-3 py-1 rounded-full text-sm font-semibold mr-2 mb-2">
                  {skill}
                </span>
              ))}
            </div>
          </div>



          <div className="mt-8">
            <h2 className="text-2xl font-semibold">Contacto</h2>
            <p className="text-gray-300 mt-2">
              <a href={`mailto:${user.correo_electronico}`} className="text-blue-400 hover:underline">
                {user.correo_electronico}
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
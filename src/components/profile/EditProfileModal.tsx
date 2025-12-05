import React, { useState, useEffect } from 'react';
import { updateProfile, uploadAvatar, getTags } from '../../services/api/userApi';
import type { User, Tag } from '../../types/user';

interface EditProfileModalProps {
  user: User;
  isOpen: boolean;
  onClose: () => void;
  onProfileUpdated: (updatedUser: User) => void;
}

const EditProfileModal: React.FC<EditProfileModalProps> = ({ user, isOpen, onClose, onProfileUpdated }) => {
  const [formData, setFormData] = useState({
    name: user.name,
    career: user.career || '',
    bio: user.bio || '',
    tag_ids: user.tag_ids || [],
  });
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [avatarPreview, setAvatarPreview] = useState<string>(user.avatarUrl || '');
  const [availableTags, setAvailableTags] = useState<Tag[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (isOpen) {
      loadTags();
    }
  }, [isOpen]);

  const loadTags = async () => {
    try {
      const tags = await getTags();
      setAvailableTags(tags);
    } catch (err) {
      console.error('Error loading tags:', err);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleTagToggle = (tagId: string) => {
    setFormData(prev => {
      const isSelected = prev.tag_ids.includes(tagId);
      return {
        ...prev,
        tag_ids: isSelected
          ? prev.tag_ids.filter(id => id !== tagId)
          : [...prev.tag_ids, tagId],
      };
    });
  };

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setAvatarFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatarPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      console.log('📤 Datos a enviar:', formData);
      
      // 1. Actualizar datos del perfil
      const updatedUser = await updateProfile(formData);
      console.log('✅ Perfil actualizado (texto):', updatedUser);

      // 2. Si hay nueva imagen, subirla
      let finalUser = updatedUser;
      if (avatarFile) {
        console.log('📷 Subiendo avatar...');
        const avatarResponse = await uploadAvatar(avatarFile);
        console.log('✅ Avatar subido:', avatarResponse);
        
        // Combinar respuestas: tomar el avatar actualizado,
        // pero mantener los otros datos del perfil
        finalUser = {
          ...updatedUser,
          avatarUrl: avatarResponse.avatarUrl,
        };
      }

      console.log('🎉 Usuario final:', finalUser);
      onProfileUpdated(finalUser);
      onClose();
    } catch (err: any) {
      setError(err.response?.data?.error || 'Error al actualizar el perfil');
      console.error('❌ Error updating profile:', err);
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-gray-800 rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          {/* Header */}
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-white">Editar Perfil</h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-white text-2xl"
              disabled={loading}
            >
              ×
            </button>
          </div>

          {error && (
            <div className="mb-4 p-3 bg-red-500 bg-opacity-20 border border-red-500 rounded text-red-200">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            {/* Avatar */}
            <div className="mb-6 flex flex-col items-center">
              <div className="relative w-32 h-32 mb-4">
                <img
                  src={avatarPreview || `https://ui-avatars.com/api/?name=${user.name}&background=random`}
                  alt="Avatar preview"
                  className="w-full h-full rounded-full object-cover border-4 border-blue-500"
                />
                <label
                  htmlFor="avatar-upload"
                  className="absolute bottom-0 right-0 bg-blue-600 hover:bg-blue-700 text-white rounded-full p-2 cursor-pointer"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </label>
                <input
                  id="avatar-upload"
                  type="file"
                  accept="image/*"
                  onChange={handleAvatarChange}
                  className="hidden"
                  disabled={loading}
                />
              </div>
              <p className="text-sm text-gray-400">Haz clic en el ícono para cambiar tu foto de perfil</p>
            </div>

            {/* Nombre */}
            <div className="mb-4">
              <label className="block text-white mb-2">Nombre</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className="w-full bg-gray-700 text-white rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
                disabled={loading}
              />
            </div>

            {/* Carrera */}
            <div className="mb-4">
              <label className="block text-white mb-2">Carrera</label>
              <input
                type="text"
                name="career"
                value={formData.career}
                onChange={handleInputChange}
                placeholder="Ej: Ingeniería en Sistemas"
                className="w-full bg-gray-700 text-white rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                disabled={loading}
              />
            </div>

            {/* Biografía */}
            <div className="mb-4">
              <label className="block text-white mb-2">Biografía</label>
              <textarea
                name="bio"
                value={formData.bio}
                onChange={handleInputChange}
                placeholder="Cuéntanos algo sobre ti..."
                rows={4}
                className="w-full bg-gray-700 text-white rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                disabled={loading}
              />
            </div>

            {/* Tags/Habilidades */}
            <div className="mb-6">
              <label className="block text-white mb-2">Habilidades / Tags</label>
              <div className="flex flex-wrap gap-2 max-h-48 overflow-y-auto bg-gray-700 p-3 rounded">
                {availableTags.length > 0 ? (
                  availableTags.map(tag => (
                    <button
                      key={tag.id}
                      type="button"
                      onClick={() => handleTagToggle(tag.id)}
                      className={`px-3 py-1 rounded-full text-sm font-medium transition ${
                        formData.tag_ids.includes(tag.id)
                          ? 'bg-blue-600 text-white'
                          : 'bg-gray-600 text-gray-300 hover:bg-gray-500'
                      }`}
                      disabled={loading}
                    >
                      {tag.name}
                    </button>
                  ))
                ) : (
                  <p className="text-gray-400 text-sm">Cargando tags...</p>
                )}
              </div>
            </div>

            {/* Botones */}
            <div className="flex gap-3">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 bg-gray-600 hover:bg-gray-700 text-white py-2 rounded font-medium transition"
                disabled={loading}
              >
                Cancelar
              </button>
              <button
                type="submit"
                className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded font-medium transition disabled:bg-blue-800 disabled:cursor-not-allowed"
                disabled={loading}
              >
                {loading ? 'Guardando...' : 'Guardar Cambios'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditProfileModal;

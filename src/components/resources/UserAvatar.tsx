import React from 'react';

interface UserAvatarProps {
  avatarUrl?: string | null;
  name: string;
  className?: string;
  alt?: string;
}

/**
 * UserAvatar Component
 * 
 * Componente reutilizable que maneja automáticamente:
 * - Si avatarUrl existe y es una URL válida → muestra la imagen
 * - Si avatarUrl es null/undefined/vacío → usa UI Avatars con el nombre del usuario
 * 
 * El backend envía null o undefined cuando no hay avatar.
 * Cloudinary proporciona URLs completas cuando sí hay avatar.
 */
export function UserAvatar({ 
  avatarUrl, 
  name, 
  className = "w-10 h-10 rounded-full object-cover", 
  alt 
}: UserAvatarProps) {
  
  // Validar si la URL es válida
  const hasValidAvatar = avatarUrl && avatarUrl.trim() !== '';
  
  // Generar URL de UI Avatars con el nombre del usuario
  const uiAvatarUrl = `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=random&bold=true`;
  
  // Usar la imagen real si existe, si no usar UI Avatars
  const finalImageUrl = hasValidAvatar ? avatarUrl : uiAvatarUrl;

  return (
    <img
      src={finalImageUrl}
      alt={alt || name}
      className={className}
      onError={(e) => {
        // Fallback si la URL de Cloudinary falla por algún motivo
        const imgElement = e.currentTarget as HTMLImageElement;
        if (imgElement.src !== uiAvatarUrl) {
          imgElement.src = uiAvatarUrl;
        }
      }}
    />
  );
}

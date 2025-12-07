import { useEffect, useState } from 'react';
import { getTags, createPost } from '../../services/api/userApi';
import type { Tag } from '../../types/user';

interface CreatePostModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function CreatePostModal({ isOpen, onClose }: CreatePostModalProps) {
  const [availableTags, setAvailableTags] = useState<Tag[]>([]);
  const [selectedTag, setSelectedTag] = useState<string>("");
  const [description, setDescription] = useState("");

  // Cargar los tags cuando se abra el modal
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
      console.error("Error loading tags:", err);
    }
  };

  const handlePublish = async () => {
    if (!selectedTag || !description.trim()) {
      alert("Debes seleccionar un tag y escribir una descripción");
      return;
    }

    try {
      await createPost({
        tag_id: selectedTag,
        description
      });

      onClose(); // cerrar modal
      setDescription("");
      setSelectedTag("");

    } catch (err) {
      console.error("Error creating post:", err);
      alert("Hubo un error al crear el post");
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="
        fixed inset-0 bg-black/60 backdrop-blur-sm
        flex items-center justify-center
        z-50
      "
      onClick={onClose}
    >
      <div
        className="
          bg-theme p-5 rounded-xl shadow-lg 
          w-[90%] max-w-md
          transition-colors
        "
        onClick={(e) => e.stopPropagation()}
      >
        <h3 className="text-lg font-semibold text-theme mb-3">
          Crear publicación
        </h3>

        {/* SELECT DE TAGS */}
        <select
          className="
            w-full mt-3 p-2 rounded-lg
            bg-theme-alt text-theme
            border border-theme-alt-border
            transition-colors
            mb-3
          "
          value={selectedTag}
          onChange={(e) => setSelectedTag(e.target.value)}
        >
          <option value="">Selecciona un tag...</option>

          {availableTags.map(tag => (
            <option key={tag.id} value={tag.id}>
              {tag.name}
            </option>
          ))}
        </select>

        {/* TEXTAREA */}
        <textarea
          placeholder="¿Qué estás pensando?"
          className="
            w-full h-28 p-3 rounded-lg
            bg-theme-alt-border text-theme 
            placeholder:text-theme-2
            border border-theme-alt-border 
            resize-none
            transition-colors
          "
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        {/* BOTÓN PUBLICAR */}
        <button
          className="
            w-full mt-4 py-2 rounded-lg
            bg-emerald text-white font-semibold
            hover:bg-emerald/80 transition
          "
          onClick={handlePublish}
        >
          Publicar
        </button>
      </div>
    </div>
  );
}

interface CreatePostModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function CreatePostModal({ isOpen, onClose }: CreatePostModalProps) {
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
      {/* CARD */}
      <div
        className="
          bg-theme p-5 rounded-xl shadow-lg 
          w-[90%] max-w-md
          transition-colors
        "
        onClick={(e) => e.stopPropagation()}
      >
        <h3 className="text-lg font-semibold text-theme mb-3">Crear publicación</h3>

          <select
            className="
              w-full mt-3 p-2 rounded-lg
              bg-theme-alt text-theme
              border border-theme-alt-border
              transition-colors
              mb-3
            "
          >
            <option>Música</option>
            <option>Arte</option>
            <option>Construcción</option>
            <option>Emprendimiento</option>
            <option>Programación</option>
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
        />

        {/* BOTÓN PUBLICAR */}
        <button
          className="
            w-full mt-4 py-2 rounded-lg
            bg-emerald text-white font-semibold
            hover:bg-emerald/80 transition
          "
          onClick={onClose}
        >
          Publicar
        </button>
      </div>
    </div>
  );
}

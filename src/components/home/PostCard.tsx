interface PostCardProps {
  nombre: string;
  carrera: string;
  categoria: string;
  contenido: string;
}

export function PostCard({ nombre, carrera, categoria, contenido }: PostCardProps) {
  return (
    <div
      className="
        bg-theme-alt p-4 rounded-xl shadow-md 
        transition-colors
      "
    >
      {/* Header */}
      <div className="flex justify-between items-center mb-3">
        
        {/* Usuario */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gray-300 dark:bg-gray-600 rounded-full" />

          <div className="flex flex-col">
            <span className="text-lg font-semibold text-theme">{nombre}</span>
            <span className="text-theme-2 text-sm">{carrera}</span>
          </div>
        </div>

        {/* Categoría */}
        <span
          className="
            text-xs 
            bg-emerald/20 text-emerald 
            px-3 py-1 rounded-full
            font-medium
          "
        >
          {categoria}
        </span>
      </div>

      {/* Contenido */}
      <p className="text-theme leading-relaxed">
        {contenido}
      </p>
    </div>
  );
}

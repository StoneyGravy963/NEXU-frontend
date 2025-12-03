export function PostCard() {
  return (
    <div className="bg-oxford-two dark:bg-oxford-blue text-white shadow-md rounded-xl p-4 transition-colors">

      {/* HEADER */}
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 bg-gray-300 rounded-full" />
          <div className="flex flex-col">
            <span className="font-semibold">Nombre</span>
            <span className="text-xs text-gray-500">Carrera</span>
          </div>
        </div>

        <span className="text-sm bg-blue-100 text-blue-600 px-3 py-1 rounded-full">
          Música
        </span>
      </div>

      {/* CONTENIDO */}
      <p className="text-gray-700">
        Texto textoo textoo textooooo <br />
        aaaaaaaaaaaaaaaaaaa
      </p>
    </div>
  );
}

export function HomeHeader({ username }: { username: string }) {
  return (
    <div className="p-4 bg-white shadow-sm flex flex-col gap-3">
      <h2 className="text-xl font-semibold">
        Bienvenido! <br />
        <span className="text-blue-600">{username}</span>
      </h2>

      {/* Input tipo status */}
      <div className="flex items-center gap-3 bg-gray-200 rounded-full px-4 py-2">
        <div className="w-10 h-10 bg-gray-400 rounded-full" />
        <input
          type="text"
          placeholder="¿Algo nuevo?... "
          className="bg-oxford-two dark:bg-oxford-blue text-white placeholder-gray-300 rounded-full px-4 py-2"
        />

      </div>
    </div>
  );
}

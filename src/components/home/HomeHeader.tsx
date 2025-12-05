export function HomeHeader({ username }: { username: string }) {
  return (
    <div
      className="w-full bg-theme-alt p-4 flex justify-between items-center shadow-md transition-colors"
    >
      <h2 className="text-xl font-semibold text-theme">
        Bienvenido! <br />
        <span className="text-theme-2">{username}</span>
      </h2>

      {/* Input tipo status */}
      <div
        className="
          flex items-center gap-3 
          bg-theme-alt-border border border-theme-alt-border
          rounded-full px-4 py-2 
          transition-colors
        "
      >
        <div className="w-10 h-10 bg-gray-600 rounded-full" />

        <input
          type="text"
          placeholder="¿Algo nuevo?... "
          className="
            flex-1 
            bg-transparent
            text-theme
            placeholder:text-theme-2
            px-2 py-1
            outline-none
          "
        />
      </div>
    </div>
  );
}

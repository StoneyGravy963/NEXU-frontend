export function SearchBar({ onSearchChange }: { onSearchChange: (value: string) => void }) {
  return (
    <div className="p-4">
      <input
        type="text"
        placeholder="Buscar..."
        className="
          w-full px-4 py-3 rounded-xl 
          bg-theme-alt text-theme 
          placeholder:text-theme-2
          border border-theme-2
          transition-colors
        "
        onChange={(e) => onSearchChange(e.target.value)}
      />
    </div>
  );
}

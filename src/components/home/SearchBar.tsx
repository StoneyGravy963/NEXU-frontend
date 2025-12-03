import { FiSearch } from "react-icons/fi";

export function SearchBar() {
  return (
    <div className="p-4">
      <div className="flex items-center bg-white shadow-md px-4 py-2 rounded-full max-w-xl mx-auto">
        <input
          type="text"
          placeholder="Buscar..."
          className="bg-oxford-two dark:bg-oxford-blue text-white placeholder-gray-300 rounded-full px-4 py-2"
        />
        <FiSearch className="text-gray-500" size={20} />
      </div>
    </div>
  );
}

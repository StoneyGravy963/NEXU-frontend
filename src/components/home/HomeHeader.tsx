import { useState } from "react";
import { CreatePostModal } from "../resources/CreatePostModal";

export function HomeHeader({ username }: { username: string }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      {/* MODAL */}
      <CreatePostModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
      />

      {/* HEADER */}
      <div
        className="w-full bg-theme-alt p-4 flex justify-between items-center shadow-md transition-colors"
      >
        <h2 className="text-xl font-semibold text-theme">
          Bienvenido! <br />
          <span className="text-theme-2">{username}</span>
        </h2>

        {/* INPUT → AHORA BOTÓN */}
        <div
          className="
            flex items-center gap-3 
            bg-theme-alt-border border border-theme-alt-border
            rounded-full px-4 py-2 cursor-pointer
            transition-colors
          "
          onClick={() => setIsModalOpen(true)}
        >
          <div className="w-10 h-10 bg-gray-600 rounded-full" />

          <span className="text-theme text-sm">
            ¿Algo nuevo?...
          </span>
        </div>
      </div>
    </>
  );
}

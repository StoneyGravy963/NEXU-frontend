import { useState } from "react";
import { CreatePostModal } from "../resources/CreatePostModal";

export function HomeHeader({ username, avatar_url }: { username: string; avatar_url: string }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  return (
    <>
      {/* MODAL */}
      <CreatePostModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />

      {/* HEADER */}
      <div className="w-full bg-theme-alt p-4 flex justify-between items-center shadow-md transition-colors ">
        <h2 className="text-xl font-semibold text-theme">
          Bienvenido! <br />
          <span className="text-theme-2">{username}</span>
        </h2>

        {/* INPUT → AHORA BOTÓN */}
        <div
          className="
            flex items-center gap-3 
            bg-theme-alt-border  border-white/40
            rounded-full px-4 py-2 cursor-pointer
            transition-colors hover:border-zomp/50 border-2
          "
          onClick={() => setIsModalOpen(true)}
        >
          <img
            src={avatar_url || "/default-avatar.png"}
            className="w-10 h-10 rounded-full object-cover"
          />

          <span className="text-theme text-sm">¿Algo nuevo?...</span>
        </div>
      </div>
    </>
  );
}

import { useState } from "react";
import { Link } from "react-router-dom";

interface PostCardProps {
  post: any;
  disableProfileLink?: boolean;
  isOwner?: boolean;
  onDelete?: (postId: string) => void;
}

export function PostCard({ post, disableProfileLink = false, isOwner = false, onDelete }: PostCardProps) {
  const [isConfirming, setIsConfirming] = useState(false);

  const handleConfirmDelete = () => {
    if (onDelete) {
      onDelete(post.id);
    }
  };

  const handleCancelDelete = () => {
    setIsConfirming(false);
  };

  const UserInfoContent = () => (
    <>
      <img
        src={post.user.avatar_url}
        className="w-10 h-10 rounded-full object-cover"
        alt={post.user.name}
      />
      <div>
        <p className={`font-semibold text-theme ${!disableProfileLink ? "hover:underline" : ""}`}>
          {post.user.name}
        </p>
        <p className="text-sm text-theme-2">{post.user.career}</p>
      </div>
    </>
  );

  return (
    <div
      className="
        bg-theme-alt p-4 rounded-lg shadow-md transition hover:backdrop-blur-2xl hover:border-zomp/50 border-2 border-transparent relative group
      "
    >
      {isOwner && (
        <div className={`absolute top-4 right-4 flex items-center gap-2 ${isConfirming ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'} transition-opacity`}>
          {isConfirming ? (
            <>
              <button
                onClick={handleConfirmDelete}
                className="text-green-500 hover:text-green-400 p-1 rounded-full hover:bg-gray-700/50 transition"
                title="Confirmar eliminar"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              </button>
              <button
                onClick={handleCancelDelete}
                className="text-red-500 hover:text-red-400 p-1 rounded-full hover:bg-gray-700/50 transition"
                title="Cancelar"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </button>
            </>
          ) : (
            <button
              onClick={() => setIsConfirming(true)}
              className="text-gray-400 hover:text-red-500 transition-colors"
              title="Eliminar publicación"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
            </button>
          )}
        </div>
      )}

      <div className="flex flex-row justify-between">
        {/* Header */}
        <div className="">
          {disableProfileLink ? (
            <div className="flex items-center gap-3 mb-2">
              <UserInfoContent />
            </div>
          ) : (
            <Link
              to={`/profile/${post.user.id}`}
              className="flex items-center gap-3 mb-2 hover:opacity-80 transition-opacity"
            >
              <UserInfoContent />
            </Link>
          )}

          {/* Contenido */}
          <p className="text-theme mb-2 pr-8">{post.description}</p>
          {/* Fecha */}
          <p className="text-xs text-theme-2">
            {new Date(post.timestamp).toLocaleString()}
          </p>
        </div>
        <div className="">
          <p className="text-sm text-theme-2 bg-zomp/20 border-2 border-zomp p-2 rounded-full">
            {post.tag.name}
          </p>
        </div>
      </div>
    </div>
  );
}

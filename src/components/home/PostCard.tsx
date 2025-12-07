import { Link } from "react-router-dom";

interface PostCardProps {
  post: any;
  disableProfileLink?: boolean;
  isOwner?: boolean;
  onDelete?: (postId: string) => void;
}

export function PostCard({ post, disableProfileLink = false, isOwner = false, onDelete }: PostCardProps) {
  const handleDelete = () => {
    if (onDelete && window.confirm("¿Estás seguro de que deseas eliminar esta publicación?")) {
      onDelete(post.id);
    }
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
        <button
          onClick={handleDelete}
          className="absolute top-4 right-4 text-gray-400 hover:text-red-500 transition-colors opacity-0 group-hover:opacity-100"
          title="Eliminar publicación"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
          </svg>
        </button>
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

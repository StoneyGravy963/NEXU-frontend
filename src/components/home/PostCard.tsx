import { Link } from "react-router-dom";

interface PostCardProps {
  post: any;
}

export function PostCard({ post }: PostCardProps) {
  return (
    <div
      className="
        bg-theme-alt p-4 rounded-lg shadow-md transition hover:backdrop-blur-2xl hover:border-zomp/50 border-2 border-transparent
      "
    >
      <div className="flex flex-row justify-between">
        {/* Header */}
        <div className="">
          <Link to={`/profile/${post.user.id}`} className="flex items-center gap-3 mb-2 hover:opacity-80 transition-opacity">
            <img
              src={post.user.avatar_url}
              className="w-10 h-10 rounded-full object-cover"
              alt={post.user.name}
            />
            <div>
              <p className="font-semibold text-theme hover:underline">{post.user.name}</p>
              <p className="text-sm text-theme-2">{post.user.career}</p>
            </div>
          </Link>
          {/* Contenido */}
          <p className="text-theme mb-2">{post.description}</p>
          {/* Fecha */}
          <p className="text-xs text-theme-2">
            {new Date(post.timestamp).toLocaleString()}
          </p>
        </div>
        <div className="">
          <p className="text-sm text-theme-2 bg-zomp/20 border-2 border-zomp p-2 rounded-full">{post.tag.name}</p>
        </div>
      </div>
    </div>
  );
}

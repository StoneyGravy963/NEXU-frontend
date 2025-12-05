import { useNavigate } from "react-router-dom";



export function ArrowBack() {
    const navigate = useNavigate();
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="absolute top-7 left-4 w-8 h-8 text-white cursor-pointer hover:text-zomp transition-colors"
            onClick={() => navigate("/")}
        >
            <path
                strokeLinecap="round"
                strokeLinejoin="round" 
                d="M10 19l-7-7m0 0l7-7m-7 7h18" 
            />
        </svg>
    );
}
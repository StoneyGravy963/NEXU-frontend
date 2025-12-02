import { ChevronDownIcon } from "@heroicons/react/24/outline";
import type { MouseEventHandler } from "react";

export default function ScrollDownArrow({ onClick }: { onClick?: MouseEventHandler<HTMLButtonElement> }) {
  return (
    <button
      onClick={onClick}
      className="absolute bottom-50 left-1/2 -translate-x-1/2 z-50 text-white opacity-80 hover:opacity-100 transition"
    >
      <ChevronDownIcon className="w-10 h-10 animate-bounce" />
    </button>
  );
}

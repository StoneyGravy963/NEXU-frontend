import React from "react";
import { ChevronDownIcon } from "@heroicons/react/24/outline";
import { motion } from "framer-motion";

interface ScrollDownArrowProps {
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  className?: string;
}

export default function ScrollDownArrow({ onClick, className = "" }: ScrollDownArrowProps) {
  return (
    <motion.button
      onClick={onClick}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      whileHover={{ scale: 1.07 }}
      className={`absolute bottom-8 left-1/2 -translate-x-1/2 z-50 ${className}`}
      aria-label="Scroll down"
    >
      <motion.div animate={{ y: [0, 8, 0] }} transition={{ repeat: Infinity, duration: 1.6 }}>
        <ChevronDownIcon className="w-10 h-10 text-white opacity-90" />
      </motion.div>
    </motion.button>
  );
}

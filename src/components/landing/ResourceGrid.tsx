import { motion } from "framer-motion";
import { ResourceImage } from "../resources/ResourceImage";

interface ResourceGridProps {
  resources: string[];
}

export function ResourceGrid({ resources }: ResourceGridProps) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 md:gap-8 place-items-center w-full max-w-6xl">
      {resources.map((src, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.12 }}
        >
          <ResourceImage
            src={src}
            alt={`res-${i}`}
            imgClass="w-36 sm:w-56 md:w-72"
          />
        </motion.div>
      ))}
    </div>
  );
}

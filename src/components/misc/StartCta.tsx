// components/misc/StartCta.jsx
import { motion } from "framer-motion";

export default function StartCta() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      className="ml-40 lg:ml-160"
    >
      <h3 className="text-lg md:text-2xl text-white">
        ¿Listo para empezar?
      </h3>
    </motion.div>
  );
}

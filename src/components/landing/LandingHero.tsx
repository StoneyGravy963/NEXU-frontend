import HeroLogo from "../resources/HeroLogo";
import { motion } from "framer-motion";

export function LandingHero() {
  return (
     <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="text-center px-6"
        >
      <HeroLogo />
      <h2 className="text-2xl md:text-3xl lg:text-4xl text-white mt-4">
        Explora proyectos. Conecta. Crea.
      </h2>
      <p className="text-white/80 mt-3 max-w-md">
        Tutoriales, recursos, y comunidad activa para desarrolladores como tú.
      </p>
    </motion.div>

  );
}

// pages/LoginSignupPage.jsx
import { Parallax, ParallaxLayer } from "@react-spring/parallax";
import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useLoginForm } from "../hooks/useLoginForm";
import { useAuth } from "../hooks/useAuth";
import { loginService } from "../services/loginService";

import LoginPanel from "../components/login/LoginPanel";
import StartCta from "../components/misc/StartCta";
import { LandingHero } from "../components/landing/LandingHero";
import { ResourceGrid } from "../components/landing/ResourceGrid";
import ScrollDownArrow from "../components/resources/ScrollDownArrow";
import DecorShapes from "../components/resources/DecorShapes";
import HeroLogo from "../components/resources/HeroLogo";
import { useIsMobile } from "../hooks/useIsMobile";

const resources = [
  "/img/res1.webp",
  "/img/res2.webp",
  "/img/res3.webp",
  "/img/res4.webp",
  "/img/res5.webp",
  "/img/res6.webp",
];

export default function LoginSignupPage() {
  const form = useLoginForm();
  const { login } = useAuth();
  const ref = useRef<any>(null);
  const navigate = useNavigate();
  const isMobile = useIsMobile();

  const onLogin = async () => {
    try {
      await login({ email: form.email, password: form.password });
      navigate("/home");
    } catch (err) {
      if (err instanceof Error) {
        alert(err.message);
      } else {
        alert(String(err));
      }
    }
  };

  return (
    <Parallax
      pages={2.1}
      ref={ref}
      className="h-screen w-screen bg-linear-to-b from-(--oxford-blue) to-(--oxford-two)"
    >
      <DecorShapes />
      <ParallaxLayer
        offset={0}
        speed={0.4}
        factor={1}
        className="flex items-center justify-center"
      >
        <LandingHero />
      </ParallaxLayer>

      <ParallaxLayer
        sticky={{ start: 0, end: 0.12 }}
        className="flex justify-center pointer-events-auto"
      >
        <ScrollDownArrow onClick={() => ref.current.scrollTo(1)} />
      </ParallaxLayer>
      <ParallaxLayer
        offset={isMobile ? 0.7 : 0.9}
        speed={0.6}
        factor={isMobile ? 1.4 : 1.6}
        className="flex items-center justify-center px-6"
      >
        <ResourceGrid resources={resources} />
      </ParallaxLayer>

      <ParallaxLayer
        offset={isMobile ? 1.2 : 1.6}
        speed={0.8}
        factor={isMobile ? 1.2 : 1.6}
        className="flex items-start justify-center px-6"
      >
        <div className="w-full max-w-6xl flex flex-col lg:flex-row items-center lg:items-start gap-10">
          <div className="flex-1 flex justify-center lg:justify-start">
            <div className="text-left">
              <HeroLogo />
              <h2 className="text-2xl md:text-3xl lg:text-4xl text-white mt-4">
                Explora proyectos. Conecta. Crea.
              </h2>
              <p className="text-white/80 mt-3 max-w-md">
                Tutoriales, recursos, y comunidad activa para desarrolladores
                como tú.
              </p>
            </div>
          </div>
          <div className="flex-1 flex justify-center lg:justify-end ">
            <LoginPanel
              email={form.email}
              setEmail={form.setEmail}
              password={form.password}
              setPassword={form.setPassword}
              onLogin={onLogin}
              onSignupNavigate={() => navigate("/signup")}
            />
          </div>
        </div>
      </ParallaxLayer>

      <ParallaxLayer
        offset={isMobile ? 1.0 : 1.4}
        speed={0.6}
        factor={isMobile ? 0.15 : 0.2}
        className="flex items-center justify-center"
      >
        <StartCta />
      </ParallaxLayer>
    </Parallax>
  );
}

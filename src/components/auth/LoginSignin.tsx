import { useRef, useState } from "react";
import { Parallax, ParallaxLayer } from "@react-spring/parallax";
import ScrollDownArrow from "../resources/ScrollDownArrow";
import { useAuth } from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";

export default function LoginSignup() {
  const { login, signup } = useAuth();
  const navigate = useNavigate();

  const [isSignup, setIsSignup] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  
  const ref = useRef<any>(null);

  const handleLogin = async () => {
    try {
      await login({ email, password });
      navigate('/home');
    } catch (error) {
      console.error(error);
      alert("Login failed. Please check your credentials.");
    }
  };

  const handleSignup = async () => {
    try {
      if (!name) {
        alert("Please enter your name.");
        return;
      }
      await signup({ name, email, password });
      // Pequeño delay para que React procese el estado de autenticación
      setTimeout(() => {
        navigate('/profile?edit=true', { replace: true });
      }, 100);
    } catch (error) {
      console.error(error);
      alert("Signup failed. Please try again.");
    }
  };

  return (
      <Parallax pages={3} ref={ref} className="h-screen w-screen bg-linear-to-b from-(--oxford-blue) to-(--oxford-two) overflow-x-hidden">
        <div className="pointer-events-none absolute left-8 top-12 transform -rotate-6 w-[2cm] h-[80vh] bg-blue-500/40 rounded-md -z-10"></div>
        <div className="pointer-events-none absolute left-3/4 -top-6 transform rotate-4 w-[2cm] h-[55vh] bg-blue-400/30 rounded-md -z-10"></div>
          <ParallaxLayer
            offset={0.5}
            factor={1.5}
            speed={0.3}

            className=" flex items-center justify-center mt-14"
        >
                    <div className="pointer-events-none absolute left-3/8 -top-6 transform rotate-4 w-[2cm] h-[55vh] bg-blue-400/30 rounded-md -z-10"></div>
              </ParallaxLayer>
              

          <ParallaxLayer
            offset={1}
            factor={1.5}
            speed={0.3}

            className=" "
        >
        <div className="pointer-events-none absolute left-7/8 -top-12 transform -rotate-6 w-[2cm] h-[80vh] bg-blue-500/40 rounded-md -z-10"></div>
              </ParallaxLayer>
        <ParallaxLayer
        sticky={{ start: 0, end: 0.1 }}
        className="flex justify-center"
      >
        <ScrollDownArrow onClick={() => ref.current.scrollTo(1)} />
      </ParallaxLayer>
        <ParallaxLayer
            factor={1}
            speed={0.5}

            className=" flex items-center justify-center mt-14"
        >
            <img src="/img/nexuLetter.webp" alt="NEXU Logo" width={150} height={150} />
        </ParallaxLayer>
        <ParallaxLayer
            offset={0.3}
            speed={0.1}
            factor={1.5}
            className=" flex items-center justify-start mt-48 ml-20"
        >   <img src="/img/res1.webp" alt="resource1" width={400} className="" /></ParallaxLayer>
        <ParallaxLayer
            offset={0.9}
            speed={0.1}
            factor={1.5}
            className=" flex items-center justify-start mt-48 ml-20"
        >   <img src="/img/res2.webp" alt="resource2" width={400} className="" /></ParallaxLayer>
        <ParallaxLayer
            offset={0.4}
            speed={0.5}
            factor={2.5}
            className=" flex items-center justify-start mt-48 ml-30"
        >   <img src="/img/res3.webp" alt="resource3" width={400} className="" /></ParallaxLayer>
        <ParallaxLayer
            offset={0.5}
            speed={0.5}
            factor={1.5}
            className=" flex items-center mt-48 ml-300"
        >   <img src="/img/res4.webp" alt="resource4" width={400} className="" /></ParallaxLayer>
        <ParallaxLayer
            offset={0.6}
            speed={0.3}
            factor={1.8}
            className=" flex items-center mt-80 ml-280"
        >   <img src="/img/res5.webp" alt="resource5" width={400} className="" /></ParallaxLayer>
        <ParallaxLayer
            offset={0.8}
            speed={1}
            factor={1.5}
            className="flex items-center justify-center flex-col"
             onClick={() => ref.current.scrollTo(3)}
        >
            <h2 className="text-3xl text-white">a Unirte a</h2>
            <h2 className="text-3xl text-white">la Comunidad Más Grande</h2>

        </ParallaxLayer>
        <ParallaxLayer
            offset={1.5}
            speed={1}
            factor={1}
            className="flex items-center justify-center ml-20"
             onClick={() => ref.current.scrollTo(3)}
        >
            <h2 className="text-3xl text-white">a Aprender</h2>

        </ParallaxLayer>
        <ParallaxLayer
            offset={1.15}
            speed={1}
            factor={1}
            className="flex items-center justify-center ml-50"
             onClick={() => ref.current.scrollTo(3)}
        >
            <h2 className="text-3xl text-white"> a Explorar</h2>

        </ParallaxLayer>
        <ParallaxLayer
            offset={0.9}
            speed={1}
            factor={1}
            className="flex items-center justify-center mt-100 -ml-40"
             onClick={() => ref.current.scrollTo(3)}
        >
            <h2 className="text-3xl text-white"> a Descubrir</h2>

        </ParallaxLayer>
        
        <ParallaxLayer
            offset={2}
            speed={0.5}
            className=" flex flex-col items-center justify-center z-1"
            
        >
            <h1 className="text-4xl text-white -mb-12">a</h1>
            <img src="/img/nexuLetter.webp" alt="NEXU Logo" width={150} height={50} className="-mb-8" />
            <div className=" bg-opacity-20 backdrop-blur-xs p-8 rounded-lg shadow-lg w-2/5 mt-20">
                {isSignup && (
                  <input
                      type="text"
                      placeholder="Full Name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full mb-4 p-2 rounded bg-(--oxford-blue) bg-opacity-50 placeholder-gray-300 text-white"
                  />
                )}
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full mb-4 p-2 rounded bg-(--oxford-blue) bg-opacity-50 placeholder-gray-300 text-white"
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full mb-4 p-2 rounded bg-(--oxford-blue) bg-opacity-50 placeholder-gray-300 text-white"
                />
                
                {!isSignup ? (
                  <>
                    <button
                        onClick={handleLogin}
                        className="w-full bg-(--midnight-green) text-white py-2 rounded hover:bg-(--emerald) transition-colors cursor-pointer"
                    >
                        Login
                    </button>
                    <div className="mt-4 text-center">
                      <p className="text-white text-sm">
                        Don't have an account?{" "}
                        <button 
                          onClick={() => setIsSignup(true)} 
                          className="text-blue-300 hover:text-blue-100 underline cursor-pointer"
                        >
                          Sign Up
                        </button>
                      </p>
                    </div>
                  </>
                ) : (
                  <>
                    <button
                        onClick={handleSignup}
                        className="w-full bg-(--zomp) text-white py-2 rounded hover:bg-(--emerald) transition-colors cursor-pointer"
                    >
                        Sign Up
                    </button>
                    <div className="mt-4 text-center">
                      <p className="text-white text-sm">
                        Already have an account?{" "}
                        <button 
                          onClick={() => setIsSignup(false)} 
                          className="text-blue-300 hover:text-blue-100 underline cursor-pointer"
                        >
                          Login
                        </button>
                      </p>
                    </div>
                  </>
                )}
            </div>
        </ParallaxLayer>
         <ParallaxLayer
            sticky={{start:0 , end:1.65}}
            factor={2}
            speed={0.5}
            className="flex items-center justify-center -z-1"
           
        >
            <h2 className="text-5xl text-white">Bienvenido</h2>
           
        
        </ParallaxLayer>
        <ParallaxLayer
            offset={1.8}
            speed={0.2}
            factor={1.8}
            className=" flex items-center justify-center ml-100"
        >
            <img src="/img/logo.webp" alt="logo" width={800}/>
        </ParallaxLayer>
      </Parallax>
  );
}

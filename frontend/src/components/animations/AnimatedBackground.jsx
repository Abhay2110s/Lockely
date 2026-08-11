import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function AnimatedBackground() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {/* Dynamic Cursor Light Spotlight */}
      <div
        className="absolute size-[650px] rounded-full opacity-35 transition-transform duration-300 ease-out"
        style={{
          left: `${mousePos.x - 325}px`,
          top: `${mousePos.y - 325}px`,
          background: "radial-gradient(circle, rgba(99, 102, 241, 0.16) 0%, rgba(99, 102, 241, 0) 70%)",
        }}
      />

      {/* SVG Animated Grid Pattern Overlay */}
      <div className="absolute inset-0 bg-grid-light opacity-50" />
      <div className="absolute inset-0 bg-hex-grid opacity-30" />

      {/* Background Graphic 1: Rotating SVG Outer Cipher Wheel (Top Right) */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 90, repeat: Infinity, ease: "linear" }}
        className="absolute top-[-50px] right-[-120px] size-[540px] opacity-25 text-indigo-500"
      >
        <svg viewBox="0 0 200 200" className="w-full h-full">
          <circle cx="100" cy="100" r="95" fill="none" stroke="currentColor" strokeWidth="0.75" strokeDasharray="4 6" />
          <circle cx="100" cy="100" r="82" fill="none" stroke="currentColor" strokeWidth="0.5" strokeDasharray="12 4" />
          <circle cx="100" cy="100" r="68" fill="none" stroke="currentColor" strokeWidth="1" strokeDasharray="2 8" />
          <polygon points="100,10 115,35 85,35" fill="none" stroke="currentColor" strokeWidth="0.75" />
          <polygon points="100,190 115,165 85,165" fill="none" stroke="currentColor" strokeWidth="0.75" />
          <circle cx="100" cy="18" r="3" fill="currentColor" />
          <circle cx="100" cy="182" r="3" fill="currentColor" />
          <circle cx="18" cy="100" r="3" fill="currentColor" />
          <circle cx="182" cy="100" r="3" fill="currentColor" />
        </svg>
      </motion.div>

      {/* Background Graphic 2: Counter-Rotating Inner Cipher Ring (Top Right) */}
      <motion.div
        animate={{ rotate: -360 }}
        transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
        className="absolute top-[20px] right-[-50px] size-[400px] opacity-20 text-purple-600"
      >
        <svg viewBox="0 0 200 200" className="w-full h-full">
          <circle cx="100" cy="100" r="70" fill="none" stroke="currentColor" strokeWidth="0.75" strokeDasharray="6 6" />
          <circle cx="100" cy="100" r="50" fill="none" stroke="currentColor" strokeWidth="1" />
          <rect x="70" y="70" width="60" height="60" fill="none" stroke="currentColor" strokeWidth="0.5" transform="rotate(45 100 100)" />
        </svg>
      </motion.div>

      {/* Background Graphic 3: Geometric Concentric Circles & Radar Pulse (Middle Left) */}
      <motion.div
        animate={{ rotate: -360 }}
        transition={{ duration: 110, repeat: Infinity, ease: "linear" }}
        className="absolute top-[40%] left-[-180px] size-[560px] opacity-20 text-purple-500"
      >
        <svg viewBox="0 0 200 200" className="w-full h-full">
          <circle cx="100" cy="100" r="95" fill="none" stroke="currentColor" strokeWidth="0.5" />
          <circle cx="100" cy="100" r="80" fill="none" stroke="currentColor" strokeWidth="1" strokeDasharray="8 8" />
          <circle cx="100" cy="100" r="65" fill="none" stroke="currentColor" strokeWidth="0.75" />
          <rect x="50" y="50" width="100" height="100" fill="none" stroke="currentColor" strokeWidth="0.5" transform="rotate(45 100 100)" />
        </svg>
      </motion.div>

      {/* Background Graphic 4: Floating Binary Data Streams (Left & Right) */}
      <div className="absolute top-[28%] left-[4%] font-mono text-[0.65rem] tracking-widest text-indigo-400/25 opacity-70 select-none space-y-1 hidden xl:block">
        <div>01010011 01000101 01000011 01010101</div>
        <div>01010010 01001001 01010100 01011001</div>
        <div>11001010 00110101 10101100 01100101</div>
      </div>

      <div className="absolute bottom-[30%] right-[3%] font-mono text-[0.65rem] tracking-widest text-purple-400/25 opacity-70 select-none space-y-1 hidden xl:block">
        <div>01000001 01000101 01010011 00101101</div>
        <div>00110010 00110101 00110110 00101101</div>
        <div>01000111 01000011 01001101 01011111</div>
      </div>

      {/* Background Graphic 5: Shield Watermark Outline (Bottom Right) */}
      <motion.div
        animate={{ y: [0, -15, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-[-40px] right-[4%] size-[380px] opacity-15 text-emerald-600"
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="0.5" className="w-full h-full">
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
          <path d="M12 8v4" strokeWidth="1" />
          <path d="M12 16h.01" strokeWidth="2" />
        </svg>
      </motion.div>

      {/* Ambient Floating Pastel Orbs */}
      <motion.div
        animate={{
          x: [0, 40, -30, 0],
          y: [0, -50, 30, 0],
        }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-[-100px] left-[-100px] size-[480px] rounded-full bg-indigo-200/50 blur-[95px]"
      />

      <motion.div
        animate={{
          x: [0, -50, 40, 0],
          y: [0, 40, -50, 0],
        }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-[30%] right-[-100px] size-[520px] rounded-full bg-purple-200/40 blur-[105px]"
      />

      <motion.div
        animate={{
          x: [0, 30, -40, 0],
          y: [0, -30, 40, 0],
        }}
        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-[65%] left-[-100px] size-[480px] rounded-full bg-pink-200/45 blur-[95px]"
      />

      {/* Floating Geometric Particle Specs */}
      <div className="absolute inset-0">
        {[...Array(16)].map((_, i) => (
          <motion.div
            key={i}
            initial={{
              scale: Math.random() * 0.6 + 0.4,
              opacity: Math.random() * 0.4 + 0.2,
            }}
            animate={{
              y: ["0px", "-45px", "0px"],
              opacity: [0.2, 0.6, 0.2],
            }}
            transition={{
              duration: 4 + (i % 5),
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.25,
            }}
            className="absolute size-2.5 rounded-full bg-indigo-400/40 blur-[1px]"
            style={{
              left: `${(i * 6.5) % 100}%`,
              top: `${(i * 10.5) % 100}%`,
            }}
          />
        ))}
      </div>
    </div>
  );
}

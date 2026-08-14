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
      {/* Dynamic Soft Cursor Light Spotlight */}
      <div
        className="absolute size-[700px] rounded-full opacity-40 transition-transform duration-300 ease-out"
        style={{
          left: `${mousePos.x - 350}px`,
          top: `${mousePos.y - 350}px`,
          background: "radial-gradient(circle, rgba(99, 102, 241, 0.15) 0%, rgba(168, 85, 247, 0.05) 45%, transparent 70%)",
        }}
      />

      {/* SVG Animated Grid Pattern Overlay */}
      <div className="absolute inset-0 bg-grid-light opacity-60" />
      <div className="absolute inset-0 bg-hex-grid opacity-35" />

      {/* Rotating SVG Cipher Wheel (Top Right) */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 95, repeat: Infinity, ease: "linear" }}
        className="absolute top-[-60px] right-[-140px] size-[580px] opacity-20 text-indigo-500"
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

      {/* Counter-Rotating Inner Cipher Ring (Top Right) */}
      <motion.div
        animate={{ rotate: -360 }}
        transition={{ duration: 65, repeat: Infinity, ease: "linear" }}
        className="absolute top-[30px] right-[-40px] size-[420px] opacity-15 text-purple-600"
      >
        <svg viewBox="0 0 200 200" className="w-full h-full">
          <circle cx="100" cy="100" r="70" fill="none" stroke="currentColor" strokeWidth="0.75" strokeDasharray="6 6" />
          <circle cx="100" cy="100" r="50" fill="none" stroke="currentColor" strokeWidth="1" />
          <rect x="70" y="70" width="60" height="60" fill="none" stroke="currentColor" strokeWidth="0.5" transform="rotate(45 100 100)" />
        </svg>
      </motion.div>

      {/* Floating Binary Streams (Left & Right) */}
      <div className="absolute top-[28%] left-[4%] font-mono text-[0.65rem] tracking-widest text-indigo-500/25 opacity-70 select-none space-y-1 hidden xl:block">
        <div>01010011 01000101 01000011 01010101</div>
        <div>01010010 01001001 01010100 01011001</div>
        <div>11001010 00110101 10101100 01100101</div>
      </div>

      <div className="absolute bottom-[30%] right-[3%] font-mono text-[0.65rem] tracking-widest text-purple-500/25 opacity-70 select-none space-y-1 hidden xl:block">
        <div>01000001 01000101 01010011 00101101</div>
        <div>00110010 00110101 00110110 00101101</div>
        <div>01000111 01000011 01001101 01011111</div>
      </div>

      {/* Ambient Floating Warm Aurora Glow Orbs */}
      <motion.div
        animate={{
          x: [0, 50, -35, 0],
          y: [0, -60, 40, 0],
        }}
        transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-[-120px] left-[-120px] size-[520px] rounded-full bg-indigo-300/40 blur-[110px]"
      />

      <motion.div
        animate={{
          x: [0, -60, 45, 0],
          y: [0, 45, -60, 0],
        }}
        transition={{ duration: 19, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-[25%] right-[-120px] size-[560px] rounded-full bg-purple-300/35 blur-[120px]"
      />

      <motion.div
        animate={{
          x: [0, 40, -45, 0],
          y: [0, -35, 45, 0],
        }}
        transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-[60%] left-[-120px] size-[520px] rounded-full bg-pink-300/35 blur-[110px]"
      />

      <motion.div
        animate={{
          x: [0, -30, 30, 0],
          y: [0, 30, -30, 0],
        }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-[-100px] right-[10%] size-[480px] rounded-full bg-teal-200/40 blur-[100px]"
      />

      {/* Floating Micro Particles */}
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

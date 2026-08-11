import { useState, useRef } from "react";
import { motion } from "framer-motion";

export default function TiltCard({
  children,
  className = "",
  maxTilt = 12,
}) {
  const cardRef = useRef(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0, glareX: 50, glareY: 50 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;

    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    const xPct = mouseX / width;
    const yPct = mouseY / height;

    const rotateX = (yPct - 0.5) * -maxTilt;
    const rotateY = (xPct - 0.5) * maxTilt;

    setTilt({
      x: rotateX,
      y: rotateY,
      glareX: xPct * 100,
      glareY: yPct * 100,
    });
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setTilt({ x: 0, y: 0, glareX: 50, glareY: 50 });
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      animate={{
        rotateX: isHovered ? tilt.x : 0,
        rotateY: isHovered ? tilt.y : 0,
      }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      style={{ transformStyle: "preserve-3d", perspective: 1000 }}
      className={`relative overflow-hidden soft-card ${className}`}
    >
      {/* Specular Glass Glare Overlay */}
      <div
        className="pointer-events-none absolute inset-0 transition-opacity duration-300 z-10"
        style={{
          opacity: isHovered ? 0.35 : 0,
          background: `radial-gradient(circle at ${tilt.glareX}% ${tilt.glareY}%, rgba(255, 255, 255, 0.8) 0%, transparent 60%)`,
        }}
      />
      <div className="relative z-20" style={{ transform: "translateZ(10px)" }}>
        {children}
      </div>
    </motion.div>
  );
}

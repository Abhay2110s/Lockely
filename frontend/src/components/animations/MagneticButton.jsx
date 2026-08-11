import { useRef, useState } from "react";
import { motion } from "framer-motion";

export default function MagneticButton({
  children,
  className = "",
  distance = 0.3,
}) {
  const btnRef = useRef(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    if (!btnRef.current) return;
    const { left, top, width, height } = btnRef.current.getBoundingClientRect();
    const x = (e.clientX - (left + width / 2)) * distance;
    const y = (e.clientY - (top + height / 2)) * distance;
    setPosition({ x, y });
  };

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 });
  };

  return (
    <motion.div
      ref={btnRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: "spring", stiffness: 250, damping: 18 }}
      className={`inline-block ${className}`}
    >
      {children}
    </motion.div>
  );
}

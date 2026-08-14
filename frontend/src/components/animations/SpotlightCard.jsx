import { useState, useRef } from "react";
import { ShineBorder } from "@/components/ui/shine-border";

export default function SpotlightCard({
  children,
  className = "",
  spotlightColor = "rgba(99, 102, 241, 0.14)",
  shineColor = ["#A07CFE", "#FE8FB5", "#FFBE7B"],
}) {
  const cardRef = useRef(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    setPosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return (
    <div className="relative rounded-[1.6rem] overflow-visible shadow-lg bg-white p-[3px]">
      <ShineBorder shineColor={shineColor} />
      <div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className={`relative overflow-hidden rounded-[1.4rem] bg-white ${className}`}
      >
        {/* Dynamic Cursor Spotlight Layer */}
        <div
          className="pointer-events-none absolute inset-0 transition-opacity duration-300 z-10"
          style={{
            opacity: isHovered ? 1 : 0,
            background: `radial-gradient(400px circle at ${position.x}px ${position.y}px, ${spotlightColor}, transparent 80%)`,
          }}
        />
        <div className="relative z-20">{children}</div>
      </div>
    </div>
  );
}

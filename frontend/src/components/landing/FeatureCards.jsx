import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

export function FeatureCard({
  number,
  icon: Icon,
  title,
  desc,
  tag,
  spec,
  metric,
  status = "STATUS // OK",
  className = "",
}) {
  return (
    <div className={`w-[320px] sm:w-[380px] bg-white/90 backdrop-blur-xl border border-[#E6E0D5] hover:border-[#8B263E] hover:bg-blush/20 transition-all duration-200 rounded-3xl p-6 sm:p-8 flex flex-col justify-between space-y-6 cursor-default shadow-card hover:shadow-card-hover group ${className}`}>
      {/* Top Row: Technical Numbering & Burgundy Icon */}
      <div className="flex items-center justify-between border-b border-[#E6E0D5] pb-4">
        <div className="flex items-center gap-3">
          {number && (
            <span className="text-xs sm:text-sm font-bold tracking-widest text-[#8B263E]">
              {number} //
            </span>
          )}
          {metric && (
            <span className="text-[0.68rem] tracking-wider text-[#6B6560] uppercase font-semibold">
              {metric}
            </span>
          )}
        </div>
        {Icon && (
          <div className="size-9 rounded-2xl bg-blush/35 border border-[#E6E0D5] group-hover:border-[#8B263E] transition-colors duration-150 flex items-center justify-center text-[#8B263E]">
            <Icon className="size-4.5" />
          </div>
        )}
      </div>

      {/* Main Content */}
      <div className="space-y-3">
        {tag && (
          <span className="text-[0.68rem] tracking-wider text-[#6B6560] uppercase font-semibold block">
            {tag}
          </span>
        )}
        <h3 className="text-xl sm:text-2xl font-black text-[#1a1a1a] uppercase tracking-tight leading-snug">
          {title}
        </h3>
        <p className="text-xs sm:text-sm text-[#6B6560] leading-relaxed font-normal">
          {desc}
        </p>
      </div>

      {/* Bottom Technical Spec Footer */}
      {(spec || status) && (
        <div className="pt-4 border-t border-[#E6E0D5] flex items-center justify-between text-[0.7rem] text-[#6B6560] uppercase tracking-wider">
          <span>{spec || "SPEC // CRYPTOGRAPHIC"}</span>
          <span className="text-[#8B263E] font-bold transition-colors duration-150">
            {status}
          </span>
        </div>
      )}
    </div>
  );
}

// Isolated sub-component keeping hooks clean at the top level
function SemicircleArcCard({ item, index, scrollYProgress }) {
  const radius = 360; // Radius of the bottom arc trajectory
  const start = index * 0.18;
  const end = start + 0.35;

  // Maps scroll progress to an angle from 0 (Right Bottom) to Math.PI (Left Bottom)
  const angle = useTransform(scrollYProgress, [start, end], [0, Math.PI]);
  
  // Cartesian coordinate calculations along the semicircle perimeter
  const x = useTransform(angle, (val) => radius * Math.cos(val));
  const y = useTransform(angle, (val) => -radius * Math.sin(val) * 0.5);

  const scale = useTransform(scrollYProgress, [start, start + 0.1, end - 0.1, end], [0.85, 1.02, 1.02, 0.85]);
  const opacity = useTransform(scrollYProgress, [start, start + 0.05, end - 0.05, end], [0, 1, 1, 0]);

  return (
    <motion.div
      style={{
        x,
        y,
        scale,
        opacity,
        zIndex: 10 - index,
      }}
      className="absolute bottom-8"
    >
      <FeatureCard {...item} />
    </motion.div>
  );
}

export default function FeatureCards({ items = [], className = "" }) {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  return (
    <div ref={containerRef} className={`relative min-h-[250vh] ${className}`}>
      <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden">
        {items.map((item, index) => (
          <SemicircleArcCard
            key={item.number || index}
            item={item}
            index={index}
            scrollYProgress={scrollYProgress}
          />
        ))}
      </div>
    </div>
  );
}
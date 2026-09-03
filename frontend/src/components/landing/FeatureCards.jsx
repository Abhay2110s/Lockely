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
    <div className={`w-[320px] sm:w-[380px] bg-[#111111] border border-[#222222] hover:border-[#00FF66] transition-colors duration-100 rounded-none p-6 sm:p-8 flex flex-col justify-between space-y-6 cursor-default group ${className}`}>
      {/* Top Row: Technical Numbering & Stark White Icon */}
      <div className="flex items-center justify-between border-b border-[#222222] pb-4">
        <div className="flex items-center gap-3 font-mono">
          {number && (
            <span className="text-xs sm:text-sm font-bold tracking-widest text-[#00FF66]">
              {number} //
            </span>
          )}
          {metric && (
            <span className="text-[0.65rem] tracking-wider text-neutral-500 uppercase">
              {metric}
            </span>
          )}
        </div>
        {Icon && (
          <div className="size-8 bg-black border border-[#222222] group-hover:border-[#00FF66] transition-colors duration-100 flex items-center justify-center text-white">
            <Icon className="size-4 text-white" />
          </div>
        )}
      </div>

      {/* Main Content */}
      <div className="space-y-3">
        {tag && (
          <span className="font-mono text-[0.62rem] tracking-wider text-neutral-500 uppercase block">
            {tag}
          </span>
        )}
        <h3 className="text-xl sm:text-2xl font-black text-[#F8F9FA] uppercase tracking-tight leading-snug">
          {title}
        </h3>
        <p className="text-xs sm:text-sm text-[#6B7280] leading-relaxed font-normal">
          {desc}
        </p>
      </div>

      {/* Bottom Technical Spec Footer */}
      {(spec || status) && (
        <div className="pt-4 border-t border-[#222222] flex items-center justify-between font-mono text-[0.68rem] text-neutral-500 uppercase tracking-wider">
          <span>{spec || "SPEC // CRYPTOGRAPHIC"}</span>
          <span className="text-neutral-600 group-hover:text-[#00FF66] transition-colors duration-100">
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
    <section ref={containerRef} className={`h-[400vh] bg-black relative ${className}`}>
      <div className="sticky top-0 h-screen w-full overflow-hidden flex flex-col items-center justify-between pb-12">
        
        {/* Section Header */}
        <div className="pt-16 text-center max-w-2xl px-4 z-20">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#111111] border border-[#222222] text-[#00FF66] text-xs font-mono font-bold uppercase tracking-widest mb-3">
            <span>[ ARCHITECTURAL MANIFESTO ]</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-[#F8F9FA] tracking-tighter uppercase">
            Zero-Knowledge <span className="text-[#00FF66]">Timeline</span>
          </h2>
        </div>

        {/* Bottom Semicircle Background Guide Track */}
        <div 
          className="absolute bottom-[-140px] w-[720px] h-[360px] border-t-2 border-dashed border-[#222222] rounded-t-full pointer-events-none opacity-40" 
          style={{ left: "calc(50% - 360px)" }}
        />

        {/* Cards Container anchored at the bottom */}
        <div className="relative w-full h-[280px] flex items-end justify-center mb-6">
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
    </section>
  );
}
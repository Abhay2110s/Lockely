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
    <div className={`w-[340px] sm:w-[385px] bg-[#111111] border border-[#222222] hover:border-[#00FF66] transition-colors duration-100 rounded-none p-6 sm:p-8 flex flex-col justify-between space-y-6 cursor-default group ${className}`}>
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

// 1. Extract individual card rendering into a sub-component so hooks stay at the top level
function SemicircleCard({ item, index, scrollYProgress }) {
  const radius = 380;
  const start = index * 0.18;
  const end = start + 0.35;
  // const mid = start + 0.175;

  // Hooks are now called cleanly at the top level of a React component function
  const angle = useTransform(scrollYProgress, [start, end], [Math.PI, 0]);
  const x = useTransform(angle, (val) => radius * Math.cos(val));
  const y = useTransform(angle, (val) => -radius * Math.sin(val));
  const scale = useTransform(scrollYProgress, [start, start + 0.1, end - 0.1, end], [0.8, 1.02, 1.02, 0.8]);
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
      className="absolute"
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
      <div className="sticky top-0 h-screen w-full overflow-hidden flex flex-col items-center justify-between pb-16">
        
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
          className="absolute bottom-0 w-[760px] h-[380px] border-b-2 border-dashed border-[#222222] rounded-b-full pointer-events-none opacity-40" 
          style={{ left: "calc(50% - 380px)" }}
        />

        {/* Cards Traversing the Bottom Semicircle Arc from Left to Right */}
        <div className="relative w-full h-[300px] flex items-end justify-center mb-8">
          {items.map((item, index) => (
            <SemicircleCard 
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
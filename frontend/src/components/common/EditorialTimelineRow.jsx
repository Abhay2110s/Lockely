import { motion } from "framer-motion";

const rowMotionVariants = {
  hidden: { y: 30, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.8,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

export default function EditorialTimelineRow({
  index,
  category,
  meta = [],
  title,
  subtitle,
  description,
  actionLabel = "VIEW PROTOCOL",
  onAction,
  actionHref,
  children,
  className = "",
}) {
  return (
    <motion.div
      variants={rowMotionVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-60px" }}
      className={`w-full border-b border-[#E6E0D5] py-12 md:py-16 px-6 sm:px-10 lg:px-16 hover:bg-blush/15 rounded-3xl transition-colors duration-150 group cursor-default ${className}`}
    >
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-12 items-start">
        
        {/* Left Column: Metadata */}
        <div className="md:col-span-4 lg:col-span-3 space-y-3">
          {(index || category) && (
            <div className="flex items-center gap-2">
              {index && (
                <span className="font-mono text-xs font-bold tracking-widest text-[#8B263E]">
                  {index} //
                </span>
              )}
              {category && (
                <span className="font-mono text-[0.68rem] tracking-widest text-[#6B6560] uppercase font-semibold">
                  {category}
                </span>
              )}
            </div>
          )}

          {meta && meta.length > 0 && (
            <div className="space-y-1 pt-1 font-mono text-[0.68rem] tracking-widest uppercase text-[#6B6560]">
              {meta.map((m, i) => (
                <div key={i} className="flex items-center gap-2">
                  <span className="size-1 rounded-full bg-[#E6E0D5] group-hover:bg-[#8B263E] transition-colors duration-150" />
                  <span>{m}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Right Column: Core Content */}
        <div className="md:col-span-8 lg:col-span-9 flex flex-col justify-between space-y-5">
          <div>
            {subtitle && (
              <span className="font-mono text-xs tracking-widest text-[#8B263E] uppercase font-bold block mb-1">
                {subtitle}
              </span>
            )}
            <h3 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#1a1a1a] uppercase tracking-tight leading-tight group-hover:text-[#8B263E] transition-colors duration-150">
              {title}
            </h3>
            {description && (
              <p className="mt-4 text-sm sm:text-base text-[#6B6560] leading-relaxed max-w-2xl font-normal transition-colors duration-150">
                {description}
              </p>
            )}
          </div>

          {/* Optional slot */}
          {children}

          {/* Action CTA with Animated Underline */}
          {(actionLabel || actionHref || onAction) && (
            <div className="pt-4">
              {actionHref ? (
                <a
                  href={actionHref}
                  className="relative inline-flex flex-col items-start cursor-pointer group/btn select-none"
                >
                  <span className="font-mono text-xs sm:text-sm font-bold uppercase tracking-widest text-[#8B263E] flex items-center gap-2">
                    <span>{actionLabel}</span>
                    <span className="inline-block transition-transform duration-200 group-hover:translate-x-1 group-hover/btn:translate-x-1">
                      →
                    </span>
                  </span>
                  <span className="h-[2px] w-0 bg-[#8B263E] group-hover:w-full group-hover/btn:w-full transition-all duration-300 ease-out mt-1 rounded-full" />
                </a>
              ) : (
                <button
                  onClick={onAction}
                  type="button"
                  className="relative inline-flex flex-col items-start cursor-pointer group/btn select-none bg-transparent border-none p-0 text-left"
                >
                  <span className="font-mono text-xs sm:text-sm font-bold uppercase tracking-widest text-[#8B263E] flex items-center gap-2">
                    <span>{actionLabel}</span>
                    <span className="inline-block transition-transform duration-200 group-hover:translate-x-1 group-hover/btn:translate-x-1">
                      →
                    </span>
                  </span>
                  <span className="h-[2px] w-0 bg-[#8B263E] group-hover:w-full group-hover/btn:w-full transition-all duration-300 ease-out mt-1 rounded-full" />
                </button>
              )}
            </div>
          )}

        </div>

      </div>
    </motion.div>
  );
}

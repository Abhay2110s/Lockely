import { motion } from "framer-motion";

/**
 * EditorialTimelineRow Component
 *
 * Implements the editorial timeline layout from the Rebelliously Optimistic design system:
 * - Full-width row with harsh 1px bottom border (border-b border-[#222222])
 * - Massive breathing padding (py-12 md:py-16)
 * - Strict two-column CSS grid (grid-cols-1 md:grid-cols-12)
 * - Left column: tiny, uppercase spaced-out metadata (text-xs tracking-widest text-[#6B7280])
 * - Right column: massive bold title (text-4xl font-black text-[#F8F9FA]) + standard description
 * - Action button: text-only CTA with animated width underline on hover
 * - Framer motion whileInView sliding up from y: 30
 * - Hover background shifts to subtle charcoal (hover:bg-[#0a0a0a])
 */

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
      className={`w-full border-b border-[#222222] py-12 md:py-16 px-6 sm:px-10 lg:px-16 hover:bg-[#0a0a0a] transition-colors duration-150 group cursor-default ${className}`}
    >
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-12 items-start">
        
        {/* Left Column: Metadata (Strict Vertical Grid Alignment) */}
        <div className="md:col-span-4 lg:col-span-3 space-y-3">
          {(index || category) && (
            <div className="flex items-center gap-2">
              {index && (
                <span className="font-mono text-xs font-bold tracking-widest text-[#00FF66]">
                  {index} //
                </span>
              )}
              {category && (
                <span className="font-mono text-[0.65rem] tracking-widest text-[#6B7280] uppercase">
                  {category}
                </span>
              )}
            </div>
          )}

          {meta && meta.length > 0 && (
            <div className="space-y-1 pt-1 font-mono text-[0.68rem] tracking-widest uppercase text-neutral-500">
              {meta.map((m, i) => (
                <div key={i} className="flex items-center gap-2">
                  <span className="size-1 bg-neutral-700 group-hover:bg-[#00FF66] transition-colors duration-150" />
                  <span>{m}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Right Column: Core Content & Animate-Underline Action */}
        <div className="md:col-span-8 lg:col-span-9 flex flex-col justify-between space-y-5">
          <div>
            {subtitle && (
              <span className="font-mono text-xs tracking-widest text-[#00FF66] uppercase block mb-1">
                {subtitle}
              </span>
            )}
            <h3 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#F8F9FA] uppercase tracking-tight leading-tight group-hover:text-white transition-colors duration-150">
              {title}
            </h3>
            {description && (
              <p className="mt-4 text-sm sm:text-base text-[#6B7280] leading-relaxed max-w-2xl font-normal group-hover:text-neutral-400 transition-colors duration-150">
                {description}
              </p>
            )}
          </div>

          {/* Optional slot for additional item contents (e.g. decrypted fields, tags) */}
          {children}

          {/* Text-Only Action CTA with Animated Underline */}
          {(actionLabel || actionHref || onAction) && (
            <div className="pt-4">
              {actionHref ? (
                <a
                  href={actionHref}
                  className="relative inline-flex flex-col items-start cursor-pointer group/btn select-none"
                >
                  <span className="font-mono text-xs sm:text-sm font-bold uppercase tracking-widest text-[#00FF66] flex items-center gap-2">
                    <span>{actionLabel}</span>
                    <span className="inline-block transition-transform duration-200 group-hover:translate-x-1 group-hover/btn:translate-x-1">
                      →
                    </span>
                  </span>
                  <span className="h-[1px] w-0 bg-[#00FF66] group-hover:w-full group-hover/btn:w-full transition-all duration-300 ease-out mt-1" />
                </a>
              ) : (
                <button
                  onClick={onAction}
                  type="button"
                  className="relative inline-flex flex-col items-start cursor-pointer group/btn select-none bg-transparent border-none p-0 text-left"
                >
                  <span className="font-mono text-xs sm:text-sm font-bold uppercase tracking-widest text-[#00FF66] flex items-center gap-2">
                    <span>{actionLabel}</span>
                    <span className="inline-block transition-transform duration-200 group-hover:translate-x-1 group-hover/btn:translate-x-1">
                      →
                    </span>
                  </span>
                  <span className="h-[1px] w-0 bg-[#00FF66] group-hover:w-full group-hover/btn:w-full transition-all duration-300 ease-out mt-1" />
                </button>
              )}
            </div>
          )}

        </div>

      </div>
    </motion.div>
  );
}

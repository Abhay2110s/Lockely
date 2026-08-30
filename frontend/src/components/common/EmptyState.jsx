
/**
 * EmptyState — reusable glassmorphic empty-state display with icon, title, description,
 * and an optional call-to-action button.
 */
export default function EmptyState({ icon, title, description, action, className = "" }) {
  return (
    <div
      className={`flex flex-col items-center justify-center text-center py-16 px-6 glass-card-subtle ${className}`}
    >
      {icon && (
        <div className="size-16 rounded-2xl bg-gradient-to-br from-[#3c0b1a] to-[#581026] text-[#fda4b8] border border-pink-500/20 shadow-lg shadow-pink-900/30 flex items-center justify-center mb-5">
          {icon}
        </div>
      )}
      <h3 className="text-base font-bold text-[#fff5f7] mb-1.5">{title}</h3>
      {description && (
        <p className="text-sm text-[#fda4b8]/75 max-w-xs mb-5">{description}</p>
      )}
      {action && <div>{action}</div>}
    </div>
  );
}

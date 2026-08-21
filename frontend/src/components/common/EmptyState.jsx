/**
 * EmptyState — reusable empty-state display with icon, title, description,
 * and an optional call-to-action button.
 *
 * @param {React.ReactNode} icon         — icon element (e.g. <KeyRound className="size-8" />)
 * @param {string}          title        — short heading
 * @param {string}          [description] — supporting text
 * @param {React.ReactNode} [action]     — CTA element (button, link, etc.)
 * @param {string}          [className]  — extra wrapper classes
 *
 * @example
 * <EmptyState
 *   icon={<KeyRound className="size-8" />}
 *   title="No passwords yet"
 *   description="Add your first password to get started."
 *   action={<button onClick={openModal}>Add Password</button>}
 * />
 */
export default function EmptyState({ icon, title, description, action, className = "" }) {
  return (
    <div
      className={`flex flex-col items-center justify-center text-center py-16 px-6 ${className}`}
    >
      {icon && (
        <div className="size-16 rounded-2xl bg-slate-100 text-slate-400 flex items-center justify-center mb-5">
          {icon}
        </div>
      )}
      <h3 className="text-base font-bold text-slate-700 mb-1.5">{title}</h3>
      {description && (
        <p className="text-sm text-slate-400 max-w-xs mb-5">{description}</p>
      )}
      {action && <div>{action}</div>}
    </div>
  );
}

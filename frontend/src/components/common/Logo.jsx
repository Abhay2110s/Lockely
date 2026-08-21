import { ShieldCheck } from "lucide-react";

/**
 * Logo — PassGuardian shield icon + wordmark.
 *
 * @param {boolean} [showText=true]  — whether to show "PassGuardian" text
 * @param {"sm"|"md"|"lg"} [size="md"] — icon size variant
 * @param {string} [className]       — extra classes for the wrapper div
 */
export default function Logo({ showText = true, size = "md", className = "" }) {
  const iconSizes = { sm: "size-7", md: "size-9", lg: "size-12" };
  const iconIconSizes = { sm: "size-3.5", md: "size-5", lg: "size-6" };
  const textSizes = { sm: "text-sm", md: "text-base", lg: "text-xl" };

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <div
        className={`${iconSizes[size]} rounded-xl bg-indigo-600 text-white flex items-center justify-center shadow-md shadow-indigo-500/20 shrink-0`}
      >
        <ShieldCheck className={iconIconSizes[size]} />
      </div>
      {showText && (
        <div className="flex flex-col">
          <span className={`font-bold ${textSizes[size]} tracking-tight text-slate-900`}>
            PassGuardian
          </span>
          {size !== "sm" && (
            <span className="text-[0.6rem] font-semibold tracking-wider text-slate-400 uppercase">
              Encrypted Vault
            </span>
          )}
        </div>
      )}
    </div>
  );
}

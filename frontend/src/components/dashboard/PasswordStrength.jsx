import { cn } from "@/lib/utils";

/**
 * Calculate password strength score (0–4) and metadata.
 */
function getStrength(password = "") {
  if (!password) return { score: 0, label: "None", color: "bg-slate-200", textColor: "text-slate-400", width: "w-0" };

  let score = 0;
  if (password.length >= 8) score++;
  if (password.length >= 16) score++;
  if (/[A-Z]/.test(password) && /[a-z]/.test(password)) score++;
  if (/[0-9]/.test(password)) score++;
  if (/[^A-Za-z0-9]/.test(password)) score++;

  const levels = [
    { label: "Very Weak", color: "bg-rose-500", textColor: "text-rose-600", width: "w-1/5" },
    { label: "Weak", color: "bg-orange-500", textColor: "text-orange-600", width: "w-2/5" },
    { label: "Fair", color: "bg-amber-500", textColor: "text-amber-600", width: "w-3/5" },
    { label: "Strong", color: "bg-emerald-500", textColor: "text-emerald-600", width: "w-4/5" },
    { label: "Very Strong", color: "bg-indigo-600", textColor: "text-indigo-600", width: "w-full" },
  ];

  return { score, ...levels[Math.min(score, 4)] };
}

/**
 * PasswordStrength — visual strength indicator for a password.
 * @param {string} password - the password to evaluate
 * @param {boolean} showChecks - whether to show requirement checklist
 */
export default function PasswordStrength({ password = "", showChecks = false }) {
  const { label, color, textColor, width } = getStrength(password);

  const checks = [
    { label: "8+ characters", met: password.length >= 8 },
    { label: "16+ characters", met: password.length >= 16 },
    { label: "Uppercase & lowercase", met: /[A-Z]/.test(password) && /[a-z]/.test(password) },
    { label: "Contains number", met: /[0-9]/.test(password) },
    { label: "Special character", met: /[^A-Za-z0-9]/.test(password) },
  ];

  return (
    <div className="space-y-2">
      {/* Bar */}
      <div className="space-y-1">
        <div className="flex items-center justify-between text-[0.68rem] font-semibold">
          <span className="text-slate-500">Password Strength</span>
          <span className={textColor}>{password ? label : "—"}</span>
        </div>
        <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
          <div
            className={cn("h-full rounded-full transition-all duration-500", color, width)}
          />
        </div>
      </div>

      {/* Checklist */}
      {showChecks && password && (
        <ul className="grid grid-cols-2 gap-1 mt-2">
          {checks.map((check, i) => (
            <li
              key={i}
              className={cn(
                "flex items-center gap-1.5 text-[0.65rem] font-medium",
                check.met ? "text-emerald-700" : "text-slate-400"
              )}
            >
              <span className={cn("size-1.5 rounded-full", check.met ? "bg-emerald-500" : "bg-slate-300")} />
              {check.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export { getStrength };

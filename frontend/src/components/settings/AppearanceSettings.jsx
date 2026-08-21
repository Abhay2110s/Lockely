import { useTheme } from "@/context/ThemeContext";
import { Sun, Moon, Laptop, Palette, Check } from "lucide-react";

export default function AppearanceSettings() {
  const { theme, setTheme } = useTheme();

  const options = [
    {
      id: "light",
      label: "Light Mode",
      desc: "Clean, high-contrast light theme",
      icon: Sun,
    },
    {
      id: "dark",
      label: "Dark Mode",
      desc: "Easy on the eyes in low light",
      icon: Moon,
    },
    {
      id: "system",
      label: "System Default",
      desc: "Automatically match OS preference",
      icon: Laptop,
    },
  ];

  return (
    <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200/80 shadow-xs space-y-6">
      <div className="flex items-center gap-3">
        <div className="size-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center font-bold">
          <Palette className="size-5" />
        </div>
        <div>
          <h2 className="text-sm font-bold text-slate-900">Appearance & Theme</h2>
          <p className="text-[0.75rem] text-slate-500">Customize how PassGuardian looks on your device</p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {options.map((opt) => {
          const Icon = opt.icon;
          const isSelected = theme === opt.id;
          return (
            <button
              key={opt.id}
              type="button"
              onClick={() => setTheme(opt.id)}
              className={`p-4 rounded-2xl border text-left transition-all relative flex flex-col justify-between gap-3 ${
                isSelected
                  ? "border-indigo-600 bg-indigo-50/40 shadow-xs"
                  : "border-slate-200 hover:border-slate-300 bg-slate-50/50"
              }`}
            >
              <div className="flex items-center justify-between">
                <div className={`size-8 rounded-xl flex items-center justify-center ${
                  isSelected ? "bg-indigo-600 text-white" : "bg-white text-slate-600 border border-slate-200"
                }`}>
                  <Icon className="size-4" />
                </div>
                {isSelected && (
                  <span className="size-5 rounded-full bg-indigo-600 text-white flex items-center justify-center">
                    <Check className="size-3" />
                  </span>
                )}
              </div>

              <div>
                <p className="text-xs font-bold text-slate-900">{opt.label}</p>
                <p className="text-[0.68rem] text-slate-500 mt-0.5">{opt.desc}</p>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}

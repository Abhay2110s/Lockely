import { useTheme } from "@/context/ThemeContext";
import { Sun, Moon, Laptop, Palette, Check } from "lucide-react";

export default function AppearanceSettings() {
  const { theme, setTheme } = useTheme();

  const options = [
    {
      id: "dark",
      label: "Velvet Glass (Default)",
      desc: "Deep burgundy luxury with blush pink glows",
      icon: Moon,
    },
    {
      id: "light",
      label: "Silk Blush",
      desc: "Luminous glass with rose quartz hues",
      icon: Sun,
    },
    {
      id: "system",
      label: "System Match",
      desc: "Automatically match OS glass preference",
      icon: Laptop,
    },
  ];

  return (
    <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-pink-500/20 shadow-2xl space-y-6">
      <div className="flex items-center gap-3">
        <div className="size-10 rounded-xl bg-gradient-to-br from-[#7a1534] to-[#be2656] text-white flex items-center justify-center font-bold">
          <Palette className="size-5" />
        </div>
        <div>
          <h2 className="text-sm sm:text-base font-bold text-white">Appearance &amp; Glass Theme</h2>
          <p className="text-xs text-[#fda4b8]/70">Customize your glassmorphic visual experience</p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
        {options.map((opt) => {
          const Icon = opt.icon;
          const isSelected = theme === opt.id || (!theme && opt.id === "dark");
          return (
            <button
              key={opt.id}
              type="button"
              onClick={() => setTheme(opt.id)}
              className={`p-4 rounded-2xl border text-left transition-all relative flex flex-col justify-between gap-3 cursor-pointer ${
                isSelected
                  ? "border-pink-400/60 bg-[#7a1534]/40 shadow-lg shadow-pink-950/40"
                  : "glass-card-subtle border-pink-500/15 hover:border-pink-400/30"
              }`}
            >
              <div className="flex items-center justify-between">
                <div className={`size-8 rounded-xl flex items-center justify-center ${
                  isSelected ? "bg-gradient-to-br from-[#7a1534] to-[#f43f6e] text-white" : "glass-card-subtle text-[#fda4b8]"
                }`}>
                  <Icon className="size-4" />
                </div>
                {isSelected && (
                  <span className="size-5 rounded-full bg-[#f43f6e] text-white flex items-center justify-center">
                    <Check className="size-3" />
                  </span>
                )}
              </div>

              <div>
                <p className="text-xs font-bold text-white">{opt.label}</p>
                <p className="text-[0.68rem] text-[#fda4b8]/75 mt-0.5">{opt.desc}</p>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}

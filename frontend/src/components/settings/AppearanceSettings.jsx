import { useTheme } from "@/context/ThemeContext";
import { Sun, Moon, Laptop, Palette, Check } from "lucide-react";

export default function AppearanceSettings() {
  const { theme, setTheme } = useTheme();

  const options = [
    {
      id: "light",
      label: "Silk Blush & Cream (Default)",
      desc: "Soft cream canvas with gentle blush pink and burgundy",
      icon: Sun,
    },
    {
      id: "dark",
      label: "Midnight Glass",
      desc: "Deep burgundy luxury with blush pink accents",
      icon: Moon,
    },
    {
      id: "system",
      label: "System Match",
      desc: "Automatically adapt to your operating system preference",
      icon: Laptop,
    },
  ];

  return (
    <div className="bg-white/95 p-6 sm:p-8 rounded-3xl border border-[#E6E0D5] shadow-xl space-y-6">
      <div className="flex items-center gap-3">
        <div className="size-10 rounded-2xl bg-blush/35 border border-[#E6E0D5] text-[#8B263E] flex items-center justify-center font-bold">
          <Palette className="size-5" />
        </div>
        <div>
          <h2 className="text-sm sm:text-base font-bold text-[#1a1a1a]">Appearance &amp; Glass Theme</h2>
          <p className="text-xs text-[#6B6560]">Customize your glassmorphic visual experience</p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
        {options.map((opt) => {
          const Icon = opt.icon;
          const isSelected = theme === opt.id || (!theme && opt.id === "light");
          return (
            <button
              key={opt.id}
              type="button"
              onClick={() => setTheme(opt.id)}
              className={`p-5 rounded-2xl border text-left transition-all relative flex flex-col justify-between gap-3 cursor-pointer ${
                isSelected
                  ? "border-[#8B263E] bg-blush/35 shadow-xs"
                  : "bg-[#FDFBF7] border-[#E6E0D5] hover:border-[#8B263E] hover:bg-blush/15"
              }`}
            >
              <div className="flex items-center justify-between">
                <div className={`size-8 rounded-xl flex items-center justify-center ${
                  isSelected ? "bg-[#8B263E] text-white" : "bg-white border border-[#E6E0D5] text-[#8B263E]"
                }`}>
                  <Icon className="size-4" />
                </div>
                {isSelected && (
                  <span className="size-5 rounded-full bg-[#8B263E] text-white flex items-center justify-center shadow-xs">
                    <Check className="size-3" />
                  </span>
                )}
              </div>

              <div>
                <p className="text-xs font-bold text-[#1a1a1a]">{opt.label}</p>
                <p className="text-[0.68rem] text-[#6B6560] mt-0.5">{opt.desc}</p>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}

import { ArrowRight, LogIn, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";


const navItems = [
  { label: "Login", icon: LogIn },
];

export default function Navbar() {
  return (
    <div className="fixed top-6 left-1/2 -translate-x-1/2 w-[calc(100%-2rem)] max-w-5xl z-50">
      <div className="backdrop-blur-xl backdrop-saturate-150 shadow-[0_8px_32px_rgba(219,112,147,0.18)] rounded-[28px] bg-gradient-to-r from-orange-100/50 via-pink-100/50 to-rose-100/50 border border-white/60 px-6 py-4">
        <div className="flex justify-between items-center">
          {/* Logo Section */}
          <div className="flex items-center gap-3">
            <div className="size-11 shadow-sm ring-1 ring-white/30 rounded-2xl bg-gradient-to-br from-orange-400 to-pink-500 text-white flex justify-center items-center shrink-0">
              <ShieldCheck className="size-5" />
            </div>

            <div className="leading-none flex flex-col">
              <span className="font-bold text-rose-950 text-xl tracking-tight">
                PassGuardian
              </span>
              <span className="text-rose-800/60 text-xs leading-4">
                Secure access, beautifully managed
              </span>
            </div>
          </div>

          {/* Navigation Actions */}
          <div className="flex items-center gap-2">
            {navItems.map(({ label, icon: Icon }) => (
              <Button
                key={label}
                variant="ghost"
                className="font-medium rounded-full text-rose-950 text-sm px-4 gap-2 hover:bg-white/40"
              >
                <Icon className="size-4" />
                {label}
              </Button>
            ))}

            <Button className="font-semibold shadow-[0_10px_24px_rgba(219,39,119,0.25)] rounded-full bg-gradient-to-r from-orange-400 to-pink-500 text-white text-sm px-5 gap-2 hover:from-orange-500 hover:to-pink-600 border-0">
              Get Started
              <ArrowRight className="size-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
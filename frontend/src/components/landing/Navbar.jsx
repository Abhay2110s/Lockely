import { useEffect, useState } from "react";
import { LogIn, ShieldCheck, Sparkles } from "lucide-react";

const navItems = [
  { label: "Features", href: "#features" },
  { label: "Security", href: "#security" },
  { label: "FAQ", href: "#faq" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`
      fixed top-0 left-0 right-0 z-50 transition-all duration-300
      ${
        scrolled
          ? "bg-white/85 backdrop-blur-md border-b border-slate-200/80 shadow-sm py-3.5"
          : "bg-transparent py-5"
      }
      `}
    >
      <div className="max-w-6xl mx-auto px-6 flex items-center justify-between">
        {/* Brand Logo */}
        <a href="#top" className="flex items-center gap-3 group">
          <div className="relative flex items-center justify-center size-10 rounded-2xl bg-indigo-600 text-white shadow-md shadow-indigo-500/20 group-hover:scale-105 transition-transform">
            <ShieldCheck className="size-5.5" />
          </div>
          <div className="flex flex-col">
            <span className="font-bold text-xl tracking-tight text-slate-900 flex items-center gap-1.5">
              PassGuardian
              <span className="flex size-2 rounded-full bg-indigo-500 animate-pulse" />
            </span>
            <span className="text-[0.65rem] font-semibold tracking-wider text-slate-400 uppercase">
              Zero-Knowledge Vault
            </span>
          </div>
        </a>

        {/* Navigation links */}
        <nav className="hidden md:flex items-center gap-8 bg-white/70 backdrop-blur-md px-6 py-2 rounded-full border border-slate-200/80 shadow-xs">
          {navItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="text-xs font-semibold uppercase tracking-wider text-slate-600 hover:text-indigo-600 transition-colors"
            >
              {item.label}
            </a>
          ))}
        </nav>

        {/* Action Buttons */}
        <div className="flex items-center gap-3">
          <a
            href="/login"
            className="hidden sm:flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-slate-600 hover:text-indigo-600 transition-colors px-3 py-2"
          >
            <LogIn className="size-4 text-indigo-500" />
            Sign in
          </a>
          <a
            href="/register"
            className="btn-soft-primary text-xs tracking-wider flex items-center gap-2"
          >
            <Sparkles className="size-3.5" />
            Open Vault
          </a>
        </div>
      </div>
    </header>
  );
}

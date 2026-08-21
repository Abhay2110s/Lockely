import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAppAuth } from "@/context/AuthContext";
import { LogIn, ShieldCheck, Sparkles, LayoutDashboard, Zap } from "lucide-react";

const navItems = [
  { label: "Features", href: "#features" },
  { label: "Security", href: "#security" },
  { label: "Sandbox", href: "#interactive-demo" },
  { label: "FAQ", href: "#faq" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const { isAuthenticated, initials, logout } = useAppAuth();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`
      fixed top-0 left-0 right-0 z-50 transition-all duration-300 font-comic
      ${
        scrolled
          ? "bg-[#fffef7]/95 backdrop-blur-md border-b-3 border-[#18181b] shadow-[0_4px_0_#18181b] py-3"
          : "bg-transparent py-4 sm:py-5"
      }
      `}
    >
      <div className="max-w-6xl mx-auto px-6 flex items-center justify-between">
        {/* Brand Logo */}
        <Link to="/" className="flex items-center gap-3 group">
          <div className="size-11 rounded-2xl bg-[#6366f1] border-2.5 border-[#18181b] text-white flex items-center justify-center shadow-[2.5px_2.5px_0px_#18181b] group-hover:rotate-6 transition-transform">
            <ShieldCheck className="size-6 text-white" />
          </div>
          <div className="flex flex-col">
            <span className="font-heading-comic font-black text-xl tracking-tight text-slate-950 flex items-center gap-1.5 leading-tight">
              PassGuardian
              <span className="size-2 rounded-full bg-emerald-500 animate-pulse border border-[#18181b]" />
            </span>
            <span className="text-[0.65rem] font-heading-comic font-bold tracking-wider text-slate-800 bg-[#fef08a] px-1.5 rounded border border-[#18181b] w-fit">
              COMIC EDITION 💥
            </span>
          </div>
        </Link>

        {/* Navigation links */}
        <nav className="hidden md:flex items-center gap-6 bg-[#fffef7] px-6 py-2 rounded-full border-2.5 border-[#18181b] shadow-[3px_3px_0px_#18181b]">
          {navItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="text-xs font-heading-comic font-bold tracking-wider text-slate-800 hover:text-indigo-700 transition-colors hover:-translate-y-0.5"
            >
              {item.label}
            </a>
          ))}
        </nav>

        {/* Action Buttons */}
        <div className="flex items-center gap-3">
          {isAuthenticated ? (
            <>
              <Link
                to="/dashboard"
                className="btn-comic btn-comic-yellow text-xs px-4 py-2 gap-1.5"
              >
                <LayoutDashboard className="size-4" />
                Dashboard ➔
              </Link>
              <div className="relative group">
                <button className="size-10 rounded-2xl bg-[#6366f1] text-white flex items-center justify-center font-heading-comic font-black text-sm border-2.5 border-[#18181b] shadow-[2.5px_2.5px_0px_#18181b] hover:-translate-y-0.5 transition-transform">
                  {initials}
                </button>
                <div className="absolute right-0 top-12 w-40 bg-white border-2.5 border-[#18181b] rounded-2xl shadow-[4px_4px_0px_#18181b] p-1.5 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-50">
                  <Link
                    to="/profile"
                    className="block px-3 py-2 text-xs font-heading-comic font-bold text-slate-800 hover:bg-[#bae6fd] rounded-xl"
                  >
                    Profile
                  </Link>
                  <button
                    onClick={logout}
                    className="w-full text-left px-3 py-2 text-xs font-heading-comic font-bold text-rose-700 hover:bg-[#fda4af] rounded-xl"
                  >
                    Sign Out
                  </button>
                </div>
              </div>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="hidden sm:flex items-center gap-1.5 text-xs font-heading-comic font-bold text-slate-900 bg-white hover:bg-[#bae6fd] px-3.5 py-2 rounded-xl border-2 border-[#18181b] shadow-[2px_2px_0px_#18181b] hover:-translate-y-0.5 transition-all"
              >
                <LogIn className="size-3.5" />
                Sign In
              </Link>
              <Link
                to="/register"
                className="btn-comic btn-comic-primary text-xs px-4 py-2 gap-1.5"
              >
                <Sparkles className="size-3.5" />
                Open Free Vault
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
}

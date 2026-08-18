import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAppAuth } from "@/context/AuthContext";
import { LogIn, ShieldCheck, Sparkles, LayoutDashboard } from "lucide-react";

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
        <Link to="/" className="flex items-center gap-3 group">
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
        </Link>

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
          {isAuthenticated ? (
            <>
              <Link
                to="/dashboard"
                className="btn-soft-primary text-xs tracking-wider flex items-center gap-2"
              >
                <LayoutDashboard className="size-3.5" />
                Go to Dashboard
              </Link>
              <div className="relative group">
                <button className="size-9 rounded-full bg-indigo-600 text-white flex items-center justify-center font-bold text-sm border-2 border-indigo-500/20 hover:scale-105 transition-transform">
                  {initials}
                </button>
                <div className="absolute right-0 top-11 w-36 bg-white border border-slate-200 rounded-xl shadow-lg py-1.5 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-50">
                  <Link
                    to="/profile"
                    className="block px-3.5 py-2.5 text-xs font-semibold text-slate-700 hover:bg-slate-50"
                  >
                    Profile
                  </Link>
                  <button
                    onClick={logout}
                    className="w-full text-left px-3.5 py-2.5 text-xs font-semibold text-rose-600 hover:bg-rose-50"
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
                className="hidden sm:flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-slate-600 hover:text-indigo-600 transition-colors px-3 py-2"
              >
                <LogIn className="size-4 text-indigo-500" />
                Sign in
              </Link>
              <Link
                to="/register"
                className="btn-soft-primary text-xs tracking-wider flex items-center gap-2"
              >
                <Sparkles className="size-3.5" />
                Open Vault
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
}

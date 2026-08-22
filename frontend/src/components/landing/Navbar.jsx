import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAppAuth } from "@/context/AuthContext";
import { ShieldCheck, Sparkles, LayoutDashboard, LogIn } from "lucide-react";
import { FaLinkedin, FaGithub } from "react-icons/fa";

const navItems = [
  { label: "Features",  href: "#features" },
  { label: "Security",  href: "#security" },
  { label: "Sandbox",   href: "#interactive-demo" },
  { label: "FAQ",       href: "#faq" },
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
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-[#030b15]/95 backdrop-blur-md border-b border-white/[0.06] shadow-[0_1px_0_rgba(0,212,255,0.06)]"
          : "bg-[#030b15]/80 backdrop-blur-sm border-b border-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto flex items-stretch justify-between px-4 sm:px-6">

        {/* Left: Brand */}
        <div className="flex items-stretch gap-0">
          <Link to="/" className="flex items-center gap-3 py-3 pr-6 group">
            <div className="size-8 rounded bg-[#00d4ff]/10 border border-[#00d4ff]/30 flex items-center justify-center text-[#00d4ff] transition-all group-hover:bg-[#00d4ff]/20">
              <ShieldCheck className="size-4" />
            </div>
            <div className="flex flex-col">
              <span className="ca-display text-lg text-white tracking-tight leading-tight">
                PassGuardian
              </span>
              <span className="ca-mono text-[0.58rem] text-[#00d4ff]/60 tracking-widest">
                zero-knowledge vault
              </span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-stretch border-l border-white/[0.06]">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="ca-mono flex items-center px-5 text-[0.68rem] text-[#e2eaf8]/50 hover:text-[#00d4ff] border-r border-white/[0.06] transition-colors duration-200 tracking-widest"
              >
                {item.label}
              </a>
            ))}
          </nav>
        </div>

        {/* Right: Social + Auth */}
        <div className="flex items-center gap-2">
          <a
            href="https://github.com/Abhay2110s/PassGaurdian"
            target="_blank"
            rel="noreferrer"
            aria-label="GitHub"
            className="hidden sm:flex size-8 items-center justify-center text-[#e2eaf8]/40 hover:text-[#e2eaf8] border border-white/[0.07] hover:border-white/20 transition-all"
          >
            <FaGithub className="size-3.5" />
          </a>
          <a
            href="https://www.linkedin.com/in/abhay-singh-btech"
            target="_blank"
            rel="noreferrer"
            aria-label="LinkedIn"
            className="hidden sm:flex size-8 items-center justify-center text-[#e2eaf8]/40 hover:text-[#00d4ff] border border-white/[0.07] hover:border-[#00d4ff]/30 transition-all"
          >
            <FaLinkedin className="size-3.5" />
          </a>

          <div className="w-px h-6 bg-white/[0.07] mx-1" />

          {isAuthenticated ? (
            <>
              <Link
                to="/dashboard"
                className="ca-mono inline-flex items-center gap-2 border border-white/[0.1] bg-white/[0.04] px-4 py-2 text-[0.68rem] text-[#e2eaf8]/80 hover:text-white hover:border-white/20 transition-all tracking-widest"
              >
                <LayoutDashboard className="size-3" />
                Dashboard
              </Link>
              <button
                onClick={logout}
                className="size-8 rounded border border-white/[0.1] bg-[#00d4ff]/10 text-[#00d4ff] font-bold text-xs hover:bg-[#00d4ff]/20 transition-all"
                title="Sign out"
              >
                {initials}
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="ca-mono hidden sm:inline-flex items-center gap-1.5 border border-white/[0.1] px-4 py-2 text-[0.68rem] text-[#e2eaf8]/60 hover:text-white hover:border-white/20 transition-all tracking-widest"
              >
                <LogIn className="size-3" />
                Sign In
              </Link>
              <Link
                to="/register"
                className="ca-mono inline-flex items-center gap-2 bg-[#00d4ff] px-4 py-2 text-[0.68rem] font-bold text-[#030b15] hover:bg-[#00d4ff]/90 transition-colors tracking-widest"
              >
                <Sparkles className="size-3" />
                Open Vault
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
}

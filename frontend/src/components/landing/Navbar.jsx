import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAppAuth } from "@/context/AuthContext";
import {
  ShieldCheck,
  Sparkles,
  LayoutDashboard,
  LogIn,
  Mail,
} from "lucide-react";
import { FaLinkedin, FaGithub } from "react-icons/fa";

const navItems = [
  { label: "Features", href: "#features", icon: Sparkles, bg: "hover:bg-[#ffe066]" },
  { label: "Security", href: "#security", icon: ShieldCheck, bg: "hover:bg-[#86efac]" },
  { label: "Sandbox", href: "#interactive-demo", icon: LayoutDashboard, bg: "hover:bg-[#c4b5fd]" },
  { label: "FAQ", href: "#faq", icon: Sparkles, bg: "hover:bg-[#ff5e89]" },
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
    <header className="sticky top-0 z-50 bg-[#faf6ea]/95 backdrop-blur-sm border-b border-[#191510]/15">
      <div className="max-w-7xl mx-auto flex items-stretch justify-between px-4 sm:px-6">
        {/* Left: Brand Logo & Artsy Smiley */}
        <div className="flex items-stretch gap-3 py-2.5">
          <Link to="/" className="flex items-center gap-3 pr-3 group">
            {/* Medallion Avatar */}
            <div className="size-9 sm:size-10 rounded-full bg-[#ff5e89] border-2 border-white shadow-[1.5px_2px_0_rgba(25,21,16,0.3)] flex items-center justify-center text-white transition-transform group-hover:scale-105">
              <ShieldCheck className="size-5 sm:size-5.5" />
            </div>
            <div className="flex flex-col">
              <span className="ca-display text-xl sm:text-2xl text-[#191510] tracking-tight leading-tight">
                PASSGUARDIAN
              </span>
              <span className="ca-mono text-[0.62rem] text-[#191510]/70 tracking-widest uppercase">
                Zero-Knowledge Vault
              </span>
            </div>
          </Link>

          {/* Desktop Artsy Nav Links */}
          <nav className="hidden md:flex items-stretch pl-4 border-l border-[#191510]/10">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className={`ca-mono flex items-center gap-2 px-4 text-xs font-bold uppercase tracking-widest text-[#191510] transition-colors border-r border-[#191510]/10 ${item.bg}`}
              >
                {item.label}
              </a>
            ))}
          </nav>
        </div>

        {/* Right: Social Bubbles + Auth Actions */}
        <div className="flex items-center gap-2.5 py-2">
          {/* Social circular pill triggers */}
          <a
            href="https://github.com/Abhay2110s/PassGaurdian"
            target="_blank"
            rel="noreferrer"
            aria-label="GitHub"
            className="hidden sm:flex size-9 items-center justify-center rounded-full border-2 border-white text-[#191510] shadow-[1.5px_1.5px_0_rgba(25,21,16,0.25)] transition-transform hover:-translate-y-0.5 bg-[#ffe066]"
          >
            <FaGithub className="size-4" />
          </a>
          <a
            href="https://www.linkedin.com/in/abhay-singh-btech"
            target="_blank"
            rel="noreferrer"
            aria-label="LinkedIn"
            className="hidden sm:flex size-9 items-center justify-center rounded-full border-2 border-white text-[#191510] shadow-[1.5px_1.5px_0_rgba(25,21,16,0.25)] transition-transform hover:-translate-y-0.5 bg-[#7dd3fc]"
          >
            <FaLinkedin className="size-4" />
          </a>

          {isAuthenticated ? (
            <>
              <Link
                to="/dashboard"
                className="ca-mono inline-flex items-center gap-2 border-2 border-[#191510] bg-[#191510] px-4 py-2 text-xs font-bold uppercase tracking-widest text-white transition-colors hover:bg-transparent hover:text-[#191510]"
              >
                <LayoutDashboard className="size-3.5" />
                Dashboard
              </Link>
              <button
                onClick={logout}
                className="size-9 rounded-full bg-[#ff5e89] text-white font-bold text-xs border-2 border-white shadow-[1.5px_1.5px_0_rgba(25,21,16,0.25)]"
                title="Sign out"
              >
                {initials}
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="ca-mono hidden sm:inline-flex items-center gap-1.5 border-2 border-[#191510] px-3.5 py-1.5 text-xs font-bold uppercase tracking-widest text-[#191510] transition-colors hover:bg-[#191510] hover:text-white"
              >
                <LogIn className="size-3" />
                Sign In
              </Link>
              <Link
                to="/register"
                className="ca-mono inline-flex items-center gap-2 border-2 border-[#191510] bg-[#ffe066] px-4 py-2 text-xs font-bold uppercase tracking-widest text-[#191510] shadow-[2px_2px_0_#191510] hover:-translate-y-0.5 transition-transform"
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

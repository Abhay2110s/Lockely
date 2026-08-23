import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAppAuth } from "@/context/AuthContext";
import {
  ShieldCheck,
  Sparkles,
  LayoutDashboard,
  LogIn,
  X,
  Menu,
  User,
  Settings,
  LogOut,
  ChevronDown,
} from "lucide-react";
import { FaLinkedin, FaGithub } from "react-icons/fa";

const navItems = [
  { label: "Features", href: "#features", bg: "hover:bg-[#ffe066]" },
  { label: "Security", href: "#security", bg: "hover:bg-[#86efac]" },
  { label: "Sandbox", href: "#interactive-demo", bg: "hover:bg-[#c4b5fd]" },
  { label: "FAQ", href: "#faq", bg: "hover:bg-[#ff5e89]" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const { isAuthenticated, initials, displayName, user, logout } = useAppAuth();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close mobile drawer on resize to desktop
  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth >= 768) {
        setMobileOpen(false);
        setUserDropdownOpen(false);
      }
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  // Lock body scroll when drawer is open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  return (
    <>
      <header className="sticky top-0 z-50 bg-[#faf6ea]/95 backdrop-blur-sm border-b border-[#191510]/15">
        <div className="max-w-7xl mx-auto flex items-stretch justify-between px-4 sm:px-6">
          {/* Left: Brand Logo */}
          <div className="flex items-stretch gap-3 py-2.5">
            <Link to="/" className="flex items-center gap-3 pr-3 group" onClick={() => setMobileOpen(false)}>
              {/* Medallion Avatar */}
              <div className="size-9 sm:size-10 rounded-full bg-[#ff5e89] border-2 border-white shadow-[1.5px_2px_0_rgba(25,21,16,0.3)] flex items-center justify-center text-white transition-transform group-hover:scale-105">
                <ShieldCheck className="size-5 sm:size-5.5" />
              </div>
              <div className="flex flex-col">
                <span className="ca-display text-xl sm:text-2xl text-[#191510] tracking-tight leading-tight">
                  PASSGUARDIAN
                </span>
                <span className="ca-mono text-[0.62rem] text-[#191510]/70 tracking-widest uppercase hidden xs:block">
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
          <div className="flex items-center gap-2 sm:gap-2.5 py-2">
            {/* Social icons — desktop only */}
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
                  className="ca-mono inline-flex items-center gap-2 border-2 border-[#191510] bg-[#191510] px-3 sm:px-4 py-2 text-xs font-bold uppercase tracking-widest text-white transition-colors hover:bg-transparent hover:text-[#191510]"
                >
                  <LayoutDashboard className="size-3.5" />
                  <span className="hidden xs:inline">Dashboard</span>
                </Link>

                {/* Authenticated Avatar Menu */}
                <div className="relative">
                  <button
                    onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                    className="flex items-center gap-1 p-0.5 rounded-full bg-[#ff5e89] border-2 border-white shadow-[1.5px_1.5px_0_rgba(25,21,16,0.25)] hover:scale-105 transition-transform"
                    aria-expanded={userDropdownOpen}
                    aria-label="User dropdown menu"
                  >
                    <div className="size-8 rounded-full flex items-center justify-center text-white font-bold text-xs">
                      {initials}
                    </div>
                  </button>

                  {/* Backdrop */}
                  {userDropdownOpen && (
                    <div
                      className="fixed inset-0 z-40"
                      onClick={() => setUserDropdownOpen(false)}
                    />
                  )}

                  {/* Dropdown Menu */}
                  {userDropdownOpen && (
                    <div className="absolute right-0 top-11 w-48 bg-[#faf6ea] border-2 border-[#191510] shadow-[4px_4px_0px_#191510] p-1.5 z-50 animate-in fade-in zoom-in-95">
                      <div className="px-3 py-1.5 border-b border-[#191510]/15 mb-1 bg-white">
                        <p className="ca-mono text-[0.68rem] text-[#191510] font-bold truncate">
                          {displayName || "Guardian"}
                        </p>
                        <p className="ca-mono text-[0.55rem] text-[#191510]/60 truncate">
                          {user?.email}
                        </p>
                      </div>
                      <Link
                        to="/profile"
                        onClick={() => setUserDropdownOpen(false)}
                        className="flex items-center gap-2 px-3 py-2 ca-mono text-[0.65rem] text-[#191510] hover:bg-[#7dd3fc] transition-colors font-bold"
                      >
                        <User className="size-3.5" />
                        Profile
                      </Link>
                      <Link
                        to="/settings"
                        onClick={() => setUserDropdownOpen(false)}
                        className="flex items-center gap-2 px-3 py-2 ca-mono text-[0.65rem] text-[#191510] hover:bg-[#ffe066] transition-colors font-bold"
                      >
                        <Settings className="size-3.5" />
                        Settings &amp; 2FA
                      </Link>
                      <div className="my-1 border-t-2 border-[#191510]" />
                      <button
                        onClick={() => {
                          setUserDropdownOpen(false);
                          logout();
                        }}
                        className="w-full flex items-center gap-2 px-3 py-2 ca-mono text-[0.65rem] text-rose-800 hover:bg-[#fda4af] transition-colors font-bold"
                      >
                        <LogOut className="size-3.5" />
                        Log Out
                      </button>
                    </div>
                  )}
                </div>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="ca-mono inline-flex items-center gap-1.5 border-2 border-[#191510] px-3 sm:px-3.5 py-1.5 text-xs font-bold uppercase tracking-widest text-[#191510] transition-colors hover:bg-[#191510] hover:text-white"
                >
                  <LogIn className="size-3" />
                  <span className="hidden sm:inline">Sign In</span>
                </Link>
                <Link
                  to="/register"
                  className="ca-mono inline-flex items-center gap-1.5 sm:gap-2 border-2 border-[#191510] bg-[#ffe066] px-3 sm:px-4 py-2 text-xs font-bold uppercase tracking-widest text-[#191510] shadow-[2px_2px_0_#191510] hover:-translate-y-0.5 transition-transform"
                >
                  <Sparkles className="size-3.5" />
                  <span className="hidden xs:inline">Open Vault</span>
                  <span className="xs:hidden">Vault</span>
                </Link>
              </>
            )}

            {/* Mobile hamburger */}
            <button
              onClick={() => setMobileOpen(true)}
              className="md:hidden ml-1 flex items-center justify-center size-9 border-2 border-[#191510] bg-white text-[#191510] shadow-[2px_2px_0_#191510] transition-transform hover:-translate-y-0.5"
              aria-label="Open navigation menu"
            >
              <Menu className="size-5" />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Backdrop */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-[60] bg-[#191510]/50 backdrop-blur-sm md:hidden"
          onClick={() => setMobileOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Mobile Slide-out Drawer */}
      <div
        className={`fixed top-0 right-0 z-[70] h-full w-72 max-w-[85vw] bg-[#faf6ea] border-l-3 border-[#191510] shadow-[-6px_0px_0px_#191510] flex flex-col transition-transform duration-300 ease-in-out md:hidden ${
          mobileOpen ? "translate-x-0" : "translate-x-full"
        }`}
        aria-label="Mobile navigation"
      >
        {/* Drawer Header */}
        <div className="flex items-center justify-between p-5 border-b-2 border-[#191510] bg-[#ffe066]">
          <div className="flex items-center gap-2.5">
            <div className="size-9 rounded-full bg-[#ff5e89] border-2 border-white flex items-center justify-center text-white">
              <ShieldCheck className="size-5" />
            </div>
            <span className="ca-display text-lg text-[#191510]">PASSGUARDIAN</span>
          </div>
          <button
            onClick={() => setMobileOpen(false)}
            className="size-8 flex items-center justify-center border-2 border-[#191510] bg-white text-[#191510]"
            aria-label="Close navigation"
          >
            <X className="size-4" />
          </button>
        </div>

        {/* Nav Links */}
        <nav className="flex flex-col p-4 gap-2 flex-1 overflow-y-auto">
          <p className="ca-mono text-[0.62rem] font-bold uppercase tracking-widest text-[#191510]/50 px-2 mb-1">
            Navigate
          </p>
          {navItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              onClick={() => setMobileOpen(false)}
              className={`ca-mono flex items-center gap-3 px-4 py-3 text-sm font-bold uppercase tracking-widest text-[#191510] border-2 border-[#191510] bg-white shadow-[2px_2px_0_#191510] transition-all hover:-translate-y-0.5 ${item.bg}`}
            >
              {item.label}
            </a>
          ))}

          <div className="my-2 border-t-2 border-[#191510]/20" />

          {/* Social Links in drawer */}
          <p className="ca-mono text-[0.62rem] font-bold uppercase tracking-widest text-[#191510]/50 px-2 mb-1">
            Connect
          </p>
          <a
            href="https://github.com/Abhay2110s/PassGaurdian"
            target="_blank"
            rel="noreferrer"
            className="ca-mono flex items-center gap-3 px-4 py-2.5 text-xs font-bold uppercase tracking-widest text-[#191510] border-2 border-[#191510] bg-[#ffe066] shadow-[2px_2px_0_#191510] transition-all"
          >
            <FaGithub className="size-4" />
            GitHub
          </a>
          <a
            href="https://www.linkedin.com/in/abhay-singh-btech"
            target="_blank"
            rel="noreferrer"
            className="ca-mono flex items-center gap-3 px-4 py-2.5 text-xs font-bold uppercase tracking-widest text-[#191510] border-2 border-[#191510] bg-[#7dd3fc] shadow-[2px_2px_0_#191510] transition-all"
          >
            <FaLinkedin className="size-4" />
            LinkedIn
          </a>
        </nav>

        {/* Drawer Footer — Auth & User Actions */}
        <div className="p-4 border-t-2 border-[#191510] bg-white space-y-2">
          {isAuthenticated ? (
            <div className="space-y-2">
              <div className="p-2 bg-[#faf6ea] border-2 border-[#191510] flex items-center gap-2.5">
                <div className="size-8 bg-[#ff5e89] border border-white text-white flex items-center justify-center ca-display text-xs">
                  {initials}
                </div>
                <div className="min-w-0 flex-1">
                  <p className="ca-mono text-[0.68rem] text-[#191510] font-bold truncate">
                    {displayName || "Guardian"}
                  </p>
                  <p className="ca-mono text-[0.55rem] text-[#191510]/60 truncate">
                    {user?.email || "Zero-Knowledge Protected"}
                  </p>
                </div>
              </div>

              <Link
                to="/dashboard"
                onClick={() => setMobileOpen(false)}
                className="ca-mono w-full flex items-center justify-center gap-2 border-2 border-[#191510] bg-[#191510] px-4 py-2.5 text-xs font-bold uppercase tracking-widest text-white shadow-[2px_2px_0_#191510]"
              >
                <LayoutDashboard className="size-3.5" />
                Dashboard
              </Link>

              {/* Profile & Settings Buttons */}
              <div className="grid grid-cols-2 gap-2">
                <Link
                  to="/profile"
                  onClick={() => setMobileOpen(false)}
                  className="ca-mono flex items-center justify-center gap-1.5 border-2 border-[#191510] bg-[#7dd3fc] px-2 py-2 text-[0.65rem] font-bold uppercase tracking-wide text-[#191510]"
                >
                  <User className="size-3.5" />
                  Profile
                </Link>
                <Link
                  to="/settings"
                  onClick={() => setMobileOpen(false)}
                  className="ca-mono flex items-center justify-center gap-1.5 border-2 border-[#191510] bg-[#ffe066] px-2 py-2 text-[0.65rem] font-bold uppercase tracking-wide text-[#191510]"
                >
                  <Settings className="size-3.5" />
                  Settings
                </Link>
              </div>

              {/* Mobile Logout Button */}
              <button
                onClick={() => {
                  setMobileOpen(false);
                  logout();
                }}
                className="ca-mono w-full flex items-center justify-center gap-2 border-2 border-[#191510] bg-[#fda4af] px-4 py-2 text-xs font-bold uppercase tracking-widest text-rose-950 shadow-[2px_2px_0_#191510]"
              >
                <LogOut className="size-3.5" />
                Log Out
              </button>
            </div>
          ) : (
            <div className="flex flex-col gap-2">
              <Link
                to="/login"
                onClick={() => setMobileOpen(false)}
                className="ca-mono w-full flex items-center justify-center gap-2 border-2 border-[#191510] bg-white px-4 py-2.5 text-xs font-bold uppercase tracking-widest text-[#191510]"
              >
                <LogIn className="size-3.5" />
                Sign In
              </Link>
              <Link
                to="/register"
                onClick={() => setMobileOpen(false)}
                className="ca-mono w-full flex items-center justify-center gap-2 border-2 border-[#191510] bg-[#ffe066] px-4 py-2.5 text-xs font-bold uppercase tracking-widest text-[#191510] shadow-[3px_3px_0_#191510]"
              >
                <Sparkles className="size-3.5" />
                Open Vault — Free
              </Link>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

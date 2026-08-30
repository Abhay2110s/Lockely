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
  { label: "Features", href: "#features" },
  { label: "Security", href: "#security" },
  { label: "Sandbox", href: "#interactive-demo" },
  { label: "FAQ", href: "#faq" },
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
      <header className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-[#1a040b] border-b border-[#7a1534] py-2.5 shadow-2xl"
          : "bg-transparent border-b border-[#581026]/40 py-3.5"
      }`}>
        <div className="max-w-7xl mx-auto flex items-center justify-between px-4 sm:px-6">
          {/* Left: Brand Logo */}
          <div className="flex items-center gap-6">
            <Link to="/" className="flex items-center gap-3 group" onClick={() => setMobileOpen(false)}>
              {/* Medallion Avatar with Burgundy Border & Blush Sheen */}
              <div className="size-10 rounded-xl bg-gradient-to-br from-[#7a1534] via-[#be2656] to-[#f43f6e] border-2 border-[#be2656] shadow-lg shadow-[#7a1534]/50 flex items-center justify-center text-white transition-transform group-hover:scale-105">
                <ShieldCheck className="size-5" />
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-extrabold tracking-tight text-white leading-tight">
                  PASS<span className="text-[#fb7193]">GUARDIAN</span>
                </span>
                <span className="text-[0.62rem] text-[#fda4b8] tracking-widest uppercase font-mono-code font-bold hidden xs:block">
                  Zero-Knowledge Vault
                </span>
              </div>
            </Link>

            {/* Desktop Nav Links */}
            <nav className="hidden md:flex items-center gap-1 pl-6 border-l border-[#7a1534]/50">
              {navItems.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  className="px-3.5 py-1.5 rounded-lg text-xs font-bold text-[#fda4b8] hover:text-white hover:bg-[#3c0b1a] transition-all"
                >
                  {item.label}
                </a>
              ))}
            </nav>
          </div>

          {/* Right: Social Bubbles + Auth Actions */}
          <div className="flex items-center gap-2.5">
            {/* Social icons */}
            <a
              href="https://github.com/Abhay2110s/PassGaurdian"
              target="_blank"
              rel="noreferrer"
              aria-label="GitHub"
              className="hidden sm:flex size-9 items-center justify-center rounded-xl bg-[#1f050d] border border-[#7a1534] text-[#fda4b8] hover:text-white hover:border-[#be2656] hover:shadow-[0_0_15px_rgba(159,28,68,0.5)] transition-all hover:scale-105"
            >
              <FaGithub className="size-4" />
            </a>
            <a
              href="https://www.linkedin.com/in/abhay-singh-btech"
              target="_blank"
              rel="noreferrer"
              aria-label="LinkedIn"
              className="hidden sm:flex size-9 items-center justify-center rounded-xl bg-[#1f050d] border border-[#7a1534] text-[#fda4b8] hover:text-white hover:border-[#be2656] hover:shadow-[0_0_15px_rgba(159,28,68,0.5)] transition-all hover:scale-105"
            >
              <FaLinkedin className="size-4" />
            </a>

            {isAuthenticated ? (
              <>
                <Link
                  to="/dashboard"
                  className="glass-btn-secondary text-xs py-2 px-3.5 hidden xs:inline-flex"
                >
                  <LayoutDashboard className="size-3.5 text-[#fb7193]" />
                  Dashboard
                </Link>

                {/* Authenticated Avatar Menu */}
                <div className="relative">
                  <button
                    onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                    className="flex items-center gap-1.5 p-1 rounded-xl bg-[#1f050d] border border-[#7a1534] hover:border-[#be2656] transition-all cursor-pointer shadow-md"
                    aria-expanded={userDropdownOpen}
                    aria-label="User dropdown menu"
                  >
                    <div className="size-8 rounded-lg bg-gradient-to-br from-[#7a1534] to-[#f43f6e] flex items-center justify-center text-white font-bold text-xs">
                      {initials}
                    </div>
                    <ChevronDown className={`size-3.5 text-[#fda4b8] transition-transform ${userDropdownOpen ? "rotate-180" : ""}`} />
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
                    <div className="absolute right-0 top-12 w-52 bg-[#1a040b] rounded-2xl p-2 z-50 border-1.5 border-[#7a1534] shadow-2xl animate-in fade-in zoom-in-95 shadow-[#120307]">
                      <div className="px-3 py-2 border-b border-[#581026] mb-1">
                        <p className="text-xs font-bold text-white truncate">
                          {displayName || "Guardian"}
                        </p>
                        <p className="text-[0.65rem] text-[#fda4b8] truncate font-mono-code">
                          {user?.email}
                        </p>
                      </div>
                      <Link
                        to="/profile"
                        onClick={() => setUserDropdownOpen(false)}
                        className="flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-semibold text-[#ffe4e9] hover:text-white hover:bg-[#3c0b1a] transition-colors"
                      >
                        <User className="size-3.5 text-[#fb7193]" />
                        Profile
                      </Link>
                      <Link
                        to="/settings"
                        onClick={() => setUserDropdownOpen(false)}
                        className="flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-semibold text-[#ffe4e9] hover:text-white hover:bg-[#3c0b1a] transition-colors"
                      >
                        <Settings className="size-3.5 text-[#fb7193]" />
                        Settings &amp; 2FA
                      </Link>
                      <div className="my-1 border-t border-[#581026]" />
                      <button
                        onClick={() => {
                          setUserDropdownOpen(false);
                          logout();
                        }}
                        className="w-full flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-semibold text-rose-300 hover:text-white hover:bg-rose-950 transition-colors cursor-pointer"
                      >
                        <LogOut className="size-3.5 text-rose-400" />
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
                  className="glass-btn-ghost text-xs py-2 px-3.5"
                >
                  <LogIn className="size-3.5 text-[#fb7193]" />
                  <span className="hidden sm:inline">Sign In</span>
                </Link>
                <Link
                  to="/register"
                  className="glass-btn-primary text-xs py-2 px-3.5"
                >
                  <Sparkles className="size-3.5" />
                  <span>Open Vault</span>
                </Link>
              </>
            )}

            {/* Mobile hamburger */}
            <button
              onClick={() => setMobileOpen(true)}
              className="md:hidden ml-1 flex items-center justify-center size-9 rounded-xl bg-[#1f050d] border border-[#7a1534] text-[#fda4b8] hover:text-white transition-colors"
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
          className="fixed inset-0 z-[60] bg-[#120307]/80 backdrop-blur-sm md:hidden"
          onClick={() => setMobileOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Mobile Slide-out Drawer */}
      <div
        className={`fixed top-0 right-0 z-[70] h-full w-72 max-w-[85vw] bg-[#1a040b] border-l-2 border-[#7a1534] shadow-2xl flex flex-col transition-transform duration-300 ease-in-out md:hidden ${
          mobileOpen ? "translate-x-0" : "translate-x-full"
        }`}
        aria-label="Mobile navigation"
      >
        {/* Drawer Header */}
        <div className="flex items-center justify-between p-4 border-b border-[#581026]">
          <div className="flex items-center gap-2.5">
            <div className="size-8 rounded-xl bg-gradient-to-br from-[#7a1534] via-[#be2656] to-[#f43f6e] border border-[#be2656] flex items-center justify-center text-white">
              <ShieldCheck className="size-4.5" />
            </div>
            <span className="text-base font-extrabold text-white">PASS<span className="text-[#fb7193]">GUARDIAN</span></span>
          </div>
          <button
            onClick={() => setMobileOpen(false)}
            className="size-8 rounded-lg bg-[#240610] border border-[#7a1534] flex items-center justify-center text-[#fda4b8] hover:text-white"
            aria-label="Close navigation"
          >
            <X className="size-4" />
          </button>
        </div>

        {/* Nav Links */}
        <nav className="flex flex-col p-4 gap-1.5 flex-1 overflow-y-auto">
          <p className="text-[0.62rem] font-mono-code font-bold uppercase tracking-widest text-[#fda4b8] px-2 mb-1">
            Navigate
          </p>
          {navItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              onClick={() => setMobileOpen(false)}
              className="flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-bold text-[#ffe4e9] hover:text-white hover:bg-[#3c0b1a] transition-all"
            >
              {item.label}
            </a>
          ))}

          <div className="my-2 border-t border-[#581026]" />

          {/* Social Links in drawer */}
          <p className="text-[0.62rem] font-mono-code font-bold uppercase tracking-widest text-[#fda4b8] px-2 mb-1">
            Connect
          </p>
          <a
            href="https://github.com/Abhay2110s/PassGaurdian"
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-3 px-3.5 py-2 rounded-xl text-xs font-semibold text-[#fda4b8] hover:text-white hover:bg-[#3c0b1a] transition-all"
          >
            <FaGithub className="size-4 text-[#fb7193]" />
            GitHub
          </a>
          <a
            href="https://www.linkedin.com/in/abhay-singh-btech"
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-3 px-3.5 py-2 rounded-xl text-xs font-semibold text-[#fda4b8] hover:text-white hover:bg-[#3c0b1a] transition-all"
          >
            <FaLinkedin className="size-4 text-[#fb7193]" />
            LinkedIn
          </a>
        </nav>

        {/* Drawer Footer — Auth & User Actions */}
        <div className="p-4 border-t border-[#581026] space-y-2">
          {isAuthenticated ? (
            <div className="space-y-2">
              <div className="p-2.5 rounded-xl bg-[#20050e] border border-[#7a1534] flex items-center gap-2.5">
                <div className="size-8 rounded-lg bg-gradient-to-br from-[#7a1534] to-[#f43f6e] text-white flex items-center justify-center text-xs font-bold">
                  {initials}
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-xs font-bold text-white truncate">
                    {displayName || "Guardian"}
                  </p>
                  <p className="text-[0.62rem] text-[#fda4b8] truncate font-mono-code">
                    {user?.email}
                  </p>
                </div>
              </div>

              <Link
                to="/dashboard"
                onClick={() => setMobileOpen(false)}
                className="glass-btn-primary w-full text-xs py-2.5 justify-center"
              >
                <LayoutDashboard className="size-3.5" />
                Dashboard
              </Link>

              {/* Profile & Settings Buttons */}
              <div className="grid grid-cols-2 gap-2">
                <Link
                  to="/profile"
                  onClick={() => setMobileOpen(false)}
                  className="glass-btn-secondary text-[0.7rem] py-2 justify-center"
                >
                  <User className="size-3 text-[#fb7193]" />
                  Profile
                </Link>
                <Link
                  to="/settings"
                  onClick={() => setMobileOpen(false)}
                  className="glass-btn-secondary text-[0.7rem] py-2 justify-center"
                >
                  <Settings className="size-3 text-[#fb7193]" />
                  Settings
                </Link>
              </div>

              {/* Mobile Logout Button */}
              <button
                onClick={() => {
                  setMobileOpen(false);
                  logout();
                }}
                className="w-full flex items-center justify-center gap-2 p-2 rounded-xl bg-rose-950 text-rose-300 hover:text-white border border-rose-500/40 text-xs font-semibold cursor-pointer"
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
                className="glass-btn-secondary w-full text-xs py-2.5 justify-center"
              >
                <LogIn className="size-3.5 text-[#fb7193]" />
                Sign In
              </Link>
              <Link
                to="/register"
                onClick={() => setMobileOpen(false)}
                className="glass-btn-primary w-full text-xs py-2.5 justify-center"
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

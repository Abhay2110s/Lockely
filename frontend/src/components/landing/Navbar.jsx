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
      <header className={`sticky top-0 z-50 transition-all duration-200 ${scrolled
          ? "bg-[#FDFBF7]/90 backdrop-blur-md border-b border-[#E6E0D5] py-2.5 shadow-xs"
          : "bg-transparent border-b border-[#E6E0D5]/60 py-3.5"
        }`}>
        <div className="max-w-7xl mx-auto flex items-center justify-between px-4 sm:px-6">
          {/* Left: Brand Logo */}
          <div className="flex items-center gap-6">
            <Link to="/" className="flex items-center gap-3 group" onClick={() => setMobileOpen(false)}>
              {/* Medallion Avatar with Rounded Border */}
              <div className="size-10 rounded-2xl bg-blush/30 border border-[#E6E0D5] group-hover:border-[#8B263E] flex items-center justify-center text-[#8B263E] transition-colors shadow-xs">
                <ShieldCheck className="size-5" />
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-extrabold tracking-tight text-[#1a1a1a] leading-tight">
                  PASS<span className="text-[#8B263E]">GUARDIAN</span>
                </span>
                <span className="text-[0.62rem] text-[#6B6560] tracking-widest uppercase font-semibold hidden xs:block">
                  Zero-Knowledge Vault
                </span>
              </div>
            </Link>

            {/* Desktop Nav Links */}
            <nav className="hidden md:flex items-center gap-1 pl-6 border-l border-[#E6E0D5]">
              {navItems.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  className="px-3.5 py-1.5 rounded-full text-xs font-bold text-[#6B6560] hover:text-[#8B263E] hover:bg-blush/20 transition-colors uppercase tracking-wider"
                >
                  {item.label}
                </a>
              ))}
            </nav>
          </div>

          {/* Right: Auth Actions & User Menu */}
          <div className="flex items-center gap-2.5">
            {isAuthenticated ? (
              <>
                <Link
                  to="/dashboard"
                  className="glass-btn-secondary text-xs py-2 px-4 hidden xs:inline-flex"
                >
                  <LayoutDashboard className="size-3.5 text-[#8B263E]" />
                  Dashboard
                </Link>

                {/* Authenticated Avatar Menu */}
                <div className="relative">
                  <button
                    onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                    className="flex items-center gap-1.5 p-1 pr-2 rounded-full bg-white border border-[#E6E0D5] hover:border-[#8B263E] transition-colors cursor-pointer shadow-xs"
                    aria-expanded={userDropdownOpen}
                    aria-label="User dropdown menu"
                  >
                    <div className="size-8 rounded-full bg-blush/40 text-[#8B263E] flex items-center justify-center font-bold text-xs">
                      {initials}
                    </div>
                    <ChevronDown className={`size-3.5 text-[#6B6560] transition-transform duration-150 ${userDropdownOpen ? "rotate-180" : ""}`} />
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
                    <div className="absolute right-0 top-12 w-56 bg-white p-2 z-50 rounded-2xl border border-[#E6E0D5] shadow-xl">
                      <div className="px-3 py-2 border-b border-[#E6E0D5] mb-1">
                        <p className="text-xs font-bold text-[#1a1a1a] truncate">
                          {displayName || "Guardian"}
                        </p>
                        <p className="text-[0.65rem] text-[#6B6560] truncate font-mono-code">
                          {user?.email}
                        </p>
                      </div>
                      <Link
                        to="/profile"
                        onClick={() => setUserDropdownOpen(false)}
                        className="flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-semibold text-[#1a1a1a] hover:bg-blush/25 hover:text-[#8B263E] transition-colors uppercase tracking-wider"
                      >
                        <User className="size-3.5 text-[#8B263E]" />
                        Profile
                      </Link>
                      <Link
                        to="/settings"
                        onClick={() => setUserDropdownOpen(false)}
                        className="flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-semibold text-[#1a1a1a] hover:bg-blush/25 hover:text-[#8B263E] transition-colors uppercase tracking-wider"
                      >
                        <Settings className="size-3.5 text-[#8B263E]" />
                        Settings &amp; 2FA
                      </Link>
                      <div className="my-1 border-t border-[#E6E0D5]" />
                      <button
                        onClick={() => {
                          setUserDropdownOpen(false);
                          logout();
                        }}
                        className="w-full flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-semibold text-rose-600 hover:bg-rose-50 transition-colors cursor-pointer uppercase tracking-wider"
                      >
                        <LogOut className="size-3.5 text-rose-600" />
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
                  className="glass-btn-ghost text-xs py-2 px-4"
                >
                  <LogIn className="size-3.5 text-[#8B263E]" />
                  <span className="hidden sm:inline">Sign In</span>
                </Link>
                <Link
                  to="/register"
                  className="glass-btn-primary text-xs py-2 px-4"
                >
                  <Sparkles className="size-3.5" />
                  <span>Open Vault</span>
                </Link>
              </>
            )}

            {/* Mobile hamburger */}
            <button
              onClick={() => setMobileOpen(true)}
              className="md:hidden ml-1 flex items-center justify-center size-9 rounded-xl bg-white border border-[#E6E0D5] text-[#1a1a1a] hover:text-[#8B263E] transition-colors"
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
          className="fixed inset-0 z-[60] bg-black/30 backdrop-blur-xs md:hidden"
          onClick={() => setMobileOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Mobile Slide-out Drawer */}
      <div
        className={`fixed top-0 right-0 z-[70] h-full w-72 max-w-[85vw] bg-[#FDFBF7] border-l border-[#E6E0D5] flex flex-col transition-transform duration-200 ease-in-out md:hidden ${mobileOpen ? "translate-x-0" : "translate-x-full"
          }`}
        aria-label="Mobile navigation"
      >
        {/* Drawer Header */}
        <div className="flex items-center justify-between p-4 border-b border-[#E6E0D5]">
          <div className="flex items-center gap-2.5">
            <div className="size-8 rounded-xl bg-blush/30 border border-[#E6E0D5] flex items-center justify-center text-[#8B263E]">
              <ShieldCheck className="size-4.5" />
            </div>
            <span className="text-base font-extrabold text-[#1a1a1a]">PASS<span className="text-[#8B263E]">GUARDIAN</span></span>
          </div>
          <button
            onClick={() => setMobileOpen(false)}
            className="size-8 rounded-lg bg-white border border-[#E6E0D5] flex items-center justify-center text-[#6B6560] hover:text-[#1a1a1a]"
            aria-label="Close navigation"
          >
            <X className="size-4" />
          </button>
        </div>

        {/* Nav Links */}
        <nav className="flex flex-col p-4 gap-1.5 flex-1 overflow-y-auto">
          <p className="text-[0.62rem] font-bold uppercase tracking-widest text-[#6B6560] px-2 mb-1">
            Navigate
          </p>
          {navItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              onClick={() => setMobileOpen(false)}
              className="flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-bold text-[#1a1a1a] hover:text-[#8B263E] hover:bg-blush/20 transition-colors uppercase tracking-wider"
            >
              {item.label}
            </a>
          ))}

          <div className="my-2 border-t border-[#E6E0D5]" />

          {/* Social Links in drawer */}
          <p className="text-[0.62rem] font-bold uppercase tracking-widest text-[#6B6560] px-2 mb-1">
            Connect
          </p>
          <a
            href="https://github.com/Abhay2110s/PassGaurdian"
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-3 px-3.5 py-2 rounded-xl text-xs font-semibold text-[#6B6560] hover:text-[#8B263E] hover:bg-blush/20 transition-colors uppercase tracking-wider"
          >
            <FaGithub className="size-4 text-[#8B263E]" />
            GitHub
          </a>
          <a
            href="https://www.linkedin.com/in/abhay-singh-btech"
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-3 px-3.5 py-2 rounded-xl text-xs font-semibold text-[#6B6560] hover:text-[#8B263E] hover:bg-blush/20 transition-colors uppercase tracking-wider"
          >
            <FaLinkedin className="size-4 text-[#8B263E]" />
            LinkedIn
          </a>
        </nav>

        {/* Drawer Footer — Auth & User Actions */}
        <div className="p-4 border-t border-[#E6E0D5] space-y-2">
          {isAuthenticated ? (
            <div className="space-y-2">
              <div className="p-2.5 rounded-2xl bg-white border border-[#E6E0D5] flex items-center gap-2.5">
                <div className="size-8 rounded-full bg-blush/40 text-[#8B263E] flex items-center justify-center text-xs font-bold">
                  {initials}
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-xs font-bold text-[#1a1a1a] truncate">
                    {displayName || "Guardian"}
                  </p>
                  <p className="text-[0.62rem] text-[#6B6560] truncate font-mono-code">
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
                  <User className="size-3 text-[#8B263E]" />
                  Profile
                </Link>
                <Link
                  to="/settings"
                  onClick={() => setMobileOpen(false)}
                  className="glass-btn-secondary text-[0.7rem] py-2 justify-center"
                >
                  <Settings className="size-3 text-[#8B263E]" />
                  Settings
                </Link>
              </div>

              {/* Mobile Logout Button */}
              <button
                onClick={() => {
                  setMobileOpen(false);
                  logout();
                }}
                className="w-full flex items-center justify-center gap-2 p-2 rounded-xl bg-rose-50 text-rose-700 hover:bg-rose-100 border border-rose-200 text-xs font-semibold cursor-pointer uppercase tracking-wider"
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
                <LogIn className="size-3.5 text-[#8B263E]" />
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

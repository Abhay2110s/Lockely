import { useEffect, useState } from "react";
import { LogIn, ShieldCheck } from "lucide-react";

const navItems = [
  { label: "Features", href: "#features" },
  { label: "Security", href: "#security" },
  { label: "FAQ", href: "#faq" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      className={`
      fixed top-0 left-0 right-0 z-50
      transition-colors duration-300
      ${scrolled ? "bg-[var(--pg-paper)]/95 backdrop-blur-sm" : "bg-transparent"}
      `}
    >
      <div className="max-w-6xl mx-auto px-6">
        <div
          className={`
          flex items-center justify-between
          py-5
          border-b
          transition-colors duration-300
          ${scrolled ? "border-[var(--pg-paper-line)]" : "border-transparent"}
          `}
        >
          {/* Wordmark */}
          <a href="#top" className="flex items-center gap-3 group">
            <span className="relative flex items-center justify-center size-9 rounded-full border border-[var(--pg-ink)] bg-[var(--pg-green)]">
              <ShieldCheck className="size-4" color="var(--pg-paper)" strokeWidth={2} />
            </span>
            <span className="flex flex-col leading-none">
              <span className="pg-serif text-lg text-[var(--pg-ink)] tracking-tight">
                PassGuardian
              </span>
              <span className="pg-mono text-[0.62rem] text-[var(--pg-ink-faint)] tracking-[0.18em] uppercase mt-0.5">
                Est. File No. 0142
              </span>
            </span>
          </a>

          {/* Nav links */}
          <nav className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="pg-mono text-[0.72rem] uppercase tracking-[0.14em] text-[var(--pg-ink-soft)] hover:text-[var(--pg-green)] transition-colors"
              >
                {item.label}
              </a>
            ))}
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-3">
            <a
              href="/login"
              className="hidden sm:flex items-center gap-2 pg-mono text-[0.72rem] uppercase tracking-[0.1em] text-[var(--pg-ink)] hover:text-[var(--pg-green)] transition-colors"
            >
              <LogIn className="size-3.5" />
              Sign in
            </a>
            <a href="/register" className="pg-stamp-btn !py-2.5 !px-4 text-[0.7rem]">
              Open a vault
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

import { useState } from "react";
import { ArrowUpRight, Check, Send, ShieldCheck } from "lucide-react";
import { FaLinkedin, FaGithub } from "react-icons/fa";

const navLinks = [
  { name: "Features",  link: "#features" },
  { name: "Security",  link: "#security" },
  { name: "Sandbox",   link: "#interactive-demo" },
  { name: "FAQ",       link: "#faq" },
];

const socialLinks = [
  { name: "LinkedIn", link: "https://www.linkedin.com/in/abhay-singh-btech", icon: FaLinkedin },
  { name: "GitHub",   link: "https://github.com/Abhay2110s/PassGaurdian",    icon: FaGithub  },
];

export default function Footer() {
  const [email, setEmail]         = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setTimeout(() => setSubscribed(false), 3000);
      setEmail("");
    }
  };

  return (
    <footer className="px-4 py-10 border-t border-white/[0.05] bg-[#030b15]">
      <div className="max-w-6xl mx-auto space-y-8">

        {/* Row 1: Brand & Newsletter */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-6 border-b border-white/[0.05]">
          <div className="flex flex-wrap items-center gap-3">
            <a href="#top" className="flex items-center gap-2.5 group">
              <div className="size-7 bg-[#00d4ff]/10 border border-[#00d4ff]/25 flex items-center justify-center text-[#00d4ff] group-hover:bg-[#00d4ff]/18 transition-colors">
                <ShieldCheck className="size-3.5" />
              </div>
              <span className="ca-display text-lg text-white tracking-tight">PassGuardian</span>
            </a>
            <span className="hidden sm:inline-block text-white/10">·</span>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 border border-[#00ff9d]/15 bg-[#00ff9d]/05 ca-mono text-[0.6rem] text-[#00ff9d]/60 tracking-widest">
              <span className="size-1.5 rounded-full bg-[#00ff9d] animate-pulse" />
              Vault Sealed
            </div>
          </div>

          {/* Newsletter */}
          <form onSubmit={handleSubscribe} className="flex items-center gap-2 w-full md:w-auto">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Your email address..."
              required
              className="ca-mono px-4 py-2 text-[0.62rem] bg-[#040e1c] border border-white/[0.08] text-[#e2eaf8]/60 placeholder:text-[#e2eaf8]/20 w-full md:w-56 focus:outline-none focus:border-[#00d4ff]/30 transition-colors tracking-widest"
            />
            <button
              type="submit"
              className="ca-mono px-4 py-2 bg-[#00d4ff] text-[#030b15] text-[0.62rem] font-bold flex items-center gap-1.5 shrink-0 hover:bg-[#00d4ff]/85 transition-colors tracking-widest"
            >
              {subscribed ? <Check className="size-3" /> : <Send className="size-3" />}
              {subscribed ? "Done" : "Join"}
            </button>
          </form>
        </div>

        {/* Row 2: Links & Social */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <nav className="flex flex-wrap items-center justify-center gap-6">
            {navLinks.map((item) => (
              <a
                key={item.name}
                href={item.link}
                className="ca-mono text-[0.62rem] text-[#e2eaf8]/30 hover:text-[#e2eaf8]/70 transition-colors tracking-widest"
              >
                {item.name}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            {socialLinks.map(({ name, link, icon: Icon }) => (
              <a
                key={name}
                href={link}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-1.5 px-3 py-1.5 border border-white/[0.08] text-[#e2eaf8]/35 hover:text-[#e2eaf8]/80 hover:border-white/20 transition-all ca-mono text-[0.6rem] tracking-widest"
              >
                <Icon className="size-3" />
                {name}
                <ArrowUpRight className="size-2.5 opacity-50" />
              </a>
            ))}
          </div>
        </div>

        {/* Row 3: Bottom strip */}
        <div className="pt-4 border-t border-white/[0.04] flex flex-col sm:flex-row justify-between items-center gap-3">
          <div className="ca-mono text-[0.6rem] text-[#e2eaf8]/25 tracking-widest">
            © {new Date().getFullYear()} PassGuardian — Crafted with Zero-Knowledge Architecture.
          </div>
          <div className="flex items-center gap-2">
            {["AES-256-GCM", "PBKDF2"].map((tag) => (
              <span
                key={tag}
                className="ca-mono text-[0.55rem] px-2 py-0.5 border border-white/[0.06] text-[#e2eaf8]/25 tracking-widest"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

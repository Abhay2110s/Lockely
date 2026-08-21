import { useState } from "react";
import { ArrowUpRight, Check, Send, ShieldCheck } from "lucide-react";
import { FaLinkedin, FaGithub } from "react-icons/fa";

const navLinks = [
  { name: "Features", link: "#features" },
  { name: "Security", link: "#security" },
  { name: "Sandbox", link: "#interactive-demo" },
  { name: "FAQ", link: "#faq" },
];

const socialLinks = [
  {
    name: "LinkedIn",
    link: "https://www.linkedin.com/in/abhay-singh-btech",
    icon: FaLinkedin,
    bg: "bg-[#7dd3fc]",
  },
  {
    name: "GitHub",
    link: "https://github.com/Abhay2110s/PassGaurdian",
    icon: FaGithub,
    bg: "bg-[#ffe066]",
  },
];

export default function Footer() {
  const [email, setEmail] = useState("");
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
    <footer className="ca-grid px-4 py-10 border-t border-[#191510]/15 bg-[#faf6ea]">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Row 1: Brand & Status */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-6 border-b border-[#191510]/15">
          <div className="flex flex-wrap items-center gap-3">
            <a href="#top" className="flex items-center gap-2.5 group">
              <div className="size-9 rounded-full bg-[#ff5e89] border-2 border-white shadow-[1.5px_1.5px_0_rgba(25,21,16,0.25)] text-white flex items-center justify-center">
                <ShieldCheck className="size-5" />
              </div>
              <span className="ca-display text-2xl text-[#191510] tracking-tight">
                PASSGUARDIAN
              </span>
            </a>
            <span className="hidden sm:inline-block text-[#191510]/30">•</span>
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#a7f3d0] border border-[#191510] ca-mono text-xs text-[#191510]">
              <span className="size-2 rounded-full bg-emerald-600 animate-pulse" />
              Vault Sealed 🔒
            </div>
          </div>

          {/* Newsletter Input */}
          <form onSubmit={handleSubscribe} className="flex items-center gap-2 w-full md:w-auto">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Your email address..."
              required
              className="ca-mono px-4 py-2 text-xs bg-white border-2 border-[#191510] shadow-[2px_2px_0_#191510] text-[#191510] placeholder:text-[#191510]/40 w-full md:w-60 focus:outline-none"
            />
            <button
              type="submit"
              className="ca-mono px-4 py-2 bg-[#191510] text-white hover:bg-[#ffe066] hover:text-[#191510] border-2 border-[#191510] shadow-[2px_2px_0_#191510] text-xs font-bold flex items-center gap-1.5 shrink-0 transition-colors"
            >
              {subscribed ? <Check className="size-3.5" /> : <Send className="size-3.5" />}
              {subscribed ? "Done" : "Join"}
            </button>
          </form>
        </div>

        {/* Row 2: Links & Social */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs ca-mono text-[#191510]">
          <nav className="flex flex-wrap items-center justify-center gap-6">
            {navLinks.map((item) => (
              <a
                key={item.name}
                href={item.link}
                className="hover:underline transition-all"
              >
                {item.name}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            {socialLinks.map(({ name, link, icon: Icon, bg }) => (
              <a
                key={name}
                href={link}
                target="_blank"
                rel="noreferrer"
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full border-2 border-[#191510] ${bg} shadow-[2px_2px_0_#191510] hover:-translate-y-0.5 transition-transform text-[#191510]`}
              >
                <Icon className="size-3.5" />
                <span>{name}</span>
                <ArrowUpRight className="size-3 text-[#191510]/60" />
              </a>
            ))}
          </div>
        </div>

        {/* Row 3: Bottom Strip */}
        <div className="pt-4 border-t border-[#191510]/15 flex flex-col sm:flex-row justify-between items-center gap-3 text-xs ca-mono text-[#191510]/70">
          <div>
            © {new Date().getFullYear()} PassGuardian — Crafted with Zero-Knowledge Architecture.
          </div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 bg-[#ffe066] border border-[#191510] text-[#191510] font-bold">
              AES-256-GCM
            </span>
            <span className="px-2.5 py-0.5 bg-[#a7f3d0] border border-[#191510] text-[#191510] font-bold">
              PBKDF2
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}

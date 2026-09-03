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
  },
  {
    name: "GitHub",
    link: "https://github.com/Abhay2110s/PassGaurdian",
    icon: FaGithub,
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
    <footer className="bg-[#0d0a3e] border-t-2 border-[#3F3AA5]/40 px-4 py-12 mt-16 relative shadow-2xl">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Row 1: Brand & Newsletter */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-6 border-b border-[#241C7F]">
          <div className="flex flex-wrap items-center gap-3">
            <a href="#top" className="flex items-center gap-3 group">
              <div className="size-10 rounded-xl bg-gradient-to-br from-[#3F3AA5] via-[#6554DE] to-[#8B7FF0] border border-[#6554DE] text-white flex items-center justify-center shadow-lg shadow-[#3F3AA5]/50 group-hover:scale-105 transition-transform">
                <ShieldCheck className="size-5" />
              </div>
              <span className="text-xl font-extrabold tracking-tight text-white">
                PASS<span className="text-[#FB9660]">GUARDIAN</span>
              </span>
            </a>
            <span className="hidden sm:inline-block text-[#B4ADFA]/40">•</span>
            <div className="glass-badge-emerald">
              <span className="size-2 rounded-full bg-emerald-400 animate-pulse" />
              Vault Sealed 🔒
            </div>
          </div>

          {/* Newsletter Input */}
          <form onSubmit={handleSubscribe} className="flex items-center gap-2 w-full md:w-auto">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Security newsletter email..."
              required
              className="glass-input text-xs py-2.5 px-4 w-full md:w-64 rounded-xl"
            />
            <button
              type="submit"
              className="glass-btn-primary py-2 px-4 text-xs shrink-0"
            >
              {subscribed ? <Check className="size-3.5" /> : <Send className="size-3.5" />}
              <span>{subscribed ? "Subscribed" : "Join"}</span>
            </button>
          </form>
        </div>

        {/* Row 2: Links & Social */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#B4ADFA]">
          <nav className="flex flex-wrap items-center justify-center gap-6">
            {navLinks.map((item) => (
              <a
                key={item.name}
                href={item.link}
                className="hover:text-white font-bold text-[#D5D1FC] transition-colors"
              >
                {item.name}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            {socialLinks.map(({ name, link, icon: Icon }) => (
              <a
                key={name}
                href={link}
                target="_blank"
                rel="noreferrer"
                className="bg-[#120e52] border border-[#3F3AA5]/40 hover:border-[#6554DE] py-1.5 px-3 rounded-full text-xs flex items-center gap-1.5 text-[#D5D1FC] hover:text-white transition-all hover:shadow-[0_0_15px_rgba(101,84,222,0.4)]"
              >
                <Icon className="size-3.5 text-[#8B7FF0]" />
                <span>{name}</span>
                <ArrowUpRight className="size-3 text-[#B4ADFA]" />
              </a>
            ))}
          </div>
        </div>

        {/* Row 3: Bottom Strip */}
        <div className="pt-4 border-t border-[#241C7F] flex flex-col sm:flex-row justify-between items-center gap-3 text-xs text-[#B4ADFA]">
          <div>
            © {new Date().getFullYear()} PassGuardian — Crafted with Zero-Knowledge Architecture.
          </div>
          <div className="flex items-center gap-2">
            <span className="glass-badge-burgundy font-mono-code text-[0.65rem]">
              AES-256-GCM
            </span>
            <span className="landing-badge font-mono-code text-[0.65rem]">
              PBKDF2 (600k)
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}

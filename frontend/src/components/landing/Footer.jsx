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
    <footer className="bg-[#000000] border-t border-[#222222] px-4 py-12 mt-16 relative">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Row 1: Brand & Newsletter */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-6 border-b border-[#222222]">
          <div className="flex flex-wrap items-center gap-3">
            <a href="#top" className="flex items-center gap-3 group">
              <div className="size-10 bg-[#111111] border border-[#222222] group-hover:border-[#00FF66] text-[#00FF66] flex items-center justify-center transition-colors">
                <ShieldCheck className="size-5" />
              </div>
              <span className="text-xl font-extrabold tracking-tight text-[#F8F9FA]">
                PASS<span className="text-[#00FF66]">GUARDIAN</span>
              </span>
            </a>
            <span className="hidden sm:inline-block text-[#6B7280]">•</span>
            <div className="glass-badge-emerald">
              <span className="size-1.5 bg-[#00FF66]" />
              Vault Sealed 🔒
            </div>
          </div>

          {/* Newsletter Input */}
          <form onSubmit={handleSubscribe} className="flex items-center gap-2 w-full md:w-auto">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Security dispatch email..."
              required
              className="glass-input text-xs py-2.5 px-4 w-full md:w-64"
            />
            <button
              type="submit"
              className="glass-btn-primary py-2.5 px-4 text-xs shrink-0"
            >
              {subscribed ? <Check className="size-3.5" /> : <Send className="size-3.5" />}
              <span>{subscribed ? "Subscribed" : "Subscribe"}</span>
            </button>
          </form>
        </div>

        {/* Row 2: Links & Social */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#6B7280]">
          <nav className="flex flex-wrap items-center justify-center gap-6 font-mono-code uppercase tracking-wider">
            {navLinks.map((item) => (
              <a
                key={item.name}
                href={item.link}
                className="hover:text-[#00FF66] font-bold text-[#F8F9FA] transition-colors"
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
                className="bg-[#111111] border border-[#222222] hover:border-[#00FF66] py-1.5 px-3 text-xs flex items-center gap-1.5 text-[#F8F9FA] hover:text-[#00FF66] transition-colors uppercase font-mono-code"
              >
                <Icon className="size-3.5 text-[#00FF66]" />
                <span>{name}</span>
                <ArrowUpRight className="size-3 text-[#6B7280]" />
              </a>
            ))}
          </div>
        </div>

        {/* Row 3: Bottom Strip */}
        <div className="pt-4 border-t border-[#222222] flex flex-col sm:flex-row justify-between items-center gap-3 text-xs text-[#6B7280] font-mono-code">
          <div>
            © {new Date().getFullYear()} PassGuardian — High-Contrast Brutalist Architecture.
          </div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-1 text-[0.65rem] bg-[#111111] border border-[#222222] text-[#F8F9FA] uppercase tracking-wider">
              AES-256-GCM
            </span>
            <span className="px-2.5 py-1 text-[0.65rem] bg-[#111111] border border-[#00FF66] text-[#00FF66] uppercase tracking-wider">
              PBKDF2 (600k)
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}

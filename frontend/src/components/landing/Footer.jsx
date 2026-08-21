import { useState } from "react";
import { ArrowUpRight, Check, Mail, Send, ShieldCheck, Heart } from "lucide-react";
import { FaLinkedin } from "react-icons/fa";

const navLinks = [
  { name: "Features", link: "#features" },
  { name: "Security Architecture", link: "#security" },
  { name: "Interactive Sandbox", link: "#interactive-demo" },
  { name: "FAQ", link: "#faq" },
];

const socialLinks = [
  {
    name: "LinkedIn",
    link: "https://www.linkedin.com/in/abhay-singh-btech",
    icon: FaLinkedin,
  },
  {
    name: "Email",
    link: "mailto:abhaysingh14922@gmail.com",
    icon: Mail,
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
    <footer className="px-6 py-10 border-t-3 border-[#18181b] bg-[#fffef7] font-comic">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Row 1: Brand & Status */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-6 border-b-2.5 border-[#18181b]">
          <div className="flex flex-wrap items-center gap-4">
            <a href="#top" className="flex items-center gap-2.5 group">
              <div className="size-10 rounded-2xl bg-[#6366f1] border-2 border-[#18181b] text-white flex items-center justify-center shadow-[2px_2px_0px_#18181b] group-hover:rotate-6 transition-transform">
                <ShieldCheck className="size-5.5" />
              </div>
              <span className="font-heading-comic font-black text-xl text-slate-950 tracking-tight">
                PassGuardian
              </span>
            </a>
            <span className="hidden sm:inline-block text-slate-300">•</span>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#bbf7d0] border border-[#18181b] text-xs font-heading-comic font-bold text-slate-950">
              <span className="size-2 rounded-full bg-emerald-600 animate-pulse" />
              Vault Active &amp; Sealed 🔒
            </div>
          </div>

          {/* Newsletter Input */}
          <form onSubmit={handleSubscribe} className="flex items-center gap-2 w-full md:w-auto">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email..."
              required
              className="comic-input !py-2 !px-4 text-xs font-comic font-bold text-slate-950 w-full md:w-64"
            />
            <button
              type="submit"
              className="btn-comic btn-comic-yellow !py-2 !px-4 text-xs gap-1.5 shrink-0"
            >
              {subscribed ? <Check className="size-3.5" /> : <Send className="size-3.5" />}
              {subscribed ? "Subscribed!" : "Subscribe"}
            </button>
          </form>
        </div>

        {/* Row 2: Links & Social */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-heading-comic font-bold text-slate-800">
          <nav className="flex flex-wrap items-center justify-center gap-6">
            {navLinks.map((item) => (
              <a
                key={item.name}
                href={item.link}
                className="hover:text-indigo-700 hover:underline transition-colors"
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
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border-2 border-[#18181b] bg-[#faf6ea] hover:bg-[#bae6fd] shadow-[2px_2px_0px_#18181b] transition-all text-slate-950"
              >
                <Icon className="size-3.5 text-[#6366f1]" />
                <span>{name}</span>
                <ArrowUpRight className="size-3 text-slate-600" />
              </a>
            ))}
          </div>
        </div>

        {/* Row 3: Bottom Strip */}
        <div className="pt-4 border-t-2 border-[#18181b] flex flex-col sm:flex-row justify-between items-center gap-3 text-xs font-comic font-bold text-slate-700">
          <div>
            © {new Date().getFullYear()} PassGuardian — Crafted with Zero-Knowledge Security.
          </div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-md bg-[#fef08a] border border-[#18181b] font-mono text-[0.7rem] font-black text-slate-950">
              AES-256-GCM
            </span>
            <span className="px-2.5 py-0.5 rounded-md bg-[#bbf7d0] border border-[#18181b] font-mono text-[0.7rem] font-black text-slate-950">
              PBKDF2
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}

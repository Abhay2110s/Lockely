import { useState } from "react";
import { ArrowUpRight, Check, Mail, Send, ShieldCheck } from "lucide-react";
import { FaLinkedin } from "react-icons/fa";
import ScrollReveal from "@/components/animations/ScrollReveal";

const navLinks = [
  { name: "Features", link: "#features" },
  { name: "Security Architecture", link: "#security" },
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
    <footer className="px-6 py-8 md:py-10 border-t border-slate-200/80 bg-white/80 backdrop-blur-md relative">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Row 1: Compact Brand & Live Status + Inline Newsletter Input */}
        <ScrollReveal direction="up" delay={0.1}>
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-6 border-b border-slate-200/70">
            {/* Brand & Live Operational Pill */}
            <div className="flex flex-wrap items-center gap-4">
              <a href="#top" className="flex items-center gap-2.5 group">
                <div className="flex items-center justify-center size-9 rounded-xl bg-indigo-600 text-white shadow-xs group-hover:scale-105 transition-transform">
                  <ShieldCheck className="size-5" />
                </div>
                <span className="font-bold text-lg text-slate-900 tracking-tight">
                  PassGuardian
                </span>
              </a>
              <span className="hidden sm:inline-block text-slate-300">•</span>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200/80 text-[0.72rem] font-semibold text-emerald-700">
                <span className="size-1.5 rounded-full bg-emerald-500 animate-pulse" />
                Operational & Sealed
              </div>
            </div>

            {/* Compact Inline Bulletin Subscription Form */}
            <form onSubmit={handleSubscribe} className="flex items-center gap-2 w-full md:w-auto">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Subscribe to security updates..."
                required
                className="w-full md:w-64 px-3.5 py-2 rounded-full bg-slate-50 border border-slate-200 text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-indigo-500 shadow-xs"
              />
              <button
                type="submit"
                className="btn-soft-primary !py-2 !px-4 text-xs font-bold flex items-center gap-1.5 shrink-0 shadow-xs"
              >
                {subscribed ? (
                  <>
                    <Check className="size-3.5" /> Done
                  </>
                ) : (
                  <>
                    <Send className="size-3" /> Join
                  </>
                )}
              </button>
            </form>
          </div>
        </ScrollReveal>

        {/* Row 2: Streamlined Horizontal Navigation & Social Triggers */}
        <ScrollReveal direction="up" delay={0.15}>
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 py-2 text-xs font-semibold text-slate-600">
            {/* Quick Links */}
            <nav className="flex flex-wrap items-center justify-center gap-6">
              {navLinks.map((item) => (
                <a
                  key={item.name}
                  href={item.link}
                  className="hover:text-indigo-600 transition-colors"
                >
                  {item.name}
                </a>
              ))}
            </nav>

            {/* Social Triggers */}
            <div className="flex items-center gap-3">
              {socialLinks.map(({ name, link, icon: Icon }) => (
                <a
                  key={name}
                  href={link}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-slate-200/80 bg-slate-50/70 hover:bg-white hover:border-indigo-300 hover:text-indigo-600 text-slate-700 transition-all shadow-xs"
                >
                  <Icon className="size-3.5 text-indigo-600" />
                  <span>{name}</span>
                  <ArrowUpRight className="size-3 text-slate-400" />
                </a>
              ))}
            </div>
          </div>
        </ScrollReveal>

        {/* Row 3: Compact Bottom Strip */}
        <ScrollReveal direction="up" delay={0.2}>
          <div className="pt-4 border-t border-slate-200/70 flex flex-col sm:flex-row justify-between items-center gap-3 text-[0.72rem] font-mono text-slate-500">
            <div>
              © {new Date().getFullYear()} PassGuardian — All Rights Reserved.
            </div>
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-700 font-bold">
                AES-256-GCM
              </span>
              <span className="px-2 py-0.5 rounded-full bg-emerald-50 border border-emerald-100 text-emerald-700 font-bold">
                Zero Knowledge
              </span>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </footer>
  );
}

import { ArrowUpRight, ShieldCheck } from "lucide-react";
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
    link: "https://github.com/Abhay2110s/Lockely",
    icon: FaGithub,
  },
];

export default function Footer() {
  return (
    <footer className="bg-[#FDFBF7] border-t border-[#E6E0D5] px-4 py-12 mt-16 relative">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Row 1: Brand */}
        <div className="flex flex-wrap items-center justify-center gap-3 pb-6 border-b border-[#E6E0D5]">
          <a href="#top" className="flex items-center gap-3 group">
            <div className="size-10 rounded-2xl bg-blush/30 border border-[#E6E0D5] group-hover:border-[#8B263E] text-[#8B263E] flex items-center justify-center transition-colors shadow-xs">
              <ShieldCheck className="size-5" />
            </div>
            <span className="text-xl font-extrabold tracking-tight text-[#1a1a1a]">
              PASS<span className="text-[#8B263E]">GUARDIAN</span>
            </span>
          </a>
          <span className="hidden sm:inline-block text-[#6B6560]">•</span>
          <div className="glass-badge-emerald rounded-full">
            <span className="size-1.5 rounded-full bg-emerald-600" />
            Vault Sealed 🔒
          </div>
        </div>

        {/* Row 2: Links & Social */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#6B6560]">
          <nav className="flex flex-wrap items-center justify-center gap-6 uppercase tracking-wider font-semibold">
            {navLinks.map((item) => (
              <a
                key={item.name}
                href={item.link}
                className="hover:text-[#8B263E] font-bold text-[#1a1a1a] transition-colors"
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
                className="rounded-full bg-white border border-[#E6E0D5] hover:border-[#8B263E] py-1.5 px-3.5 text-xs flex items-center gap-1.5 text-[#1a1a1a] hover:text-[#8B263E] transition-colors uppercase font-medium shadow-xs"
              >
                <Icon className="size-3.5 text-[#8B263E]" />
                <span>{name}</span>
                <ArrowUpRight className="size-3 text-[#6B6560]" />
              </a>
            ))}
          </div>
        </div>

        {/* Row 3: Bottom Strip */}
        <div className="pt-4 border-t border-[#E6E0D5] flex flex-col sm:flex-row justify-between items-center gap-3 text-xs text-[#6B6560]">
          <div>
            © {new Date().getFullYear()} Lockely — High-End Zero-Knowledge Architecture.
          </div>
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 text-[0.68rem] rounded-full bg-white border border-[#E6E0D5] text-[#1a1a1a] font-bold uppercase tracking-wider shadow-xs">
              AES-256-GCM
            </span>
            <span className="px-3 py-1 text-[0.68rem] rounded-full bg-blush/35 border border-[#E6E0D5] text-[#8B263E] font-bold uppercase tracking-wider shadow-xs">
              PBKDF2 (600k)
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}

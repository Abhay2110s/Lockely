import { ArrowUpRight, Mail, ShieldCheck } from "lucide-react";
import { FaLinkedin } from "react-icons/fa";

const productLinks = [
  { name: "Features", link: "#features" },
  { name: "Security", link: "#security" },
  { name: "FAQ", link: "#faq" },
];

const connectLinks = [
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
  return (
    <footer className="px-6 pt-20 pb-10 border-t border-[var(--pg-paper-line)]">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-[1.3fr_1fr_1fr] gap-12">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3">
              <span className="flex items-center justify-center size-9 rounded-full border border-[var(--pg-ink)] bg-[var(--pg-green)]">
                <ShieldCheck className="size-4" color="var(--pg-paper)" />
              </span>
              <span className="pg-serif text-xl text-[var(--pg-ink)]">
                PassGuardian
              </span>
            </div>

            <p className="mt-5 max-w-sm text-sm leading-6 text-[var(--pg-ink-soft)]">
              A sealed ledger for your credentials — generated, encrypted,
              and audited so your identity stays yours.
            </p>
          </div>

          {/* Product */}
          <div>
            <h3 className="pg-mono text-[0.68rem] uppercase tracking-[0.16em] text-[var(--pg-ink-faint)] mb-5">
              Contents
            </h3>
            <ul className="space-y-3">
              {productLinks.map((item) => (
                <li key={item.name}>
                  <a
                    href={item.link}
                    className="text-sm text-[var(--pg-ink-soft)] hover:text-[var(--pg-green)] transition-colors"
                  >
                    {item.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Connect */}
          <div>
            <h3 className="pg-mono text-[0.68rem] uppercase tracking-[0.16em] text-[var(--pg-ink-faint)] mb-5">
              Correspondence
            </h3>
            <div className="space-y-3">
              {connectLinks.map(({ name, link, icon: Icon }) => (
                <a
                  key={name}
                  href={link}
                  target="_blank"
                  rel="noreferrer"
                  className="group flex items-center justify-between border border-[var(--pg-paper-line)] px-4 py-2.5 text-sm text-[var(--pg-ink)] hover:border-[var(--pg-green)] transition-colors"
                >
                  <span className="flex items-center gap-3">
                    <Icon className="size-4 text-[var(--pg-green)]" />
                    {name}
                  </span>
                  <ArrowUpRight className="size-3.5 opacity-0 group-hover:opacity-100 transition-opacity" />
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-14 pg-rule-double pt-5 flex flex-col md:flex-row justify-between gap-3 pg-mono text-[0.68rem] uppercase tracking-[0.1em] text-[var(--pg-ink-faint)]">
          <span>© {new Date().getFullYear()} PassGuardian — File remains open</span>
          <span>Sealed with AES-256-GCM</span>
        </div>
      </div>
    </footer>
  );
}


import { ArrowUpRight, Mail, ShieldCheck, Heart } from "lucide-react";
import { FaLinkedin } from "react-icons/fa";
import { motion } from "framer-motion";

const productLinks = [
  {
    name: "Features",
    link: "#features",
  },
  {
    name: "Security",
    link: "#security",
  },
  {
    name: "FAQ",
    link: "#faq",
  },
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
    <footer className="border-t border-[var(--pg-paper-line)] bg-[var(--pg-paper)]">
      <div className="mx-auto max-w-7xl px-6 py-14 lg:px-8">

        {/* Main Footer */}
        <div className="grid gap-12 md:grid-cols-3">

          {/* Brand */}
          <div>
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center border border-[var(--pg-green)]">
                <ShieldCheck
                  className="h-5 w-5 text-[var(--pg-green)]"
                  strokeWidth={1.8}
                />
              </div>

              <span className="text-lg font-semibold text-[var(--pg-ink)]">
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
            <h3 className="pg-mono mb-5 text-[0.68rem] uppercase tracking-[0.16em] text-[var(--pg-ink-faint)]">
              Contents
            </h3>

            <ul className="space-y-3">
              {productLinks.map((item) => (
                <li key={item.name}>
                  <a
                    href={item.link}
                    className="text-sm text-[var(--pg-ink-soft)] transition-colors hover:text-[var(--pg-green)]"
                  >
                    {item.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Connect */}
          <div>
            <h3 className="pg-mono mb-5 text-[0.68rem] uppercase tracking-[0.16em] text-[var(--pg-ink-faint)]">
              Correspondence
            </h3>

            <div className="space-y-3">
              {connectLinks.map((item) => {
                const Icon = item.icon;

                return (
                  <a
                    key={item.name}
                    href={item.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center justify-between border border-[var(--pg-paper-line)] px-4 py-2.5 text-sm text-[var(--pg-ink)] transition-colors hover:border-[var(--pg-green)]"
                  >
                    <span className="flex items-center gap-3">
                      <Icon
                        className="h-4 w-4 text-[var(--pg-green)]"
                      />

                      {item.name}
                    </span>

                    <ArrowUpRight
                      className="h-3.5 w-3.5 opacity-0 transition-opacity group-hover:opacity-100"
                    />
                  </a>
                );
              })}
            </div>
          </div>
        </div>

        {/* Bottom Divider */}
        <div className="pg-rule-double mt-14 pt-5">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">

            {/* Copyright */}
            <span className="pg-mono text-[0.68rem] uppercase tracking-[0.1em] text-[var(--pg-ink-faint)]">
              © {new Date().getFullYear()} PassGuardian — File remains open
            </span>

            {/* Built With */}
            <span className="pg-mono flex items-center gap-2 text-[0.68rem] uppercase tracking-[0.1em] text-[var(--pg-ink-faint)]">
              Built with

              <motion.span
                animate={{
                  scale: [1, 1.18, 1],
                }}
                transition={{
                  duration: 1.8,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="inline-flex"
              >
                <Heart
                  className="h-4 w-4 fill-[#F43F5E] text-[#F43F5E]"
                  strokeWidth={2.5}
                />
              </motion.span>

              Secured by design
            </span>

            {/* Encryption */}
            <span className="pg-mono text-[0.68rem] uppercase tracking-[0.1em] text-[var(--pg-ink-faint)]">
              Sealed with AES-256-GCM
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}

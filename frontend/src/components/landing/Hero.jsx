import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

import SealMedallion from "./SealMedallion";

const fields = [
  { label: "Cipher", value: "AES-256-GCM" },
  { label: "Knowledge", value: "Zero-knowledge" },
  { label: "Status", value: "Unbreached" },
];

export default function Hero() {
  return (
    <section id="top" className="relative px-6 pt-36 pb-24 md:pt-44 md:pb-32">
      <div className="max-w-6xl mx-auto grid md:grid-cols-[1.15fr_0.85fr] gap-16 items-center">
        {/* Left — headline */}
        <div>
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="pg-tab"
          >
            <span className="size-1.5 rounded-full bg-[var(--pg-green)]" />
            File opened for new registrants
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.6 }}
            className="pg-serif mt-8 text-5xl md:text-[4.2rem] leading-[1.04] tracking-tight text-[var(--pg-ink)]"
          >
            Every password
            <br />
            <span className="italic font-normal text-[var(--pg-green)]">
              notarized,
            </span>{" "}
            never exposed.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.22, duration: 0.6 }}
            className="mt-7 max-w-lg text-[1.05rem] leading-8 text-[var(--pg-ink-soft)]"
          >
            PassGuardian keeps a sealed ledger of your credentials —
            generated, encrypted, and audited the way a bank keeps a vault:
            nothing readable ever leaves your hands.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.34, duration: 0.6 }}
            className="mt-9 flex flex-wrap items-center gap-5"
          >
            <a href="/register" className="pg-stamp-btn">
              Open a vault
              <ArrowRight className="size-4" />
            </a>
            <a
              href="#security"
              className="pg-mono text-[0.75rem] uppercase tracking-[0.12em] text-[var(--pg-ink)] border-b border-[var(--pg-ink)] pb-0.5 hover:text-[var(--pg-green)] hover:border-[var(--pg-green)] transition-colors"
            >
              Read the certificate
            </a>
          </motion.div>

          {/* Ledger meta strip */}
          <motion.dl
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="mt-14 grid grid-cols-3 max-w-md pg-rule-double pt-4"
          >
            {fields.map((f) => (
              <div key={f.label} className="pr-4">
                <dt className="pg-mono text-[0.6rem] uppercase tracking-[0.16em] text-[var(--pg-ink-faint)]">
                  {f.label}
                </dt>
                <dd className="pg-mono text-[0.82rem] mt-1 text-[var(--pg-ink)]">
                  {f.value}
                </dd>
              </div>
            ))}
          </motion.dl>
        </div>

        {/* Right — signature seal */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, duration: 0.8, ease: "easeOut" }}
          className="relative flex items-center justify-center"
        >
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="size-[300px] rounded-full bg-[var(--pg-green)]/5 blur-2xl" />
          </div>
          <SealMedallion size={320} className="relative max-w-full h-auto" />

          <motion.div
            initial={{ opacity: 0, scale: 0.6, rotate: -24 }}
            animate={{ opacity: 0.85, scale: 1, rotate: -12 }}
            transition={{ delay: 0.9, duration: 0.5, type: "spring" }}
            className="pg-stamp-mark absolute -bottom-2 -left-2 size-20 md:size-24"
          >
            <div className="text-center leading-tight">
              <span className="block text-[0.55rem] tracking-[0.12em]">Verified</span>
              <span className="block text-[0.9rem] font-semibold my-0.5">✓</span>
              <span className="block text-[0.5rem] tracking-[0.1em]">AG · 256</span>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

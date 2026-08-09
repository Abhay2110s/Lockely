import { motion } from "framer-motion";
import {
  CheckCircle,
  Database,
  EyeOff,
  LockKeyhole,
  ShieldCheck,
} from "lucide-react";

import SealMedallion from "./SealMedallion";

const principles = [
  {
    icon: EyeOff,
    title: "Secure password handling",
    desc: "Analysis happens without your plaintext password ever being written to disk or sent onward.",
  },
  {
    icon: Database,
    title: "Minimal data collection",
    desc: "We process only what's needed to keep your vault working — nothing is gathered for its own sake.",
  },
  {
    icon: LockKeyhole,
    title: "AES-256-GCM at rest",
    desc: "Every vault entry is encrypted with authenticated, industry-standard encryption before it's stored.",
  },
];

const clauses = [
  "Privacy protected",
  "Threat analysis on request",
  "Encrypted at rest and in transit",
];

export default function Security() {
  return (
    <section id="security" className="relative px-6 py-28 bg-[var(--pg-paper-deep)]">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-2xl mx-auto"
        >
          <div className="pg-tab mx-auto">Certificate of security</div>
          <h2 className="pg-serif mt-6 text-4xl md:text-5xl tracking-tight text-[var(--pg-ink)]">
            Built for privacy, on the record
          </h2>
          <p className="mt-4 text-lg leading-8 text-[var(--pg-ink-soft)]">
            Not a promise — an architecture. Here's exactly what protects
            your vault, stated plainly.
          </p>
        </motion.div>

        <div className="mt-20 grid md:grid-cols-[0.9fr_1.1fr] gap-14 items-start">
          {/* Certificate card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6 }}
            className="pg-stack relative bg-[var(--pg-paper)] p-2"
          >
            <div className="pg-corner-fold relative border border-[var(--pg-ink)] p-8">
              <div className="absolute inset-[6px] border border-[var(--pg-ink)]/40 pointer-events-none" />

              <div className="pg-stamp-mark absolute top-4 right-4 size-16 rotate-[10deg]">
                <div className="text-center leading-tight">
                  <span className="block text-[0.45rem] tracking-[0.1em]">Sealed</span>
                  <span className="block text-[0.7rem] font-semibold">✓</span>
                </div>
              </div>

              <div className="flex items-center justify-between pg-mono text-[0.62rem] uppercase tracking-[0.16em] text-[var(--pg-ink-faint)]">
                <span>Certificate No. AG-256</span>
                <span>Verified</span>
              </div>

              <div className="flex justify-center py-4">
                <SealMedallion size={168} />
              </div>

              <p className="text-center pg-serif text-xl text-[var(--pg-ink)]">
                This vault is sealed under
                <br />
                <span className="italic">authenticated encryption.</span>
              </p>

              <div className="mt-8 space-y-3 pg-rule-double pt-5">
                {clauses.map((item) => (
                  <div key={item} className="flex items-center gap-3 text-sm text-[var(--pg-ink-soft)]">
                    <CheckCircle className="size-4 text-[var(--pg-green)] shrink-0" />
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Principles */}
          <div className="space-y-5">
            {principles.map((item, index) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, x: 40 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.55, delay: index * 0.12 }}
                  className="flex items-start gap-5 bg-[var(--pg-paper)] border border-[var(--pg-paper-line)] shadow-[4px_4px_0_var(--pg-paper-line)] p-6"
                >
                  <span className="flex items-center justify-center size-11 rounded-full border border-[var(--pg-ink)] text-[var(--pg-green)] shrink-0">
                    <Icon className="size-5" strokeWidth={1.75} />
                  </span>
                  <div>
                    <h3 className="pg-serif text-xl text-[var(--pg-ink)]">
                      {item.title}
                    </h3>
                    <p className="mt-2 text-sm leading-6 text-[var(--pg-ink-soft)]">
                      {item.desc}
                    </p>
                  </div>
                </motion.div>
              );
            })}

            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.55, delay: 0.36 }}
              className="flex items-center gap-3 pg-mono text-[0.7rem] uppercase tracking-[0.14em] text-[var(--pg-ink-faint)] pt-2"
            >
              <ShieldCheck className="size-4 text-[var(--pg-green)]" />
              No plaintext password is ever stored or transmitted.
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}

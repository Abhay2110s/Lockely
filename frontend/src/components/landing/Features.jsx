import { motion } from "framer-motion";
import {
  AlertTriangle,
  KeyRound,
  Lightbulb,
  ShieldCheck,
} from "lucide-react";

const entries = [
  {
    no: "01",
    icon: KeyRound,
    title: "Password generator",
    desc: "Draft cryptographically strong, unique passwords on demand — tuned by length, symbols, and readability.",
  },
  {
    no: "02",
    icon: ShieldCheck,
    title: "Strength analyzer",
    desc: "Every entry is scored against real attack patterns, not just a character-count rule of thumb.",
  },
  {
    no: "03",
    icon: Lightbulb,
    title: "Security guidance",
    desc: "Plain-language notes on what to fix first, written for people, not compliance checklists.",
  },
  {
    no: "04",
    icon: AlertTriangle,
    title: "Breach awareness",
    desc: "Flags reused or exposed credentials before they become the weak link in your accounts.",
  },
];

export default function Features() {
  return (
    <section id="features" className="relative px-6 py-28">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6 }}
          className="max-w-xl"
        >
          <div className="pg-tab">Register of contents</div>
          <h2 className="pg-serif mt-6 text-4xl md:text-5xl tracking-tight text-[var(--pg-ink)]">
            What's kept in the ledger
          </h2>
          <p className="mt-4 text-lg leading-8 text-[var(--pg-ink-soft)]">
            Four instruments, each doing one job well, entered here in the
            order you'll actually reach for them.
          </p>
        </motion.div>

        <div className="pg-stack mt-16 bg-[var(--pg-paper)] border border-[var(--pg-paper-line)] px-6 md:px-10">
          {entries.map((item, index) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.no}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 0.5, delay: index * 0.08 }}
                className={`group grid grid-cols-[3.5rem_2.75rem_1fr] md:grid-cols-[4.5rem_3rem_1fr_1.5fr] items-start gap-x-4 md:gap-x-8 gap-y-3 py-7 ${index !== entries.length - 1 ? "border-b border-[var(--pg-paper-line)]" : ""}`}
              >
                <span className="pg-mono text-sm text-[var(--pg-ink-faint)] pt-1">
                  {item.no}
                </span>

                <span className="flex items-center justify-center size-11 rounded-full border border-[var(--pg-ink)] text-[var(--pg-green)] group-hover:bg-[var(--pg-green)] group-hover:text-[var(--pg-paper)] transition-colors">
                  <Icon className="size-5" strokeWidth={1.75} />
                </span>

                <h3 className="pg-serif text-xl md:text-2xl text-[var(--pg-ink)] pt-1">
                  {item.title}
                </h3>

                <p className="col-span-3 md:col-span-1 pl-[calc(3.5rem+2.75rem)] md:pl-0 text-[0.95rem] leading-7 text-[var(--pg-ink-soft)] md:pt-1.5">
                  {item.desc}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

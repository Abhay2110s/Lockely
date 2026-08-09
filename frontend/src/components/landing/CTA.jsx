import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

import SealMedallion from "./SealMedallion";

export default function CTA() {
  const [pressed, setPressed] = useState(false);

  return (
    <section className="px-6 py-24">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6 }}
          style={{
            "--pg-paper": "var(--pg-green-deep)",
            "--pg-ink": "#f4efe1",
            "--pg-ink-soft": "#cfd9d1",
            "--pg-green": "#e9e0c6",
          }}
          className="pg-stack relative overflow-hidden bg-[var(--pg-green-deep)] border border-dashed border-[#e9e0c6]/30 px-10 py-16 md:px-16 md:py-20 grid md:grid-cols-[1fr_auto] items-center gap-12"
        >
          {/* faint watermark seal */}
          <div className="pointer-events-none absolute -right-16 -bottom-24 opacity-[0.14]">
            <SealMedallion size={340} />
          </div>

          <div className="relative">
            <span className="pg-mono text-[0.68rem] uppercase tracking-[0.18em] text-[#e9e0c6]">
              Sign the ledger
            </span>
            <h2 className="pg-serif mt-4 text-4xl md:text-5xl tracking-tight text-[#f4efe1] max-w-lg">
              Ready to close the file on weak passwords?
            </h2>
            <p className="mt-5 max-w-md text-[1.02rem] leading-8 text-[#cfd9d1]">
              Open a vault in under two minutes. Your first entry is
              encrypted before it ever touches our servers.
            </p>
          </div>

          <motion.button
            type="button"
            onMouseDown={() => setPressed(true)}
            onMouseUp={() => setPressed(false)}
            onMouseLeave={() => setPressed(false)}
            className={`relative pg-stamp-btn !bg-[#f4efe1] !text-[var(--pg-green-deep)] !border-[#f4efe1] !shadow-[3px_3px_0_#c9a15b] shrink-0 ${pressed ? "pg-pressed" : ""}`}
          >
            Create account
            <ArrowRight className="size-4" />
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}

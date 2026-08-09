import { motion } from "framer-motion";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqItems = [
  {
    question: "Do you store my password?",
    answer:
      "No. PassGuardian never stores your master password. Analysis and unlocking happen without it leaving your device unencrypted.",
  },
  {
    question: "How is password strength calculated?",
    answer:
      "We score length, character variety, and predictability against known attack patterns — not just a character-count minimum.",
  },
  {
    question: "Is my data secure?",
    answer:
      "Vault entries are encrypted with AES-256-GCM before they're stored, and we collect only what's required to run the service.",
  },
  {
    question: "Can I generate passwords?",
    answer:
      "Yes. The generator produces strong, unique passwords on demand, tunable by length, symbols, and readability.",
  },
];

export default function FAQ() {
  return (
    <section id="faq" className="px-6 py-28">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <div className="pg-tab mx-auto">Standing questions</div>
          <h2 className="pg-serif mt-6 text-4xl md:text-5xl tracking-tight text-[var(--pg-ink)]">
            Questions on file
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="pg-stack mt-14"
        >
          <div className="pg-corner-fold bg-[var(--pg-paper)] border border-[var(--pg-paper-line)] px-8 pt-2 pb-2 md:px-10">
            <Accordion type="single" collapsible className="w-full">
              {faqItems.map((item, index) => (
                <AccordionItem
                  key={index}
                  value={`item-${index}`}
                  className="pg-accordion-item"
                >
                  <AccordionTrigger className="!py-6 hover:!no-underline group">
                    <span className="flex items-baseline gap-4 text-left">
                      <span className="pg-mono text-xs text-[var(--pg-ink-faint)] pt-1">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <span className="pg-serif text-xl text-[var(--pg-ink)] group-hover:text-[var(--pg-green)] transition-colors">
                        {item.question}
                      </span>
                    </span>
                  </AccordionTrigger>

                  <AccordionContent className="!pb-6">
                    <p className="pl-9 text-[0.95rem] leading-7 text-[var(--pg-ink-soft)] max-w-xl">
                      {item.answer}
                    </p>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

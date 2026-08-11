import { HelpCircle } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import ShinyText from "@/components/animations/ShinyText";
import ScrollReveal from "@/components/animations/ScrollReveal";

const faqItems = [
  {
    question: "Do you store my master password?",
    answer:
      "No. PassGuardian operates under a strict Zero-Knowledge protocol. Your master password never leaves your browser unencrypted.",
  },
  {
    question: "How is password strength calculated?",
    answer:
      "We calculate entropy across length, character variety, dictionary frequency, and pattern predictability against real-world attack vectors.",
  },
  {
    question: "Is my data secure against server breaches?",
    answer:
      "Yes. All vault items are encrypted client-side using AES-256-GCM before transmission. Even if our database were leaked, your data remains unreadable.",
  },
  {
    question: "Can I generate custom passwords?",
    answer:
      "Absolutely. The built-in generator allows full customization over length, character sets, and readable formatting on demand.",
  },
];

export default function FAQ() {
  return (
    <section id="faq" className="relative px-6 py-28">
      <div className="max-w-4xl mx-auto">
        <ScrollReveal direction="up" delay={0.1}>
          <div className="text-center max-w-2xl mx-auto">
            <div className="pastel-badge mx-auto mb-4">
              <HelpCircle className="size-3.5 text-indigo-600" />
              Frequently Asked Questions
            </div>
            <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight text-slate-900">
              Everything you need to know,{" "}
              <ShinyText text="answered plainly." className="font-extrabold" />
            </h2>
          </div>
        </ScrollReveal>

        <ScrollReveal direction="up" delay={0.2}>
          <div className="mt-14 soft-card p-6 md:p-8 bg-white border border-slate-200/80 shadow-soft-xl">
            <Accordion type="single" collapsible className="w-full space-y-3">
              {faqItems.map((item, index) => (
                <AccordionItem
                  key={index}
                  value={`item-${index}`}
                  className="border border-slate-200/80 rounded-2xl px-5 transition-colors bg-slate-50/50 hover:bg-white data-[state=open]:bg-white data-[state=open]:border-indigo-300 shadow-xs"
                >
                  <AccordionTrigger className="!py-5 hover:!no-underline group">
                    <span className="flex items-center gap-4 text-left">
                      <span className="size-8 rounded-xl bg-indigo-50 border border-indigo-100 text-indigo-600 flex items-center justify-center text-xs font-mono font-bold">
                        0{index + 1}
                      </span>
                      <span className="text-lg font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">
                        {item.question}
                      </span>
                    </span>
                  </AccordionTrigger>

                  <AccordionContent className="!pb-5 pt-1">
                    <p className="pl-12 text-sm leading-relaxed text-slate-600 max-w-2xl">
                      {item.answer}
                    </p>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}

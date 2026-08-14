import { HelpCircle, Sparkles } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import ShinyText from "@/components/animations/ShinyText";
import ScrollReveal from "@/components/animations/ScrollReveal";
import SpotlightCard from "@/components/animations/SpotlightCard";

const faqItems = [
  {
    question: "Do you store or have access to my master password?",
    answer:
      "Never. PassGuardian uses strict Zero-Knowledge Architecture. Your master key is used locally in your browser to derive your AES-256 vault key. It never touches our servers or network logs."
  },
  {
    question: "What happens if PassGuardian servers are compromised?",
    answer:
      "Your vault data is stored exclusively as AES-256-GCM encrypted ciphertext with PBKDF2/Argon2id key stretching. Even in a catastrophic server data leak, your payload is unreadable without your local master password."
  },
  {
    question: "How does the Breach Sentinel check my credentials safely?",
    answer:
      "We implement k-Anonymity hash checking. We only send the first 5 characters of your SHA-1 password hash to verify against leaked databases. Your full password or hash is never transmitted."
  },
  {
    question: "Can I export my vault credentials at any time?",
    answer:
      "Yes. You retain 100% data portability. You can export your vault into encrypted JSON or CSV format whenever you choose."
  },
  {
    question: "Is PassGuardian free for personal credentials?",
    answer:
      "Yes! PassGuardian is completely free for individual users to store, generate, and autofill unlimited credentials across devices."
  }
];

export default function FAQ() {
  return (
    <section id="faq" className="relative px-6 py-28 bg-white">
      <div className="max-w-4xl mx-auto space-y-12">
        <ScrollReveal direction="up" delay={0.1}>
          <div className="text-center max-w-2xl mx-auto space-y-4">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-50 border border-indigo-200/60 text-xs font-semibold text-indigo-700">
              <HelpCircle className="size-3.5 text-indigo-600" />
              Got Questions?
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-slate-900">
              Frequently asked questions,{" "}
              <ShinyText text="answered clearly." className="font-extrabold" />
            </h2>
          </div>
        </ScrollReveal>

        <ScrollReveal direction="up" delay={0.2}>
          <SpotlightCard className="p-6 sm:p-10 bg-slate-50/60 border border-slate-200 shadow-lg rounded-3xl">
            <Accordion type="single" collapsible className="w-full space-y-4">
              {faqItems.map((item, index) => (
                <AccordionItem
                  key={index}
                  value={`item-${index}`}
                  className="border border-slate-200/80 rounded-2xl px-6 transition-all bg-white data-[state=open]:border-indigo-300 data-[state=open]:shadow-md shadow-xs"
                >
                  <AccordionTrigger className="py-5 hover:no-underline group">
                    <span className="flex items-center gap-4 text-left">
                      <span className="size-8 rounded-xl bg-indigo-50 border border-indigo-100 text-indigo-600 flex items-center justify-center text-xs font-mono font-bold shrink-0">
                        0{index + 1}
                      </span>
                      <span className="text-base sm:text-lg font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">
                        {item.question}
                      </span>
                    </span>
                  </AccordionTrigger>

                  <AccordionContent className="pb-5 pt-1">
                    <p className="pl-12 text-sm sm:text-base leading-relaxed text-slate-600 max-w-2xl">
                      {item.answer}
                    </p>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </SpotlightCard>
        </ScrollReveal>
      </div>
    </section>
  );
}

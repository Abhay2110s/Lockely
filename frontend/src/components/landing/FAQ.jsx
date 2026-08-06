import { ShieldCheck } from "lucide-react";
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
      "No. PassGuidance does not store your passwords. Password analysis is performed securely without saving sensitive information.",
  },
  {
    question: "How is password strength calculated?",
    answer:
      "Password strength is evaluated using length, complexity, character variety, and resistance against common password attacks.",
  },
  {
    question: "Is my data secure?",
    answer:
      "Yes. We follow security-focused practices and minimize unnecessary data collection to protect your privacy.",
  },
  {
    question: "Can I generate passwords?",
    answer:
      "Yes. You can generate strong random passwords designed to improve account security.",
  },
];


export default function FAQ() {
  return (
    <section className="px-6 py-24">
      <div
        className="
        max-w-6xl
        mx-auto
        grid
        grid-cols-1
        md:grid-cols-2
        gap-12
        items-center
        "
      >

        {/* Left Content */}

        <motion.div
          initial={{
            opacity: 0,
            x: -80,
          }}
          whileInView={{
            opacity: 1,
            x: 0,
          }}
          viewport={{
            once: false,
            amount: 0.3,
          }}
          transition={{
            duration: 0.7,
          }}
        >

          <motion.div
            animate={{
              y: [0, -10, 0],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="
            size-16
            rounded-3xl
            bg-gradient-to-br
            from-orange-200
            to-pink-200
            text-rose-600
            flex
            items-center
            justify-center
            mb-6
            shadow-[0_15px_35px_rgba(244,114,182,0.2)]
            "
          >
            <ShieldCheck className="size-8" />
          </motion.div>


          <h2
            className="
            text-4xl
            md:text-5xl
            font-semibold
            tracking-tight
            text-zinc-950
            "
          >
            Frequently Asked Questions
          </h2>


          <p
            className="
            mt-5
            text-lg
            leading-8
            text-zinc-500
            max-w-md
            "
          >
            Everything you need to know about password security,
            privacy, and PassGuidance.
          </p>

        </motion.div>


        {/* Accordion */}

        <motion.div
          initial={{
            opacity: 0,
            x: 80,
          }}
          whileInView={{
            opacity: 1,
            x: 0,
          }}
          viewport={{
            once: false,
            amount: 0.3,
          }}
          transition={{
            duration: 0.7,
          }}
          className="
          rounded-[32px]
          bg-white/80
          backdrop-blur-xl
          border
          border-white
          shadow-[0_20px_50px_rgba(244,114,182,0.12)]
          p-6
          "
        >

          <Accordion
            type="single"
            collapsible
            className="w-full"
          >

            {faqItems.map((item, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="border-zinc-200"
              >

                <AccordionTrigger
                  className="
                  text-zinc-950
                  font-medium
                  text-base
                  hover:no-underline
                  transition-all
                  "
                >
                  {item.question}
                </AccordionTrigger>


                <AccordionContent
                  className="
                  text-zinc-500
                  leading-7
                  "
                >
                  {item.answer}
                </AccordionContent>

              </AccordionItem>
            ))}

          </Accordion>

        </motion.div>

      </div>
    </section>
  );
}
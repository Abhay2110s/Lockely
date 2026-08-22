import { useState } from "react";
import { ChevronDown } from "lucide-react";

const faqItems = [
  {
    question: "Do you store or have access to my master password?",
    answer: "Never. PassGuardian uses strict Zero-Knowledge Architecture. Your master password is used locally in your browser to derive your AES-256 vault key. It never touches our servers or network logs.",
  },
  {
    question: "What happens if PassGuardian database is breached?",
    answer: "Your vault data is stored exclusively as AES-256-GCM encrypted ciphertext blobs with PBKDF2 key stretching. Without your local master password, all data is unreadable.",
  },
  {
    question: "How does 2FA (Two-Factor Authentication) work?",
    answer: "You can link any standard authenticator app (Google Authenticator, Authy) to generate time-based OTPs, with backup recovery codes stored safely.",
  },
  {
    question: "Is PassGuardian completely free to use?",
    answer: "Yes! PassGuardian is 100% free for individual vaults with unlimited passwords, notes, and password generation.",
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section id="faq" className="ca-grid relative scroll-mt-24 px-4 py-24 bg-[#030b15] border-t border-white/[0.05]">
      <div className="max-w-3xl mx-auto space-y-12">

        {/* Header */}
        <div className="text-center space-y-4">
          <span className="pg-badge">Got Questions?</span>
          <h2 className="ca-display text-4xl sm:text-6xl text-white tracking-tight mt-4">
            Frequently Asked
          </h2>
        </div>

        {/* Accordion */}
        <div className="space-y-px">
          {faqItems.map((item, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={index}
                className={`border-l-2 bg-[#040e1c] transition-all ${
                  isOpen ? "border-[#00d4ff]" : "border-transparent"
                }`}
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? -1 : index)}
                  className="w-full text-left px-6 py-5 flex items-center justify-between gap-4 group"
                >
                  <span className="flex items-center gap-4">
                    <span
                      className={`ca-mono text-[0.6rem] tracking-widest shrink-0 transition-colors ${
                        isOpen ? "text-[#00d4ff]" : "text-[#e2eaf8]/25"
                      }`}
                    >
                      0{index + 1}
                    </span>
                    <span className={`text-sm sm:text-base font-medium transition-colors ${
                      isOpen ? "text-white" : "text-[#e2eaf8]/60 group-hover:text-[#e2eaf8]/80"
                    }`}>
                      {item.question}
                    </span>
                  </span>
                  <ChevronDown
                    className={`size-4 shrink-0 transition-all duration-300 ${
                      isOpen ? "rotate-180 text-[#00d4ff]" : "text-[#e2eaf8]/20"
                    }`}
                  />
                </button>

                <div
                  className={`overflow-hidden transition-all duration-300 ${
                    isOpen ? "max-h-40" : "max-h-0"
                  }`}
                >
                  <p className="px-6 pb-5 pl-[3.25rem] text-sm text-[#e2eaf8]/45 leading-relaxed font-light border-t border-white/[0.04] pt-4">
                    {item.answer}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

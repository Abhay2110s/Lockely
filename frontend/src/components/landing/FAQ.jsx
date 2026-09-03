import { useState } from "react";
import { ChevronDown, HelpCircle } from "lucide-react";

const faqItems = [
  {
    question: "Do you store or have access to my master password?",
    answer:
      "Never. PassGuardian uses strict Zero-Knowledge Architecture. Your master password is used locally in your browser RAM with PBKDF2 to derive your AES-256 vault key. It is never transmitted across any network or logged on any server.",
  },
  {
    question: "What happens if the PassGuardian cloud storage is breached?",
    answer:
      "Your vault data is stored exclusively as AES-256-GCM encrypted ciphertext blobs. Without your client master key (which exists solely in your browser memory), the database is cryptographically unbreakable.",
  },
  {
    question: "How does Two-Factor Authentication (2FA) integrate?",
    answer:
      "You can link standard RFC-6238 TOTP authenticator apps (Google Authenticator, Authy, 1Password) to generate rotating one-time codes, with single-use backup recovery codes provided for emergency recovery.",
  },
  {
    question: "Is PassGuardian completely free to use for personal vaults?",
    answer:
      "Yes! PassGuardian is 100% free for personal vaults with unlimited credential storage, notes, breach monitoring, and unlimited password generation.",
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section id="faq" className="relative scroll-mt-24 px-4 py-16 bg-[#FDFBF7]">
      <div className="max-w-4xl mx-auto space-y-12">
        {/* Header */}
        <div className="max-w-2xl space-y-3 px-2">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blush/35 border border-[#E6E0D5] text-[#8B263E] text-xs font-semibold uppercase tracking-wider">
            <HelpCircle className="size-3.5 text-[#8B263E]" />
            <span>Questions &amp; Answers</span>
          </div>

          <h2 className="text-3xl sm:text-5xl md:text-6xl font-black text-[#1a1a1a] tracking-tight leading-[1.05] uppercase">
            Frequently <span className="text-[#8B263E]">Asked Questions</span>
          </h2>
          <p className="text-sm sm:text-base text-[#6B6560] font-normal">
            Everything you need to know about our cryptographic security model and zero-knowledge architecture.
          </p>
        </div>

        <div className="space-y-3.5">
          {faqItems.map((item, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={index}
                className="bg-white rounded-2xl border border-[#E6E0D5] overflow-hidden shadow-xs transition-all duration-200"
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? -1 : index)}
                  className="w-full text-left p-5 flex items-center justify-between gap-4 text-base sm:text-lg font-bold text-[#1a1a1a] hover:text-[#8B263E] transition-colors cursor-pointer tracking-tight"
                >
                  <span className="flex items-center gap-3.5">
                    <span className="size-8 rounded-full bg-blush/40 border border-[#E6E0D5] flex items-center justify-center text-xs font-bold text-[#8B263E] shrink-0">
                      0{index + 1}
                    </span>
                    <span>{item.question}</span>
                  </span>
                  <ChevronDown
                    className={`size-5 text-[#6B6560] shrink-0 transition-transform duration-200 ${
                      isOpen ? "rotate-180 text-[#8B263E]" : ""
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="px-6 pb-5 pt-2 text-xs sm:text-sm text-[#6B6560] leading-relaxed border-t border-[#E6E0D5] bg-[#FAF8F3]/60">
                    {item.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

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
    <section id="faq" className="relative scroll-mt-24 px-4 py-16">
      <div className="max-w-4xl mx-auto space-y-12">
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full glass-badge-blush">
            <HelpCircle className="size-3.5 text-[#f43f6e]" />
            <span className="text-xs font-semibold text-[#ffe4e9]">QUESTIONS &amp; ANSWERS</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight">
            Frequently <span className="text-gradient-blush">Asked Questions</span>
          </h2>
          <p className="text-sm sm:text-base text-[#fda4b8]/80 font-normal">
            Everything you need to know about our cryptographic security model and architecture.
          </p>
        </div>

        <div className="space-y-4">
          {faqItems.map((item, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={index}
                className="glass-card overflow-hidden transition-all border border-pink-500/20"
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? -1 : index)}
                  className="w-full text-left p-4 sm:p-5 flex items-center justify-between gap-4 text-base sm:text-lg font-bold text-white hover:text-[#fda4b8] transition-colors cursor-pointer"
                >
                  <span className="flex items-center gap-3.5">
                    <span className="size-7 rounded-lg bg-gradient-to-br from-[#7a1534] to-[#be2656] flex items-center justify-center text-xs font-bold text-white font-mono-code shrink-0">
                      0{index + 1}
                    </span>
                    <span>{item.question}</span>
                  </span>
                  <ChevronDown
                    className={`size-5 text-[#fda4b8] shrink-0 transition-transform duration-200 ${
                      isOpen ? "rotate-180 text-white" : ""
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="px-5 sm:px-6 pb-5 pt-2 text-xs sm:text-sm text-[#ffe4e9]/85 leading-relaxed border-t border-pink-500/15 bg-black/25">
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

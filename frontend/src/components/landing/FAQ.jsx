import { useState } from "react";
import { ChevronDown } from "lucide-react";

const faqItems = [
  {
    question: "Do you store or have access to my master password?",
    answer:
      "Never. PassGuardian uses strict Zero-Knowledge Architecture. Your master password is used locally in your browser to derive your AES-256 vault key. It never touches our servers or network logs."
  },
  {
    question: "What happens if PassGuardian database is breached?",
    answer:
      "Your vault data is stored exclusively as AES-256-GCM encrypted ciphertext blobs with PBKDF2 key stretching. Without your local master password, all data is unreadable."
  },
  {
    question: "How does 2FA (Two-Factor Authentication) work?",
    answer:
      "You can link any standard authenticator app (Google Authenticator, Authy) to generate time-based OTPs, with backup recovery codes stored safely."
  },
  {
    question: "Is PassGuardian completely free to use?",
    answer:
      "Yes! PassGuardian is 100% free for individual vaults with unlimited passwords, notes, and password generation."
  }
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section id="faq" className="ca-grid relative scroll-mt-24 px-4 py-16 bg-white border-t border-[#191510]/15">
      <div className="max-w-4xl mx-auto space-y-12">
        <div className="text-center max-w-2xl mx-auto space-y-4">
          <div className="flex flex-col items-center text-[#191510]">
            <p className="ca-hand text-2xl sm:text-3xl">got questions?</p>
            <svg
              viewBox="0 0 64 12"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              className="mt-1 h-3 w-24 text-[#191510]"
              aria-hidden="true"
            >
              <path d="M3 4c18-3 40-3 58 0" />
              <path d="M9 9c14-2.5 32-2.5 46 0" />
            </svg>
          </div>

          <h2 className="ca-display text-3xl sm:text-5xl text-[#191510] tracking-tight">
            FREQUENTLY ASKED
          </h2>
        </div>

        <div className="space-y-4">
          {faqItems.map((item, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={index}
                className="bg-[#faf6ea] border-2 border-[#191510] shadow-[3.5px_3.5px_0_#191510] hover:shadow-[4.5px_4.5px_0_#191510] hover:-translate-y-0.5 overflow-hidden transition-all"
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? -1 : index)}
                  className="w-full text-left p-4 sm:p-5 flex items-center justify-between gap-4 ca-display text-lg sm:text-xl text-[#191510] hover:bg-[#ffe066]/60 transition-colors"
                >
                  <span className="flex items-center gap-3">
                    <span className="ca-mono size-7 bg-white border border-[#191510] shadow-[1px_1px_0_#191510] flex items-center justify-center text-xs font-bold shrink-0">
                      0{index + 1}
                    </span>
                    <span>{item.question}</span>
                  </span>
                  <ChevronDown
                    className={`size-5 shrink-0 transition-transform duration-200 ${
                      isOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="px-5 sm:px-6 pb-5 sm:pb-6 pt-2 text-sm sm:text-base font-medium text-[#191510]/90 leading-relaxed border-t-2 border-[#191510] bg-white">
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

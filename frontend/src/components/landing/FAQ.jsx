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
    <section id="faq" className="relative scroll-mt-24 px-4 py-16 bg-[#000000]">
      <div className="max-w-4xl mx-auto space-y-12">
        {/* Header */}
        <div className="max-w-2xl space-y-3 px-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#111111] border border-[#222222] text-[#00FF66] text-xs font-bold font-mono-code uppercase tracking-widest">
            <HelpCircle className="size-3.5 text-[#00FF66]" />
            <span>QUESTIONS &amp; ANSWERS</span>
          </div>

          <h2 className="text-3xl sm:text-5xl md:text-6xl font-black text-[#F8F9FA] tracking-tighter leading-[1.05] uppercase">
            Frequently <span className="text-[#00FF66]">Asked Questions</span>
          </h2>
          <p className="text-sm sm:text-base text-[#6B7280] font-normal">
            Everything you need to know about our cryptographic security model and architecture.
          </p>
        </div>

        <div className="space-y-3">
          {faqItems.map((item, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={index}
                className="bg-[#111111] border border-[#222222] transition-colors"
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? -1 : index)}
                  className="w-full text-left p-4 sm:p-5 flex items-center justify-between gap-4 text-base sm:text-lg font-bold text-[#F8F9FA] hover:text-[#00FF66] transition-colors cursor-pointer uppercase tracking-wide"
                >
                  <span className="flex items-center gap-3.5">
                    <span className="size-7 bg-[#000000] border border-[#222222] flex items-center justify-center text-xs font-bold text-[#00FF66] font-mono-code shrink-0">
                      0{index + 1}
                    </span>
                    <span>{item.question}</span>
                  </span>
                  <ChevronDown
                    className={`size-5 text-[#6B7280] shrink-0 transition-transform duration-150 ${
                      isOpen ? "rotate-180 text-[#00FF66]" : ""
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="px-5 sm:px-6 pb-5 pt-2 text-xs sm:text-sm text-[#6B7280] leading-relaxed border-t border-[#222222] bg-[#0c0c0c]">
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

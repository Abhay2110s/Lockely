import { useState } from "react";
import { HelpCircle, ChevronDown } from "lucide-react";

const faqItems = [
  {
    question: "Do you store or have access to my master password?",
    answer:
      "Never! PassGuardian uses strict Zero-Knowledge Architecture. Your master password is used locally in your browser to derive your AES-256 vault key. It never touches our servers or network logs."
  },
  {
    question: "What happens if PassGuardian database is breached?",
    answer:
      "Your vault data is stored exclusively as AES-256-GCM encrypted ciphertext blobs. Without your master password, all data is completely indecipherable mathematically."
  },
  {
    question: "How does 2FA (Two-Factor Authentication) work?",
    answer:
      "You can link any standard authenticator app (Google Authenticator, Authy) to generate time-based OTPs, with backup recovery codes stored securely."
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
    <section id="faq" className="relative px-6 py-24 bg-[#fffef7] border-y-3 border-[#18181b] font-comic">
      <div className="max-w-4xl mx-auto space-y-12">
        <div className="text-center max-w-2xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#fef08a] border-2 border-[#18181b] shadow-[2px_2px_0px_#18181b] text-xs font-heading-comic font-bold text-slate-950">
            <HelpCircle className="size-3.5 fill-amber-400 text-slate-950" />
            Got Questions?
          </div>
          <h2 className="text-3xl sm:text-5xl font-heading-comic font-black tracking-tight text-slate-950">
            Frequently Asked Questions ❓
          </h2>
        </div>

        <div className="space-y-4">
          {faqItems.map((item, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={index}
                className="bg-[#faf6ea] border-3 border-[#18181b] rounded-2xl shadow-[4px_4px_0px_#18181b] overflow-hidden transition-all"
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? -1 : index)}
                  className="w-full text-left p-5 sm:p-6 flex items-center justify-between gap-4 font-heading-comic font-black text-slate-950 text-base sm:text-lg hover:bg-[#fef08a]/50 transition-colors"
                >
                  <span className="flex items-center gap-3">
                    <span className="size-7 rounded-lg bg-white border-2 border-[#18181b] flex items-center justify-center text-xs font-mono font-black shrink-0">
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
                  <div className="px-6 pb-6 pt-1 text-sm sm:text-base font-comic font-bold text-slate-800 leading-relaxed border-t-2 border-[#18181b] bg-white">
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

import { useState } from "react";
import {
  KeyRound,
  AlertTriangle,
  Zap,
  Sparkles,
  Lock,
  CheckCircle2,
} from "lucide-react";

const featureCards = [
  {
    icon: Lock,
    bg: "bg-[#fef08a]",
    badge: "AES-256-GCM",
    title: "Zero-Knowledge Crypto",
    desc: "Your master password derives a client-side AES-256 key via PBKDF2. Passwords are encrypted before touching the internet.",
  },
  {
    icon: KeyRound,
    bg: "bg-[#bae6fd]",
    badge: "CSPRNG ENGINE",
    title: "Super Key Generator",
    desc: "Generate uncrackable passwords with tailored character sets, custom length sliders, and hardware entropy.",
  },
  {
    icon: AlertTriangle,
    bg: "bg-[#fda4af]",
    badge: "PASSWORD HEALTH",
    title: "Reused & Weak Sentinel",
    desc: "Instantly detect weak, duplicate, or expired credentials without exposing your secrets to anyone.",
  },
  {
    icon: Zap,
    bg: "bg-[#bbf7d0]",
    badge: "SUB-MILLISECOND",
    title: "Instant 2FA Security",
    desc: "TOTP 2-Factor Authentication with backup recovery codes for ironclad access control.",
  },
];

export default function Features() {
  return (
    <section id="features" className="relative px-6 py-24 bg-[#fffef7] border-y-3 border-[#18181b] font-comic">
      <div className="max-w-6xl mx-auto space-y-16">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#fef08a] border-2 border-[#18181b] shadow-[2px_2px_0px_#18181b] text-xs font-heading-comic font-bold text-slate-950">
            <Sparkles className="size-3.5 fill-amber-400 text-slate-950" />
            Core Vault Arsenal
          </div>
          <h2 className="text-3xl sm:text-5xl font-heading-comic font-black tracking-tight text-slate-950">
            Supercharged Privacy &amp; Speed 🚀
          </h2>
          <p className="text-base text-slate-700 font-comic font-bold leading-relaxed">
            Everything you need to secure your passwords, accounts, and private notes.
          </p>
        </div>

        {/* Comic Feature Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {featureCards.map((feat, idx) => {
            const Icon = feat.icon;
            return (
              <div
                key={idx}
                className={`${feat.bg} p-6 sm:p-8 rounded-3xl border-3 border-[#18181b] shadow-[6px_6px_0px_#18181b] hover:-translate-y-1 transition-all space-y-4 flex flex-col justify-between`}
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="size-12 rounded-2xl bg-white border-2 border-[#18181b] shadow-[2px_2px_0px_#18181b] flex items-center justify-center">
                      <Icon className="size-6 text-slate-950" />
                    </div>
                    <span className="text-xs font-heading-comic font-bold bg-white px-2.5 py-0.5 rounded-md border border-[#18181b]">
                      {feat.badge}
                    </span>
                  </div>

                  <h3 className="text-2xl font-heading-comic font-black text-slate-950">
                    {feat.title}
                  </h3>

                  <p className="text-sm font-comic font-bold text-slate-800 leading-relaxed">
                    {feat.desc}
                  </p>
                </div>

                <div className="pt-2 flex items-center gap-2 text-xs font-heading-comic font-bold text-slate-900">
                  <CheckCircle2 className="size-4 text-emerald-800" />
                  100% Client-Side Verified
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

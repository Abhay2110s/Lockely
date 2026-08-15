import { useState } from "react";
import {
  KeyRound,
  AlertTriangle,
  Zap,
  Sparkles,
  Lock,
  CheckCircle2
} from "lucide-react";
import ShinyText from "@/components/animations/ShinyText";
import ScrollReveal from "@/components/animations/ScrollReveal";
import SpotlightCard from "@/components/animations/SpotlightCard";
import AccordionGallery from "@/components/animations/AccordionGallery";
import { ShineBorder } from "@/components/ui/shine-border";
import zeroKnowledgeImg from "@/assets/gallery/zero-knowledge.svg";
import generatorImg from "@/assets/gallery/generator.svg";
import sentinelImg from "@/assets/gallery/sentinel.svg";
import autofillImg from "@/assets/gallery/autofill.svg";

const tabs = [
  {
    id: "zero-knowledge",
    label: "Zero-Knowledge Storage",
    image: zeroKnowledgeImg,
    icon: Lock,
    badge: "AES-256 GCM",
    title: "Client-Side Encryption Core",
    subtitle: "Your credentials are encrypted in your browser using PBKDF2/Argon2id key derivation before transmitting anywhere.",
    points: [
      "Master password never sent over network",
      "AES-256 GCM authenticated cipher",
      "Cryptographically isolated user keys",
      "No backdoor access — strictly zero-knowledge"
    ]
  },
  {
    id: "generator",
    label: "Smart Generator & Entropy Engine",
    image: generatorImg,
    icon: KeyRound,
    badge: "Sub-millisecond",
    title: "Unbreachable Key Synthesis",
    subtitle: "Generate cryptographically secure passwords tailored to any length, complexity rule, or readable formatting requirement.",
    points: [
      "Custom entropy bits calculator",
      "Pronounceable & custom set rules",
      "One-click instant clipboard copy",
      "Auto-clears clipboard after 30 seconds"
    ]
  },
  {
    id: "sentinel",
    label: "Breach Sentinel & Leak Monitor",
    image: sentinelImg,
    icon: AlertTriangle,
    badge: "Real-Time Watch",
    title: "Proactive Vulnerability Sentinel",
    subtitle: "Checks anonymized k-Anonymity password hashes against billions of known breached credentials in real-time.",
    points: [
      "Zero plain text hash exposure (k-Anonymity)",
      "Instant notification on leaked credentials",
      "Reused password detection across accounts",
      "Vault health scoring & action items"
    ]
  },
  {
    id: "autofill",
    label: "Biometric & Rapid Autofill",
    image: autofillImg,
    icon: Zap,
    badge: "1-Tap Sync",
    title: "Frictionless Credential Injection",
    subtitle: "Seamlessly fill logins across Web, iOS, and Android while keeping your master vault key locked behind biometric checks.",
    points: [
      "Web extension & native app sync",
      "FaceID & TouchID biometric unlock",
      "Secure domain origin verification",
      "Phishing-resistant autofill matching"
    ]
  }
];

export default function Features() {
  const [activeIdx, setActiveIdx] = useState(0);
  const activeTab = tabs[activeIdx] || tabs[0];
  const ActiveIcon = activeTab.icon;

  return (
    <section id="features" className="relative px-6 py-28 bg-slate-50/50 border-y border-slate-200/60">
      <div className="max-w-6xl mx-auto space-y-16">
        {/* Section Header */}
        <ScrollReveal direction="up" delay={0.1}>
          <div className="text-center max-w-2xl mx-auto space-y-4">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-50 border border-indigo-200/60 text-xs font-semibold text-indigo-700">
              <Sparkles className="size-3.5 text-indigo-600" />
              Core Vault Features
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-slate-900">
              Engineered for speed,{" "}
              <ShinyText text="built for total privacy." className="font-extrabold" />
            </h2>
            <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
              Explore the core instruments protecting modern developers, security professionals, and teams daily.
            </p>
          </div>
        </ScrollReveal>

        {/* Hover-Expanding Feature Showcase Gallery */}
        <ScrollReveal direction="up" delay={0.2}>
          <div className="relative rounded-[1.75rem] p-[3px] bg-white shadow-xl overflow-hidden">
            <ShineBorder shineColor={["#A07CFE", "#FE8FB5", "#FFBE7B"]} />
            <AccordionGallery
              items={tabs}
              defaultIndex={0}
              expandRatio={0.5}
              trigger="hover"
              accentColor="#a5b4fc"
              overlayColor="#0b0620"
              textColor="#ffffff"
              grayscale
              showLabels
              duration={0.6}
              ease="power3.out"
              parallax={0.5}
              tilt={8}
              stagger={0.06}
              height={420}
              gap={10}
              radius={20}
              orientation="horizontal"
              onActiveChange={setActiveIdx}
            />
          </div>
        </ScrollReveal>

        {/* Synced Feature Detail Card */}
        <ScrollReveal direction="up" delay={0.3}>
          <SpotlightCard className="p-6 sm:p-10 bg-white border border-slate-200 shadow-xl rounded-3xl">
            <div className="grid sm:grid-cols-[auto_1fr] gap-6 sm:gap-8 items-start">
              <div className="size-14 rounded-2xl bg-indigo-50 border border-indigo-200/60 flex items-center justify-center text-indigo-600 shrink-0">
                <ActiveIcon className="size-6" />
              </div>

              <div className="space-y-5 min-w-0">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-indigo-50 text-indigo-700 text-xs font-mono font-bold border border-indigo-200/60">
                  {activeTab.badge}
                </div>

                <div>
                  <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                    {activeTab.title}
                  </h3>
                  <p className="mt-3 text-base text-slate-600 leading-relaxed">
                    {activeTab.subtitle}
                  </p>
                </div>

                <ul className="grid sm:grid-cols-2 gap-x-6 gap-y-3 pt-2">
                  {activeTab.points.map((pt, idx) => (
                    <li key={idx} className="flex items-center gap-3 text-sm font-semibold text-slate-700">
                      <CheckCircle2 className="size-4 text-emerald-500 shrink-0" />
                      <span>{pt}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </SpotlightCard>
        </ScrollReveal>
      </div>
    </section>
  );
}

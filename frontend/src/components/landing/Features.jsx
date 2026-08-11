import { AlertTriangle, KeyRound, Lightbulb, ShieldCheck, Sparkles } from "lucide-react";
import ShinyText from "@/components/animations/ShinyText";
import ScrollReveal from "@/components/animations/ScrollReveal";
import TiltCard from "@/components/animations/TiltCard";

const entries = [
  {
    no: "01",
    icon: KeyRound,
    title: "Password Generator",
    desc: "Draft cryptographically strong, unique passwords on demand — tuned by length, symbols, and readability.",
    badgeClass: "bg-indigo-50 border-indigo-100 text-indigo-600",
    topAccent: "bg-indigo-500",
  },
  {
    no: "02",
    icon: ShieldCheck,
    title: "Strength Analyzer",
    desc: "Every entry is scored against real attack patterns and entropy benchmarks, not just a character-count rule.",
    badgeClass: "bg-purple-50 border-purple-100 text-purple-600",
    topAccent: "bg-purple-500",
  },
  {
    no: "03",
    icon: Lightbulb,
    title: "Security Guidance",
    desc: "Plain-language insights on what to fix first, tailored to keep your vault hardened without confusion.",
    badgeClass: "bg-pink-50 border-pink-100 text-pink-600",
    topAccent: "bg-pink-500",
  },
  {
    no: "04",
    icon: AlertTriangle,
    title: "Breach Awareness",
    desc: "Flags reused or exposed credentials before they become the weak link in your accounts.",
    badgeClass: "bg-emerald-50 border-emerald-100 text-emerald-600",
    topAccent: "bg-emerald-500",
  },
];

export default function Features() {
  return (
    <section id="features" className="relative px-6 py-28">
      <div className="max-w-6xl mx-auto">
        <ScrollReveal direction="up" delay={0.1}>
          <div className="text-center max-w-2xl mx-auto">
            <div className="pastel-badge mx-auto mb-4">
              <Sparkles className="size-3.5" />
              Core Instruments
            </div>
            <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight text-slate-900">
              Four specialized tools,{" "}
              <ShinyText text="seamlessly integrated." className="font-extrabold" />
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-slate-600">
              Designed to generate, analyze, protect, and audit your credentials with maximum ease.
            </p>
          </div>
        </ScrollReveal>

        <div className="mt-16 grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {entries.map((item, index) => {
            const Icon = item.icon;
            return (
              <ScrollReveal
                key={item.no}
                direction="up"
                delay={0.1 + index * 0.1}
              >
                <TiltCard className="p-7 h-full flex flex-col justify-between group relative bg-white">
                  {/* Top accent line */}
                  <div className={`absolute top-0 left-0 right-0 h-1 ${item.topAccent} opacity-80`} />

                  <div>
                    <div className="flex items-center justify-between mb-6">
                      <span className={`size-12 rounded-2xl flex items-center justify-center border ${item.badgeClass}`}>
                        <Icon className="size-6" />
                      </span>
                      <span className="text-xs font-mono font-bold text-slate-400">
                        {item.no}
                      </span>
                    </div>

                    <h3 className="text-xl font-bold text-slate-900 group-hover:text-indigo-600 transition-colors mb-3">
                      {item.title}
                    </h3>

                    <p className="text-sm leading-relaxed text-slate-600">
                      {item.desc}
                    </p>
                  </div>

                  <div className="mt-8 pt-4 border-t border-slate-100 flex items-center text-xs font-bold text-indigo-600">
                    <span>Explore Feature</span>
                    <span className="ml-auto group-hover:translate-x-1.5 transition-transform">→</span>
                  </div>
                </TiltCard>
              </ScrollReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

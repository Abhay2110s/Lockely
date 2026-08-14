import { useState } from "react";
import { 
  ShieldCheck, 
  KeyRound, 
  AlertTriangle, 
  Zap, 
  Sparkles, 
  Lock, 
  CheckCircle2, 
  ArrowRight,
  Database,
  EyeOff,
  Cpu,
  Search
} from "lucide-react";
import ShinyText from "@/components/animations/ShinyText";
import ScrollReveal from "@/components/animations/ScrollReveal";
import SpotlightCard from "@/components/animations/SpotlightCard";

const tabs = [
  {
    id: "zero-knowledge",
    label: "Zero-Knowledge Storage",
    icon: Lock,
    badge: "AES-256 GCM",
    title: "Client-Side Encryption Core",
    subtitle: "Your credentials are encrypted in your browser using PBKDF2/Argon2id key derivation before transmitting anywhere.",
    points: [
      "Master password never sent over network",
      "AES-256 GCM authenticated cipher",
      "Cryptographically isolated user keys",
      "No backdoor access — strictly zero-knowledge"
    ],
    interactiveType: "vault-search"
  },
  {
    id: "generator",
    label: "Smart Generator & Entropy Engine",
    icon: KeyRound,
    badge: "Sub-millisecond",
    title: "Unbreachable Key Synthesis",
    subtitle: "Generate cryptographically secure passwords tailored to any length, complexity rule, or readable formatting requirement.",
    points: [
      "Custom entropy bits calculator",
      "Pronounceable & custom set rules",
      "One-click instant clipboard copy",
      "Auto-clears clipboard after 30 seconds"
    ],
    interactiveType: "entropy-engine"
  },
  {
    id: "sentinel",
    label: "Breach Sentinel & Leak Monitor",
    icon: AlertTriangle,
    badge: "Real-Time Watch",
    title: "Proactive Vulnerability Sentinel",
    subtitle: "Checks anonymized k-Anonymity password hashes against billions of known breached credentials in real-time.",
    points: [
      "Zero plain text hash exposure (k-Anonymity)",
      "Instant notification on leaked credentials",
      "Reused password detection across accounts",
      "Vault health scoring & action items"
    ],
    interactiveType: "breach-checker"
  },
  {
    id: "autofill",
    label: "Biometric & Rapid Autofill",
    icon: Zap,
    badge: "1-Tap Sync",
    title: "Frictionless Credential Injection",
    subtitle: "Seamlessly fill logins across Web, iOS, and Android while keeping your master vault key locked behind biometric checks.",
    points: [
      "Web extension & native app sync",
      "FaceID & TouchID biometric unlock",
      "Secure domain origin verification",
      "Phishing-resistant autofill matching"
    ],
    interactiveType: "autofill-demo"
  }
];

export default function Features() {
  const [activeTabId, setActiveTabId] = useState("zero-knowledge");
  const activeTab = tabs.find((t) => t.id === activeTabId) || tabs[0];

  // Interactive tab state demos
  const [searchQuery, setSearchQuery] = useState("");
  const [testPassword, setTestPassword] = useState("P@ssgU4rd!an2026");

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

        {/* Interactive Tabs Bar */}
        <ScrollReveal direction="up" delay={0.2}>
          <div className="flex items-center justify-start lg:justify-center overflow-x-auto p-1.5 bg-slate-200/60 rounded-2xl gap-2 no-scrollbar border border-slate-200">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = tab.id === activeTabId;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTabId(tab.id)}
                  className={`flex items-center gap-2.5 px-4 py-3 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all ${
                    isActive
                      ? "bg-white text-indigo-700 shadow-sm border border-slate-200/80"
                      : "text-slate-600 hover:text-slate-900 hover:bg-slate-100/70"
                  }`}
                >
                  <Icon className={`size-4 ${isActive ? "text-indigo-600" : "text-slate-500"}`} />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>
        </ScrollReveal>

        {/* Interactive Feature Display Card */}
        <ScrollReveal direction="up" delay={0.3}>
          <SpotlightCard className="p-6 sm:p-10 bg-white border border-slate-200 shadow-xl rounded-3xl">
            <div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-10 items-center">
              {/* Feature Description Left */}
              <div className="space-y-6">
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

                <ul className="space-y-3 pt-2">
                  {activeTab.points.map((pt, idx) => (
                    <li key={idx} className="flex items-center gap-3 text-sm font-semibold text-slate-700">
                      <CheckCircle2 className="size-4 text-emerald-500 shrink-0" />
                      <span>{pt}</span>
                    </li>
                  ))}
                </ul>

                <div className="pt-4 border-t border-slate-100">
                  <a href="#interactive-demo" className="inline-flex items-center gap-2 text-xs font-bold text-indigo-600 hover:text-indigo-700 uppercase tracking-wider">
                    <span>Try feature in sandbox</span>
                    <ArrowRight className="size-3.5" />
                  </a>
                </div>
              </div>

              {/* Dynamic Interactive Demo Right */}
              <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200/80 space-y-4">
                {activeTab.interactiveType === "vault-search" && (
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Live Vault Search</span>
                      <span className="text-xs font-mono text-emerald-600 font-bold">AES-256 Encrypted</span>
                    </div>

                    <div className="relative">
                      <Search className="size-4 absolute left-3.5 top-3 text-slate-400" />
                      <input
                        type="text"
                        placeholder="Search credentials (e.g. github, aws)..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pl-10 pr-4 py-2.5 text-xs font-medium bg-white rounded-xl border border-slate-200 focus:outline-none focus:border-indigo-500"
                      />
                    </div>

                    <div className="space-y-2">
                      {["GitHub Developer Key", "AWS Production Root", "Stripe API Key"]
                        .filter((item) => item.toLowerCase().includes(searchQuery.toLowerCase()))
                        .map((name, i) => (
                          <div key={i} className="p-3 bg-white rounded-xl border border-slate-200/70 flex items-center justify-between text-xs">
                            <span className="font-bold text-slate-800">{name}</span>
                            <span className="font-mono text-slate-400">Encrypted</span>
                          </div>
                        ))}
                    </div>
                  </div>
                )}

                {activeTab.interactiveType === "entropy-engine" && (
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Live Entropy Scorer</span>
                      <span className="text-xs font-bold text-indigo-600">98 / 100 Score</span>
                    </div>

                    <input
                      type="text"
                      value={testPassword}
                      onChange={(e) => setTestPassword(e.target.value)}
                      className="w-full p-3 font-mono text-xs font-bold bg-white rounded-xl border border-slate-200 focus:outline-none focus:border-indigo-500"
                    />

                    <div className="p-3.5 bg-white rounded-xl border border-slate-200 space-y-2">
                      <div className="flex justify-between text-xs font-bold">
                        <span className="text-slate-600">Estimated Crack Time</span>
                        <span className="text-emerald-600 font-mono">1.2 Trillion Years</span>
                      </div>
                      <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden flex gap-1">
                        <div className="h-full w-full bg-emerald-500 rounded-full" />
                      </div>
                    </div>
                  </div>
                )}

                {activeTab.interactiveType === "breach-checker" && (
                  <div className="space-y-4 text-center py-2">
                    <div className="size-12 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                      <ShieldCheck className="size-6" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-slate-900">0 Exposed Credentials</h4>
                      <p className="text-xs text-slate-500 mt-1">k-Anonymity Hash Check: Clean</p>
                    </div>
                    <div className="p-3 bg-white rounded-xl border border-slate-200 text-xs font-mono text-slate-600">
                      SHA-1 Prefix: <span className="font-bold text-indigo-600">5BAA6</span> (Truncated)
                    </div>
                  </div>
                )}

                {activeTab.interactiveType === "autofill-demo" && (
                  <div className="space-y-3">
                    <div className="p-3.5 bg-white rounded-xl border border-slate-200 flex items-center justify-between text-xs">
                      <div className="flex items-center gap-2">
                        <Zap className="size-4 text-indigo-600" />
                        <span className="font-bold text-slate-900">One-Tap Autofill Prompt</span>
                      </div>
                      <span className="text-[0.65rem] font-bold bg-indigo-50 text-indigo-600 px-2 py-0.5 rounded">Active</span>
                    </div>

                    <div className="p-3 bg-slate-100 rounded-xl text-center text-xs text-slate-500 font-medium">
                      Simulated extension prompt for <span className="font-mono font-bold text-slate-700">app.dashboard.com</span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </SpotlightCard>
        </ScrollReveal>
      </div>
    </section>
  );
}

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { IconBrandGithub } from "lucide-react";
import { fadeUp, stagger, navVariants, pulse } from "@/lib/animations";
import CountUp from "@/components/CountUp";

// Single-file landing composition matching requested structure. Kept
// self-contained to avoid sweeping edits. Styling uses existing Tailwind
// setup in the repo; visual tokens follow the user's spec (near-black
// background, off-white text, electric cyan accent).

function StickyNav() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.header
      initial={false}
      animate={scrolled ? "scrolled" : "top"}
      variants={navVariants}
      className="fixed left-0 right-0 top-0 z-50 mx-auto px-4 py-3"
      style={{ backdropFilter: scrolled ? "blur(8px)" : "none" }}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-md bg-gradient-to-br from-[#00d4ff] to-[#00ff9d] flex items-center justify-center text-black font-bold">AI</div>
          <span className="text-sm font-bold ca-display text-[#f5f5f5]">AgentHub</span>
        </div>

        <nav className="hidden md:flex gap-8 text-sm text-[#eaeaea]/70">
          <a href="#capabilities">Capabilities</a>
          <a href="#process">How it works</a>
          <a href="#infrastructure">Global</a>
          <a href="#integrations">Integrations</a>
          <a href="#pricing">Pricing</a>
        </nav>

        <div className="ml-auto flex items-center gap-3">
          <a className="text-sm text-[#eaeaea]/60 hover:text-white" href="/login">Sign in</a>
          <a href="#final-cta" className="inline-flex items-center rounded-md bg-[#00d4ff] px-4 py-2 text-sm font-semibold text-[#0a0a0a] hover:scale-105 transform transition">Get started</a>
        </div>
      </div>
    </motion.header>
  );
}

function Hero() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-120px" });

  return (
    <section id="top" ref={ref} className="relative min-h-[84vh] overflow-hidden bg-gradient-to-b from-[#0a0a0a] to-[#0d0e12] text-[#f5f5f5]">
      {/* background video placeholder: use <video> in real project */}
      <div className="absolute inset-0 opacity-30 bg-[radial-gradient(circle_at_20%_20%,rgba(0,212,255,0.06),transparent 20%),radial-gradient(circle_at_80%_70%,rgba(0,255,157,0.04),transparent 20%)] pointer-events-none" />

      <div className="relative z-10 mx-auto max-w-6xl px-6 py-28 text-center">
        <motion.h1 initial={{ opacity: 0, y: 20 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7 }} className="mx-auto max-w-4xl text-4xl sm:text-5xl md:text-6xl font-extrabold leading-tight tracking-tight">
          Build autonomous AI agents that ship work —
          <span className="ml-2 text-[#00d4ff]">observe, act, and scale</span>
        </motion.h1>

        <motion.p className="mx-auto mt-6 max-w-2xl text-lg text-[#eaeaea]/60" initial={{ opacity: 0 }} animate={isInView ? { opacity: 1 } : {}} transition={{ delay: 0.12 }}>
          AgentHub connects LLMs, tools, and infra into dependable deployed agents with observability, governance, and global scale.
        </motion.p>

        <motion.div className="mt-8 flex items-center justify-center gap-3" initial={{ opacity: 0 }} animate={isInView ? { opacity: 1 } : {}} transition={{ delay: 0.2 }}>
          <a href="#final-cta" className="rounded-md bg-[#00d4ff] px-5 py-3 text-sm font-semibold text-[#0b0b0b]">Start free</a>
          <a href="#interactive" className="rounded-md border border-white/[0.08] px-4 py-3 text-sm text-[#eaeaea]/70">Book a demo</a>
        </motion.div>

        {/* Inline stat callouts */}
        <motion.div className="mt-10 flex flex-wrap items-center justify-center gap-4" variants={stagger(0.08)} initial="hidden" animate={isInView ? "visible" : "hidden"}>
          {[
            { label: "active agents", value: 3500 },
            { label: "uptime", value: "99.7%" },
            { label: "avg latency", value: "<50ms" },
          ].map((s, i) => (
            <motion.div key={s.label} className="flex flex-col items-center justify-center rounded-lg border border-white/[0.06] bg-[#0b0b0b]/40 px-4 py-3 w-44" custom={i} variants={fadeUp}>
              <div className="text-xs font-mono text-[#a7f6ff]/60">{i < 2 ? (<span className="text-xs">{s.label.toUpperCase()}</span>) : <span className="text-xs">{s.label.toUpperCase()}</span>}</div>
              <div className="mt-1 text-2xl font-mono text-[#00d4ff]">{typeof s.value === 'number' ? <CountUp from={0} to={s.value} duration={1200} /> : s.value}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      <div className="pointer-events-none absolute bottom-8 left-1/2 -translate-x-1/2 rounded-full w-80 h-80 opacity-6 blur-3xl" />
    </section>
  );
}

function Capabilities() {
  const containerRef = useRef(null);
  const inView = useInView(containerRef, { once: true, margin: "-120px" });
  const features = [
    { id: "01", title: "Autonomous Workflows", description: "Chain tasks, tools and LLMs into resilient agents.", stat: ">90% task success" },
    { id: "02", title: "Observability", description: "Full traces, action logs, and replayable runs.", stat: "Traceable by default" },
    { id: "03", title: "Policy & Governance", description: "Fine-grained permissions, audits, and approvals.", stat: "Role-based controls" },
  ];

  return (
    <section id="capabilities" ref={containerRef} className="mx-auto max-w-6xl px-6 py-20">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }}>
        <h2 className="text-3xl font-bold">Capabilities</h2>
        <p className="mt-2 text-[#eaeaea]/60 max-w-2xl">Compose, test, and deploy agents with production-grade tooling.</p>

        <motion.div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-3" variants={stagger(0.08)} initial="hidden" animate={inView ? "visible" : "hidden"}>
          {features.map((f, idx) => (
            <motion.article key={f.id} className="group rounded-xl border border-white/[0.06] bg-[#070708]/60 p-5" variants={fadeUp} whileHover={{ y: -4, boxShadow: "0 10px 30px rgba(0,0,0,0.6)" }}>
              <div className="flex items-center gap-3">
                <div className="ca-mono rounded-md text-sm font-mono text-[#00d4ff]">{f.id}</div>
                <div>
                  <h3 className="text-lg font-bold">{f.title}</h3>
                  <div className="mt-1 text-sm text-[#eaeaea]/60">{f.description}</div>
                </div>
              </div>

              <div className="mt-4 flex items-center justify-between">
                <div className="font-mono text-sm text-[#aef9ff]/70">{f.stat}</div>
                <div className="w-24 h-14 rounded-md bg-gradient-to-br from-white/3 to-transparent" />
              </div>
            </motion.article>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
}

function Process() {
  const ref = useRef(null);
  const inView = useInView(ref, { margin: "-120px" });
  const steps = ["Define", "Assign", "Monitor"];
  return (
    <section id="process" ref={ref} className="mx-auto max-w-6xl px-6 py-20">
      <h2 className="text-3xl font-bold">How it works</h2>
      <p className="mt-2 text-[#eaeaea]/60 max-w-2xl">Three steps to production agents.</p>

      <div className="mt-8 flex w-full items-center justify-center">
        <div className="relative flex w-full max-w-4xl items-center justify-between">
          {/* connector line */}
          <svg className="absolute left-4 right-4 top-1/2 h-2" style={{ overflow: 'visible' }}>
            <line x1="0" x2="100%" y1="0" y2="0" stroke="#ffffff20" strokeWidth={1} strokeLinecap="round" />
          </svg>

          {steps.map((s, i) => (
            <motion.div key={s} initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ delay: i * 0.18 }} className="flex flex-col items-center gap-3">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#071016] border border-white/[0.06]">
                <div className="text-lg font-bold text-[#00d4ff]">{`0${i + 1}`}</div>
              </div>
              <div className="text-sm font-semibold">{s}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Infrastructure() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  const regions = ["us-west", "eu-central", "asia-east"];
  return (
    <section id="infrastructure" ref={ref} className="mx-auto max-w-6xl px-6 py-20">
      <h2 className="text-3xl font-bold">Global infrastructure</h2>
      <p className="mt-2 text-[#eaeaea]/60 max-w-2xl">Regions with live telemetry and failover.</p>

      <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2 items-start">
        <div className="rounded-xl border border-white/[0.06] bg-[#070708]/60 p-6">
          {/* lightweight map placeholder */}
          <div className="h-56 w-full rounded-md bg-gradient-to-br from-[#001b26]/50 to-transparent flex items-center justify-center text-sm text-[#eaeaea]/40">World map placeholder</div>
        </div>

        <div className="space-y-4">
          {regions.map((r, i) => (
            <motion.div key={r} className="flex items-center justify-between rounded-md border border-white/[0.06] p-4 bg-[#0b0b0b]/50" initial={{ opacity: 0, y: 12 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ delay: i * 0.12 }}>
              <div className="flex items-center gap-3">
                <span className="h-3 w-3 rounded-full bg-[#00ff9d] animate-pulse" />
                <div className="text-sm font-medium">{r.replace('-', ' ').toUpperCase()}</div>
              </div>
              <div className="text-sm font-mono text-[#aef9ff]">99.99% · 18ms</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function LiveMetrics() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  return (
    <section id="live" ref={ref} className="mx-auto max-w-6xl px-6 py-20">
      <div className="rounded-xl border border-white/[0.06] bg-[#060708]/60 p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-8 w-8 rounded-md bg-[#0b0b0b]/40 flex items-center justify-center font-mono text-sm text-[#00ff9d]">LIVE</div>
            <div>
              <div className="text-sm font-semibold">Active tasks</div>
              <div className="text-2xl font-mono text-[#00d4ff]"><CountUp from={0} to={12842} duration={1400} /></div>
            </div>
          </div>

          <div className="text-sm text-[#eaeaea]/60">Avg throughput <span className="font-mono text-[#aef9ff]">2.4k/s</span></div>
        </div>

        <div className="mt-6 h-36 w-full rounded-md bg-gradient-to-br from-[#001016] to-transparent p-4">
          {/* simple svg area sparkline */}
          <svg viewBox="0 0 600 140" className="w-full h-full">
            <motion.path d="M0 80 C80 40 160 120 240 60 C320 10 400 90 480 50 C560 10 600 70 600 70" fill="none" stroke="#00d4ff" strokeWidth={2} strokeLinecap="round" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1.6 }} />
          </svg>
        </div>
      </div>
    </section>
  );
}

function Integrations() {
  return (
    <section id="integrations" className="mx-auto max-w-6xl px-6 py-20">
      <h2 className="text-3xl font-bold">Integrations</h2>
      <p className="mt-2 text-[#eaeaea]/60 max-w-2xl">Plug into LLMs, messaging, storage and more.</p>

      <div className="mt-8 grid grid-cols-2 gap-4 md:grid-cols-6">
        {["OpenAI", "Anthropic", "Slack", "S3", "Postgres", "Redis" ].map((n, i) => (
          <div key={n} className="flex items-center justify-center rounded-md border border-white/[0.06] p-3 text-sm">{n}</div>
        ))}
        <div className="col-span-2 md:col-span-6 text-sm text-[#eaeaea]/60">+ 30 more connectors</div>
      </div>
    </section>
  );
}

function SecuritySection() {
  return (
    <section id="security" className="mx-auto max-w-6xl px-6 py-20">
      <h2 className="text-3xl font-bold">Security & compliance</h2>
      <p className="mt-2 text-[#eaeaea]/60">Isolated execution, end-to-end encryption, and continuous audit trails.</p>

      <div className="mt-6 flex flex-wrap gap-3">
        {[
          "Isolated execution",
          "Encryption at rest + transit",
          "Audit trails",
          "RBAC & policies",
        ].map((t) => (
          <div key={t} className="rounded-md border border-white/[0.06] bg-[#070708]/50 px-4 py-3 text-sm">{t}</div>
        ))}
      </div>

      <div className="mt-6 flex items-center gap-4">
        {['SOC 2', 'ISO 27001', 'HIPAA', 'GDPR'].map((b) => (
          <div key={b} className="rounded-md border border-white/[0.06] px-3 py-2 text-sm">{b}</div>
        ))}
        <div className="ml-auto font-mono text-sm text-[#00ff9d]">0 incidents</div>
      </div>
    </section>
  );
}

function SDK() {
  return (
    <section id="developers" className="mx-auto max-w-6xl px-6 py-20">
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
        <div className="rounded-xl border border-white/[0.06] bg-[#070708]/60 p-6">
          <div className="font-mono text-sm text-[#aef9ff]">npm i @agenthub/sdk</div>
          <pre className="mt-4 overflow-auto rounded-md bg-[#03030a] p-4 text-sm font-mono text-[#00d4ff]">{
`import AgentHub from '@agenthub/sdk'

const hub = new AgentHub({ apiKey: process.env.AGENTHUB_KEY })
await hub.runAgent('content-summarizer', { input: '...' })`}</pre>
        </div>

        <div className="space-y-4">
          <h3 className="text-2xl font-bold">For developers</h3>
          <ul className="space-y-2 text-[#eaeaea]/70">
            <li className="flex items-start gap-3"><span className="font-mono text-[#00d4ff]">•</span> SDKs for Node, Python, and Browser</li>
            <li className="flex items-start gap-3"><span className="font-mono text-[#00d4ff]">•</span> Local testing harness & replay</li>
            <li className="flex items-start gap-3"><span className="font-mono text-[#00d4ff]">•</span> CI plugins and infra templates</li>
          </ul>
        </div>
      </div>
    </section>
  );
}

function Testimonials() {
  return (
    <section id="testimonials" className="mx-auto max-w-6xl px-6 py-20 text-center">
      <blockquote className="mx-auto max-w-3xl text-xl font-semibold">"AgentHub reduced our operational toil by 70% — we trust agents to ship critical automation."</blockquote>
      <div className="mt-6 flex items-center justify-center gap-4">
        <img src="/logo192.png" className="h-12 w-12 rounded-full" alt="avatar" />
        <div>
          <div className="font-bold">Alex Morgan</div>
          <div className="text-sm text-[#eaeaea]/60">CTO, ExampleCorp</div>
        </div>
      </div>

      <div className="mt-8 flex items-center justify-center gap-6">
        {['Acme', 'Globex', 'Initech', 'Umbrella'].map((l) => (
          <div key={l} className="h-8 w-24 rounded-md bg-white/5 flex items-center justify-center text-sm">{l}</div>
        ))}
      </div>
    </section>
  );
}

function Pricing() {
  const plans = [
    { name: 'Starter', price: '$0', perks: ['50 agents', 'Community support'] },
    { name: 'Pro', price: '$49', perkBadge: 'Most Popular', perks: ['500 agents', 'SLA', 'Team seats'] },
    { name: 'Enterprise', price: 'Custom', perks: ['Unlimited', 'Dedicated support'] },
  ];
  return (
    <section id="pricing" className="mx-auto max-w-6xl px-6 py-20">
      <h2 className="text-3xl font-bold">Pricing</h2>
      <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-3">
        {plans.map((p, i) => (
          <div key={p.name} className={`rounded-xl border border-white/[0.06] p-6 ${p.perkBadge ? 'scale-102 border-[#00d4ff]/40 shadow-[0_10px_30px_rgba(0,212,255,0.06)]' : ''}`}>
            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm font-semibold">{p.name}</div>
                <div className="mt-2 text-3xl font-bold">{p.price}</div>
              </div>
              {p.perkBadge && <div className="rounded px-2 py-1 text-sm font-mono text-[#00d4ff]">{p.perkBadge}</div>}
            </div>

            <ul className="mt-4 space-y-2 text-[#eaeaea]/60">
              {p.perks.map((t) => (<li key={t}>• {t}</li>))}
            </ul>

            <div className="mt-6">
              <a className="inline-block rounded-md bg-[#00d4ff] px-4 py-2 text-sm font-semibold text-[#0a0a0a]">Get started</a>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function FinalCTA() {
  return (
    <section id="final-cta" className="mx-auto max-w-6xl px-6 py-20 text-center">
      <h2 className="text-3xl font-bold">Ready to deploy autonomous agents?</h2>
      <p className="mt-2 text-[#eaeaea]/60">1,000 free tasks · No credit card required</p>
      <div className="mt-6 flex items-center justify-center gap-4">
        <a className="rounded-md bg-[#00d4ff] px-6 py-3 text-sm font-semibold text-[#0a0a0a]">Start free</a>
        <a className="rounded-md border border-white/[0.08] px-6 py-3 text-sm text-[#eaeaea]/70">Book a demo</a>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="mt-16 border-t border-white/[0.04] bg-[#08090a] text-[#eaeaea]/60">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-6 py-8">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-md bg-gradient-to-br from-[#00d4ff] to-[#00ff9d] flex items-center justify-center text-black font-bold">AI</div>
          <div>
            <div className="font-bold text-[#f5f5f5]">AgentHub</div>
            <div className="text-sm">Ship autonomous agents safely.</div>
          </div>
        </div>

        <div className="flex items-center gap-6 text-sm">
          <div className="flex items-center gap-2"><span className="h-2 w-2 rounded-full bg-[#00ff9d] animate-pulse" /> All agents operational</div>
          <div className="flex items-center gap-2 text-[#eaeaea]/60">© {new Date().getFullYear()} AgentHub</div>
        </div>
      </div>
    </footer>
  );
}

export default function Landing() {
  return (
    <div className="bg-[#0a0a0a] text-[#f5f5f5]">
      <StickyNav />
      <main>
        <Hero />
        <Capabilities />
        <Process />
        <Infrastructure />
        <LiveMetrics />
        <Integrations />
        <SecuritySection />
        <SDK />
        <Testimonials />
        <Pricing />
        <FinalCTA />
      </main>
      <Footer />
    </div>
  );
}

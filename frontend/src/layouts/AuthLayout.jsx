import { Link, Outlet, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ShieldCheck, Lock, KeyRound, Eye, Zap, Globe } from "lucide-react";

/* ── Animated left-panel security feature list ── */
const features = [
  { icon: Lock, label: "Zero-Knowledge Architecture", sub: "Your master password never leaves your device" },
  { icon: ShieldCheck, label: "AES-256-GCM Encryption", sub: "Military-grade encryption at every layer" },
  { icon: Eye, label: "Breach Detection", sub: "Instant alerts via HaveIBeenPwned k-anonymity" },
  { icon: KeyRound, label: "Secure Password Generator", sub: "Cryptographically random passwords on demand" },
  { icon: Zap, label: "Instant Autofill", sub: "One-click credential fill across all your apps" },
  { icon: Globe, label: "Cross-Device Sync", sub: "Encrypted sync — same vault everywhere" },
];

/* ── Floating orb positions (deterministic, no random) ── */
const orbs = [
  { w: 320, h: 320, top: "-80px", left: "-80px", color: "from-indigo-500/30 to-purple-500/20", dur: 14 },
  { w: 260, h: 260, top: "40%", right: "-60px", color: "from-purple-500/25 to-pink-500/15", dur: 18 },
  { w: 200, h: 200, bottom: "60px", left: "20%", color: "from-indigo-400/20 to-cyan-400/10", dur: 12 },
];

/* ── Framer Motion variants ── */
const panelVariants = {
  hidden: { opacity: 0, x: 40 },
  show: { opacity: 1, x: 0, transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1] } },
  exit: { opacity: 0, x: -40, transition: { duration: 0.3, ease: "easeIn" } },
};

const featureVariants = {
  hidden: { opacity: 0, x: -24 },
  show: (i) => ({
    opacity: 1,
    x: 0,
    transition: { delay: 0.25 + i * 0.1, duration: 0.5, ease: [0.16, 1, 0.3, 1] },
  }),
};

export default function AuthLayout() {
  const location = useLocation();

  return (
    <div className="min-h-screen flex overflow-hidden bg-[#faf8f5]">
      {/* ═══════════════════════════════════════════════════════════
           LEFT PANEL — dark gradient brand + animated features
         ═══════════════════════════════════════════════════════════ */}
      <div className="relative hidden lg:flex lg:w-[48%] xl:w-[45%] flex-col justify-between overflow-hidden bg-gradient-to-br from-[#0f0c29] via-[#1e1b4b] to-[#150f3a] px-12 py-10">

        {/* Floating ambient orbs */}
        {orbs.map((orb, i) => (
          <motion.div
            key={i}
            animate={{ y: [0, -20, 0], x: [0, 10, 0] }}
            transition={{ duration: orb.dur, repeat: Infinity, ease: "easeInOut", delay: i * 2 }}
            className={`absolute rounded-full bg-gradient-to-br ${orb.color} blur-3xl pointer-events-none`}
            style={{
              width: orb.w,
              height: orb.h,
              top: orb.top,
              left: orb.left,
              right: orb.right,
              bottom: orb.bottom,
            }}
          />
        ))}

        {/* Dot grid overlay */}
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: "radial-gradient(rgba(165,180,252,0.6) 1px, transparent 1px)",
            backgroundSize: "28px 28px",
          }}
        />

        {/* Cipher ring decoration */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 90, repeat: Infinity, ease: "linear" }}
          className="absolute bottom-[-90px] right-[-90px] size-[400px] opacity-10"
        >
          <svg viewBox="0 0 200 200" className="w-full h-full text-indigo-300">
            <circle cx="100" cy="100" r="95" fill="none" stroke="currentColor" strokeWidth="0.6" strokeDasharray="3 7" />
            <circle cx="100" cy="100" r="78" fill="none" stroke="currentColor" strokeWidth="0.4" strokeDasharray="10 5" />
            <circle cx="100" cy="100" r="60" fill="none" stroke="currentColor" strokeWidth="0.8" strokeDasharray="2 6" />
            <polygon points="100,8 113,30 87,30" fill="none" stroke="currentColor" strokeWidth="0.6" />
            <polygon points="100,192 113,170 87,170" fill="none" stroke="currentColor" strokeWidth="0.6" />
          </svg>
        </motion.div>

        {/* ── Brand logo ── */}
        <Link to="/" className="relative z-10 flex items-center gap-3 group w-fit">
          <motion.div
            whileHover={{ scale: 1.08, rotate: -5 }}
            className="size-12 rounded-2xl bg-white/10 border border-white/20 flex items-center justify-center backdrop-blur-sm shadow-lg"
          >
            <ShieldCheck className="size-6 text-indigo-300" />
          </motion.div>
          <div>
            <p className="font-bold text-xl text-white tracking-tight leading-none">PassGuardian</p>
            <p className="text-[0.62rem] text-indigo-300/80 font-semibold tracking-widest uppercase mt-0.5">
              Zero-Knowledge Vault
            </p>
          </div>
        </Link>

        {/* ── Center hero copy ── */}
        <div className="relative z-10 space-y-8">
          <div className="space-y-3">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-500/20 border border-indigo-400/30 backdrop-blur-sm"
            >
              <span className="size-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-[0.7rem] font-semibold text-indigo-200 tracking-wide">End-to-End Encrypted</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15, duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
              className="text-4xl xl:text-5xl font-extrabold text-white leading-[1.1] tracking-tight"
            >
              Your passwords,{" "}
              <span className="bg-gradient-to-r from-indigo-300 via-purple-300 to-pink-300 bg-clip-text text-transparent">
                fortress-grade
              </span>{" "}
              secure.
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="text-sm text-indigo-200/70 leading-relaxed max-w-[340px]"
            >
              PassGuardian uses zero-knowledge encryption so your vault stays completely private — even from us.
            </motion.p>
          </div>

          {/* Feature list */}
          <div className="space-y-3.5">
            {features.map((f, i) => {
              const Icon = f.icon;
              return (
                <motion.div
                  key={f.label}
                  custom={i}
                  variants={featureVariants}
                  initial="hidden"
                  animate="show"
                  className="flex items-start gap-3.5 group"
                >
                  <div className="size-8 rounded-xl bg-white/8 border border-white/10 flex items-center justify-center shrink-0 group-hover:bg-indigo-500/20 group-hover:border-indigo-400/30 transition-colors">
                    <Icon className="size-4 text-indigo-300" />
                  </div>
                  <div>
                    <p className="text-[0.78rem] font-semibold text-white/90 leading-tight">{f.label}</p>
                    <p className="text-[0.67rem] text-indigo-300/60 mt-0.5 leading-snug">{f.sub}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* ── Footer stats ── */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9, duration: 0.6 }}
          className="relative z-10 flex items-center gap-6"
        >
          {[["AES-256", "Encryption"], ["0", "Data Breaches"], ["100%", "Private"]].map(([val, lbl]) => (
            <div key={lbl}>
              <p className="text-lg font-extrabold text-white">{val}</p>
              <p className="text-[0.62rem] text-indigo-300/60 font-medium uppercase tracking-wider">{lbl}</p>
            </div>
          ))}
        </motion.div>
      </div>

      {/* ═══════════════════════════════════════════════════════════
           RIGHT PANEL — auth form
         ═══════════════════════════════════════════════════════════ */}
      <div className="flex-1 flex flex-col min-h-screen overflow-y-auto">
        {/* Top mini-nav */}
        <header className="flex items-center justify-between px-6 sm:px-10 py-6">
          {/* Logo (mobile only — hidden on lg where the left panel shows) */}
          <Link to="/" className="flex items-center gap-2.5 lg:hidden group">
            <div className="size-9 rounded-xl bg-indigo-600 text-white flex items-center justify-center shadow-md shadow-indigo-500/20 group-hover:scale-105 transition-transform">
              <ShieldCheck className="size-4.5" />
            </div>
            <span className="font-bold text-base text-slate-900">PassGuardian</span>
          </Link>
          <div className="hidden lg:block" /> {/* spacer */}

          <Link
            to="/"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-indigo-600 transition-colors bg-white/80 backdrop-blur-sm px-3.5 py-2 rounded-full border border-slate-200/80 shadow-xs"
          >
            ← Back to Home
          </Link>
        </header>

        {/* Form centred area */}
        <main className="flex-1 flex items-center justify-center px-4 py-6">
          <AnimatePresence mode="wait">
            <motion.div
              key={location.pathname}
              variants={panelVariants}
              initial="hidden"
              animate="show"
              exit="exit"
              className="w-full max-w-md"
            >
              <Outlet />
            </motion.div>
          </AnimatePresence>
        </main>

        {/* Footer */}
        <footer className="px-6 py-4 text-center text-[0.68rem] text-slate-400">
          © {new Date().getFullYear()} PassGuardian. Protected by end-to-end zero-knowledge security.
        </footer>
      </div>
    </div>
  );
}

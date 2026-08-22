import { lazy, Suspense } from "react";
import Hero from "@/components/landing/Hero";

// Everything below the fold is code-split out of the initial bundle.
// Hero is the only section visible without scrolling, so it's the only
// one that should block first paint / LCP — Features, Security,
// InteractiveDemo, FAQ and CTA (which pull in gsap/framer-motion-heavy
// components like ScrollShowcase and SealMedallion) now load lazily
// once the browser is idle/scrolling, instead of shipping upfront.
const Features = lazy(() => import("@/components/landing/Features"));
const Security = lazy(() => import("@/components/landing/Security"));
const InteractiveDemo = lazy(() => import("@/components/landing/InteractiveDemo"));
const FAQ = lazy(() => import("@/components/landing/FAQ"));
const CTA = lazy(() => import("@/components/landing/CTA"));

export default function Landing() {
  return (
    <>
      <Hero />
      <Suspense fallback={null}>
        <Features />
        <Security />
        <InteractiveDemo />
        <FAQ />
        <CTA />
      </Suspense>
    </>
  );
}

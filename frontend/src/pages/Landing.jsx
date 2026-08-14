import Hero from "@/components/landing/Hero";
import Features from "@/components/landing/Features";
import Security from "@/components/landing/Security";
import InteractiveDemo from "@/components/landing/InteractiveDemo";
import FAQ from "@/components/landing/FAQ";
import CTA from "@/components/landing/CTA";

export default function Landing() {
  return (
    <>
      <Hero />
      <Features />
      <Security />
      <InteractiveDemo />
      <FAQ />
      <CTA />
    </>
  );
}

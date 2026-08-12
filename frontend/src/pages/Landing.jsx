import Hero from "@/components/landing/Hero";
import Features from "@/components/landing/Features";
import Security from "@/components/landing/Security";
import FAQ from "@/components/landing/FAQ";
import CTA from "@/components/landing/CTA";

export default function Landing() {
  return (
    <>
      <Hero />
      <div className="max-w-6xl mx-auto px-6 my-2">
        <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-indigo-200/60 to-transparent" />
      </div>
      <Features />
      <Security />
      <div className="max-w-6xl mx-auto px-6 my-2">
        <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-purple-200/60 to-transparent" />
      </div>
      <FAQ />
      <CTA />
    </>
  );
}


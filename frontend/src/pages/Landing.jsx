import AnimatedBackground from "@/components/animations/AnimatedBackground";
import ScrollToTop from "@/components/animations/ScrollToTop";
import Navbar from "@/components/landing/Navbar";
import Hero from "@/components/landing/Hero";
import Features from "@/components/landing/Features";
import Security from "@/components/landing/Security";
import FAQ from "@/components/landing/FAQ";
import CTA from "@/components/landing/CTA";
import Footer from "@/components/landing/Footer";

export default function Landing() {
  return (
    <main className="relative min-h-screen bg-[#faf8f5] text-slate-900 overflow-hidden">
      {/* Background Geometric Designs & Animations */}
      <AnimatedBackground />

      {/* Floating Scroll Progress Indicator */}
      <ScrollToTop />

      <div className="relative z-10">
        <Navbar />
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
        <Footer />
      </div>
    </main>
  );
}

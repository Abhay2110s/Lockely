import Navbar from "@/components/landing/Navbar";
import Hero from "@/components/landing/Hero";
import Features from "@/components/landing/Features";
import Security from "@/components/landing/Security";
import FAQ from "@/components/landing/FAQ";
import CTA from "@/components/landing/CTA";
import Footer from "@/components/landing/Footer";

export default function Landing() {
  return (
    <main
      className="
      relative
      min-h-screen
      overflow-hidden
      text-zinc-950
      bg-[#fff7fa]
      "
    >

      {/* Background Glow */}
      <div
        className="
        absolute
        -top-40
        -left-40
        w-[500px]
        h-[500px]
        rounded-full
        bg-pink-200/40
        blur-[120px]
        pointer-events-none
        "
      />


      <div
        className="
        absolute
        top-[800px]
        -right-40
        w-[450px]
        h-[450px]
        rounded-full
        bg-rose-200/40
        blur-[120px]
        pointer-events-none
        "
      />


      <div
        className="
        absolute
        bottom-0
        left-1/2
        -translate-x-1/2
        w-[600px]
        h-[300px]
        rounded-full
        bg-orange-100/40
        blur-[120px]
        pointer-events-none
        "
      />


      {/* Navbar */}
      <Navbar />


      {/* Hero */}
      <Hero />


      {/* Features */}
      <section id="features">
        <Features />
      </section>


      {/* Security */}
      <section id="security">
        <Security />
      </section>


      {/* FAQ */}
      <section id="faq">
        <FAQ />
      </section>


      {/* CTA */}
      <section id="cta">
        <CTA />
      </section>


      {/* Footer */}
      <Footer />


    </main>
  );
}
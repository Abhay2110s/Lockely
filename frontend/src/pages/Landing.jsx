import Navbar from "@/components/landing/Navbar";
import Hero from "@/components/landing/Hero";
import Features from "@/components/landing/Features";
import Security from "@/components/landing/Security";
import FAQ from "@/components/landing/FAQ";
import CTA from "@/components/landing/CTA";
import Footer from "@/components/landing/Footer";


export default function Landing() {
  return (
    <main className="pg-ledger pg-security-texture pg-grain relative min-h-screen overflow-hidden">
      <Navbar />
     
      <Hero />
      <div className="max-w-6xl mx-auto px-6">
        <div className="pg-perforation" />
      </div>
      <Features />
      <Security />
      <div className="max-w-6xl mx-auto px-6">
        <div className="pg-perforation" />
      </div>
      <FAQ />
      <CTA />
      <Footer />
    </main>
  );
}

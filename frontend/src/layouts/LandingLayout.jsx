import { Outlet } from "react-router-dom";
import Navbar from "@/components/landing/Navbar";
import Footer from "@/components/landing/Footer";
import AnimatedBackground from "@/components/animations/AnimatedBackground";
import ScrollToTop from "@/components/animations/ScrollToTop";

export default function LandingLayout() {
  return (
    <div className="relative min-h-screen bg-[#f8fafc] text-slate-900 overflow-hidden font-sans">
      {/* Soft Warm Aurora Ambient Layer */}
      <AnimatedBackground />
      <ScrollToTop />

      <div className="relative z-10">
        <Navbar />
        <main>
          <Outlet />
        </main>
        <Footer />
      </div>
    </div>
  );
}

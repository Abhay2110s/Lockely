import { Outlet } from "react-router-dom";
import Navbar from "@/components/landing/Navbar";
import Footer from "@/components/landing/Footer";
import ScrollToTop from "@/components/animations/ScrollToTop";

export default function LandingLayout() {
  return (
    <div className="relative min-h-screen bg-[#faf6ea] text-slate-900 overflow-x-hidden font-comic selection:bg-[#fef08a] selection:text-slate-950">
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

import { Outlet } from "react-router-dom";
import Navbar from "@/components/landing/Navbar";
import Footer from "@/components/landing/Footer";

export default function LandingLayout() {
  return (
    <div className="landing-page relative min-h-screen landing-bg text-[#EFF2FF] overflow-x-hidden">
      {/* Ambient glowing background accents in violet/orange */}
      <div className="pointer-events-none fixed top-[-120px] left-[-100px] w-[550px] h-[550px] rounded-full bg-[#3F3AA5]/20 blur-[130px]" />
      <div className="pointer-events-none fixed top-[25%] right-[-150px] w-[500px] h-[500px] rounded-full bg-[#6554DE]/15 blur-[140px]" />
      <div className="pointer-events-none fixed top-[60%] left-[5%] w-[600px] h-[600px] rounded-full bg-[#1A126E]/30 blur-[150px]" />
      <div className="pointer-events-none fixed bottom-[5%] right-[10%] w-[450px] h-[450px] rounded-full bg-[#FB9660]/10 blur-[130px]" />

      <div className="relative z-10 flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-1">
          <Outlet />
        </main>
        <Footer />
      </div>
    </div>
  );
}

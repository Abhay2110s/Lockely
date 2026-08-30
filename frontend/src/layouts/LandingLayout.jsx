import { Outlet } from "react-router-dom";
import Navbar from "@/components/landing/Navbar";
import Footer from "@/components/landing/Footer";

export default function LandingLayout() {
  return (
    <div className="relative min-h-screen landing-bg text-[#fff5f7] overflow-x-hidden">
      {/* Dynamic ambient glowing background elements */}
      <div className="aurora-orb-burgundy top-[-100px] left-[-100px] w-[500px] h-[500px]" />
      <div className="aurora-orb-blush top-[20%] right-[-150px] w-[450px] h-[450px]" />
      <div className="aurora-orb-burgundy top-[55%] left-[10%] w-[600px] h-[600px]" />
      <div className="aurora-orb-blush bottom-[10%] right-[15%] w-[500px] h-[500px]" />

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

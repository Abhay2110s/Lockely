import { Outlet } from "react-router-dom";
import Navbar from "@/components/landing/Navbar";
import Footer from "@/components/landing/Footer";

export default function LandingLayout() {
  return (
    <div className="relative min-h-screen bg-[#030b15] text-[#e2eaf8] overflow-x-hidden selection:bg-[rgba(0,212,255,0.2)] selection:text-white">
      <div className="relative z-10">
        <Navbar />
        <main className="bg-[#030b15]">
          <Outlet />
        </main>
        <Footer />
      </div>
    </div>
  );
}

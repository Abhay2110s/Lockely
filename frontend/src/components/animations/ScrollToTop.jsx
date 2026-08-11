import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function ScrollToTop() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      const currentProgress = (window.scrollY / totalScroll) * 100;
      setScrollProgress(currentProgress);
      setIsVisible(window.scrollY > 300);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const circumference = 2 * Math.PI * 18; // Radius 18

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          onClick={scrollToTop}
          title="Scroll Back To Top"
          className="fixed bottom-6 right-6 z-50 flex items-center justify-center size-12 rounded-full bg-white/90 backdrop-blur-md shadow-lg shadow-indigo-500/15 border border-slate-200/90 text-indigo-600 hover:scale-110 active:scale-95 transition-all group"
        >
          {/* Circular SVG Progress Bar Ring */}
          <svg className="absolute inset-0 size-full -rotate-90" viewBox="0 0 44 44">
            <circle
              cx="22"
              cy="22"
              r="18"
              fill="none"
              stroke="#e2e8f0"
              strokeWidth="3"
            />
            <circle
              cx="22"
              cy="22"
              r="18"
              fill="none"
              stroke="#6366f1"
              strokeWidth="3"
              strokeDasharray={circumference}
              strokeDashoffset={circumference - (scrollProgress / 100) * circumference}
              strokeLinecap="round"
              className="transition-all duration-150"
            />
          </svg>
          <ArrowUp className="size-5 text-indigo-600 group-hover:-translate-y-0.5 transition-transform" />
        </motion.button>
      )}
    </AnimatePresence>
  );
}

import { Variants } from "framer-motion";

// Reusable motion variants for the landing page
export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut",
      delay,
    },
  }),
};

export const stagger = (staggerChildren = 0.08) => ({
  visible: {
    transition: {
      staggerChildren,
    },
  },
});

export const hoverLift: Variants = {
  rest: { y: 0, boxShadow: "0 0 0 rgba(0,0,0,0)" },
  hover: {
    y: -4,
    boxShadow: "0 10px 30px rgba(0,0,0,0.6)",
    transition: { type: "spring", stiffness: 300, damping: 22 },
  },
};

export const pulse = {
  animate: {
    scale: [1, 1.06, 1],
    opacity: [1, 0.7, 1],
    transition: { duration: 2, repeat: Infinity, ease: "easeInOut" },
  },
};

export const navVariants: Variants = {
  top: { background: "rgba(10,10,10,0)", backdropFilter: "blur(0px)" },
  scrolled: { background: "rgba(13,14,18,0.6)", backdropFilter: "blur(8px)" },
};

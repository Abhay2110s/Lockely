import { motion } from "framer-motion";

export default function ScrollReveal({
  children,
  className = "",
  delay = 0,
  duration = 0.6,
  direction = "up",
  distance = 50,
}) {
  const getInitialPosition = () => {
    switch (direction) {
      case "up":
        return { y: distance, opacity: 0 };
      case "down":
        return { y: -distance, opacity: 0 };
      case "left":
        return { x: distance, opacity: 0 };
      case "right":
        return { x: -distance, opacity: 0 };
      case "scale":
        return { scale: 0.9, opacity: 0 };
      default:
        return { y: distance, opacity: 0 };
    }
  };

  const getAnimatePosition = () => {
    switch (direction) {
      case "up":
      case "down":
        return { y: 0, opacity: 1 };
      case "left":
      case "right":
        return { x: 0, opacity: 1 };
      case "scale":
        return { scale: 1, opacity: 1 };
      default:
        return { y: 0, opacity: 1 };
    }
  };

  return (
    <motion.div
      initial={getInitialPosition()}
      whileInView={getAnimatePosition()}
      viewport={{ once: false, amount: 0.2 }}
      transition={{
        duration: duration,
        delay: delay,
        ease: [0.16, 1, 0.3, 1], // Smooth custom cubic-bezier
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

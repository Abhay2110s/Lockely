import { motion } from "framer-motion";

export default function ShinyText({
  text,
  className = "",
  speed = 4,
}) {
  return (
    <span
      className={`inline-block relative overflow-hidden bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 via-pink-500 to-indigo-600 bg-[length:200%_100%] animate-shiny-sweep ${className}`}
      style={{
        animationDuration: `${speed}s`,
      }}
    >
      {text}
    </span>
  );
}

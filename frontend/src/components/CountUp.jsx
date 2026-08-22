import { useEffect, useRef } from "react";

// Minimal count-up hook/component using requestAnimationFrame
export default function CountUp({ from = 0, to = 1000, duration = 1200, format, onComplete }) {
  const ref = useRef(null);
  const startRef = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let cancelled = false;
    const start = performance.now();
    const run = (now) => {
      if (cancelled) return;
      if (!startRef.current) startRef.current = now;
      const progress = Math.min(1, (now - start) / duration);
      const value = Math.round(from + (to - from) * progress);
      el.textContent = format ? format(value) : value.toString();
      if (progress < 1) requestAnimationFrame(run);
      else if (onComplete) onComplete();
    };
    requestAnimationFrame(run);
    return () => {
      cancelled = true;
    };
  }, [from, to, duration, format, onComplete]);

  return <span ref={ref} />;
}

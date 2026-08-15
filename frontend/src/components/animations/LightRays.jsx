import { useEffect, useRef } from "react";

/**
 * LightRays
 * A lightweight, dependency-free canvas rendition of a rotating light-ray
 * sunburst, tuned to sit *subtly* on top of a light background (low alpha,
 * soft brand-colored beams rather than a stark WebGL glow). Purely
 * decorative — it never intercepts pointer events.
 */
export default function LightRays({
  raysOrigin = "top-center",
  raysColor = "#6366f1",
  raysSpeed = 1,
  lightSpread = 1,
  rayLength = 1.4,
  pulsating = false,
  fadeDistance = 1,
  saturation = 1,
  followMouse = true,
  mouseInfluence = 0.1,
  noiseAmount = 0,
  distortion = 0,
  raysCount = 10,
  opacity = 0.14,
  className = "",
}) {
  const canvasRef = useRef(null);
  const mouseRef = useRef({ x: 0.5, y: 0 });
  const rafRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");

    const prefersReduced =
      typeof window !== "undefined" && window.matchMedia
        ? window.matchMedia("(prefers-reduced-motion: reduce)").matches
        : false;

    let width = 0;
    let height = 0;
    let dpr = Math.min(window.devicePixelRatio || 1, 2);

    const resize = () => {
      const rect = canvas.parentElement.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas.parentElement);

    const originX = () => {
      const base = raysOrigin.includes("left") ? 0 : raysOrigin.includes("right") ? width : width * 0.5;
      const mouseShift = followMouse ? (mouseRef.current.x - 0.5) * width * mouseInfluence : 0;
      return base + mouseShift;
    };
    const originY = raysOrigin.includes("bottom") ? height : 0;

    const handleMove = (e) => {
      const rect = canvas.parentElement.getBoundingClientRect();
      mouseRef.current = {
        x: (e.clientX - rect.left) / rect.width,
        y: (e.clientY - rect.top) / rect.height,
      };
    };
    if (followMouse) window.addEventListener("pointermove", handleMove);

    let t = 0;
    const draw = () => {
      ctx.clearRect(0, 0, width, height);

      const ox = originX();
      const oy = originY;
      const len = Math.max(width, height) * rayLength;
      const spread = (Math.PI / 3) * lightSpread;
      const pulse = pulsating ? 1 + Math.sin(t * 1.4) * 0.06 : 1;
      const rotation = (prefersReduced ? 0 : t) * 0.06 * raysSpeed;

      ctx.save();
      ctx.filter = saturation !== 1 ? `saturate(${saturation})` : "none";

      for (let i = 0; i < raysCount; i++) {
        const angleBase = -Math.PI / 2 + (i / (raysCount - 1) - 0.5) * spread;
        const jitter = noiseAmount ? (Math.sin(i * 12.9898 + t) * noiseAmount * 0.05) : 0;
        const distort = distortion ? Math.sin(t * 0.5 + i) * distortion * 0.03 : 0;
        const angle = angleBase + rotation + jitter + distort;

        const rayWidth = (Math.PI / raysCount) * 1.6;
        const a1 = angle - rayWidth / 2;
        const a2 = angle + rayWidth / 2;

        const x1 = ox + Math.cos(a1) * len * pulse;
        const y1 = oy + Math.sin(a1) * len * pulse;
        const x2 = ox + Math.cos(a2) * len * pulse;
        const y2 = oy + Math.sin(a2) * len * pulse;

        const grad = ctx.createLinearGradient(ox, oy, (x1 + x2) / 2, (y1 + y2) / 2);
        grad.addColorStop(0, hexToRgba(raysColor, opacity));
        grad.addColorStop(Math.min(1, fadeDistance), hexToRgba(raysColor, 0));

        ctx.beginPath();
        ctx.moveTo(ox, oy);
        ctx.lineTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.closePath();
        ctx.fillStyle = grad;
        ctx.fill();
      }
      ctx.restore();

      t += 0.016;
      rafRef.current = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(rafRef.current);
      ro.disconnect();
      if (followMouse) window.removeEventListener("pointermove", handleMove);
    };
  }, [
    raysOrigin,
    raysColor,
    raysSpeed,
    lightSpread,
    rayLength,
    pulsating,
    fadeDistance,
    saturation,
    followMouse,
    mouseInfluence,
    noiseAmount,
    distortion,
    raysCount,
    opacity,
  ]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 ${className}`}
    />
  );
}

function hexToRgba(hex, alpha) {
  const clean = hex.replace("#", "");
  const bigint = parseInt(
    clean.length === 3
      ? clean.split("").map((c) => c + c).join("")
      : clean,
    16
  );
  const r = (bigint >> 16) & 255;
  const g = (bigint >> 8) & 255;
  const b = bigint & 255;
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

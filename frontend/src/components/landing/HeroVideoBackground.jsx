import { useEffect, useRef, useCallback } from "react";

/**
 * HeroVideoBackground — Elegant Light Luxury Canvas Background
 * Renders subtle architectural grid lines, delicate warm-gray coordinates,
 * and soft blush & burgundy floating circular particles over soft cream (#FDFBF7).
 */

const COLORS = {
  bg: "#FDFBF7",
  surface: "#FFFFFF",
  blush: "#F4C2C2",
  burgundy: "#8B263E",
  muted: "#6B6560",
  warmGray: "#E6E0D5",
};

function rand(min, max) {
  return Math.random() * (max - min) + min;
}

function hexToRgb(hex) {
  return {
    r: parseInt(hex.slice(1, 3), 16),
    g: parseInt(hex.slice(3, 5), 16),
    b: parseInt(hex.slice(5, 7), 16),
  };
}

function rgba({ r, g, b }, a) {
  return `rgba(${r},${g},${b},${a})`;
}

class Particle {
  constructor(w, h) { this.reset(w, h, true); }

  reset(w, h, initial = false) {
    this.x = initial ? rand(0, w) : rand(-20, w + 20);
    this.y = initial ? rand(0, h) : h + rand(10, 40);
    this.radius = rand(1.5, 3.5);
    this.speed = rand(0.2, 0.6);
    this.drift = rand(-0.15, 0.15);
    this.opacity = rand(0.25, 0.65);
    this.pulse = rand(0, Math.PI * 2);
    this.pulseSpeed = rand(0.01, 0.025);

    const palette = [COLORS.blush, COLORS.burgundy, COLORS.warmGray];
    this.color = hexToRgb(palette[Math.floor(rand(0, palette.length))]);
  }

  update(w, h) {
    this.y -= this.speed;
    this.x += this.drift;
    this.pulse += this.pulseSpeed;
    if (this.y < -10 || this.x < -30 || this.x > w + 30) this.reset(w, h);
  }

  draw(ctx) {
    const alpha = this.opacity * (0.6 + 0.4 * Math.sin(this.pulse));
    ctx.fillStyle = rgba(this.color, alpha);
    // Smooth circular particles
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.fill();
  }
}

function drawLightGrid(ctx, w, h, time) {
  const spacing = 80;
  const rgb = hexToRgb(COLORS.warmGray);
  ctx.lineWidth = 1;

  // Horizontal structural lines
  for (let y = 0; y < h; y += spacing) {
    ctx.strokeStyle = rgba(rgb, 0.45);
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(w, y);
    ctx.stroke();
  }

  // Vertical structural lines
  for (let x = 0; x < w; x += spacing) {
    ctx.strokeStyle = rgba(rgb, 0.45);
    ctx.beginPath();
    ctx.moveTo(x, 0);
    ctx.lineTo(x, h);
    ctx.stroke();
  }

  // Delicate blush accents at grid intersections
  const blushRgb = hexToRgb(COLORS.blush);
  ctx.fillStyle = rgba(blushRgb, 0.6);
  const dotSize = 2;

  for (let x = spacing; x < w; x += spacing * 2) {
    for (let y = spacing; y < h; y += spacing * 2) {
      ctx.beginPath();
      ctx.arc(x, y, dotSize, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  // Gentle ambient shimmer line
  const scanY = (time * 40) % (h + 100) - 50;
  ctx.strokeStyle = rgba(blushRgb, 0.2);
  ctx.beginPath();
  ctx.moveTo(0, scanY);
  ctx.lineTo(w, scanY);
  ctx.stroke();
}

export default function HeroVideoBackground() {
  const canvasRef = useRef(null);
  const animRef = useRef(null);
  const stateRef = useRef(null);

  const init = useCallback((canvas) => {
    const ctx = canvas.getContext("2d", { alpha: false });
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const w = canvas.clientWidth;
    const h = canvas.clientHeight;
    canvas.width = w * dpr;
    canvas.height = h * dpr;
    ctx.scale(dpr, dpr);

    const particleCount = Math.min(Math.floor(w * 0.035), 40);

    return {
      ctx, w, h, dpr,
      particles: Array.from({ length: particleCount }, () => new Particle(w, h)),
      time: 0,
    };
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    stateRef.current = init(canvas);

    const animate = () => {
      const s = stateRef.current;
      if (!s) return;
      const { ctx, w, h, particles } = s;
      s.time += 0.016;

      ctx.fillStyle = COLORS.bg;
      ctx.fillRect(0, 0, w, h);

      drawLightGrid(ctx, w, h, s.time);

      for (const p of particles) {
        if (!prefersReduced) p.update(w, h);
        p.draw(ctx);
      }

      animRef.current = requestAnimationFrame(animate);
    };

    animate();

    let resizeTimer;
    const handleResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => { stateRef.current = init(canvas); }, 200);
    };
    window.addEventListener("resize", handleResize);

    return () => {
      cancelAnimationFrame(animRef.current);
      window.removeEventListener("resize", handleResize);
      clearTimeout(resizeTimer);
    };
  }, [init]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="hero-video-canvas pointer-events-none absolute inset-0 z-0 w-full h-full"
    />
  );
}

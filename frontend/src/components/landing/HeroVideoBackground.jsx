import { useEffect, useRef, useCallback } from "react";

/**
 * HeroVideoBackground — High-Contrast Cinematic Brutalist Canvas Background
 * Renders technical grid lines, precise digital cyber-green (#00FF66) coordinates,
 * and stark off-white (#F8F9FA) particles over void black (#000000).
 */

const COLORS = {
  bg: "#000000",
  surface: "#111111",
  cyber: "#00FF66",
  white: "#F8F9FA",
  muted: "#6B7280",
  harsh: "#222222",
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
    this.radius = rand(1, 2.2);
    this.speed = rand(0.2, 0.7);
    this.drift = rand(-0.1, 0.1);
    this.opacity = rand(0.2, 0.7);
    this.pulse = rand(0, Math.PI * 2);
    this.pulseSpeed = rand(0.01, 0.03);

    const palette = [COLORS.cyber, COLORS.white, COLORS.muted];
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
    // Square pixel brutalist particles
    ctx.fillRect(this.x, this.y, this.radius * 2, this.radius * 2);
  }
}

function drawBrutalistGrid(ctx, w, h, time) {
  const spacing = 80;
  const rgb = hexToRgb(COLORS.harsh);
  ctx.lineWidth = 1;

  // Horizontal structural lines
  for (let y = 0; y < h; y += spacing) {
    ctx.strokeStyle = rgba(rgb, 0.35);
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(w, y);
    ctx.stroke();
  }

  // Vertical structural lines
  for (let x = 0; x < w; x += spacing) {
    ctx.strokeStyle = rgba(rgb, 0.35);
    ctx.beginPath();
    ctx.moveTo(x, 0);
    ctx.lineTo(x, h);
    ctx.stroke();
  }

  // Neon cyber-green crosshairs at grid intersections
  const cyberRgb = hexToRgb(COLORS.cyber);
  ctx.strokeStyle = rgba(cyberRgb, 0.25);
  ctx.lineWidth = 1;
  const crossSize = 4;

  for (let x = spacing; x < w; x += spacing * 2) {
    for (let y = spacing; y < h; y += spacing * 2) {
      ctx.beginPath();
      ctx.moveTo(x - crossSize, y);
      ctx.lineTo(x + crossSize, y);
      ctx.moveTo(x, y - crossSize);
      ctx.lineTo(x, y + crossSize);
      ctx.stroke();
    }
  }

  // Subtle scanning sweep line
  const scanY = (time * 60) % (h + 100) - 50;
  ctx.strokeStyle = rgba(cyberRgb, 0.12);
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

    const particleCount = Math.min(Math.floor(w * 0.04), 45);

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

      drawBrutalistGrid(ctx, w, h, s.time);

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
      className="hero-video-canvas"
    />
  );
}

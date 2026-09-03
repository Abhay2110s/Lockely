import { useEffect, useRef, useCallback } from "react";

/**
 * HeroVideoBackground — Procedural animated canvas backdrop for the Hero section.
 * Renders flowing particles, organic aurora ribbons, soft bokeh orbs, and drifting
 * grid-lines in the deep indigo/violet palette matching the RezonBio-inspired theme.
 */

// ── Colour palette (matches landing-theme.css violet tokens) ───────────
const COLORS = {
  bg: "#100c4a",
  violet950: "#0d0a3e",
  violet800: "#1A126E",
  violet700: "#241C7F",
  violet600: "#2A2292",
  violet500: "#3F3AA5",
  violet400: "#6554DE",
  violet300: "#8B7FF0",
  violet200: "#B4ADFA",
  violet100: "#D5D1FC",
  warmOrange: "#FB9660",
  warmYellow: "#FADD80",
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
    this.x = initial ? rand(0, w) : rand(-40, w + 40);
    this.y = initial ? rand(0, h) : h + rand(20, 80);
    this.radius = rand(1, 2.8);
    this.speed = rand(0.15, 0.55);
    this.drift = rand(-0.18, 0.18);
    this.opacity = rand(0.15, 0.5);
    this.pulse = rand(0, Math.PI * 2);
    this.pulseSpeed = rand(0.008, 0.022);

    const palette = [
      COLORS.violet300, COLORS.violet200, COLORS.violet400,
      COLORS.violet100, COLORS.warmOrange, COLORS.warmYellow,
    ];
    this.color = hexToRgb(palette[Math.floor(rand(0, palette.length))]);
  }

  update(w, h) {
    this.y -= this.speed;
    this.x += this.drift + Math.sin(this.pulse) * 0.12;
    this.pulse += this.pulseSpeed;
    if (this.y < -20 || this.x < -60 || this.x > w + 60) this.reset(w, h);
  }

  draw(ctx) {
    const alpha = this.opacity * (0.6 + 0.4 * Math.sin(this.pulse));
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.fillStyle = rgba(this.color, alpha);
    ctx.fill();
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius * 3.5, 0, Math.PI * 2);
    ctx.fillStyle = rgba(this.color, alpha * 0.1);
    ctx.fill();
  }
}

class BokehOrb {
  constructor(w, h) { this.init(w, h); }

  init(w, h) {
    this.x = rand(0, w);
    this.y = rand(0, h);
    this.radius = rand(60, 200);
    this.vx = rand(-0.1, 0.1);
    this.vy = rand(-0.07, 0.07);
    this.opacity = rand(0.04, 0.12);
    this.phase = rand(0, Math.PI * 2);
    this.phaseSpeed = rand(0.003, 0.009);

    const palette = [COLORS.violet500, COLORS.violet400, COLORS.violet600, COLORS.violet700];
    this.color = hexToRgb(palette[Math.floor(rand(0, palette.length))]);
  }

  update(w, h) {
    this.x += this.vx;
    this.y += this.vy;
    this.phase += this.phaseSpeed;
    if (this.x < -this.radius) this.x = w + this.radius;
    if (this.x > w + this.radius) this.x = -this.radius;
    if (this.y < -this.radius) this.y = h + this.radius;
    if (this.y > h + this.radius) this.y = -this.radius;
  }

  draw(ctx) {
    const alpha = this.opacity * (0.6 + 0.4 * Math.sin(this.phase));
    const grad = ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, this.radius);
    grad.addColorStop(0, rgba(this.color, alpha));
    grad.addColorStop(0.5, rgba(this.color, alpha * 0.35));
    grad.addColorStop(1, rgba(this.color, 0));
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.fillStyle = grad;
    ctx.fill();
  }
}

function drawAuroraRibbon(ctx, w, h, time, index) {
  const baseY = h * (0.25 + (index / 3) * 0.45);
  const amplitude = 40 + index * 18;
  const frequency = 0.0015 + index * 0.0004;
  const speed = time * (0.18 + index * 0.06);

  const palette = [
    { color: COLORS.violet400, opacity: 0.1 },
    { color: COLORS.violet300, opacity: 0.07 },
    { color: COLORS.warmOrange, opacity: 0.04 },
  ];

  const { color, opacity } = palette[index % palette.length];
  const rgb = hexToRgb(color);

  ctx.beginPath();
  ctx.moveTo(-20, h);
  for (let x = -20; x <= w + 20; x += 3) {
    const y =
      baseY +
      Math.sin(x * frequency + speed) * amplitude +
      Math.sin(x * frequency * 2.3 + speed * 0.7) * (amplitude * 0.35) +
      Math.cos(x * frequency * 0.5 + speed * 1.4) * (amplitude * 0.2);
    ctx.lineTo(x, y);
  }
  ctx.lineTo(w + 20, h);
  ctx.closePath();

  const grad = ctx.createLinearGradient(0, baseY - amplitude, 0, h);
  grad.addColorStop(0, rgba(rgb, opacity * 1.5));
  grad.addColorStop(0.3, rgba(rgb, opacity));
  grad.addColorStop(1, rgba(rgb, 0));
  ctx.fillStyle = grad;
  ctx.fill();
}

function drawFlowingGrid(ctx, w, h, time) {
  const spacing = 80;
  const rgb = hexToRgb(COLORS.violet600);
  ctx.lineWidth = 0.5;

  for (let y = 0; y < h; y += spacing) {
    const offset = Math.sin(y * 0.008 + time * 0.15) * 12;
    const alpha = 0.035 + 0.02 * Math.sin(y * 0.01 + time * 0.1);
    ctx.strokeStyle = rgba(rgb, alpha);
    ctx.beginPath();
    ctx.moveTo(0, y + offset);
    for (let x = 0; x < w; x += 20) {
      ctx.lineTo(x, y + offset + Math.sin(x * 0.005 + time * 0.08) * 4);
    }
    ctx.stroke();
  }

  for (let x = 0; x < w; x += spacing) {
    const offset = Math.cos(x * 0.006 + time * 0.12) * 8;
    const alpha = 0.025 + 0.015 * Math.sin(x * 0.01 + time * 0.1);
    ctx.strokeStyle = rgba(rgb, alpha);
    ctx.beginPath();
    ctx.moveTo(x + offset, 0);
    for (let y = 0; y < h; y += 20) {
      ctx.lineTo(x + offset + Math.cos(y * 0.004 + time * 0.06) * 3, y);
    }
    ctx.stroke();
  }
}

function drawCentralPulse(ctx, w, h, time) {
  const cx = w * 0.5;
  const cy = h * 0.38;
  const baseRadius = Math.min(w, h) * 0.35;
  const pulseRadius = baseRadius + Math.sin(time * 0.2) * 30;
  const rgb = hexToRgb(COLORS.violet400);

  const grad = ctx.createRadialGradient(cx, cy, 0, cx, cy, pulseRadius);
  grad.addColorStop(0, rgba(rgb, 0.06 + Math.sin(time * 0.15) * 0.02));
  grad.addColorStop(0.5, rgba(rgb, 0.02));
  grad.addColorStop(1, rgba(rgb, 0));
  ctx.beginPath();
  ctx.arc(cx, cy, pulseRadius, 0, Math.PI * 2);
  ctx.fillStyle = grad;
  ctx.fill();
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

    const particleCount = Math.min(Math.floor(w * 0.06), 70);
    const orbCount = Math.min(Math.floor(w * 0.005) + 3, 8);

    return {
      ctx, w, h, dpr,
      particles: Array.from({ length: particleCount }, () => new Particle(w, h)),
      bokehOrbs: Array.from({ length: orbCount }, () => new BokehOrb(w, h)),
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
      const { ctx, w, h, particles, bokehOrbs } = s;
      s.time += 0.016;

      ctx.fillStyle = COLORS.bg;
      ctx.fillRect(0, 0, w, h);

      drawFlowingGrid(ctx, w, h, s.time);
      for (let i = 0; i < 3; i++) drawAuroraRibbon(ctx, w, h, s.time, i);
      drawCentralPulse(ctx, w, h, s.time);

      for (const orb of bokehOrbs) {
        if (!prefersReduced) orb.update(w, h);
        orb.draw(ctx);
      }
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

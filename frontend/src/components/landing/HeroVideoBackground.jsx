import { useEffect, useRef, useCallback } from "react";

/**
 * HeroVideoBackground — Elegant Light Luxury Canvas Background
 * Renders subtle architectural grid lines, delicate warm-gray coordinates,
 * and soft blush & burgundy floating circular particles over a warm cream
 * background (#EFE6D8).
 *
 * Performance notes:
 * - The static grid + dot lattice is rendered ONCE onto an offscreen
 *   canvas and blitted with drawImage() every frame instead of being
 *   re-stroked line-by-line 60x/sec — this is the main-thread cost that
 *   used to dominate the animation loop.
 * - The loop is fully stopped (not just throttled) when the user prefers
 *   reduced motion, and paused when the tab is hidden, instead of
 *   burning CPU in the background forever.
 * - The loop is capped at ~30fps — plenty smooth for slow-drifting
 *   particles and a soft scanline, at half the main-thread cost of 60fps.
 */

const COLORS = {
  bg: "#EFE6D8",
  surface: "#FFFFFF",
  blush: "#F4C2C2",
  burgundy: "#8B263E",
  muted: "#6B6560",
  warmGray: "#DDD4C4",
};

const FRAME_INTERVAL = 1000 / 30; // cap at ~30fps

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
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.fill();
  }
}

// Renders the static grid + dot lattice once onto an offscreen canvas so
// the animation loop only has to drawImage() it instead of re-stroking
// dozens of lines and dots every frame.
function renderStaticGridLayer(w, h, dpr) {
  const layer = document.createElement("canvas");
  layer.width = w * dpr;
  layer.height = h * dpr;
  const ctx = layer.getContext("2d");
  ctx.scale(dpr, dpr);

  ctx.fillStyle = COLORS.bg;
  ctx.fillRect(0, 0, w, h);

  const spacing = 80;
  const rgb = hexToRgb(COLORS.warmGray);
  ctx.lineWidth = 1;
  ctx.strokeStyle = rgba(rgb, 0.45);

  ctx.beginPath();
  for (let y = 0; y < h; y += spacing) {
    ctx.moveTo(0, y);
    ctx.lineTo(w, y);
  }
  for (let x = 0; x < w; x += spacing) {
    ctx.moveTo(x, 0);
    ctx.lineTo(x, h);
  }
  ctx.stroke();

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

  return layer;
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

    const particleCount = Math.min(Math.floor(w * 0.025), 28);

    return {
      ctx, w, h, dpr,
      staticLayer: renderStaticGridLayer(w, h, dpr),
      particles: Array.from({ length: particleCount }, () => new Particle(w, h)),
      time: 0,
    };
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    let reduced = motionQuery.matches;

    stateRef.current = init(canvas);

    const drawStaticFrame = () => {
      const s = stateRef.current;
      if (!s) return;
      s.ctx.drawImage(s.staticLayer, 0, 0, s.w, s.h);
      for (const p of s.particles) p.draw(s.ctx);
    };

    let lastFrameTime = 0;
    const animate = (now) => {
      animRef.current = requestAnimationFrame(animate);
      if (now - lastFrameTime < FRAME_INTERVAL) return;
      lastFrameTime = now;

      const s = stateRef.current;
      if (!s) return;
      const { ctx, w, h, particles, staticLayer } = s;
      s.time += FRAME_INTERVAL / 1000;

      ctx.drawImage(staticLayer, 0, 0, w, h);

      const blushRgb = hexToRgb(COLORS.blush);
      const scanY = (s.time * 40) % (h + 100) - 50;
      ctx.strokeStyle = rgba(blushRgb, 0.2);
      ctx.beginPath();
      ctx.moveTo(0, scanY);
      ctx.lineTo(w, scanY);
      ctx.stroke();

      for (const p of particles) {
        p.update(w, h);
        p.draw(ctx);
      }
    };

    const startLoop = () => {
      if (animRef.current) return;
      lastFrameTime = 0;
      animRef.current = requestAnimationFrame(animate);
    };
    const stopLoop = () => {
      if (animRef.current) cancelAnimationFrame(animRef.current);
      animRef.current = null;
    };

    if (reduced) {
      drawStaticFrame();
    } else {
      startLoop();
    }

    const handleMotionChange = (e) => {
      reduced = e.matches;
      if (reduced) {
        stopLoop();
        drawStaticFrame();
      } else if (document.visibilityState === "visible") {
        startLoop();
      }
    };
    motionQuery.addEventListener("change", handleMotionChange);

    // Don't burn CPU animating a canvas nobody can see.
    const handleVisibility = () => {
      if (document.visibilityState === "hidden") {
        stopLoop();
      } else if (!reduced) {
        startLoop();
      }
    };
    document.addEventListener("visibilitychange", handleVisibility);

    let resizeTimer;
    const handleResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        stateRef.current = init(canvas);
        if (reduced) drawStaticFrame();
      }, 200);
    };
    window.addEventListener("resize", handleResize);

    return () => {
      stopLoop();
      motionQuery.removeEventListener("change", handleMotionChange);
      document.removeEventListener("visibilitychange", handleVisibility);
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

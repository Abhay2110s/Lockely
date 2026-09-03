import { useEffect, useRef, useCallback } from "react";

/**
 * DashboardBackground — Luxury Architectural Grid & Particle Canvas
 * Renders subtle architectural grid lines, delicate rose-blush intersection dots,
 * and soft floating circular particles over the cream theme background (#FDFBF7).
 *
 * Performance features:
 * - Offscreen canvas pre-rendering for static grid lines & dots (zero continuous draw overhead)
 * - 30fps animation cap for minimal main-thread and GPU impact
 * - Automatic loop pause when tab is hidden or user prefers reduced motion
 * - pointer-events-none to prevent any interaction conflicts
 */

const COLORS = {
  bg: "#FDFBF7",
  surface: "#FFFFFF",
  blush: "#D9778A",
  burgundy: "#8B263E",
  muted: "#6B6560",
  warmGray: "#C4B9AA",
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
  constructor(w, h) {
    this.reset(w, h, true);
  }

  reset(w, h, initial = false) {
    this.x = initial ? rand(0, w) : rand(-20, w + 20);
    this.y = initial ? rand(0, h) : h + rand(10, 40);
    this.radius = rand(1.2, 2.8);
    this.speed = rand(0.15, 0.45);
    this.drift = rand(-0.12, 0.12);
    this.opacity = rand(0.3, 0.65);
    this.pulse = rand(0, Math.PI * 2);
    this.pulseSpeed = rand(0.01, 0.02);

    const palette = [COLORS.blush, COLORS.burgundy, COLORS.warmGray];
    this.color = hexToRgb(palette[Math.floor(rand(0, palette.length))]);
  }

  update(w, h) {
    this.y -= this.speed;
    this.x += this.drift;
    this.pulse += this.pulseSpeed;
    if (this.y < -10 || this.x < -30 || this.x > w + 30) {
      this.reset(w, h);
    }
  }

  draw(ctx) {
    const alpha = this.opacity * (0.6 + 0.4 * Math.sin(this.pulse));
    ctx.fillStyle = rgba(this.color, alpha);
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.fill();
  }
}

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
  ctx.strokeStyle = rgba(rgb, 0.5);

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
  ctx.fillStyle = rgba(blushRgb, 0.65);
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

export default function DashboardBackground() {
  const canvasRef = useRef(null);
  const animRef = useRef(null);
  const stateRef = useRef(null);

  const init = useCallback((canvas) => {
    const w = canvas.clientWidth;
    const h = canvas.clientHeight;
    // Guard against a 0x0 read — can happen if init runs before the
    // fixed-position wrapper has been laid out (e.g. right as the
    // sidebar transition kicks off on a breakpoint change). Returning
    // null lets the caller retry on the next frame instead of building
    // a static layer and particle set that never actually renders.
    if (w === 0 || h === 0) return null;

    const ctx = canvas.getContext("2d", { alpha: false });
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = w * dpr;
    canvas.height = h * dpr;
    ctx.scale(dpr, dpr);

    const particleCount = Math.min(Math.floor(w * 0.02), 22);

    return {
      ctx,
      w,
      h,
      dpr,
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
    let retryTimer = null;

    stateRef.current = init(canvas);

    const drawStaticFrame = () => {
      const s = stateRef.current;
      if (!s) return;
      s.ctx.drawImage(s.staticLayer, 0, 0, s.w, s.h);
      for (const p of s.particles) p.draw(s.ctx);
    };

    // Canvas measured 0x0 this frame (e.g. init ran mid-layout during a
    // breakpoint/sidebar transition) — retry shortly instead of leaving
    // the background permanently blank until the next resize event.
    if (!stateRef.current) {
      retryTimer = setTimeout(() => {
        stateRef.current = init(canvas);
        if (stateRef.current && reduced) drawStaticFrame();
      }, 50);
    }

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
      clearTimeout(retryTimer);
    };
  }, [init]);

  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden" aria-hidden="true">
      <canvas
        ref={canvasRef}
        className="w-full h-full block"
      />
      {/* Soft Ambient Vignette */}
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,transparent_60%,rgba(244,194,194,0.12)_100%)]"
        aria-hidden="true"
      />
    </div>
  );
}

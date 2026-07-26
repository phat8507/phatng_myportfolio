import { useEffect, useRef } from "react";
import { cn } from "../../lib/utils";
import { useViewMode, type ViewMode } from "../../lib/view-mode";

interface ModeReactiveBackgroundProps {
  className?: string;
}

interface StylePreset {
  /** Node + connecting-line color, as an "r, g, b" triplet for rgba() strings. */
  rgb: string;
  connectDistance: number;
  lineStyle: "straight" | "curved";
  grid: boolean;
  /** Upward drift bias per frame - negative pulls nodes gently upward ("growth"). */
  driftY: number;
  nodeRadius: number;
  glow: boolean;
}

// Both modes share the same color and motion so the site still reads as
// one design - only a couple of small touches shift with the active mode.
const PRESETS: Record<ViewMode, StylePreset> = {
  coordination: {
    rgb: "37, 99, 235",
    connectDistance: 140,
    lineStyle: "straight",
    grid: true,
    driftY: 0,
    nodeRadius: 1.7,
    glow: false,
  },
  ld: {
    rgb: "37, 99, 235",
    connectDistance: 125,
    lineStyle: "curved",
    grid: false,
    driftY: -0.015,
    nodeRadius: 1.7,
    glow: false,
  },
};

const NODE_COUNT = 85;
const BG_COLOR = "#F7F9FC";
const GRID_SPACING = 44;

class Node {
  x = 0;
  y = 0;
  vx = 0;
  vy = 0;

  constructor(width: number, height: number) {
    this.x = Math.random() * width;
    this.y = Math.random() * height;
    this.vx = (Math.random() - 0.5) * 0.3;
    this.vy = (Math.random() - 0.5) * 0.3;
  }

  update(width: number, height: number, driftY: number, mouse: { x: number; y: number }) {
    this.vy += driftY * 0.02;

    const dx = mouse.x - this.x;
    const dy = mouse.y - this.y;
    const dist = Math.sqrt(dx * dx + dy * dy);
    const radius = 140;
    if (dist < radius) {
      const force = (radius - dist) / radius;
      this.vx -= (dx / (dist || 1)) * force * 0.6;
      this.vy -= (dy / (dist || 1)) * force * 0.6;
    }

    this.x += this.vx;
    this.y += this.vy;
    this.vx *= 0.98;
    this.vy *= 0.98;

    if (this.x < -20) this.x = width + 20;
    if (this.x > width + 20) this.x = -20;
    if (this.y < -20) this.y = height + 20;
    if (this.y > height + 20) this.y = -20;
  }
}

function buildGridPattern(width: number, height: number, dpr: number) {
  const off = document.createElement("canvas");
  off.width = width * dpr;
  off.height = height * dpr;
  const ctx = off.getContext("2d");
  if (!ctx) return off;
  ctx.scale(dpr, dpr);
  ctx.fillStyle = "rgba(37, 99, 235, 0.05)";
  for (let x = 0; x < width; x += GRID_SPACING) {
    for (let y = 0; y < height; y += GRID_SPACING) {
      ctx.beginPath();
      ctx.arc(x, y, 1, 0, Math.PI * 2);
      ctx.fill();
    }
  }
  return off;
}

export function ModeReactiveBackground({ className }: ModeReactiveBackgroundProps) {
  const { mode } = useViewMode();
  const modeRef = useRef<ViewMode>(mode);
  modeRef.current = mode;

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = container.clientWidth;
    let height = container.clientHeight;
    let nodes: Node[] = [];
    let animationFrameId: number;
    let gridPattern: HTMLCanvasElement | null = null;
    const dpr = window.devicePixelRatio || 1;
    const mouse = { x: -1000, y: -1000 };

    const init = () => {
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.scale(dpr, dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;

      nodes = Array.from({ length: NODE_COUNT }, () => new Node(width, height));
      gridPattern = buildGridPattern(width, height, dpr);
    };

    const drawLine = (a: Node, b: Node, style: StylePreset, alpha: number) => {
      ctx.beginPath();
      ctx.moveTo(a.x, a.y);
      if (style.lineStyle === "curved") {
        const mx = (a.x + b.x) / 2;
        const my = (a.y + b.y) / 2;
        const dx = b.x - a.x;
        const dy = b.y - a.y;
        // Perpendicular offset for a gentle organic curve.
        const curveAmount = 0.06;
        ctx.quadraticCurveTo(mx - dy * curveAmount, my + dx * curveAmount, b.x, b.y);
      } else {
        ctx.lineTo(b.x, b.y);
      }
      ctx.strokeStyle = `rgba(${style.rgb}, ${alpha})`;
      ctx.lineWidth = 1;
      ctx.stroke();
    };

    const animate = () => {
      const style = PRESETS[modeRef.current];

      ctx.globalAlpha = 1;
      ctx.fillStyle = BG_COLOR;
      ctx.fillRect(0, 0, width, height);

      if (style.grid && gridPattern) {
        ctx.drawImage(gridPattern, 0, 0, width, height);
      }

      for (const node of nodes) {
        node.update(width, height, style.driftY, mouse);
      }

      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const a = nodes[i];
          const b = nodes[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < style.connectDistance) {
            const alpha = (1 - dist / style.connectDistance) * 0.22;
            drawLine(a, b, style, alpha);
          }
        }
      }

      for (const node of nodes) {
        if (style.glow) {
          const gradient = ctx.createRadialGradient(node.x, node.y, 0, node.x, node.y, style.nodeRadius * 4);
          gradient.addColorStop(0, `rgba(${style.rgb}, 0.55)`);
          gradient.addColorStop(1, `rgba(${style.rgb}, 0)`);
          ctx.fillStyle = gradient;
          ctx.beginPath();
          ctx.arc(node.x, node.y, style.nodeRadius * 4, 0, Math.PI * 2);
          ctx.fill();
        }
        ctx.fillStyle = `rgba(${style.rgb}, 0.75)`;
        ctx.beginPath();
        ctx.arc(node.x, node.y, style.nodeRadius, 0, Math.PI * 2);
        ctx.fill();
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    const handleResize = () => {
      width = container.clientWidth;
      height = container.clientHeight;
      init();
    };

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    };

    const handleMouseLeave = () => {
      mouse.x = -1000;
      mouse.y = -1000;
    };

    init();
    animate();

    window.addEventListener("resize", handleResize);
    container.addEventListener("mousemove", handleMouseMove);
    container.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      window.removeEventListener("resize", handleResize);
      container.removeEventListener("mousemove", handleMouseMove);
      container.removeEventListener("mouseleave", handleMouseLeave);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div ref={containerRef} className={cn("relative w-full h-full bg-[#F7F9FC] overflow-hidden", className)}>
      <canvas ref={canvasRef} className="block w-full h-full" />
    </div>
  );
}

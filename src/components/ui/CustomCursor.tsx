import { useEffect, useRef, useState, type CSSProperties } from "react";

const HOVER_SELECTOR = [
  "a",
  "button",
  '[role="button"]',
  ".project-card",
  ".skill-card",
  ".education-card",
  ".contact-card",
  '[data-cursor="hover"]',
].join(",");

const INPUT_SELECTOR = [
  "input",
  "textarea",
  "select",
  "pre",
  "code",
  '[contenteditable="true"]',
  '[data-cursor="input"]',
].join(",");

const MAGNETIC_SELECTOR = ".motion-button, [data-magnetic]";
const MAGNETIC_STRENGTH = 0.32;
const MAGNETIC_MAX = 14;

interface Burst {
  id: number;
  x: number;
  y: number;
}

export function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement | null>(null);
  const dotRef = useRef<HTMLDivElement | null>(null);
  const ringRef = useRef<HTMLDivElement | null>(null);
  const frameRef = useRef<number | null>(null);
  const targetRef = useRef({ x: 0, y: 0 });
  const ringRefPosition = useRef({ x: 0, y: 0 });
  const magneticElRef = useRef<HTMLElement | null>(null);
  const burstIdRef = useRef(0);
  const [enabled, setEnabled] = useState(false);
  const [bursts, setBursts] = useState<Burst[]>([]);

  useEffect(() => {
    const mediaQuery = window.matchMedia(
      "(hover: hover) and (pointer: fine) and (min-width: 768px) and (prefers-reduced-motion: no-preference)"
    );

    const syncEnabled = () => {
      setEnabled(mediaQuery.matches);
      document.documentElement.classList.toggle("custom-cursor-enabled", mediaQuery.matches);
    };

    syncEnabled();
    mediaQuery.addEventListener("change", syncEnabled);

    return () => {
      mediaQuery.removeEventListener("change", syncEnabled);
      document.documentElement.classList.remove("custom-cursor-enabled");
    };
  }, []);

  useEffect(() => {
    if (!enabled) {
      return;
    }

    const cursor = cursorRef.current;
    const dot = dotRef.current;
    const ring = ringRef.current;

    if (!cursor || !dot || !ring) {
      return;
    }

    const clearMagnetic = () => {
      const el = magneticElRef.current;
      if (el) {
        el.style.transform = "";
        magneticElRef.current = null;
      }
    };

    const setCursorMode = (target: EventTarget | null) => {
      const element = target instanceof Element ? target : null;
      const isInput = Boolean(element?.closest(INPUT_SELECTOR));
      const isHover = !isInput && Boolean(element?.closest(HOVER_SELECTOR));

      cursor.classList.toggle("is-input", isInput);
      cursor.classList.toggle("is-hover", isHover);
    };

    const applyMagnetic = (event: MouseEvent) => {
      const target = (event.target as Element | null)?.closest(MAGNETIC_SELECTOR) as HTMLElement | null;

      if (target !== magneticElRef.current) {
        clearMagnetic();
        magneticElRef.current = target;
        if (target) target.style.transition = "transform 120ms ease-out";
      }

      if (target) {
        const rect = target.getBoundingClientRect();
        const dx = event.clientX - (rect.left + rect.width / 2);
        const dy = event.clientY - (rect.top + rect.height / 2);
        const x = Math.max(-MAGNETIC_MAX, Math.min(MAGNETIC_MAX, dx * MAGNETIC_STRENGTH));
        const y = Math.max(-MAGNETIC_MAX, Math.min(MAGNETIC_MAX, dy * MAGNETIC_STRENGTH));
        target.style.transform = `translate(${x}px, ${y}px)`;
      }
    };

    const moveCursor = (event: MouseEvent) => {
      targetRef.current.x = event.clientX;
      targetRef.current.y = event.clientY;

      dot.style.transform = `translate3d(${event.clientX}px, ${event.clientY}px, 0) translate(-50%, -50%)`;
      setCursorMode(event.target);
      applyMagnetic(event);
    };

    const animateRing = () => {
      const target = targetRef.current;
      const position = ringRefPosition.current;

      position.x += (target.x - position.x) * 0.18;
      position.y += (target.y - position.y) * 0.18;

      ring.style.transform = `translate3d(${position.x}px, ${position.y}px, 0) translate(-50%, -50%)`;
      frameRef.current = window.requestAnimationFrame(animateRing);
    };

    const showCursor = () => {
      cursor.classList.add("is-visible");
    };

    const hideCursor = () => {
      cursor.classList.remove("is-visible", "is-hover", "is-input");
      clearMagnetic();
    };

    const handleClick = (event: MouseEvent) => {
      const isInput = Boolean((event.target as Element | null)?.closest(INPUT_SELECTOR));
      if (isInput) return;

      burstIdRef.current += 1;
      const id = burstIdRef.current;
      setBursts((current) => [...current, { id, x: event.clientX, y: event.clientY }]);
      window.setTimeout(() => {
        setBursts((current) => current.filter((b) => b.id !== id));
      }, 620);
    };

    window.addEventListener("mousemove", moveCursor, { passive: true });
    window.addEventListener("mouseenter", showCursor);
    window.addEventListener("mouseleave", hideCursor);
    window.addEventListener("click", handleClick);
    document.addEventListener("mouseover", showCursor, { passive: true });
    frameRef.current = window.requestAnimationFrame(animateRing);

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      window.removeEventListener("mouseenter", showCursor);
      window.removeEventListener("mouseleave", hideCursor);
      window.removeEventListener("click", handleClick);
      document.removeEventListener("mouseover", showCursor);
      clearMagnetic();

      if (frameRef.current !== null) {
        window.cancelAnimationFrame(frameRef.current);
      }
    };
  }, [enabled]);

  if (!enabled) {
    return null;
  }

  return (
    <>
      <svg className="cursor-goo-filter" aria-hidden="true" focusable="false">
        <filter id="cursor-goo">
          <feGaussianBlur in="SourceGraphic" stdDeviation="7" result="blur" />
          <feColorMatrix
            in="blur"
            mode="matrix"
            values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 24 -10"
            result="goo"
          />
          <feBlend in="SourceGraphic" in2="goo" />
        </filter>
      </svg>

      <div ref={cursorRef} className="custom-cursor" aria-hidden="true">
        <div className="custom-cursor-goo">
          <div ref={ringRef} className="custom-cursor-ring" />
          <div ref={dotRef} className="custom-cursor-dot" />
        </div>
      </div>

      <div className="cursor-burst-layer" aria-hidden="true">
        {bursts.map((burst) => (
          <div
            key={burst.id}
            className="cursor-burst"
            style={{ left: burst.x, top: burst.y }}
          >
            {Array.from({ length: 8 }).map((_, i) => (
              <span
                key={i}
                className="cursor-burst-particle"
                style={{ "--angle": `${i * 45}deg` } as CSSProperties}
              />
            ))}
          </div>
        ))}
      </div>
    </>
  );
}

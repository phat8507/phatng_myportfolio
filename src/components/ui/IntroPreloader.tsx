import { useEffect, useRef } from 'react';
import { animate, stagger, utils } from 'animejs';

interface IntroPreloaderProps {
  onComplete: () => void;
}

type PausableAnimation = {
  pause?: () => void;
} | null;

export function IntroPreloader({ onComplete }: IntroPreloaderProps) {
  const overlayRef = useRef<HTMLDivElement>(null);
  const wordmarkRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const subtitleRef = useRef<HTMLDivElement>(null);
  const accentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let finished = false;
    let running = true;

    let gridAnimation: PausableAnimation = null;
    let titleInAnimation: PausableAnimation = null;
    let subtitleInAnimation: PausableAnimation = null;
    let accentInAnimation: PausableAnimation = null;
    let wordmarkOutAnimation: PausableAnimation = null;
    let overlayOutAnimation: PausableAnimation = null;

    function finish() {
      if (finished) return;

      finished = true;
      running = false;

      onComplete();
    }

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      finish();
      return;
    }

    const overlay = overlayRef.current;
    const wordmark = wordmarkRef.current;
    const title = titleRef.current;
    const subtitle = subtitleRef.current;
    const accent = accentRef.current;

    if (!overlay || !wordmark || !title || !subtitle || !accent) {
      finish();
      return;
    }

    const $squares = utils.$('.intro-square');

    function animateGrid() {
      if (!running) return;

      gridAnimation = animate($squares, {
        scale: [
          { to: [0, 1.25] },
          { to: 0 },
        ],
        boxShadow: [
          { to: '0 0 1rem 0 rgba(37, 99, 235, 0.1)' },
          { to: '0 0 0rem 0 currentColor' },
        ],
        delay: stagger(100, {
          grid: [11, 4],
          from: utils.random(0, 11 * 4),
        }),
        onComplete: animateGrid,
      });
    }

    animateGrid();

    titleInAnimation = animate(title, {
      opacity: [0, 1],
      translateY: [12, 0],
      scale: [0.985, 1],
      duration: 540,
      ease: 'outCubic',
      delay: 360,
    });

    subtitleInAnimation = animate(subtitle, {
      opacity: [0, 1],
      translateY: [8, 0],
      duration: 460,
      ease: 'outCubic',
      delay: 600,
    });

    accentInAnimation = animate(accent, {
      opacity: [0, 0.72],
      scaleX: [0, 1],
      duration: 520,
      ease: 'outCubic',
      delay: 780,
    });

    wordmarkOutAnimation = animate(wordmark, {
      opacity: [1, 0],
      translateY: [0, -12],
      duration: 360,
      ease: 'inCubic',
      delay: 1600,
    });

    const exitTimer = window.setTimeout(() => {
      running = false;

      overlay.style.pointerEvents = 'none';

      overlayOutAnimation = animate(overlay, {
        opacity: [1, 0],
        duration: 420,
        ease: 'outCubic',
        onComplete: finish,
      });
    }, 2200);

    const safetyTimer = window.setTimeout(() => {
      finish();
    }, 3500);

    return () => {
      running = false;

      window.clearTimeout(exitTimer);
      window.clearTimeout(safetyTimer);

      try {
        gridAnimation?.pause?.();
        titleInAnimation?.pause?.();
        subtitleInAnimation?.pause?.();
        accentInAnimation?.pause?.();
        wordmarkOutAnimation?.pause?.();
        overlayOutAnimation?.pause?.();
      } catch {
        // Ignore cleanup errors
      }
    };
  }, [onComplete]);

  return (
    <div
      ref={overlayRef}
      aria-hidden="true"
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9999,
        overflow: 'hidden',
        background: '#F7F9FC',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        opacity: 1,
      }}
    >
      <div
        style={{
          position: 'absolute',
          inset: 0,
          display: 'grid',
          gridTemplateColumns: 'repeat(11, 1fr)',
          gridTemplateRows: 'repeat(4, 1fr)',
          color: '#EAF2FF',
          background: 'linear-gradient(180deg, #FFFFFF 0%, #F7F9FC 100%)',
        }}
      >
        {Array.from({ length: 11 * 4 }).map((_, index) => (
          <div
            key={index}
            className="intro-square"
            style={{
              width: '100%',
              height: '100%',
              background: 'rgba(37, 99, 235, 0.035)',
              transform: 'scale(0)',
              transformOrigin: 'center',
              willChange: 'transform, box-shadow',
              backfaceVisibility: 'hidden',
            }}
          />
        ))}
      </div>

      <div
        ref={wordmarkRef}
        style={{
          position: 'relative',
          zIndex: 10,
          textAlign: 'center',
          pointerEvents: 'none',
          userSelect: 'none',
          transform: 'translateZ(0)',
          willChange: 'transform, opacity',
          padding: '0 1.5rem',
        }}
      >
        <div
          aria-hidden="true"
          style={{
            position: 'absolute',
            inset: '50% auto auto 50%',
            width: 'min(18rem, 70vw)',
            height: 'min(18rem, 70vw)',
            borderRadius: '999px',
            background:
              'radial-gradient(circle, rgba(37, 99, 235, 0.08) 0%, rgba(56, 189, 248, 0.045) 38%, transparent 70%)',
            transform: 'translate(-50%, -50%)',
            filter: 'blur(4px)',
            zIndex: -1,
          }}
        />

        <div
          ref={titleRef}
          style={{
            fontFamily: "'Playfair Display', Georgia, 'Times New Roman', serif",
            fontSize: 'clamp(2.15rem, 5vw, 3.35rem)',
            fontWeight: 700,
            letterSpacing: '0',
            lineHeight: 1.1,
            color: '#0B1220',
            opacity: 0,
            textShadow: '0 18px 42px rgba(15, 42, 74, 0.08)',
            willChange: 'transform, opacity',
          }}
        >
          Phat Nguyen
        </div>

        <div
          ref={subtitleRef}
          style={{
            fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif",
            fontSize: 'clamp(0.58rem, 1.2vw, 0.74rem)',
            fontWeight: 700,
            letterSpacing: '0.28em',
            textTransform: 'uppercase',
            color: '#2563EB',
            marginTop: '0.65rem',
            opacity: 0,
            willChange: 'transform, opacity',
          }}
        >
          MY PORTFOLIO
        </div>

        <div
          ref={accentRef}
          style={{
            width: '64px',
            height: '2px',
            margin: '1rem auto 0',
            borderRadius: '999px',
            background: 'linear-gradient(90deg, #2563EB 0%, #38BDF8 100%)',
            opacity: 0,
            transform: 'scaleX(0)',
            transformOrigin: 'center',
            boxShadow: '0 0 18px rgba(37, 99, 235, 0.18)',
            willChange: 'transform, opacity',
          }}
        >
          <div
            aria-hidden="true"
            style={{
              width: '100%',
              height: '100%',
              borderRadius: 'inherit',
              background:
                'linear-gradient(90deg, transparent 0%, rgba(255, 255, 255, 0.75) 50%, transparent 100%)',
              opacity: 0.45,
            }}
          />
        </div>
      </div>
    </div>
  );
}

/**
 * PageTransitionWrapper.jsx — "Dental Glass Morph" route transition system.
 *
 * A bespoke liquid-glass navigation experience, timed to ~1s total:
 *   1 · Outgoing content smoothly fades while scaling down a touch (1.5%)
 *   2 · A soft translucent mint/teal glass lens expands from viewport centre
 *   3 · A diagonally travelling cyan/teal light gradient ("shine sweep")
 *        crosses the screen while a tiny brand mark pulses at cover apex
 *   4 · The lens contracts, revealing the incoming page through its soft,
 *        masked edge while the new content rises 22px into place
 *
 * Engineering notes:
 *   • Zero backdrop-filter on the lens disc (GPU-friendly on Android); glass
 *     feel comes from layered translucent gradients + inner glow instead
 *   • Rapid navigation is safe: the active timeline is killed and re-based
 *     before a new one starts — no tween conflicts, no stuck states
 *   • Works identically for browser back/forward (keyed on pathname)
 *   • prefers-reduced-motion → instant swap with scroll reset, zero tweens
 *   • Exports <ToothMark /> (brand SVG) shared by Navbar/Footer/3D fallback
 */
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import gsap from "gsap";

/* Minimal pearlescent tooth mark (loader + transition apex + brand) */
function ToothMark({ className = "w-10 h-10" }) {
  return (
    <svg viewBox="0 0 48 48" fill="none" className={className} aria-hidden="true">
      <path
        d="M14 6c-5 0-9 4.4-9 10.2 0 4 1.7 6.2 2.9 9.6 1.4 3.8 2.1 12 3.9 14.4 1.5 2 3.9 1.4 4.6-1 .9-3 1.2-8.2 3-9.9a4.6 4.6 0 0 1 5.2 0c1.8 1.7 2.1 6.9 3 9.9.7 2.4 3.1 3 4.6 1 1.8-2.4 2.5-10.6 3.9-14.4 1.2-3.4 2.9-5.6 2.9-9.6C39 10.4 35 6 30 6c-2.6 0-4.2 1.2-6 1.2S16.6 6 14 6Z"
        fill="url(#toothGrad)"
      />
      <defs>
        <linearGradient id="toothGrad" x1="5" y1="6" x2="43" y2="42">
          <stop stopColor="#0D9488" />
          <stop offset="1" stopColor="#0284C7" />
        </linearGradient>
      </defs>
    </svg>
  );
}

export { ToothMark };

export default function PageTransitionWrapper({ children }) {
  const { pathname } = useLocation();
  const firstVisit = useRef(true);
  const activeTl = useRef(null);
  const reducedMotion = useRef(
    typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );

  /* Intro loader state */
  const [introDone, setIntroDone] = useState(false);
  const [pct, setPct] = useState(0);
  const introRef = useRef(null);
  const introBarRef = useRef(null);

  /* Glass-morph transition refs */
  const contentRef = useRef(null); // wraps live page content
  const glassRef = useRef(null); // expanding translucent lens
  const shineRef = useRef(null); // travelling light gradient
  const apexRef = useRef(null); // brand mark pulse at full cover

  /* Centre + park the lens before first paint so no flash can occur.
     GSAP fully owns this element's transform from here on. */
  useLayoutEffect(() => {
    gsap.set(glassRef.current, { xPercent: -50, yPercent: -50, scale: 0 });
    gsap.set(shineRef.current, { xPercent: -140 });
  }, []);

  /* ---- Initial loader (runs exactly once, ~1.1s total, non-blocking brand
         beat on the porcelain canvas — never a plain white gate) -------- */
  useEffect(() => {
    if (reducedMotion.current) {
      setIntroDone(true);
      return;
    }
    const counter = { v: 0 };
    const tl = gsap.timeline({ onComplete: () => setIntroDone(true) });
    tl.to(counter, {
      v: 100,
      duration: 0.4,
      ease: "power2.inOut",
      onUpdate: () => setPct(Math.round(counter.v)),
    })
      .to(introBarRef.current, { scaleX: 1, duration: 0.4, ease: "power2.inOut" }, 0)
      .to(introRef.current, {
        yPercent: -100,
        duration: 0.45,
        ease: "power4.inOut",
        delay: 0.05,
      });
    return () => tl.kill();
  }, []);

  /* ---- Dental Glass Morph on every route change ----------------------- */
  useEffect(() => {
    if (firstVisit.current) {
      firstVisit.current = false;
      return;
    }

    /* Reduced motion: instant, accessible swap */
    if (reducedMotion.current) {
      window.scrollTo({ top: 0, left: 0, behavior: "instant" });
      return;
    }

    /* Kill any in-flight transition and re-base elements (rapid nav safe) */
    activeTl.current?.kill();
    gsap.set(contentRef.current, { opacity: 1, scale: 1, y: 0, transformOrigin: "50% 32%" });
    gsap.set(glassRef.current, { xPercent: -50, yPercent: -50, scale: 0, opacity: 1 });
    gsap.set(shineRef.current, { xPercent: -140 });
    gsap.set(apexRef.current, { opacity: 0, scale: 0.86 });

    const tl = gsap.timeline();
    activeTl.current = tl;

    /* 1 — Outgoing content: fades & scales down gently (200ms) */
    tl.to(contentRef.current, {
      opacity: 0,
      scale: 0.985,
      y: 8,
      duration: 0.2,
      ease: "power2.in",
    }, 0)

      /* 2 — Glass lens expands from centre to cover the viewport (360ms) */
      .fromTo(
        glassRef.current,
        { scale: 0 },
        { scale: 1, duration: 0.36, ease: "power3.inOut" },
        0.04
      )

      /* 3 — Cyan/teal shine sweep travels across while lens expands */
      .fromTo(
        shineRef.current,
        { xPercent: -140 },
        { xPercent: 140, duration: 0.55, ease: "power2.inOut" },
        0.03
      )

      /* Brand mark pulses once at the apex of full cover */
      .to(apexRef.current, { opacity: 1, scale: 1, duration: 0.13, ease: "power2.out" }, 0.26)
      .to(apexRef.current, { opacity: 0, scale: 0.92, duration: 0.16, ease: "power2.in" }, 0.45)

      /* Scroll reset happens under full cover */
      .add(() => window.scrollTo({ top: 0, left: 0, behavior: "instant" }), 0.4)

      /* 4 — Lens contracts: the incoming page reveals through its edge */
      .to(glassRef.current, { scale: 0, duration: 0.4, ease: "power3.inOut" }, 0.48)

      /* 5 — New content rises softly into place through the clearing glass */
      .fromTo(
        contentRef.current,
        { opacity: 0, y: 18, scale: 1 },
        { opacity: 1, y: 0, duration: 0.35, ease: "power2.out" },
        0.56
      )

      /* Park everything back at rest */
      .set(shineRef.current, { xPercent: -140 })
      .set(glassRef.current, { opacity: 1 });

    return () => tl.kill();
  }, [pathname]);

  return (
    <>
      {/* Live page content — the morph animates this wrapper */}
      <div ref={contentRef} className="will-change-transform">
        {children}
      </div>

      {/* Glass-morph overlay layers (transition only) */}
      <div className="fixed inset-0 z-[90] pointer-events-none overflow-hidden" aria-hidden="true">
        {/* Travelling cyan/teal shine band */}
        <div
          ref={shineRef}
          className="absolute inset-y-0 -left-[20%] w-[140%]"
          style={{
            transform: "translateX(-140%)",
            background:
              "linear-gradient(105deg, transparent 32%, rgba(153,246,228,0.28) 44%, rgba(94,234,212,0.30) 50%, rgba(125,211,252,0.28) 56%, transparent 68%)",
            mixBlendMode: "screen",
          }}
        />
        {/* Translucent glass lens — scale 0 → 1 from viewport centre.
            Positioning + transforms are GSAP-owned (see useLayoutEffect). */}
        <div
          ref={glassRef}
          className="absolute left-1/2 top-1/2 rounded-full"
          style={{
            width: "180vmax",
            height: "180vmax",
            background:
              "radial-gradient(circle at 50% 46%, rgba(255,255,255,0.97) 0%, rgba(240,253,250,0.93) 34%, rgba(204,251,241,0.88) 62%, rgba(224,242,254,0.82) 100%)",
            boxShadow:
              "inset 0 0 140px rgba(255,255,255,0.9), inset 0 -60px 160px rgba(13,148,136,0.12), 0 0 120px rgba(153,246,228,0.35)",
          }}
        />
        {/* Brand mark pulse at cover apex */}
        <div ref={apexRef} className="absolute inset-0 grid place-items-center" style={{ opacity: 0 }}>
          <div className="clay w-16 h-16 rounded-[22px] grid place-items-center">
            <ToothMark className="w-8 h-8" />
          </div>
        </div>
      </div>

      {/* Initial full-screen glass loader */}
      {!introDone && (
        <div
          ref={introRef}
          className="fixed inset-0 z-[100] grid place-items-center page-canvas"
          role="status"
          aria-label="Loading Pearl Dental Studio"
        >
          <div className="flex flex-col items-center gap-6 px-6">
            {/* Pulsing orbital rings around the tooth mark */}
            <div className="relative grid place-items-center w-32 h-32">
              <span className="absolute inset-0 rounded-full border-2 border-teal-300/60 animate-pulse-ring" />
              <span
                className="absolute inset-3 rounded-full border border-sky-300/50 animate-pulse-ring"
                style={{ animationDelay: "0.6s" }}
              />
              <div className="clay w-20 h-20 rounded-[24px] grid place-items-center">
                <ToothMark className="w-9 h-9" />
              </div>
            </div>

            <div className="text-center">
              <p className="font-display font-bold text-xl tracking-tight text-gradient">
                Pearl Dental Studio
              </p>
              <p className="text-sm text-slate-med mt-1">Preparing your calm visit…</p>
            </div>

            {/* Progress rail — transform owned by GSAP */}
            <div className="w-56 max-w-[70vw]">
              <div className="clay-inset h-3 rounded-full overflow-hidden">
                <div
                  ref={introBarRef}
                  className="h-full w-full origin-left rounded-full bg-gradient-to-r from-teal-500 via-cyan-400 to-sky-500"
                  style={{ transform: "scaleX(0)" }}
                />
              </div>
              <p className="mt-3 text-center font-display text-sm font-semibold text-teal-700 tabular-nums">
                {pct}%
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

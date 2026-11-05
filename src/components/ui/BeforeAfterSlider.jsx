/**
 * BeforeAfterSlider.jsx — Ethically-labelled smile comparison slider.
 * A single demo image is rendered twice: the "before" layer applies a
 * desaturating clinical filter and is clipped by clip-path as the handle
 * drags. Pointer (mouse/touch/pen) + keyboard arrows both move the divider.
 */
import { useCallback, useRef, useState } from "react";
import { MoveHorizontal } from "lucide-react";

export default function BeforeAfterSlider({ image, alt }) {
  const [pos, setPos] = useState(50);
  const trackRef = useRef(null);
  const dragging = useRef(false);

  /* Convert a horizontal client coordinate into a clamped percentage */
  const updateFromClientX = useCallback((clientX) => {
    const rect = trackRef.current?.getBoundingClientRect();
    if (!rect) return;
    const next = ((clientX - rect.left) / rect.width) * 100;
    setPos(Math.min(96, Math.max(4, next)));
  }, []);

  const onPointerDown = (e) => {
    dragging.current = true;
    e.currentTarget.setPointerCapture?.(e.pointerId);
    updateFromClientX(e.clientX);
  };
  const onPointerMove = (e) => dragging.current && updateFromClientX(e.clientX);
  const stop = () => (dragging.current = false);

  const onKeyDown = (e) => {
    if (e.key === "ArrowLeft") setPos((p) => Math.max(4, p - 4));
    if (e.key === "ArrowRight") setPos((p) => Math.min(96, p + 4));
  };

  return (
    <div
      ref={trackRef}
      className="relative w-full aspect-[4/3] rounded-[26px] overflow-hidden select-none cursor-ew-resize shadow-clay border border-white/80"
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={stop}
      onPointerLeave={stop}
      role="slider"
      aria-label="Before and after comparison slider (demo imagery)"
      aria-valuenow={Math.round(pos)}
      aria-valuemin={0}
      aria-valuemax={100}
      tabIndex={0}
      onKeyDown={onKeyDown}
    >
      {/* AFTER — full treatment layer */}
      <img src={image} alt={alt} className="absolute inset-0 w-full h-full object-cover" draggable="false" loading="lazy" decoding="async" />

      {/* BEFORE — filtered & clipped layer */}
      <div className="absolute inset-0" style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}>
        <img
          src={image}
          alt=""
          aria-hidden="true"
          draggable="false"
          loading="lazy"
          decoding="async"
          className="absolute inset-0 w-full h-full object-cover"
          style={{ filter: "saturate(0.55) sepia(0.22) brightness(0.9) contrast(0.94)" }}
        />
      </div>

      {/* Labels */}
      <span className="absolute top-3 left-3 rounded-full bg-slate-900/55 text-white text-[10px] font-display font-bold uppercase tracking-[0.14em] px-3 py-1.5 backdrop-blur-sm">
        Before
      </span>
      <span className="absolute top-3 right-3 rounded-full bg-teal-600/85 text-white text-[10px] font-display font-bold uppercase tracking-[0.14em] px-3 py-1.5 backdrop-blur-sm">
        After
      </span>

      {/* Divider + clay handle */}
      <div className="absolute top-0 bottom-0" style={{ left: `${pos}%` }} aria-hidden="true">
        <div className="absolute inset-y-0 -left-px w-[3px] bg-white/90 shadow-[0_0_14px_rgba(13,148,136,0.55)]" />
        <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-11 h-11 rounded-full glass-deep grid place-items-center text-teal-700 shadow-clay">
          <MoveHorizontal size={18} />
        </div>
      </div>
    </div>
  );
}

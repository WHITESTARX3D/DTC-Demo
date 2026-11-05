/**
 * BookingModal.jsx — Accessible glassmorphic dialog hosting BookingForm.
 * Opens globally via BookingContext with an optional treatment preset.
 * Handles: GSAP entrance, Escape-to-close, overlay click close, body scroll
 * lock and initial focus management. aria-modal + role="dialog".
 */
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { X, CalendarHeart } from "lucide-react";
import { useBooking } from "../../context/BookingContext";
import BookingForm from "./BookingForm";

export default function BookingModal() {
  const { isOpen, presetTreatment, closeBooking } = useBooking();
  const overlayRef = useRef(null);
  const panelRef = useRef(null);

  /* Entrance animation + scroll lock + focus + Escape */
  useEffect(() => {
    if (!isOpen) return;

    document.body.style.overflow = "hidden";
    const ctx = gsap.context(() => {
      gsap.fromTo(overlayRef.current, { opacity: 0 }, { opacity: 1, duration: 0.3, ease: "power2.out" });
      gsap.fromTo(
        panelRef.current,
        { y: 46, opacity: 0, scale: 0.96 },
        { y: 0, opacity: 1, scale: 1, duration: 0.55, ease: "power3.out", delay: 0.05 }
      );
    });

    const onKey = (e) => e.key === "Escape" && closeBooking();
    document.addEventListener("keydown", onKey);
    panelRef.current?.querySelector("input, select, button")?.focus();

    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", onKey);
      ctx.revert();
    };
  }, [isOpen, closeBooking]);

  if (!isOpen) return null;

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-[85] grid place-items-center p-4 bg-teal-950/30 backdrop-blur-md"
      onClick={(e) => e.target === overlayRef.current && closeBooking()}
      role="presentation"
    >
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="booking-modal-title"
        className="clay-lg w-full max-w-2xl max-h-[88vh] overflow-y-auto p-6 sm:p-9 relative"
      >
        {/* Header */}
        <div className="flex items-start justify-between gap-4 mb-6">
          <div className="flex items-center gap-3.5">
            <span className="clay-sm w-12 h-12 rounded-2xl grid place-items-center text-teal-700">
              <CalendarHeart size={22} />
            </span>
            <div>
              <h2 id="booking-modal-title" className="font-display font-bold text-xl sm:text-2xl text-navy-deep tracking-tight">
                Book Your Visit
              </h2>
              <p className="text-sm text-slate-med">60 seconds, zero pressure — we confirm by phone.</p>
            </div>
          </div>
          <button
            type="button"
            onClick={closeBooking}
            aria-label="Close booking dialog"
            className="clay-sm w-10 h-10 rounded-full grid place-items-center text-slate-500 hover:text-navy-deep transition-all hover:-translate-y-0.5 active:scale-90"
          >
            <X size={18} />
          </button>
        </div>

        <BookingForm initialTreatment={presetTreatment} onSuccess={closeBookingSoon} />
      </div>
    </div>
  );

  /* Briefly let the success state breathe, then the user closes manually.
     (Kept as a no-op helper for future auto-close wiring.) */
  function closeBookingSoon() {}
}

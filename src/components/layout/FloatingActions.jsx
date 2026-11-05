/**
 * FloatingActions.jsx — Persistent conversion layer.
 * • Floating WhatsApp FAB (emerald clay/glass, gentle pulse ring) bottom-right
 *   on every viewport, lifted above the mobile bar on small screens.
 * • Mobile-only sticky glass bottom bar (<768px): "Call Clinic" + "Book
 *   Appointment" — always one thumb-tap from conversion.
 */
import { MessageCircle, Phone, CalendarCheck } from "lucide-react";
import { CLINIC, buildWhatsAppLink } from "../../data/clinicData";
import { useBooking } from "../../context/BookingContext";

export default function FloatingActions() {
  const { openBooking, isOpen } = useBooking();

  return (
    <>
      {/* Floating WhatsApp FAB */}
      {!isOpen && (
        <a
          href={buildWhatsAppLink(
            "Hello Pearl Dental Studio! I'd like to chat about a demo appointment."
          )}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Chat with the clinic on WhatsApp"
          className="fixed z-[70] bottom-24 right-4 md:bottom-6 md:right-6 group"
        >
          <span className="absolute inset-0 rounded-full bg-emerald-400/50 animate-pulse-ring" aria-hidden="true" />
          <span className="relative grid w-14 h-14 rounded-full place-items-center text-white bg-gradient-to-br from-emerald-400 to-emerald-600 shadow-[0_16px_32px_-8px_rgba(16,185,129,0.55),inset_0_2px_6px_rgba(255,255,255,0.45),inset_0_-4px_8px_rgba(4,120,87,0.4)] transition-transform duration-300 group-hover:-translate-y-1.5 group-hover:rotate-6 group-active:scale-90">
            <MessageCircle size={24} strokeWidth={2.1} />
          </span>
          <span className="pointer-events-none absolute right-full mr-3 top-1/2 -translate-y-1/2 whitespace-nowrap rounded-full glass-deep px-3.5 py-2 text-xs font-semibold text-emerald-800 opacity-0 translate-x-2 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0 hidden md:block">
            Questions? Chat instantly
          </span>
        </a>
      )}

      {/* Mobile sticky bottom CTA bar */}
      <div className="fixed inset-x-0 bottom-0 z-[70] md:hidden" role="region" aria-label="Quick actions">
        <div className="mx-3 mb-3 rounded-full glass-deep p-2 grid grid-cols-2 gap-2">
          <a href={CLINIC.phoneHref} className="btn-emerald !py-3 text-sm w-full">
            <Phone size={16} /> Call Clinic
          </a>
          <button
            type="button"
            onClick={() => openBooking()}
            className="btn-primary !py-3 text-sm w-full"
          >
            <CalendarCheck size={16} /> Book Appointment
          </button>
        </div>
      </div>
    </>
  );
}

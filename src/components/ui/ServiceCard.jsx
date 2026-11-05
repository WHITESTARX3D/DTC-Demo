/**
 * ServiceCard.jsx — Claymorphic treatment card.
 * Composed Lucide icon in a gradient clay badge, category chip, summary,
 * indicative price chip and dual CTAs: "Learn More" (→ dynamic detail route)
 * and "Book" (opens the global booking modal with this treatment pre-set).
 * Tactile micro-interactions: hover lift, icon float, active press.
 */
import { Link } from "react-router-dom";
import { ArrowRight, CalendarPlus } from "lucide-react";
import { useBooking } from "../../context/BookingContext";

export default function ServiceCard({ treatment }) {
  const { openBooking } = useBooking();
  const Icon = treatment.icon;

  return (
    <article
      className="clay clay-hover group relative p-7 flex flex-col h-full"
      aria-labelledby={`svc-${treatment.slug}`}
    >
      {/* Soft gradient halo behind icon */}
      <div
        className={`pointer-events-none absolute -top-6 -right-6 w-36 h-36 rounded-full bg-gradient-to-br ${treatment.gradient} opacity-[0.09] blur-2xl transition-opacity duration-500 group-hover:opacity-[0.18]`}
        aria-hidden="true"
      />

      {/* Badge row */}
      <div className="flex items-start justify-between">
        <span
          className={`relative w-14 h-14 rounded-2xl grid place-items-center text-white bg-gradient-to-br ${treatment.gradient} shadow-[0_12px_24px_-8px_rgba(13,148,136,0.4),inset_0_2px_5px_rgba(255,255,255,0.45),inset_0_-3px_6px_rgba(15,23,42,0.15)] transition-transform duration-500 group-hover:-translate-y-1.5 group-hover:rotate-3`}
        >
          <Icon size={26} strokeWidth={1.9} />
        </span>
        <span className={`text-[11px] font-display font-bold uppercase tracking-[0.14em] rounded-full px-3 py-1.5 ${treatment.soft}`}>
          {treatment.category}
        </span>
      </div>

      {/* Copy */}
      <h3 id={`svc-${treatment.slug}`} className="font-display text-lg font-bold text-navy-deep tracking-tight mt-5 leading-snug">
        {treatment.name}
      </h3>
      <p className="text-sm text-slate-med leading-relaxed mt-2 flex-1">{treatment.short}</p>

      {/* Indicative price + duration */}
      <div className="flex items-center gap-2 mt-4">
        <span className="clay-inset rounded-full px-3 py-1 text-[11px] font-semibold text-teal-800">
          {treatment.price}
        </span>
        <span className="text-[11px] text-slate-400 font-medium">{treatment.duration}</span>
      </div>

      {/* CTAs */}
      <div className="flex items-center gap-2.5 mt-5 pt-5 border-t border-slate-100">
        <Link
          to={`/treatments/${treatment.slug}`}
          className="btn-ghost flex-1 !py-2.5 !px-4 text-[13px]"
          aria-label={`Learn more about ${treatment.name}`}
        >
          Learn More <ArrowRight size={14} className="transition-transform duration-300 group-hover:translate-x-1" />
        </Link>
        <button
          type="button"
          onClick={() => openBooking(treatment.slug)}
          className="btn-primary flex-1 !py-2.5 !px-4 text-[13px]"
          aria-label={`Book a consultation for ${treatment.name}`}
        >
          <CalendarPlus size={14} /> Book
        </button>
      </div>
    </article>
  );
}

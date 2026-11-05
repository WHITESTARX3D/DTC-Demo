/**
 * ContactPage.jsx — Contact & booking route (/contact).
 * Two-column conversion layout: full interactive BookingForm (accepts
 * ?treatment= & ?date= presets from CTAs sitewide) beside clinic hours,
 * emergency dental instructions, an interactive-map placeholder and instant
 * call/WhatsApp channels. The Indicative Fee Guide closes the page.
 */
import {
  CalendarCheck,
  Clock,
  MapPin,
  MessageCircle,
  Phone,
  Siren,
  Mail,
  ArrowRight,
} from "lucide-react";
import SEOHead from "../components/layout/SEOHead";
import SectionHeading from "../components/ui/SectionHeading";
import BookingForm from "../components/ui/BookingForm";
import PricingTable from "../components/ui/PricingTable";
import { CLINIC, buildWhatsAppLink } from "../data/clinicData";

export default function ContactPage() {
  return (
    <>
      <SEOHead
        title="Contact & Book an Appointment"
        description={`Book a calm visit at ${CLINIC.name}, ${CLINIC.city}. Demo booking form, clinic hours, emergency dental guidance, call & WhatsApp channels.`}
        path="/contact"
      />

      {/* ---- Hero -------------------------------------------------------- */}
      <section className="pt-32 sm:pt-36 lg:pt-40 max-w-6xl mx-auto px-5 sm:px-8">
        <SectionHeading
          align="left"
          kicker="Contact & Booking"
          title="Sixty seconds to a"
          accent="calmer smile."
          intro="Choose your treatment, date and time — our care team confirms by phone. Prefer instant channels? Call or WhatsApp, a human answers."
        />
      </section>

      {/* ---- Booking + info columns ----------------------------------------- */}
      <section className="max-w-6xl mx-auto px-5 sm:px-8 mt-12 grid lg:grid-cols-[1.15fr_0.85fr] gap-8 items-start">
        {/* Booking card */}
        <div className="clay-lg p-6 sm:p-10" data-reveal>
          <h2 className="sr-only">Appointment booking form</h2>
          <BookingForm />
        </div>

        {/* Info rail */}
        <aside className="space-y-6 lg:sticky lg:top-28" aria-label="Clinic information">
          {/* Instant channels */}
          <div className="grid grid-cols-2 gap-4" data-reveal data-delay="0.08">
            <a href={CLINIC.phoneHref} className="clay clay-hover p-5 flex flex-col items-center text-center gap-2.5 group">
              <span className="w-12 h-12 rounded-2xl grid place-items-center text-white bg-gradient-to-br from-emerald-400 to-emerald-600 shadow-[0_12px_22px_-8px_rgba(16,185,129,0.55),inset_0_2px_5px_rgba(255,255,255,0.4)] transition-transform group-hover:-translate-y-1">
                <Phone size={20} />
              </span>
              <span className="font-display font-bold text-navy-deep text-sm">Click-to-Call</span>
              <span className="text-[11px] text-slate-400 -mt-1">{CLINIC.phoneDisplay}</span>
            </a>
            <a
              href={buildWhatsAppLink("Hello Pearl Dental Studio! I'd like to request a demo appointment.")}
              target="_blank"
              rel="noopener noreferrer"
              className="clay clay-hover p-5 flex flex-col items-center text-center gap-2.5 group"
            >
              <span className="w-12 h-12 rounded-2xl grid place-items-center text-white bg-gradient-to-br from-teal-500 to-sky-600 shadow-clay-btn transition-transform group-hover:-translate-y-1">
                <MessageCircle size={20} />
              </span>
              <span className="font-display font-bold text-navy-deep text-sm">WhatsApp Us</span>
              <span className="text-[11px] text-slate-400 -mt-1">Typically replies in minutes</span>
            </a>
          </div>

          {/* Hours */}
          <div className="clay p-6 sm:p-7" data-reveal data-delay="0.12">
            <h2 className="font-display font-bold text-navy-deep flex items-center gap-2.5">
              <Clock size={18} className="text-teal-600" /> Clinic Hours
            </h2>
            <ul className="mt-4 space-y-3">
              {CLINIC.hours.map((h) => (
                <li key={h.day} className="flex items-center justify-between text-sm clay-inset rounded-2xl px-4 py-3">
                  <span className="text-slate-med font-medium">{h.day}</span>
                  <span className="font-display font-semibold text-navy-deep">{h.time}</span>
                </li>
              ))}
            </ul>
            <a
              href={`mailto:${CLINIC.email}`}
              className="mt-4 flex items-center gap-2.5 text-sm font-semibold text-teal-700 hover:text-teal-800 transition-colors"
            >
              <Mail size={15} /> {CLINIC.email}
            </a>
          </div>

          {/* Emergency card */}
          <div className="rounded-[26px] bg-navy-deep text-white p-6 sm:p-7 relative overflow-hidden" data-reveal data-delay="0.16">
            <div className="pointer-events-none absolute inset-0" style={{ background: "radial-gradient(20rem 10rem at 100% 0%, rgba(245,158,11,0.25), transparent 60%)" }} aria-hidden="true" />
            <h2 className="relative font-display font-bold flex items-center gap-2.5">
              <Siren size={18} className="text-amber-400" /> Dental Emergency?
            </h2>
            <p className="relative text-sm text-slate-300 leading-relaxed mt-3">{CLINIC.emergencyNote}</p>
            <a href={CLINIC.phoneHref} className="relative btn-emerald w-full mt-5 !py-3 text-sm">
              <Phone size={15} /> Call the Priority Line
            </a>
          </div>

          {/* Map placeholder */}
          <div className="clay p-6 sm:p-7" data-reveal data-delay="0.2">
            <h2 className="font-display font-bold text-navy-deep flex items-center gap-2.5">
              <MapPin size={18} className="text-teal-600" /> Find the Studio
            </h2>
            {/* Stylised mini-map tile */}
            <div className="relative mt-4 h-40 rounded-3xl overflow-hidden bg-gradient-to-br from-sky-soft via-white to-mint-mist">
              <svg className="absolute inset-0 w-full h-full opacity-40" aria-hidden="true">
                <defs>
                  <pattern id="cmap" width="60" height="60" patternUnits="userSpaceOnUse">
                    <path d="M0 30 H60 M30 0 V60" stroke="#7dd3fc" strokeWidth="1.4" />
                  </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#cmap)" />
              </svg>
              <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                <span className="absolute inset-0 rounded-full bg-teal-400/50 animate-pulse-ring" aria-hidden="true" />
                <span className="relative grid w-11 h-11 rounded-full place-items-center text-white bg-gradient-to-br from-teal-500 to-sky-600 shadow-clay-sm">
                  <MapPin size={18} />
                </span>
              </span>
            </div>
            <p className="text-sm text-slate-med mt-4">{CLINIC.address}</p>
            <a
              href={CLINIC.mapUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 inline-flex items-center gap-2 text-sm font-display font-bold text-teal-700 hover:gap-3 transition-all"
            >
              Open interactive map <ArrowRight size={14} />
            </a>
          </div>
        </aside>
      </section>

      {/* ---- Fee guide -------------------------------------------------------- */}
      <section className="max-w-5xl mx-auto px-5 sm:px-8 mt-20" aria-label="Indicative fee guide">
        <SectionHeading
          kicker="Before You Book"
          title="Transparent fees,"
          accent="zero surprises"
          intro="Every patient receives a written, itemised plan. Here's the honest framework we start from."
        />
        <div className="mt-10">
          <PricingTable />
        </div>
      </section>

      {/* ---- Final CTA ---------------------------------------------------------- */}
      <section className="max-w-4xl mx-auto px-5 sm:px-8 mt-20 mb-4" aria-label="Still deciding">
        <div className="clay-lg p-8 sm:p-12 text-center" data-reveal>
          <h2 className="font-display font-bold text-navy-deep text-3xl sm:text-4xl tracking-tight">
            Not sure which treatment <span className="text-gradient">you need?</span>
          </h2>
          <p className="text-slate-med mt-3 max-w-md mx-auto">Book a checkup — a calm exam and an honest conversation decide everything else.</p>
          <div className="flex flex-wrap justify-center gap-3.5 mt-7">
            <a href={CLINIC.phoneHref} className="btn-primary">
              <Phone size={16} /> Talk to Us First
            </a>
          </div>
        </div>
      </section>
    </>
  );
}

/**
 * TreatmentDetailPage.jsx — Dynamic route (/treatments/:slug).
 * Renders any of the 12 treatments from clinicData: overview hero, purpose,
 * step-by-step "What Patients Can Expect" vertical timeline, indicative cost
 * notice, treatment-specific FAQs, related services and a pre-filled
 * consultation CTA. Unknown slugs safely redirect to the directory.
 */
import { Link, Navigate, useParams } from "react-router-dom";
import {
  ArrowLeft,
  ArrowRight,
  BadgeDollarSign,
  CalendarCheck,
  Clock,
  FlaskConical,
  Route as RouteIcon,
} from "lucide-react";
import SEOHead from "../components/layout/SEOHead";
import FAQAccordion from "../components/ui/FAQAccordion";
import ServiceCard from "../components/ui/ServiceCard";
import { useBooking } from "../context/BookingContext";
import { getTreatmentBySlug, TREATMENTS } from "../data/clinicData";

export default function TreatmentDetailPage() {
  const { slug } = useParams();
  const { openBooking } = useBooking();
  const treatment = getTreatmentBySlug(slug);

  /* Unknown slug → back to directory (direct-URL safety) */
  if (!treatment) return <Navigate to="/treatments" replace />;

  const Icon = treatment.icon;
  const related = TREATMENTS.filter(
    (t) => t.category === treatment.category && t.slug !== treatment.slug
  ).slice(0, 3);

  return (
    <>
      <SEOHead
        title={`${treatment.name} — What to Expect & Indicative Cost`}
        description={`${treatment.short} Learn the steps, indicative fees and FAQs for ${treatment.name.toLowerCase()} at Pearl Dental Studio (demo clinic site).`}
        path={`/treatments/${treatment.slug}`}
      />

      {/* ---- Hero ---------------------------------------------------- */}
      <section className="pt-32 sm:pt-36 lg:pt-40 max-w-6xl mx-auto px-5 sm:px-8">
        <Link
          to="/treatments"
          className="inline-flex items-center gap-2 text-sm font-display font-semibold text-teal-700 hover:gap-3 transition-all"
          data-reveal
        >
          <ArrowLeft size={16} /> All treatments
        </Link>

        <div className="grid lg:grid-cols-[1.15fr_0.85fr] gap-10 mt-8 items-start">
          <div>
            <div className="flex items-center gap-4" data-reveal data-delay="0.05">
              <span className={`w-16 h-16 rounded-3xl grid place-items-center text-white bg-gradient-to-br ${treatment.gradient} shadow-[0_16px_30px_-10px_rgba(13,148,136,0.45),inset_0_2px_6px_rgba(255,255,255,0.45),inset_0_-4px_8px_rgba(15,23,42,0.15)]`}>
                <Icon size={30} strokeWidth={1.9} />
              </span>
              <span className={`text-[11px] font-display font-bold uppercase tracking-[0.14em] rounded-full px-3.5 py-2 ${treatment.soft}`}>
                {treatment.category}
              </span>
            </div>

            <h1 className="font-display font-bold text-navy-deep tracking-tight leading-[1.05] text-4xl sm:text-5xl mt-6" data-reveal data-delay="0.1">
              {treatment.name}
            </h1>
            <p className="text-slate-med text-base sm:text-lg leading-relaxed mt-5" data-reveal data-delay="0.16">
              {treatment.overview}
            </p>

            {/* Purpose ribbon */}
            <div className="clay-inset rounded-2xl px-5 py-4 mt-7 flex items-start gap-3" data-reveal data-delay="0.2">
              <RouteIcon size={17} className="text-teal-600 mt-0.5 shrink-0" />
              <p className="text-sm leading-relaxed text-slate-700">
                <span className="font-display font-bold text-navy-deep">Purpose: </span>
                {treatment.purpose}
              </p>
            </div>

            <div className="flex flex-wrap gap-3 mt-7" data-reveal data-delay="0.24">
              <button type="button" onClick={() => openBooking(treatment.slug)} className="btn-primary">
                <CalendarCheck size={17} /> Book Consultation
              </button>
              <Link to={`/contact?treatment=${treatment.slug}`} className="btn-ghost">
                Ask a question first <ArrowRight size={15} />
              </Link>
            </div>
          </div>

          {/* Quick facts clay panel */}
          <aside className="clay-lg p-7 sm:p-8 lg:sticky lg:top-28" data-reveal data-delay="0.15" aria-label="Quick facts">
            <h2 className="font-display font-bold text-navy-deep text-lg">Quick facts</h2>
            <dl className="mt-5 space-y-4">
              <div className="flex items-center justify-between clay-inset rounded-2xl px-5 py-3.5">
                <dt className="flex items-center gap-2.5 text-sm font-medium text-slate-med">
                  <Clock size={15} className="text-teal-600" /> Typical duration
                </dt>
                <dd className="font-display font-bold text-navy-deep text-sm">{treatment.duration}</dd>
              </div>
              <div className="flex items-center justify-between clay-inset rounded-2xl px-5 py-3.5">
                <dt className="flex items-center gap-2.5 text-sm font-medium text-slate-med">
                  <BadgeDollarSign size={15} className="text-teal-600" /> Indicative fee
                </dt>
                <dd className="font-display font-bold text-teal-700 text-sm tabular-nums">{treatment.price}</dd>
              </div>
            </dl>
            <p className="mt-5 text-[11px] leading-relaxed text-amber-700 bg-amber-50 border border-amber-200/70 rounded-2xl px-4 py-3 flex items-start gap-2">
              <FlaskConical size={13} className="mt-0.5 shrink-0" />
              Indicative demo range — the final plan & fee follow a comprehensive clinical examination.
            </p>
          </aside>
        </div>
      </section>

      {/* ---- What to expect: vertical timeline ------------------------ */}
      <section className="max-w-4xl mx-auto px-5 sm:px-8 mt-24" aria-label="What patients can expect">
        <h2 className="font-display font-bold text-navy-deep tracking-tight text-3xl sm:text-4xl text-center" data-reveal>
          What patients can expect, <span className="text-gradient">step by step</span>
        </h2>
        <p className="text-slate-med text-center max-w-xl mx-auto mt-4" data-reveal data-delay="0.08">
          No mysteries, no surprises — here is exactly how a typical journey through this treatment unfolds.
        </p>

        <ol className="relative mt-14 ml-4 sm:ml-8" data-reveal-group>
          {/* spine */}
          <span className="absolute left-[21px] top-2 bottom-6 w-[3px] rounded-full bg-gradient-to-b from-teal-300 via-sky-200 to-mint-mist" aria-hidden="true" />
          {treatment.steps.map((step, i) => (
            <li key={step.t} data-reveal-item className="relative pl-16 sm:pl-20 pb-8 last:pb-0">
              <span className="absolute left-0 top-0 w-11 h-11 rounded-2xl grid place-items-center font-display font-bold text-white text-sm bg-gradient-to-br from-teal-500 to-sky-500 shadow-[0_10px_20px_-6px_rgba(13,148,136,0.5),inset_0_2px_4px_rgba(255,255,255,0.4)]">
                {i + 1}
              </span>
              <div className="clay clay-hover p-6">
                <h3 className="font-display font-bold text-navy-deep">{step.t}</h3>
                <p className="text-sm text-slate-med leading-relaxed mt-1.5">{step.d}</p>
              </div>
            </li>
          ))}
        </ol>
      </section>

      {/* ---- Treatment FAQs -------------------------------------------- */}
      <section className="max-w-4xl mx-auto px-5 sm:px-8 mt-24" aria-label="Treatment questions">
        <h2 className="font-display font-bold text-navy-deep tracking-tight text-3xl text-center" data-reveal>
          Questions we hear about <span className="text-gradient">{treatment.name.toLowerCase()}</span>
        </h2>
        <div className="mt-10" data-reveal data-delay="0.1">
          <FAQAccordion items={treatment.faqs} prefix={`${treatment.slug}-faq`} />
        </div>
      </section>

      {/* ---- Related treatments ---------------------------------------- */}
      {related.length > 0 && (
        <section className="max-w-6xl mx-auto px-5 sm:px-8 mt-24" aria-label="Related treatments">
          <h2 className="font-display font-bold text-navy-deep tracking-tight text-2xl sm:text-3xl" data-reveal>
            Often considered <span className="text-gradient">alongside</span>
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-8" data-reveal-group>
            {related.map((t) => (
              <div key={t.slug} data-reveal-item className="h-full">
                <ServiceCard treatment={t} />
              </div>
            ))}
          </div>
        </section>
      )}

      {/* ---- Final CTA band --------------------------------------------- */}
      <section className="max-w-4xl mx-auto px-5 sm:px-8 mt-24" aria-label="Book consultation">
        <div className="clay-lg p-8 sm:p-12 text-center relative overflow-hidden" data-reveal>
          <div className="pointer-events-none absolute -top-16 left-1/2 -translate-x-1/2 w-[28rem] h-44 bg-sky-soft blur-3xl rounded-full" aria-hidden="true" />
          <h2 className="relative font-display font-bold text-navy-deep text-3xl sm:text-4xl tracking-tight">
            Ready to talk it through <span className="text-gradient">face to face?</span>
          </h2>
          <p className="relative text-slate-med mt-3 max-w-md mx-auto text-sm sm:text-base">
            A consultation is a conversation, not a commitment. The booking form arrives with{" "}
            <strong className="text-navy-deep">{treatment.name}</strong> pre-selected.
          </p>
          <button type="button" onClick={() => openBooking(treatment.slug)} className="relative btn-primary mt-7">
            <CalendarCheck size={17} /> Book {treatment.name} Consultation
          </button>
        </div>
      </section>
    </>
  );
}

/**
 * ReviewsPage.jsx — Patient reviews & smile gallery route (/reviews).
 * Google-style rating summary header (explicitly labelled as sample demo
 * data), category filter chips driving both the Swiper carousel and grid,
 * and a draggable Before/After gallery wrapped in a strict ethics banner:
 * demo placeholders only — production requires consented patient photos.
 */
import { useMemo, useState } from "react";
import { BadgeCheck, FlaskConical, Star, ShieldAlert, Smile } from "lucide-react";
import SEOHead from "../components/layout/SEOHead";
import SectionHeading from "../components/ui/SectionHeading";
import TestimonialSwiper from "../components/ui/TestimonialSwiper";
import BeforeAfterSlider from "../components/ui/BeforeAfterSlider";
import { REVIEW_CATEGORIES, TESTIMONIALS } from "../data/clinicData";
import IMAGES from "../assets/images";

/* Demo distribution bars for the summary card (sample data) */
const DISTRIBUTION = [
  { stars: 5, pct: 92 },
  { stars: 4, pct: 6 },
  { stars: 3, pct: 2 },
  { stars: 2, pct: 0 },
  { stars: 1, pct: 0 },
];

export default function ReviewsPage() {
  const [category, setCategory] = useState("All");

  const filtered = useMemo(
    () => (category === "All" ? TESTIMONIALS : TESTIMONIALS.filter((t) => t.category === category)),
    [category]
  );

  return (
    <>
      <SEOHead
        title="Patient Reviews & Smile Gallery"
        description="Sample patient reviews, ratings summary and ethically-labelled demo before & after smile gallery for Pearl Dental Studio — a portfolio demo clinic website."
        path="/reviews"
      />

      {/* ---- Hero -------------------------------------------------------- */}
      <section className="pt-32 sm:pt-36 lg:pt-40 max-w-6xl mx-auto px-5 sm:px-8">
        <SectionHeading
          align="left"
          kicker="Social Proof"
          title="Reviewed by patients,"
          accent="labelled with honesty."
          intro="This page demonstrates the review & gallery layouts for production — every rating and photo below is clearly-flagged sample demo content."
        />
      </section>

      {/* ---- Google-style summary header ---------------------------------- */}
      <section className="max-w-6xl mx-auto px-5 sm:px-8 mt-10" aria-label="Review summary">
        <div className="clay-lg p-7 sm:p-10 grid md:grid-cols-[auto_1fr_auto] gap-8 items-center" data-reveal>
          {/* Score */}
          <div className="text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start gap-3">
              {/* Playful "G" monogram evoking a maps/review provider */}
              <span className="w-12 h-12 rounded-2xl grid place-items-center font-display font-bold text-2xl text-white bg-gradient-to-br from-sky-500 via-teal-500 to-emerald-500 shadow-clay-sm" aria-hidden="true">
                G
              </span>
              <div>
                <p className="font-display font-bold text-navy-deep text-5xl leading-none tabular-nums">
                  4.9<span className="text-2xl text-slate-300">/5</span>
                </p>
              </div>
            </div>
            <div className="flex justify-center md:justify-start gap-1 mt-3" aria-label="4.9 out of 5 stars (sample)">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} size={18} className="text-amber-400 fill-amber-400" aria-hidden="true" />
              ))}
            </div>
            <p className="text-xs text-slate-400 mt-2">Based on 2,300+ sample reviews</p>
          </div>

          {/* Distribution bars */}
          <div className="space-y-2" aria-hidden="true">
            {DISTRIBUTION.map((d) => (
              <div key={d.stars} className="flex items-center gap-3">
                <span className="text-xs font-display font-bold text-slate-500 w-3 text-right">{d.stars}</span>
                <Star size={11} className="text-amber-400 fill-amber-400 shrink-0" />
                <div className="flex-1 h-2.5 rounded-full clay-inset overflow-hidden">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-teal-500 to-sky-500"
                    style={{ width: `${d.pct}%` }}
                  />
                </div>
                <span className="text-[11px] text-slate-400 w-9 tabular-nums">{d.pct}%</span>
              </div>
            ))}
          </div>

          {/* Verification state */}
          <div className="flex flex-col items-center md:items-end gap-3">
            <span className="badge-verified">
              <BadgeCheck size={13} /> Layout Verified
            </span>
            <p className="badge-demo !rounded-2xl !py-2.5 !px-4 leading-relaxed text-center md:text-right max-w-[220px]">
              <FlaskConical size={12} className="shrink-0" />
              Sample Demo Reviews for Layout Demonstration — not real patient feedback.
            </p>
          </div>
        </div>
      </section>

      {/* ---- Category filters + carousel ----------------------------------- */}
      <section className="max-w-6xl mx-auto px-5 sm:px-8 mt-16" aria-label="Filterable patient testimonials">
        <div className="flex flex-wrap gap-2.5" role="tablist" aria-label="Filter reviews by treatment category" data-reveal>
          {REVIEW_CATEGORIES.map((c) => {
            const selected = category === c;
            return (
              <button
                key={c}
                role="tab"
                aria-selected={selected}
                onClick={() => setCategory(c)}
                className={`font-display text-sm font-semibold rounded-full px-4.5 sm:px-5 py-2.5 transition-all duration-300 active:scale-95 ${
                  selected
                    ? "text-white bg-gradient-to-r from-teal-600 to-sky-600 shadow-[0_10px_22px_-8px_rgba(13,148,136,0.5),inset_0_1px_3px_rgba(255,255,255,0.4)] -translate-y-0.5"
                    : "text-slate-600 clay-sm hover:text-teal-700 hover:-translate-y-0.5"
                }`}
              >
                {c}
                <span className={`ml-2 text-[10px] font-bold rounded-full px-1.5 py-0.5 ${selected ? "bg-white/25" : "bg-teal-100 text-teal-700"}`}>
                  {c === "All" ? TESTIMONIALS.length : TESTIMONIALS.filter((t) => t.category === c).length}
                </span>
              </button>
            );
          })}
        </div>

        <div className="mt-8" data-reveal>
          {/* key remounts the Swiper on filter change for a clean state */}
          <TestimonialSwiper key={category} testimonials={filtered.length ? filtered : TESTIMONIALS} />
        </div>
      </section>

      {/* ---- Smile gallery with ethics banner ------------------------------- */}
      <section className="max-w-6xl mx-auto px-5 sm:px-8 mt-24" aria-label="Before and after smile gallery">
        <SectionHeading
          kicker="Smile Gallery"
          title="Before & after —"
          accent="drag to compare"
          intro="Drag the handle (or use arrow keys) to compare. In production, this gallery displays genuine, authorised clinical photography only."
        />

        {/* Mandatory ethics banner */}
        <div
          className="mt-8 rounded-3xl border border-amber-300/60 bg-gradient-to-r from-amber-50 to-orange-50 px-6 py-5 flex items-start gap-3.5"
          role="note"
          data-reveal
        >
          <ShieldAlert size={20} className="text-amber-500 mt-0.5 shrink-0" />
          <p className="text-sm leading-relaxed text-amber-800">
            <strong className="font-display">Demo Visual Placeholders:</strong> In production, only
            genuine, authorized patient photographs with signed clinical consent are displayed. The
            images below are AI-generated studio visuals for layout demonstration.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-7 mt-10" data-reveal-group>
          <div data-reveal-item>
            <BeforeAfterSlider
              image={IMAGES.smileOne}
              alt="Demo placeholder smile comparison — whitening result (filtered simulation)"
            />
            <div className="flex items-center justify-between mt-4 px-1">
              <p className="font-display font-bold text-navy-deep text-sm flex items-center gap-2">
                <Smile size={16} className="text-teal-600" /> Whitening & Polish
              </p>
              <span className="badge-demo !text-[10px]">Simulated</span>
            </div>
          </div>
          <div data-reveal-item>
            <BeforeAfterSlider
              image={IMAGES.smileTwo}
              alt="Demo placeholder smile comparison — alignment result (filtered simulation)"
            />
            <div className="flex items-center justify-between mt-4 px-1">
              <p className="font-display font-bold text-navy-deep text-sm flex items-center gap-2">
                <Smile size={16} className="text-teal-600" /> Alignment & Bonding
              </p>
              <span className="badge-demo !text-[10px]">Simulated</span>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

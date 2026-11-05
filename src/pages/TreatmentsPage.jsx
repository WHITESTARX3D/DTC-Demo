/**
 * TreatmentsPage.jsx — Treatment directory route (/treatments).
 * Interactive category filter chips animate the 12-card clay grid via GSAP;
 * each card exposes Learn More → dynamic detail route & Book → modal preset.
 * Below the grid sits the Indicative Treatment Fee Guide (PricingTable).
 */
import { useEffect, useMemo, useRef, useState } from "react";
import gsap from "gsap";
import { FlaskConical, LayoutGrid } from "lucide-react";
import SEOHead from "../components/layout/SEOHead";
import SectionHeading from "../components/ui/SectionHeading";
import ServiceCard from "../components/ui/ServiceCard";
import PricingTable from "../components/ui/PricingTable";
import { CATEGORIES, TREATMENTS } from "../data/clinicData";

export default function TreatmentsPage() {
  const [active, setActive] = useState("All Treatments");
  const gridRef = useRef(null);

  const visible = useMemo(
    () => (active === "All Treatments" ? TREATMENTS : TREATMENTS.filter((t) => t.category === active)),
    [active]
  );

  /* Soft flip animation whenever the filter changes */
  useEffect(() => {
    if (!gridRef.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        gridRef.current.children,
        { y: 26, opacity: 0, scale: 0.98 },
        { y: 0, opacity: 1, scale: 1, duration: 0.55, stagger: 0.05, ease: "power3.out", clearProps: "transform" }
      );
    }, gridRef);
    return () => ctx.revert();
  }, [active]);

  return (
    <>
      <SEOHead
        title="12 Dental Treatments & Indicative Fee Guide"
        description="Explore all 12 dental treatments — checkups, whitening, implants, aligners, root canals and more — with transparent indicative pricing and step-by-step expectations. Demo clinic website."
        path="/treatments"
      />

      {/* ---- Hero --------------------------------------------------- */}
      <section className="pt-32 sm:pt-36 lg:pt-40 max-w-6xl mx-auto px-5 sm:px-8">
        <SectionHeading
          align="left"
          kicker="Treatment Directory"
          title="Every treatment,"
          accent="honestly explained."
          intro="Twelve services, one philosophy: you understand the what, why and how-much before anything begins. Filter by category to explore."
        />
      </section>

      {/* ---- Filter chips -------------------------------------------- */}
      <div className="max-w-6xl mx-auto px-5 sm:px-8 mt-10" data-reveal>
        <div className="flex flex-wrap gap-2.5" role="tablist" aria-label="Filter treatments by category">
          {CATEGORIES.map((cat) => {
            const selected = active === cat;
            const count = cat === "All Treatments" ? TREATMENTS.length : TREATMENTS.filter((t) => t.category === cat).length;
            return (
              <button
                key={cat}
                role="tab"
                aria-selected={selected}
                onClick={() => setActive(cat)}
                className={`font-display text-sm font-semibold rounded-full px-4.5 sm:px-5 py-2.5 transition-all duration-300 active:scale-95 flex items-center gap-2 ${
                  selected
                    ? "text-white bg-gradient-to-r from-teal-600 to-sky-600 shadow-[0_10px_22px_-8px_rgba(13,148,136,0.5),inset_0_1px_3px_rgba(255,255,255,0.4)] -translate-y-0.5"
                    : "text-slate-600 clay-sm hover:text-teal-700 hover:-translate-y-0.5"
                }`}
              >
                {cat === "All Treatments" && <LayoutGrid size={14} aria-hidden="true" />}
                {cat}
                <span className={`text-[10px] font-bold rounded-full px-1.5 py-0.5 ${selected ? "bg-white/25" : "bg-teal-100 text-teal-700"}`}>
                  {count}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* ---- Grid ------------------------------------------------------ */}
      <section className="max-w-6xl mx-auto px-5 sm:px-8 mt-10" aria-label={`Results — ${visible.length} treatments`}>
        <div ref={gridRef} className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {visible.map((t) => (
            <ServiceCard key={t.slug} treatment={t} />
          ))}
        </div>
        <p className="text-center text-xs text-slate-400 mt-8 flex items-center justify-center gap-1.5">
          <FlaskConical size={12} />
          No outcome can ever be guaranteed — every plan starts with a personalised clinical evaluation.
        </p>
      </section>

      {/* ---- Fee guide -------------------------------------------------- */}
      <section className="max-w-5xl mx-auto px-5 sm:px-8 mt-24" aria-label="Indicative treatment fee guide">
        <SectionHeading
          kicker="Transparent Fees"
          title="Indicative Treatment"
          accent="Fee Guide"
          intro="We publish our guide prices, plainly. Your written plan is confirmed only after a clinical examination — and you approve it before we begin."
        />
        <div className="mt-10">
          <PricingTable />
        </div>
      </section>
    </>
  );
}

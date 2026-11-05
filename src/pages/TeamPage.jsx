/**
 * TeamPage.jsx — Meet-the-team route (/team).
 * Detailed demo profiles with generated portrait placeholders, credential
 * and experience chips, specialty tags and an explicit sample-profile
 * disclosure banner. Ends with the four clinic pillars & consultation CTA.
 */
import { BadgeCheck, CalendarCheck, FlaskConical, GraduationCap, Sparkles } from "lucide-react";
import SEOHead from "../components/layout/SEOHead";
import SectionHeading from "../components/ui/SectionHeading";
import { useBooking } from "../context/BookingContext";
import { CLINIC, PILLARS, TEAM } from "../data/clinicData";
import IMAGES from "../assets/images";

export default function TeamPage() {
  const { openBooking } = useBooking();

  return (
    <>
      <SEOHead
        title="Meet Our Dentists & Hygienists"
        description={`Meet the team at ${CLINIC.name} — lead cosmetic dentist, implant surgeon, hygienist and pediatric dentist. Sample demo profiles for a portfolio website.`}
        path="/team"
      />

      {/* ---- Hero ------------------------------------------------------ */}
      <section className="pt-32 sm:pt-36 lg:pt-40 max-w-6xl mx-auto px-5 sm:px-8">
        <SectionHeading
          align="left"
          kicker="The Humans Behind the Masks"
          title="Small team,"
          accent="obsessive standards."
          intro={`Four clinicians, one shared obsession: ${CLINIC.city}'s calmest dental visits. Hover a card to feel the clay; every profile is clearly flagged as a demo placeholder.`}
        />
        <p className="badge-demo mt-6" data-reveal>
          <FlaskConical size={13} />
          [Sample Clinic Profile — Demo Placeholder] Credentials, registrations and statistics shown are illustrative only.
        </p>
      </section>

      {/* ---- Profile cards ---------------------------------------------- */}
      <section className="max-w-6xl mx-auto px-5 sm:px-8 mt-12 grid md:grid-cols-2 gap-7" aria-label="Team profiles">
        {TEAM.map((m, i) => (
          <article
            key={m.id}
            className="clay-lg clay-hover overflow-hidden flex flex-col"
            data-reveal
            data-delay={i * 0.06}
            aria-labelledby={`team-${m.id}`}
          >
            <div className="relative">
              <img
                src={IMAGES[m.image]}
                alt={`Studio portrait of ${m.name}, ${m.role} — sample demo profile photo`}
                className="w-full aspect-[16/10] object-cover"
                loading="lazy"
                decoding="async"
              />
              {/* overlay chips */}
              <div className="absolute inset-x-4 bottom-4 flex flex-wrap gap-2">
                <span className="glass-deep rounded-full px-3.5 py-2 text-[11px] font-display font-bold text-navy-deep flex items-center gap-1.5">
                  <BadgeCheck size={13} className="text-emerald-500" /> {m.experience}
                </span>
                <span className="glass-deep rounded-full px-3.5 py-2 text-[11px] font-display font-bold text-amber-700 flex items-center gap-1.5">
                  <FlaskConical size={13} /> Demo Profile
                </span>
              </div>
            </div>

            <div className="p-7 sm:p-8 flex-1 flex flex-col">
              <h2 id={`team-${m.id}`} className="font-display font-bold text-navy-deep text-2xl tracking-tight">
                {m.name}
              </h2>
              <p className="font-display font-semibold text-teal-700 text-sm mt-1">{m.role}</p>

              <p className="flex items-center gap-2 text-xs text-slate-400 font-medium mt-3">
                <GraduationCap size={15} className="text-teal-500" /> {m.credential}
              </p>

              <p className="text-sm leading-relaxed text-slate-med mt-4 flex-1">{m.bio}</p>

              <div className="flex flex-wrap gap-2 mt-5">
                {m.specialties.map((s) => (
                  <span key={s} className="clay-inset rounded-full px-3 py-1.5 text-[11px] font-semibold text-teal-800">
                    {s}
                  </span>
                ))}
              </div>

              <button
                type="button"
                onClick={() => openBooking()}
                className="btn-primary w-full mt-6 !py-3.5 text-sm"
                aria-label={`Book a consultation with ${m.name} (demo)`}
              >
                <CalendarCheck size={16} />{" "}
                {m.name.startsWith("Dr.")
                  ? `Book with Dr. ${m.name.split(" ")[1].replace(",", "")}`
                  : `Book with ${m.name.split(" ")[0]}`}
              </button>
            </div>
          </article>
        ))}
      </section>

      {/* ---- Pillars mini band -------------------------------------------- */}
      <section className="max-w-6xl mx-auto px-5 sm:px-8 mt-24" aria-label="Our clinical standards">
        <div className="clay-lg p-7 sm:p-10">
          <h2 className="font-display font-bold text-navy-deep text-2xl sm:text-3xl tracking-tight text-center" data-reveal>
            The standards they <span className="text-gradient">all practise by</span>
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 mt-10" data-reveal-group>
            {PILLARS.map((p) => (
              <div key={p.title} data-reveal-item className="clay-inset rounded-3xl p-6 text-center">
                <span className="clay w-12 h-12 rounded-2xl grid place-items-center text-teal-700 mx-auto">
                  <p.icon size={20} />
                </span>
                <h3 className="font-display font-bold text-navy-deep text-sm mt-4 leading-snug">{p.title}</h3>
              </div>
            ))}
          </div>
          <p className="text-center text-xs text-slate-400 mt-8 flex items-center justify-center gap-1.5" data-reveal>
            <Sparkles size={12} />
            Hiring styles, photos and bios are placeholders — swap in the real team's details at launch.
          </p>
        </div>
      </section>
    </>
  );
}

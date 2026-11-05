/**
 * AboutPage.jsx — Clinic story route (/about).
 * Philosophy, anxiety-free patient-first approach, sterilization standards,
 * virtual tour gallery, technology showcase and team teaser — every block
 * uses claymorphic surfaces with GSAP scroll reveals & parallax accents.
 */
import { Link } from "react-router-dom";
import {
  ArrowRight,
  CalendarCheck,
  Ear,
  HeartHandshake,
  ShieldCheck,
  Sparkles,
  Syringe,
  ScanLine,
  ClipboardList,
  Cuboid,
  FileHeart,
  Camera,
} from "lucide-react";
import SEOHead from "../components/layout/SEOHead";
import SectionHeading from "../components/ui/SectionHeading";
import { useBooking } from "../context/BookingContext";
import { CLINIC, PILLARS } from "../data/clinicData";
import IMAGES from "../assets/images";

export default function AboutPage() {
  const { openBooking } = useBooking();

  return (
    <>
      <SEOHead
        title="About Our Anxiety-Free Dental Clinic"
        description={`Inside ${CLINIC.name}: our patient-first philosophy, hospital-grade sterilization, anxiety-free care model and the digital technology behind gentle dentistry in ${CLINIC.city}.`}
        path="/about"
      />

      {/* ---- Hero -------------------------------------------------- */}
      <section className="pt-32 sm:pt-36 lg:pt-40 max-w-6xl mx-auto px-5 sm:px-8">
        <div className="max-w-3xl">
          <span className="kicker" data-reveal>
            <HeartHandshake size={13} className="text-teal-600" /> About the Studio
          </span>
          <h1 className="font-display font-bold text-navy-deep tracking-tight leading-[1.05] text-4xl sm:text-5xl lg:text-6xl mt-6" data-reveal data-delay="0.08">
            Dentistry designed around <span className="text-gradient">how you feel,</span> not just your teeth.
          </h1>
          <p className="text-slate-med text-base sm:text-lg leading-relaxed mt-6" data-reveal data-delay="0.16">
            {CLINIC.name} was founded on a simple observation: most people don't fear the dentist —
            they fear not being in control. So we rebuilt every moment of the visit around calm,
            consent and complete transparency.
          </p>
        </div>
      </section>

      {/* ---- Philosophy: patient-first three steps ----------------- */}
      <section className="max-w-6xl mx-auto px-5 sm:px-8 mt-20" aria-label="Our care philosophy">
        <div className="grid md:grid-cols-3 gap-6" data-reveal-group>
          {[
            {
              icon: Ear,
              title: "We listen first",
              body: "Your first visit begins with a conversation, not a probe. Concerns, budgets, anxieties and goals are mapped before any examination starts.",
            },
            {
              icon: ClipboardList,
              title: "You approve everything",
              body: "Every finding is explained in plain language with photographs. You receive an itemised, transparent plan — and nothing proceeds without your explicit yes.",
            },
            {
              icon: Syringe,
              title: "Comfort is clinical",
              body: "Buffered warmed anesthetic, agreed stop-signals, weighted blankets and noise-cancelling headphones. Comfort isn't kindness — it's our clinical standard.",
            },
          ].map((c) => (
            <div key={c.title} className="clay clay-hover p-8" data-reveal-item>
              <span className="clay-inset w-13 h-13 rounded-2xl grid place-items-center text-teal-700 p-3.5">
                <c.icon size={22} />
              </span>
              <h2 className="font-display font-bold text-navy-deep text-xl mt-5">{c.title}</h2>
              <p className="text-sm text-slate-med leading-relaxed mt-3">{c.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ---- Anxiety-free care, visual split ------------------------ */}
      <section className="max-w-6xl mx-auto px-5 sm:px-8 mt-24 grid lg:grid-cols-2 gap-10 items-center" aria-label="Anxiety-free care">
        <div className="relative order-2 lg:order-1" data-reveal>
          <div className="clay-inset rounded-[30px] overflow-hidden">
            <img
              src={IMAGES.clinicInterior}
              alt="Calm, sunlit treatment room at Pearl Dental Studio with porcelain dental chair and teal accents (demo clinic interior photo)"
              className="w-full aspect-[4/3.4] object-cover"
              loading="lazy"
              decoding="async"
            />
          </div>
          <div className="absolute -top-5 -right-3 sm:-right-5 glass-deep rounded-3xl px-5 py-4 shadow-glass animate-float" data-parallax="0.6">
            <p className="font-display font-bold text-navy-deep text-2xl">9/10</p>
            <p className="text-[11px] text-slate-500 font-medium">anxious patients re-book<br />without hesitation*</p>
          </div>
        </div>
        <div className="order-1 lg:order-2">
          <SectionHeading
            align="left"
            kicker="Anxiety-Free by Design"
            title="Nervous? You're exactly"
            accent="who we built this for."
            intro="From unhurried appointments to stop-signals you control, every protocol exists because an anxious patient once asked for it. *Sample demo statistic for layout realism."
          />
          <ul className="space-y-3.5 mt-8" data-reveal-group>
            {[
              "Explain-first pacing — no instrument approaches without a preview",
              "Agreed hand-signal pauses treatment instantly, no questions asked",
              "Numbing is layered: topical gel, buffered anesthetic, patient-tested",
              "Longer slots for nervous visits — you will never be rushed",
            ].map((li) => (
              <li key={li} data-reveal-item className="flex items-start gap-3 clay-inset rounded-2xl px-5 py-3.5 text-sm text-slate-700 font-medium">
                <ShieldCheck size={16} className="text-teal-600 mt-0.5 shrink-0" /> {li}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ---- Sterilization standards (inverted band) ---------------- */}
      <section className="max-w-6xl mx-auto px-5 sm:px-8 mt-24" aria-label="Sterilization and hygiene standards">
        <div className="rounded-[2.5rem] bg-navy-deep px-6 sm:px-12 py-14 relative overflow-hidden">
          <div className="pointer-events-none absolute inset-0" style={{ background: "radial-gradient(40rem 18rem at 15% 100%, rgba(2,132,199,0.28), transparent 60%)" }} aria-hidden="true" />
          <div className="relative">
            <SectionHeading
              kicker="Sterilization, Verified"
              title="The chain of clean,"
              accent="opened in front of you."
              intro="Four sealed stages between every single patient — logged, audited and proudly shown to anyone who asks."
            />
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 mt-12" data-reveal-group>
              {PILLARS.slice(0, 4).map((p, i) => (
                <div key={p.title} data-reveal-item className="rounded-3xl bg-white/[0.06] border border-white/10 p-7 hover:bg-white/[0.1] hover:-translate-y-1 transition-all duration-300">
                  <span className="font-display font-bold text-teal-300/50 text-sm" aria-hidden="true">0{i + 1}</span>
                  <span className="block w-11 h-11 rounded-xl grid place-items-center bg-teal-400/15 text-teal-300 border border-teal-300/20 mt-4">
                    <p.icon size={19} />
                  </span>
                  <h3 className="font-display font-bold text-white mt-4 leading-snug">{p.title}</h3>
                  <p className="text-[13px] text-slate-400 leading-relaxed mt-2.5">{p.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ---- Virtual tour gallery ------------------------------------ */}
      <section className="max-w-6xl mx-auto px-5 sm:px-8 mt-24" aria-label="Virtual clinic tour">
        <SectionHeading
          kicker="Virtual Tour"
          title="Step inside before"
          accent="you step inside"
          intro="A quick wander through the studio. Gallery photography is placeholder imagery for this demo build."
        />
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-12" data-reveal-group>
          <figure className="clay-sm overflow-hidden clay-hover sm:col-span-2 lg:col-span-1 lg:row-span-2" data-reveal-item>
            <img src={IMAGES.clinicReception} alt="Reception lounge of the demo clinic with clay-textured desk and mint accents" className="w-full h-full min-h-[320px] object-cover" loading="lazy" decoding="async" />
            <figcaption className="sr-only">Reception lounge — placeholder photography</figcaption>
          </figure>
          <figure className="clay-sm overflow-hidden clay-hover" data-reveal-item>
            <img src={IMAGES.clinicInterior} alt="Treatment room with dental chair and soft daylight (placeholder)" className="w-full aspect-[4/3] object-cover" loading="lazy" decoding="async" />
          </figure>
          {/* Placeholder tiles for the rest of the tour */}
          {[
            { icon: Cuboid, label: "3D Imaging Suite", note: "Placeholder" },
            { icon: FileHeart, label: "Kids' Corner", note: "Placeholder" },
            { icon: Camera, label: "Smile Studio", note: "Placeholder" },
          ].map((tile) => (
            <figure key={tile.label} data-reveal-item className="clay clay-hover aspect-[4/3] grid place-items-center text-center p-6">
              <div>
                <span className="clay-inset w-14 h-14 rounded-2xl grid place-items-center text-teal-600 mx-auto">
                  <tile.icon size={24} />
                </span>
                <p className="font-display font-bold text-navy-deep mt-4">{tile.label}</p>
                <p className="badge-demo mt-3 !text-[10px]">{tile.note} · Demo visual slot</p>
              </div>
            </figure>
          ))}
        </div>
      </section>

      {/* ---- Technology showcase -------------------------------------- */}
      <section className="max-w-6xl mx-auto px-5 sm:px-8 mt-24" aria-label="Our technology">
        <SectionHeading
          kicker="Quietly Advanced"
          title="Technology you feel"
          accent="as comfort, not jargon"
          intro="Every device in the studio earns its place by making your visit calmer, faster or more precise."
        />
        <div className="grid sm:grid-cols-2 gap-6 mt-12" data-reveal-group>
          {[
            { icon: ScanLine, t: "3D Intraoral Scanner", d: "A wand the size of a toothbrush captures a microscope-accurate model of your smile in minutes — goodbye impression moulds and gagging." },
            { icon: Sparkles, t: "Low-Dose Digital X-rays", d: "Up to 90% less radiation than film, with images on screen instantly so you see exactly what we see." },
            { icon: Syringe, t: "Computer-Guided Anesthesia", d: "Slow, buffered, body-temperature delivery takes the sting out of numbing — most patients don't notice it happen." },
            { icon: Cuboid, t: "Guided Implant Planning", d: "Implants are rehearsed digitally on your 3D scan before the day itself — shorter surgery, predictable precision." },
          ].map((c) => (
            <div key={c.t} data-reveal-item className="clay clay-hover p-8 flex gap-5">
              <span className="clay-inset w-12 h-12 rounded-2xl grid place-items-center text-teal-700 shrink-0">
                <c.icon size={21} />
              </span>
              <div>
                <h3 className="font-display font-bold text-navy-deep text-lg">{c.t}</h3>
                <p className="text-sm text-slate-med leading-relaxed mt-2">{c.d}</p>
              </div>
            </div>
          ))}
        </div>

        {/* CTA strip */}
        <div className="clay-lg mt-16 p-8 sm:p-12 text-center relative overflow-hidden" data-reveal>
          <div className="pointer-events-none absolute -top-24 left-1/2 -translate-x-1/2 w-[36rem] h-56 bg-mint-soft/50 blur-3xl rounded-full" aria-hidden="true" />
          <h2 className="relative font-display font-bold text-navy-deep text-3xl sm:text-4xl tracking-tight">
            Come feel the difference <span className="text-gradient">in person.</span>
          </h2>
          <p className="relative text-slate-med mt-3 max-w-lg mx-auto">A no-pressure first visit: tour the rooms, meet the team, get a clear honest picture of your oral health.</p>
          <div className="relative flex flex-wrap justify-center gap-3.5 mt-8">
            <button type="button" onClick={() => openBooking()} className="btn-primary">
              <CalendarCheck size={17} /> Book a First Visit
            </button>
            <Link to="/team" className="btn-ghost">
              Meet our team <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

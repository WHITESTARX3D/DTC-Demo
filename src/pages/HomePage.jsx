/**
 * HomePage.jsx — Conversion-optimised landing route.
 * Sections: 3D hero → quick appointment bar → animated trust metrics →
 * trust marquee → featured treatments → four clinic pillars → lead dentist
 * preview → patient stories (Swiper) → hospital-grade hygiene protocol →
 * interactive FAQ → location map & final CTA.
 * Every section feeds the central GSAP reveal system via data-attributes.
 */
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  ArrowRight,
  Award,
  CalendarCheck,
  ChevronRight,
  Clock,
  MapPin,
  Phone,
  ShieldCheck,
  Sparkles,
  Star,
  CheckCircle2,
  BadgeCheck,
  Smile,
  FlaskConical,
  Siren,
  PackageCheck,
  Wifi,
  MessageCircle,
} from "lucide-react";
import SEOHead from "../components/layout/SEOHead";
import DentalCanvas3D from "../components/3d/DentalCanvas3D";
import SectionHeading from "../components/ui/SectionHeading";
import ServiceCard from "../components/ui/ServiceCard";
import TestimonialSwiper from "../components/ui/TestimonialSwiper";
import FAQAccordion from "../components/ui/FAQAccordion";
import { useBooking } from "../context/BookingContext";
import {
  CLINIC,
  GENERAL_FAQS,
  PILLARS,
  TEAM,
  TESTIMONIALS,
  TREATMENTS,
  buildWhatsAppLink,
} from "../data/clinicData";
import IMAGES from "../assets/images";

export default function HomePage() {
  const { openBooking } = useBooking();
  const navigate = useNavigate();
  const [quick, setQuick] = useState({ treatment: "", date: "" });

  const featured = TREATMENTS.filter((t) => t.featured);
  const leadDentist = TEAM[0];

  /* Quick bar → /contact with treatment & date pre-selected (URL params) */
  const submitQuickBar = (e) => {
    e.preventDefault();
    const q = new URLSearchParams();
    if (quick.treatment) q.set("treatment", quick.treatment);
    if (quick.date) q.set("date", quick.date);
    navigate(`/contact?${q.toString()}`);
  };

  return (
    <>
      <SEOHead
        title="Trusted Modern Dental Clinic in Riverton"
        description="Pearl Dental Studio — gentle family & cosmetic dentist near you in Riverton. Pain-free visits, digital 3D dentistry, transparent indicative pricing. Interactive demo website."
        path="/"
      />

      {/* ============================================================= */}
      {/* 1 · HERO — 3D canvas + editorial type                          */}
      {/* ============================================================= */}
      <section className="relative pt-32 sm:pt-36 lg:pt-40 overflow-hidden" aria-label="Welcome">
        {/* soft light pools */}
        <div className="pointer-events-none absolute -top-24 -right-32 w-[34rem] h-[34rem] rounded-full bg-mint-soft/40 blur-3xl" aria-hidden="true" />
        <div className="pointer-events-none absolute top-64 -left-40 w-[30rem] h-[30rem] rounded-full bg-sky-soft/70 blur-3xl" aria-hidden="true" />

        <div className="max-w-6xl mx-auto px-5 sm:px-8 grid lg:grid-cols-[1.05fr_0.95fr] gap-12 lg:gap-6 items-center">
          {/* Copy */}
          <div className="relative z-10">
            <p className="kicker" data-reveal>
              <Sparkles size={13} className="text-teal-600" />
              Now welcoming new patients in {CLINIC.city}
              <span className="badge-demo !py-1 !px-2.5 !text-[10px]">Demo Site</span>
            </p>

            <h1
              className="font-display font-bold text-navy-deep tracking-tight leading-[1.02] text-[2.6rem] sm:text-6xl lg:text-[4.35rem] mt-6"
              data-reveal
              data-delay="0.08"
            >
              Gentle dentistry.
              <br />
              <span className="text-gradient">Radiant smiles.</span>
              <br />
              Zero anxiety.
            </h1>

            <p className="text-slate-med text-base sm:text-lg leading-relaxed mt-6 max-w-lg" data-reveal data-delay="0.16">
              {CLINIC.name} is a trusted modern dental clinic in {CLINIC.city} — your gentle family
              & cosmetic dentist near you. Pain-free anesthesia, digital 3D scanning and honest,
              transparent plans from your very first visit.
            </p>

            <div className="flex flex-wrap gap-3.5 mt-8" data-reveal data-delay="0.24">
              <button type="button" onClick={() => openBooking()} className="btn-primary">
                <CalendarCheck size={18} /> Book a Calm Visit
              </button>
              <Link to="/treatments" className="btn-ghost">
                Explore Treatments <ArrowRight size={17} />
              </Link>
            </div>

            {/* Trust proof row */}
            <div className="flex items-center gap-4 mt-9" data-reveal data-delay="0.32">
              <div className="flex -space-x-3">
                {[IMAGES.drElena, IMAGES.drMarcus, IMAGES.sarahKim, IMAGES.drPriya].map((img, i) => (
                  <img
                    key={i}
                    src={img}
                    alt=""
                    aria-hidden="true"
                    className="w-10 h-10 rounded-full object-cover border-[3px] border-white shadow-clay-sm"
                  />
                ))}
                <span className="w-10 h-10 rounded-full grid place-items-center bg-gradient-to-br from-teal-500 to-sky-600 text-white text-[10px] font-display font-bold border-[3px] border-white shadow-clay-sm">
                  2.3k
                </span>
              </div>
              <div>
                <div className="flex items-center gap-1" aria-label="Rated 4.9 out of 5 (sample demo reviews)">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} size={14} className="text-amber-400 fill-amber-400" aria-hidden="true" />
                  ))}
                  <span className="font-display font-bold text-navy-deep text-sm ml-1.5">4.9</span>
                </div>
                <p className="text-xs text-slate-400 mt-0.5">2,300+ sample demo reviews</p>
              </div>
            </div>
          </div>

          {/* 3D centerpiece in a clay viewport */}
          <div className="relative" data-reveal data-delay="0.2">
            <div className="clay-lg rounded-[36px] p-3 sm:p-4 relative overflow-hidden">
              <div className="clay-inset rounded-[28px] overflow-hidden bg-gradient-to-b from-white via-alabaster to-mint-mist/50">
                <DentalCanvas3D />
              </div>

              {/* Floating glass metric chips (parallax) */}
              <div className="absolute top-8 left-4 sm:left-6" data-parallax="0.5">
                <div className="glass rounded-2xl px-4 py-2.5 flex items-center gap-2.5 animate-float-slow">
                  <ShieldCheck size={16} className="text-teal-600" />
                  <span className="text-xs font-display font-bold text-navy-deep">Sterile · Sealed · Logged</span>
                </div>
              </div>
              <div className="absolute bottom-10 right-4 sm:right-6" data-parallax="0.9">
                <div className="glass rounded-2xl px-4 py-2.5 flex items-center gap-2.5 animate-float">
                  <Wifi size={16} className="text-sky-600" />
                  <span className="text-xs font-display font-bold text-navy-deep">Digital 3D Scan · No moulds</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ========================================================== */}
        {/* 2 · QUICK APPOINTMENT BAR — overlapping glass converter     */}
        {/* ========================================================== */}
        <div className="max-w-4xl mx-auto px-5 sm:px-8 mt-12 lg:mt-4 relative z-20" data-reveal data-delay="0.1">
          <form
            onSubmit={submitQuickBar}
            className="glass-deep rounded-[26px] p-3 sm:p-3.5 grid sm:grid-cols-[1.2fr_1fr_auto] gap-2.5 items-center shadow-glass"
            aria-label="Quick appointment selector"
          >
            <label className="flex items-center gap-3 clay-inset rounded-2xl px-4 py-3.5">
              <Sparkles size={17} className="text-teal-600 shrink-0" aria-hidden="true" />
              <span className="sr-only">Choose a treatment</span>
              <select
                className="w-full bg-transparent outline-none text-sm font-medium text-navy-deep"
                value={quick.treatment}
                onChange={(e) => setQuick({ ...quick, treatment: e.target.value })}
                aria-label="Choose a treatment"
              >
                <option value="">What do you need help with?</option>
                {TREATMENTS.map((t) => (
                  <option key={t.slug} value={t.slug}>{t.name}</option>
                ))}
              </select>
            </label>
            <label className="flex items-center gap-3 clay-inset rounded-2xl px-4 py-3.5">
              <CalendarCheck size={17} className="text-teal-600 shrink-0" aria-hidden="true" />
              <span className="sr-only">Preferred date</span>
              <input
                type="date"
                min={new Date().toISOString().split("T")[0]}
                className="w-full bg-transparent outline-none text-sm font-medium text-navy-deep"
                value={quick.date}
                onChange={(e) => setQuick({ ...quick, date: e.target.value })}
                aria-label="Preferred appointment date"
              />
            </label>
            <button type="submit" className="btn-primary !py-4 whitespace-nowrap">
              Check Availability <ArrowRight size={16} />
            </button>
          </form>
        </div>
      </section>

      {/* ============================================================= */}
      {/* 3 · TRUST METRICS — animated counters                          */}
      {/* ============================================================= */}
      <section className="max-w-6xl mx-auto px-5 sm:px-8 mt-20" aria-label="Clinic statistics">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6" data-reveal-group>
          {[
            { icon: Smile, count: 12000, suffix: "+", label: "Smiles cared for" },
            { icon: Award, count: 14, suffix: "", label: "Years of gentle practice" },
            { icon: Star, count: 4.9, suffix: "", decimals: 1, label: "Average patient rating" },
            { icon: CheckCircle2, count: 98, suffix: "%", label: "Would recommend us" },
          ].map((s) => (
            <div key={s.label} className="clay clay-hover p-6 sm:p-7 text-center" data-reveal-item>
              <span className="clay-inset w-12 h-12 rounded-2xl grid place-items-center text-teal-700 mx-auto">
                <s.icon size={21} />
              </span>
              <p className="font-display font-bold text-3xl sm:text-4xl text-navy-deep mt-4 tabular-nums">
                <span
                  data-count={s.count}
                  data-suffix={s.suffix}
                  data-decimals={s.decimals || 0}
                >
                  0
                </span>
              </p>
              <p className="text-xs sm:text-sm text-slate-med mt-1.5 font-medium">{s.label}</p>
            </div>
          ))}
        </div>
        <p className="text-center text-[11px] text-slate-400 mt-4 flex items-center justify-center gap-1.5" data-reveal>
          <FlaskConical size={12} /> All statistics are illustrative demo figures for layout realism.
        </p>
      </section>

      {/* ============================================================= */}
      {/* 4 · VALUES MARQUEE                                             */}
      {/* ============================================================= */}
      <div className="mt-20 py-5 border-y border-teal-100/70 bg-white/40 overflow-hidden" aria-hidden="true">
        <div className="flex whitespace-nowrap animate-marquee w-max">
          {[0, 1].map((copy) => (
            <div key={copy} className="flex items-center gap-10 pr-10">
              {["Pain-Free Anesthesia", "Digital 3D Intraoral Scanning", "Transparent Treatment Plans", "Hospital-Grade Autoclaves", "Anxiety-Free Pacing", "0% Financing Options"].map((t) => (
                <span key={`${copy}-${t}`} className="flex items-center gap-3 font-display font-semibold text-teal-800/80 text-sm tracking-wide">
                  <Sparkles size={14} className="text-teal-500" /> {t}
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* ============================================================= */}
      {/* 5 · FEATURED TREATMENTS                                        */}
      {/* ============================================================= */}
      <section className="max-w-6xl mx-auto px-5 sm:px-8 mt-24" aria-label="Featured treatments">
        <SectionHeading
          kicker="Our Care Menu"
          title="Most-loved treatments,"
          accent="clearly explained"
          intro="Six of our most requested services — explore the full directory of 12 treatments with indicative pricing, step-by-step expectations and honest guidance."
        />
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-12" data-reveal-group>
          {featured.map((t) => (
            <div key={t.slug} data-reveal-item className="h-full">
              <ServiceCard treatment={t} />
            </div>
          ))}
        </div>
        <div className="text-center mt-10" data-reveal>
          <Link to="/treatments" className="btn-ghost">
            View all 12 treatments <ChevronRight size={17} />
          </Link>
        </div>
      </section>

      {/* ============================================================= */}
      {/* 6 · CLINIC PILLARS                                             */}
      {/* ============================================================= */}
      <section className="max-w-6xl mx-auto px-5 sm:px-8 mt-28" aria-label="Why patients choose us">
        <SectionHeading
          kicker="The Pearl Standard"
          title="Four promises behind"
          accent="every appointment"
          intro="Clinical excellence is a system, not a slogan. These pillars are built into every room, every plan and every conversation."
        />
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 mt-12" data-reveal-group>
          {PILLARS.map((p, i) => (
            <div key={p.title} className="clay clay-hover p-7 relative overflow-hidden" data-reveal-item>
              <span className="absolute top-5 right-6 font-display font-bold text-5xl text-teal-100 select-none" aria-hidden="true">
                0{i + 1}
              </span>
              <span className="clay-inset w-13 h-13 rounded-2xl grid place-items-center text-teal-700 p-3">
                <p.icon size={23} />
              </span>
              <h3 className="font-display font-bold text-navy-deep text-[17px] mt-5 leading-snug">{p.title}</h3>
              <p className="text-sm text-slate-med leading-relaxed mt-2.5">{p.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ============================================================= */}
      {/* 7 · MEET THE LEAD DENTIST — preview                            */}
      {/* ============================================================= */}
      <section className="max-w-6xl mx-auto px-5 sm:px-8 mt-28" aria-label="Meet our lead dentist">
        <div className="clay-lg p-6 sm:p-10 lg:p-12 grid lg:grid-cols-[0.9fr_1.1fr] gap-10 items-center overflow-hidden relative">
          <div className="pointer-events-none absolute -bottom-20 -left-20 w-80 h-80 rounded-full bg-mint-soft/40 blur-3xl" aria-hidden="true" />

          <div className="relative" data-reveal>
            <div className="clay-inset rounded-[28px] overflow-hidden">
              <img
                src={IMAGES[leadDentist.image]}
                alt="Portrait of Dr. Elena Vance, DDS — Lead Cosmetic & Restorative Dentist (sample demo profile photo)"
                className="w-full aspect-[4/4.6] object-cover"
                loading="lazy"
                decoding="async"
              />
            </div>
            <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 glass-deep rounded-full px-5 py-2.5 flex items-center gap-2.5 whitespace-nowrap shadow-glass">
              <BadgeCheck size={16} className="text-emerald-500" />
              <span className="text-xs font-display font-bold text-navy-deep">14+ Years · Sample Profile</span>
            </div>
          </div>

          <div className="relative">
            <span className="kicker" data-reveal>Meet Your Dentist</span>
            <h2 className="font-display font-bold text-navy-deep tracking-tight text-3xl sm:text-4xl mt-4 leading-[1.1]" data-reveal data-delay="0.08">
              {leadDentist.name.split(",")[0]}
              <span className="text-slate-400 font-semibold text-xl sm:text-2xl">, {leadDentist.name.split(",")[1]}</span>
            </h2>
            <p className="text-teal-700 font-display font-semibold mt-1.5" data-reveal data-delay="0.12">{leadDentist.role}</p>
            <p className="text-slate-med leading-relaxed mt-4" data-reveal data-delay="0.16">{leadDentist.bio}</p>

            <div className="flex flex-wrap gap-2 mt-5" data-reveal data-delay="0.2">
              {leadDentist.specialties.map((s) => (
                <span key={s} className="clay-inset rounded-full px-3.5 py-1.5 text-xs font-semibold text-teal-800">{s}</span>
              ))}
            </div>

            <div className="flex flex-wrap gap-3 mt-7" data-reveal data-delay="0.24">
              <Link to="/team" className="btn-primary !py-3.5">
                Meet the Whole Team <ArrowRight size={16} />
              </Link>
              <button type="button" onClick={() => openBooking()} className="btn-ghost !py-3.5">
                <CalendarCheck size={16} /> Book with Dr. Vance
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================= */}
      {/* 8 · PATIENT STORIES — Swiper                                   */}
      {/* ============================================================= */}
      <section className="max-w-6xl mx-auto px-5 sm:px-8 mt-28" aria-label="Patient stories">
        <SectionHeading
          kicker="Patient Stories"
          title="Kind words from"
          accent="brighter smiles"
          intro="A sample set of demo reviews to demonstrate the layout — in production, every review is genuine, verified and linked."
        />
        <div className="mt-12" data-reveal>
          <TestimonialSwiper testimonials={TESTIMONIALS.slice(0, 6)} />
        </div>
        <div className="text-center mt-8" data-reveal>
          <Link to="/reviews" className="btn-ghost">
            Read all reviews & smile gallery <ArrowRight size={16} />
          </Link>
        </div>
      </section>

      {/* ============================================================= */}
      {/* 9 · HYGIENE PROTOCOL — inverted navy band                      */}
      {/* ============================================================= */}
      <section className="max-w-6xl mx-auto px-5 sm:px-8 mt-28" aria-label="Sterilization and hygiene protocol">
        <div className="rounded-[2.5rem] bg-navy-deep text-slate-300 px-6 sm:px-12 py-14 relative overflow-hidden">
          <div
            className="pointer-events-none absolute inset-0 opacity-70"
            style={{ background: "radial-gradient(44rem 20rem at 80% 0%, rgba(13,148,136,0.3), transparent 60%)" }}
            aria-hidden="true"
          />
          <div className="relative grid lg:grid-cols-[0.9fr_1.1fr] gap-12 items-center">
            <div>
              <span className="kicker !bg-white/10 !border-white/15 !text-teal-300 !shadow-none" data-reveal>
                Hospital-Grade Hygiene
              </span>
              <h2 className="font-display font-bold text-white tracking-tight text-3xl sm:text-4xl mt-4 leading-[1.1]" data-reveal data-delay="0.08">
                A sterilization chain you can <span className="text-gradient">literally watch.</span>
              </h2>
              <p className="text-slate-400 leading-relaxed mt-4" data-reveal data-delay="0.16">
                Every instrument follows a sealed, logged, four-stage chain from chairside to
                sterile storage. Ask any team member for the tour — transparency is the protocol.
              </p>
              <div className="badge-verified mt-6" data-reveal data-delay="0.2">
                <ShieldCheck size={14} /> Class-B autoclave logs audited monthly (demo statement)
              </div>
            </div>

            <ol className="grid sm:grid-cols-2 gap-4" data-reveal-group>
              {[
                { icon: PackageCheck, t: "Sealed at chairside", d: "Used instruments are sealed in pouches immediately — no open transport." },
                { icon: Sparkles, t: "Ultrasonic bath", d: "An ultrasonic clean removes all visible debris before sterilization." },
                { icon: ShieldCheck, t: "Class-B autoclave", d: "134°C vacuum steam cycle — the same class used in hospital theatres." },
                { icon: BadgeCheck, t: "Logged & traceable", d: "Every pouch is cycle-stamped and opened in front of you, chairside." },
              ].map((s, i) => (
                <li key={s.t} data-reveal-item className="rounded-3xl bg-white/[0.06] border border-white/10 p-6 backdrop-blur-sm transition-all duration-300 hover:bg-white/[0.1] hover:-translate-y-1">
                  <div className="flex items-center gap-3">
                    <span className="w-10 h-10 rounded-xl grid place-items-center bg-teal-400/15 text-teal-300 border border-teal-300/20">
                      <s.icon size={18} />
                    </span>
                    <span className="font-display font-bold text-teal-300/60 text-sm" aria-hidden="true">0{i + 1}</span>
                  </div>
                  <h3 className="font-display font-bold text-white mt-4">{s.t}</h3>
                  <p className="text-[13px] text-slate-400 leading-relaxed mt-2">{s.d}</p>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      {/* ============================================================= */}
      {/* 10 · FAQ + CTA                                                 */}
      {/* ============================================================= */}
      <section className="max-w-6xl mx-auto px-5 sm:px-8 mt-28 grid lg:grid-cols-[0.85fr_1.15fr] gap-12 items-start" aria-label="Frequently asked questions">
        <div className="lg:sticky lg:top-28">
          <SectionHeading
            align="left"
            kicker="Good Questions"
            title="Everything patients"
            accent="ask us first"
            intro="Honest, jargon-free answers to the questions we hear every week. Something else on your mind? Message us — a human replies."
          />
          <div className="flex flex-wrap gap-3 mt-7" data-reveal>
            <a
              href={buildWhatsAppLink("Hello! I have a question about Pearl Dental Studio (demo).")}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-emerald !py-3 text-sm"
            >
              <MessageCircle size={16} /> Ask on WhatsApp
            </a>
            <Link to="/blog" className="btn-ghost !py-3 text-sm">
              Browse dental guides <ArrowRight size={15} />
            </Link>
          </div>
        </div>
        <div data-reveal data-delay="0.1">
          <FAQAccordion items={GENERAL_FAQS} prefix="home-faq" />
        </div>
      </section>

      {/* ============================================================= */}
      {/* 11 · LOCATION MAP + FINAL CTA                                  */}
      {/* ============================================================= */}
      <section className="max-w-6xl mx-auto px-5 sm:px-8 mt-28" aria-label="Find our clinic">
        <div className="clay-lg overflow-hidden grid lg:grid-cols-2">
          {/* Map placeholder — interactive in production */}
          <div className="relative min-h-[320px] lg:min-h-full bg-gradient-to-br from-sky-soft via-white to-mint-mist overflow-hidden" data-reveal>
            {/* stylised street grid */}
            <svg className="absolute inset-0 w-full h-full opacity-[0.35]" aria-hidden="true">
              <defs>
                <pattern id="streets" width="90" height="90" patternUnits="userSpaceOnUse">
                  <path d="M0 45 H90 M45 0 V90" stroke="#7dd3fc" strokeWidth="1.6" />
                </pattern>
                <pattern id="streets2" width="270" height="270" patternUnits="userSpaceOnUse">
                  <path d="M0 135 H270 M135 0 V270" stroke="#5eead4" strokeWidth="3" />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#streets)" />
              <rect width="100%" height="100%" fill="url(#streets2)" />
            </svg>
            {/* pin */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
              <span className="relative">
                <span className="absolute inset-0 rounded-full bg-teal-400/50 animate-pulse-ring" aria-hidden="true" />
                <span className="relative grid w-14 h-14 rounded-full place-items-center text-white bg-gradient-to-br from-teal-500 to-sky-600 shadow-clay-btn">
                  <MapPin size={24} />
                </span>
              </span>
              <span className="mt-3 glass-deep rounded-full px-4 py-2 text-xs font-display font-bold text-navy-deep whitespace-nowrap">
                {CLINIC.address}
              </span>
            </div>
            <a
              href={CLINIC.mapUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="absolute bottom-5 left-1/2 -translate-x-1/2 btn-ghost !py-2.5 !px-5 text-xs whitespace-nowrap"
            >
              Open in Google Maps <ArrowRight size={13} />
            </a>
          </div>

          {/* Visit panel */}
          <div className="p-8 sm:p-12">
            <span className="kicker" data-reveal>Visit the Studio</span>
            <h2 className="font-display font-bold text-navy-deep tracking-tight text-3xl sm:text-[2.4rem] leading-[1.1] mt-4" data-reveal data-delay="0.08">
              In the heart of {CLINIC.city} — <span className="text-gradient">five minutes from anywhere.</span>
            </h2>
            <ul className="mt-7 space-y-4" data-reveal-group>
              {CLINIC.hours.map((h) => (
                <li key={h.day} data-reveal-item className="flex items-center justify-between clay-inset rounded-2xl px-5 py-3.5">
                  <span className="flex items-center gap-2.5 text-sm font-medium text-slate-med">
                    <Clock size={15} className="text-teal-600" /> {h.day}
                  </span>
                  <span className="font-display font-semibold text-navy-deep text-sm">{h.time}</span>
                </li>
              ))}
            </ul>
            <div className="mt-6 rounded-2xl bg-amber-50 border border-amber-200/80 px-5 py-4 flex items-start gap-3" data-reveal>
              <Siren size={17} className="text-amber-500 mt-0.5 shrink-0" />
              <p className="text-[13px] leading-relaxed text-amber-800">
                <strong className="font-display">Dental emergency?</strong> {CLINIC.emergencyNote}
              </p>
            </div>
            <div className="flex flex-wrap gap-3 mt-7" data-reveal>
              <button type="button" onClick={() => openBooking()} className="btn-primary">
                <CalendarCheck size={17} /> Book My Visit
              </button>
              <a href={CLINIC.phoneHref} className="btn-emerald">
                <Phone size={16} /> {CLINIC.phoneDisplay}
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

/**
 * Footer.jsx — Deep-navy inverted clay footer.
 * Four columns: brand & demo disclosure, explore links, treatment shortcuts,
 * contact & opening hours. Anchors trust badges and the legal/demo notes.
 */
import { Link } from "react-router-dom";
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  MessageCircle,
  ShieldCheck,
  FlaskConical,
  ArrowUpRight,
} from "lucide-react";
import { CLINIC, TREATMENTS, buildWhatsAppLink } from "../../data/clinicData";
import { ToothMark } from "./PageTransitionWrapper";

export default function Footer() {
  const featuredTreatments = TREATMENTS.filter((t) => t.featured).slice(0, 6);

  return (
    <footer className="relative mt-24" aria-label="Site footer">
      {/* Inverted clay shell */}
      <div className="mx-2 sm:mx-4 rounded-t-[2.5rem] bg-navy-deep text-slate-300 shadow-[0_-20px_60px_-30px_rgba(13,148,136,0.45)] overflow-hidden">
        {/* Ambient inner glow */}
        <div
          className="pointer-events-none absolute inset-x-0 top-0 h-64 opacity-60"
          style={{
            background:
              "radial-gradient(40rem 16rem at 20% 0%, rgba(13,148,136,0.28), transparent 60%), radial-gradient(36rem 14rem at 85% 0%, rgba(2,132,199,0.22), transparent 60%)",
          }}
          aria-hidden="true"
        />

        <div className="relative max-w-6xl mx-auto px-6 sm:px-10 pt-14 pb-28 md:pb-8">
          <div className="grid gap-11 md:grid-cols-2 lg:grid-cols-[1.35fr_0.8fr_1fr_1.1fr]">
            {/* Brand + disclosure */}
            <div>
              <Link to="/" className="inline-flex items-center gap-3 group">
                <span className="w-11 h-11 rounded-2xl grid place-items-center bg-white/10 border border-white/15 shadow-[inset_0_2px_6px_rgba(255,255,255,0.15)] transition-transform group-hover:-rotate-6">
                  <ToothMark className="w-5.5 h-5.5" />
                </span>
                <span className="font-display">
                  <span className="block font-bold text-lg leading-none bg-gradient-to-r from-teal-300 via-cyan-200 to-sky-300 bg-clip-text text-transparent">
                    Pearl Dental Studio
                  </span>
                  <span className="block text-[10px] tracking-[0.24em] uppercase text-teal-300/80 mt-1">
                    Gentle · Modern · Transparent
                  </span>
                </span>
              </Link>
              <p className="mt-5 text-sm leading-relaxed text-slate-400 max-w-xs">
                A calm, technology-led dental studio serving families in {CLINIC.city}. Every plan
                begins with listening — and ends only when you feel confident.
              </p>
              <div className="mt-5 inline-flex items-start gap-2.5 rounded-2xl border border-amber-400/30 bg-amber-400/10 px-4 py-3 text-[12px] leading-relaxed text-amber-200/90 max-w-xs">
                <FlaskConical size={15} className="mt-0.5 shrink-0" />
                <span>
                  <strong className="font-semibold">Portfolio Demonstration:</strong> this is a demo
                  clinic website. Profiles, reviews & pricing are illustrative placeholders.
                </span>
              </div>
            </div>

            {/* Explore */}
            <nav aria-label="Footer site links">
              <h3 className="font-display text-white font-bold text-sm uppercase tracking-[0.18em] mb-5">
                Explore
              </h3>
              <ul className="space-y-2.5 text-sm">
                {[
                  ["Home", "/"],
                  ["About the Clinic", "/about"],
                  ["Our Team", "/team"],
                  ["Patient Reviews", "/reviews"],
                  ["Blog & FAQ", "/blog"],
                  ["Book a Visit", "/contact"],
                  ["Privacy Policy", "/privacy-policy"],
                ].map(([label, to]) => (
                  <li key={to}>
                    <Link
                      to={to}
                      className="inline-flex items-center gap-1.5 text-slate-400 hover:text-teal-300 transition-colors duration-300 hover:translate-x-1 will-change-transform"
                    >
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            {/* Treatments */}
            <nav aria-label="Featured treatments">
              <h3 className="font-display text-white font-bold text-sm uppercase tracking-[0.18em] mb-5">
                Treatments
              </h3>
              <ul className="space-y-2.5 text-sm">
                {featuredTreatments.map((t) => (
                  <li key={t.slug}>
                    <Link
                      to={`/treatments/${t.slug}`}
                      className="inline-flex items-center gap-1.5 text-slate-400 hover:text-teal-300 transition-colors duration-300 hover:translate-x-1"
                    >
                      {t.name}
                    </Link>
                  </li>
                ))}
                <li>
                  <Link
                    to="/treatments"
                    className="inline-flex items-center gap-1 font-semibold text-teal-300 hover:text-teal-200 transition-colors"
                  >
                    View all 12 treatments <ArrowUpRight size={14} />
                  </Link>
                </li>
              </ul>
            </nav>

            {/* Contact & hours */}
            <div>
              <h3 className="font-display text-white font-bold text-sm uppercase tracking-[0.18em] mb-5">
                Visit Us
              </h3>
              <ul className="space-y-3.5 text-sm">
                <li className="flex items-start gap-3">
                  <MapPin size={16} className="text-teal-400 mt-0.5 shrink-0" />
                  <a href={CLINIC.mapUrl} target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-teal-300 transition-colors">
                    {CLINIC.address}
                  </a>
                </li>
                <li className="flex items-center gap-3">
                  <Phone size={16} className="text-teal-400 shrink-0" />
                  <a href={CLINIC.phoneHref} className="text-slate-400 hover:text-teal-300 transition-colors">
                    {CLINIC.phoneDisplay}
                  </a>
                </li>
                <li className="flex items-center gap-3">
                  <Mail size={16} className="text-teal-400 shrink-0" />
                  <a href={`mailto:${CLINIC.email}`} className="text-slate-400 hover:text-teal-300 transition-colors">
                    {CLINIC.email}
                  </a>
                </li>
                <li className="flex items-start gap-3">
                  <Clock size={16} className="text-teal-400 mt-0.5 shrink-0" />
                  <div className="text-slate-400">
                    {CLINIC.hours.map((h) => (
                      <p key={h.day} className="leading-relaxed">
                        <span className="text-slate-500">{h.day}:</span> {h.time}
                      </p>
                    ))}
                  </div>
                </li>
              </ul>
              <a
                href={buildWhatsAppLink("Hello Pearl Dental Studio! (demo enquiry)")}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-5 inline-flex items-center gap-2 rounded-full bg-emerald-500/15 border border-emerald-400/30 text-emerald-300 text-sm font-semibold px-4 py-2.5 transition-all hover:bg-emerald-500/25 hover:-translate-y-0.5 active:scale-95"
              >
                <MessageCircle size={15} /> Chat on WhatsApp
              </a>
            </div>
          </div>

          {/* Bottom bar */}
          <div className="mt-12 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-xs text-slate-500 text-center sm:text-left">
              © {new Date().getFullYear()} {CLINIC.name}. Demo build — no real clinic or patient
              data exists here.
            </p>
            <div className="flex items-center gap-2 text-xs text-slate-400">
              <ShieldCheck size={14} className="text-teal-400" />
              <span>HIPAA-conscious demo · No PHI collected, stored or transmitted</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

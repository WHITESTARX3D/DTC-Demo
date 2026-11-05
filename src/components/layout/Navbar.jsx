/**
 * Navbar.jsx — Floating glassmorphic pill navigation (v2, rebuilt layout).
 *
 * Root-cause fixes for the old spacing/alignment issues:
 *   • Flex contract is explicit: brand [min-w-0, flex-none on ≥lg], links
 *     [flex-1, centered], actions [ml-auto, shrink-0] — nothing can wrap,
 *     stretch or collide at any width
 *   • Brand block truncates safely; tagline hides <400px so the "Studio ·
 *     Riverton" line never squeezes the CTA
 *   • Booking CTA swaps "Book Visit" → "Book" under 420px and shrinks its
 *     padding; hamburger is a fixed-size 36/40px square always pinned right
 *   • All touch targets stay ≥36px; nothing leaves a 320px viewport
 *   • Scroll state swaps glass → glass-deep (background/shadow transition)
 *
 * Mobile menu: full-screen glass sheet with GSAP-staggered link entrance.
 * Includes an accessible "skip to content" link.
 */
import { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { Menu, X, CalendarCheck, Phone, MessageCircle } from "lucide-react";
import gsap from "gsap";
import { CLINIC, buildWhatsAppLink } from "../../data/clinicData";
import { useBooking } from "../../context/BookingContext";
import { ToothMark } from "./PageTransitionWrapper";

const LINKS = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/treatments", label: "Treatments" },
  { to: "/team", label: "Team" },
  { to: "/reviews", label: "Reviews" },
  { to: "/blog", label: "Blog" },
  { to: "/contact", label: "Contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);      // intent: open vs closed
  const [menuMounted, setMenuMounted] = useState(false); // DOM presence (exit anim aware)
  const { openBooking } = useBooking();
  const { pathname } = useLocation();

  /* Glass density & elevation transition once the page scrolls */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* Close the mobile menu on navigation (exit fade runs, then unmount) */
  useEffect(() => setMenuOpen(false), [pathname]);

  /* Body scroll stays locked for the fade-out window too, so no content
     can peek-shift while the panel leaves */
  useEffect(() => {
    const locked = menuOpen || menuMounted;
    document.body.style.overflow = locked ? "hidden" : "";
    return () => (document.body.style.overflow = "");
  }, [menuOpen, menuMounted]);

  /* Mount immediately on open */
  useEffect(() => {
    if (menuOpen) setMenuMounted(true);
  }, [menuOpen]);

  /* Exit lifecycle: fade the backdrop + lift the panel, then unmount.
     Reduced-motion → unmount instantly, no fade. */
  useEffect(() => {
    if (!menuMounted || menuOpen) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      setMenuMounted(false);
      return;
    }
    const tl = gsap.timeline({ onComplete: () => setMenuMounted(false) });
    tl.to(".menu-panel", {
      y: -10,
      opacity: 0,
      scale: 0.985,
      duration: 0.2,
      ease: "power2.in",
    }, 0)
      .to(".menu-backdrop", { opacity: 0, duration: 0.24, ease: "power2.inOut" }, 0.02);
    return () => tl.kill();
  }, [menuOpen, menuMounted]);

  /* Menu OPEN — smooth curtain-morph transition (~0.55s, zero bounce):
       1 · backdrop blooms in
       2 · the glass panel morphs open with a rounded clip-path wipe that
           travels downward from the navbar, easing out on power3 — a
           continuous "unrolling sheet" feel rather than a jump cut
       3 · label fades down · 4 · pills cascade sideways · 5 · actions rise  */
  useEffect(() => {
    if (!menuOpen) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
      tl.fromTo(
        ".menu-backdrop",
        { opacity: 0 },
        { opacity: 1, duration: 0.3, ease: "power1.out" }
      )
        .fromTo(
          ".menu-panel",
          {
            clipPath: "inset(0% 0% 94% 0% round 28px)",
            y: -16,
            opacity: 0,
            scale: 0.985,
            transformOrigin: "50% 0%",
          },
          {
            clipPath: "inset(0% 0% 0% 0% round 28px)",
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 0.5,
          },
          0.02
        )
        .fromTo(
          ".menu-label",
          { opacity: 0, y: -8 },
          { opacity: 1, y: 0, duration: 0.26, ease: "power2.out" },
          0.16
        )
        .fromTo(
          ".mobile-link",
          { x: 24, opacity: 0 },
          { x: 0, opacity: 1, duration: 0.3, stagger: 0.045, ease: "power2.out" },
          0.2
        )
        .fromTo(
          ".menu-action",
          { y: 12, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.28, stagger: 0.055, ease: "power2.out" },
          0.3
        );
    });
    return () => ctx.revert();
  }, [menuOpen]);

  return (
    <>
      {/* Accessibility: keyboard skip link */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[110] focus:bg-white focus:text-teal-800 focus:px-4 focus:py-2 focus:rounded-full focus:shadow-clay font-display font-semibold text-sm"
      >
        Skip to main content
      </a>

      <header className="fixed top-2.5 sm:top-4 inset-x-0 z-[80] px-2.5 sm:px-5">
        <nav
          aria-label="Primary navigation"
          className={`mx-auto max-w-6xl flex items-center gap-2 sm:gap-3 rounded-full pl-2.5 pr-2 py-2 sm:pl-4 sm:pr-2.5 sm:py-2.5 transition-[background-color,box-shadow,border-color] duration-500 ${
            scrolled ? "glass-deep" : "glass"
          }`}
        >
          {/* ---- Brand: cannot shrink below content, truncates safely ---- */}
          <Link
            to="/"
            className="flex items-center gap-2 sm:gap-2.5 min-w-0 shrink-0 lg:shrink group"
            aria-label="Pearl Dental Studio — Home"
          >
            <span className="clay-sm w-9 h-9 sm:w-10 sm:h-10 rounded-xl sm:rounded-2xl grid place-items-center shrink-0 transition-transform duration-300 group-hover:-rotate-6 group-active:scale-90">
              <ToothMark className="w-[18px] h-[18px] sm:w-5 sm:h-5" />
            </span>
            <span className="font-display leading-none min-w-0">
              <span className="block font-bold text-[13px] sm:text-[15px] tracking-tight whitespace-nowrap text-gradient">
                Pearl Dental
              </span>
              {/* Tagline hides under 400px so it never squeezes the CTA */}
              <span className="hidden min-[400px]:block text-[9px] sm:text-[10px] font-semibold tracking-[0.2em] uppercase text-teal-700 mt-0.5 whitespace-nowrap">
                Studio · {CLINIC.city}
              </span>
            </span>
          </Link>

          {/* ---- Desktop links: truly centered via flex-1 ---- */}
          <ul className="hidden lg:flex flex-1 items-center justify-center gap-0.5 xl:gap-1 min-w-0" role="list">
            {LINKS.map((l) => (
              <li key={l.to}>
                <NavLink
                  to={l.to}
                  end={l.to === "/"}
                  className={({ isActive }) =>
                    `relative font-display text-[13px] xl:text-[13.5px] font-semibold px-3 xl:px-3.5 py-2 rounded-full whitespace-nowrap transition-all duration-300 hover:-translate-y-0.5 active:scale-95 ${
                      isActive
                        ? "text-white bg-gradient-to-r from-teal-600 to-sky-600 shadow-[0_8px_18px_-6px_rgba(13,148,136,0.5),inset_0_1px_3px_rgba(255,255,255,0.4)]"
                        : "text-slate-600 hover:text-teal-700 hover:bg-white/80"
                    }`
                  }
                >
                  {l.label}
                </NavLink>
              </li>
            ))}
          </ul>

          {/* ---- Actions: pinned right, never wrap, never overflow ---- */}
          <div className="flex items-center gap-1.5 sm:gap-2 ml-auto lg:ml-0 shrink-0">
            {/* Phone shortcut — desktop only, keeps tablet bar compact */}
            <a
              href={CLINIC.phoneHref}
              aria-label={`Call the clinic on ${CLINIC.phoneDisplay}`}
              className="hidden xl:grid w-10 h-10 shrink-0 rounded-full glass place-items-center text-teal-700 transition-transform duration-300 hover:-translate-y-0.5 hover:text-teal-800 active:scale-90"
            >
              <Phone size={17} />
            </a>

            {/* Booking CTA — label compresses on small phones */}
            <button
              type="button"
              onClick={() => openBooking()}
              className="btn-primary shrink-0 whitespace-nowrap !py-2 !px-3.5 sm:!py-2.5 sm:!px-5 text-[13px] sm:text-sm"
            >
              <CalendarCheck size={15} className="shrink-0" />
              <span className="hidden min-[420px]:inline">Book Visit</span>
              <span className="min-[420px]:hidden">Book</span>
            </button>

            {/* Hamburger — fixed square, always the last (right-most) item */}
            <button
              type="button"
              onClick={() => setMenuOpen((v) => !v)}
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              className="lg:hidden w-9 h-9 sm:w-10 sm:h-10 shrink-0 grid place-items-center rounded-full clay-sm text-navy-deep transition-transform duration-300 hover:-translate-y-0.5 active:scale-90"
            >
              {/* Icon morphs with a smooth quarter-turn while swapping */}
              <span
                className={`grid place-items-center transition-transform duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)] ${
                  menuOpen ? "rotate-90 scale-110" : "rotate-0 scale-100"
                }`}
                aria-hidden="true"
              >
                {menuOpen ? <X size={19} /> : <Menu size={19} />}
              </span>
            </button>
          </div>
        </nav>
      </header>

      {/* ---- Mobile glass menu — compact sheet, HORIZONTAL pill scroll ----
          The link rail scrolls sideways (slim mint scrollbar) so the sheet
          never overflows vertically and no vertical scrollbar can flash.
          Render gate is `menuMounted` so the closing fade can play out. */}
      {menuMounted && (
        <div
          id="mobile-menu"
          className={`fixed inset-0 z-[75] lg:hidden ${!menuOpen ? "pointer-events-none" : ""}`}
          role="dialog"
          aria-modal="true"
          aria-hidden={!menuOpen}
          aria-label="Site menu"
        >
          <div
            className="menu-backdrop absolute inset-0 bg-teal-950/20 backdrop-blur-sm"
            onClick={() => setMenuOpen(false)}
            aria-hidden="true"
          />
          <div className="menu-panel absolute inset-x-2.5 top-[4.5rem] sm:top-24 rounded-[28px] glass-deep p-4 sm:p-5 flex flex-col gap-4">
            {/* Row label + count */}
            <div className="menu-label flex items-center justify-between px-1">
              <span className="font-display text-[11px] font-bold uppercase tracking-[0.2em] text-teal-700">
                Navigate
              </span>
              <span className="text-[10px] font-semibold text-slate-400">
                swipe sideways →
              </span>
            </div>

            {/* Horizontal pill rail — scrolls x, snap-aligned, silent track */}
            <nav className="h-scrollbar snap-x snap-proximity -mx-1 px-1 pb-2" aria-label="Primary (mobile)">
              <ul className="flex gap-2 w-max" role="list">
                {LINKS.map((l) => (
                  <li key={l.to} className="mobile-link shrink-0 snap-start">
                    <NavLink
                      to={l.to}
                      end={l.to === "/"}
                      className={({ isActive }) =>
                        `inline-flex items-center gap-1.5 rounded-full px-5 py-3 font-display font-bold text-sm whitespace-nowrap transition-all duration-300 active:scale-95 ${
                          isActive
                            ? "text-white bg-gradient-to-r from-teal-600 to-sky-600 shadow-[0_10px_20px_-8px_rgba(13,148,136,0.55),inset_0_1px_3px_rgba(255,255,255,0.4)]"
                            : "text-navy-deep clay-sm hover:text-teal-700 hover:-translate-y-0.5"
                        }`
                      }
                    >
                      {l.label}
                    </NavLink>
                  </li>
                ))}
              </ul>
            </nav>

            {/* Actions — rise softly after the pill cascade */}
            <button
              type="button"
              onClick={() => {
                setMenuOpen(false);
                openBooking();
              }}
              className="menu-action btn-primary w-full"
            >
              <CalendarCheck size={18} /> Book Appointment
            </button>
            <div className="menu-action grid grid-cols-2 gap-2.5">
              <a href={CLINIC.phoneHref} className="btn-emerald !py-3 text-sm">
                <Phone size={16} /> Call
              </a>
              <a
                href={buildWhatsAppLink("Hello Pearl Dental Studio! I'd like to ask a question about a demo appointment.")}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-ghost !py-3 text-sm"
              >
                <MessageCircle size={16} /> WhatsApp
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

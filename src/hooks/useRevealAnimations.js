/**
 * useRevealAnimations.js — Central GSAP + ScrollTrigger choreography (v2).
 * One hook, mounted once per route, powers every scroll effect:
 *   [data-reveal]        → fast upward fade (22px, 0.5s, power2.out)
 *   [data-reveal-group]  → quick staggered cascade of child [data-reveal-item]
 *   [data-parallax]      → scrubbed floating parallax (speed via data-parallax)
 *   [data-count]         → animated number counters (trust metrics)
 *
 * v2 performance & feel upgrades:
 *   • 0.35–0.55s durations, minimal base delays, 0.07s staggers — content
 *     never feels "locked" behind motion
 *   • once:true triggers so reveals fire a single time only
 *   • start "top 92%" so elements animate the moment they peek into view
 *   • prefers-reduced-motion → content is set visible instantly, no tweens
 *   • every trigger is reverted on route change (leak-free)
 */
import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/* Formats a finished counter value (used by tween updates & reduced-motion) */
const finalCountText = (el) => {
  const target = parseFloat(el.dataset.count);
  const decimals = parseInt(el.dataset.decimals || "0", 10);
  const suffix = el.dataset.suffix || "";
  return target.toFixed(decimals).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + suffix;
};

export default function useRevealAnimations() {
  const { pathname } = useLocation();
  const isFirstRender = useRef(true);

  useEffect(() => {
    // Base delays are intentionally minimal so above-the-fold content is
    // never held hostage: first load reveals AS the (shortened) loader
    // curtain lifts; route changes reveal AS the glass lens retracts.
    const BASE_DELAY = isFirstRender.current ? 0.28 : 0.45;
    isFirstRender.current = false;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const ctx = gsap.context(() => {
      /* ---- Reduced motion: everything visible immediately ------------- */
      if (reduced) {
        gsap.set("[data-reveal], [data-reveal-item]", { opacity: 1, y: 0, scale: 1 });
        document.querySelectorAll("[data-count]").forEach((el) => {
          el.textContent = finalCountText(el);
        });
        return;
      }

      /* 1 — Single reveals: snappy 14px rise, 0.3s ------------------------- */
      gsap.utils.toArray("[data-reveal]").forEach((el) => {
        const delay = BASE_DELAY + parseFloat(el.dataset.delay || 0);
        gsap.fromTo(
          el,
          { y: 14, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.3,
            delay,
            ease: "power2.out",
            scrollTrigger: { trigger: el, start: "top 95%", once: true },
          }
        );
      });

      /* 2 — Staggered group reveals: rapid fire cascades (0.04s steps) ----- */
      gsap.utils.toArray("[data-reveal-group]").forEach((group) => {
        const items = group.querySelectorAll("[data-reveal-item]");
        if (!items.length) return;
        gsap.fromTo(
          items,
          { y: 16, opacity: 0, scale: 0.99 },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 0.32,
            delay: BASE_DELAY,
            stagger: 0.04,
            ease: "power2.out",
            scrollTrigger: { trigger: group, start: "top 95%", once: true },
          }
        );
      });

      /* 3 — Floating parallax (scrubbed, butter-smooth) ------------------- */
      gsap.utils.toArray("[data-parallax]").forEach((el) => {
        const speed = parseFloat(el.dataset.parallax || 0.12);
        gsap.to(el, {
          y: () => -90 * speed,
          ease: "none",
          scrollTrigger: {
            trigger: el,
            start: "top bottom",
            end: "bottom top",
            scrub: 1,
          },
        });
      });

      /* 4 — Animated trust counters (1.15s, once) -------------------------- */
      gsap.utils.toArray("[data-count]").forEach((el) => {
        const target = parseFloat(el.dataset.count);
        const decimals = parseInt(el.dataset.decimals || "0", 10);
        const suffix = el.dataset.suffix || "";
        const obj = { val: 0 };
        gsap.to(obj, {
          val: target,
          duration: 1.0,
          delay: BASE_DELAY,
          ease: "power2.out",
          scrollTrigger: { trigger: el, start: "top 92%", once: true },
          onUpdate: () => {
            el.textContent = obj.val.toFixed(decimals).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + suffix;
          },
        });
      });
    });

    // Recalculate trigger positions once layout settles & media decodes
    const refreshTimer = setTimeout(() => ScrollTrigger.refresh(), 380);

    /* ------------------------------------------------------------------
       FAILSAFE — content can never be stranded invisible.
       If a reveal element intersects the viewport but its total hasn't
       run within the expected window (anchor jump, mid-scroll route
       change, missed init, extreme viewport), force it into its final
       state. Failsclosed direction: VISIBLE. Also completes counters.
       ------------------------------------------------------------------ */
    const pendingTimers = [];
    const failsafeIO = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting || reduced) return;
          const el = entry.target;
          failsafeIO.unobserve(el);
          const timer = window.setTimeout(() => {
            if (!el.isConnected) return;
            const opacity = parseFloat(getComputedStyle(el).opacity);
            if (opacity < 0.05) {
              gsap.set(el, { opacity: 1, y: 0, scale: 1 }); // final state, no jump-cut
            }
            if (el.hasAttribute("data-count") && el.textContent.trim().charAt(0) === "0") {
              el.textContent = finalCountText(el);
            }
          }, BASE_DELAY * 1000 + 1100);
          pendingTimers.push(timer);
        });
      },
      { threshold: 0.02, rootMargin: "0px 0px -6% 0px" }
    );
    document
      .querySelectorAll("[data-reveal], [data-reveal-item], [data-count]")
      .forEach((el) => failsafeIO.observe(el));

    return () => {
      clearTimeout(refreshTimer);
      failsafeIO.disconnect();
      pendingTimers.forEach(clearTimeout);
      ctx.revert(); // kills every ScrollTrigger & tween created in this pass
    };
  }, [pathname]);
}

/**
 * SectionHeading.jsx — Consistent editorial section opener.
 * Semantic h2 wrapped in a <header>, kicker chip, gradient-accent title and
 * an optional intro paragraph. All pieces carry data-reveal hooks so the
 * central GSAP choreographer animates them on scroll.
 */
export default function SectionHeading({ kicker, title, accent, intro, align = "center" }) {
  const alignment = align === "center" ? "text-center mx-auto items-center" : "text-left items-start";

  return (
    <header className={`max-w-2xl flex flex-col ${alignment}`}>
      {kicker && (
        <span className="kicker" data-reveal>
          {kicker}
        </span>
      )}
      <h2
        className="font-display font-bold text-navy-deep tracking-tight leading-[1.08] text-3xl sm:text-4xl lg:text-[2.75rem] mt-4"
        data-reveal
        data-delay="0.08"
      >
        {title} {accent && <span className="text-gradient">{accent}</span>}
      </h2>
      {intro && (
        <p className="text-slate-med leading-relaxed mt-4" data-reveal data-delay="0.16">
          {intro}
        </p>
      )}
    </header>
  );
}

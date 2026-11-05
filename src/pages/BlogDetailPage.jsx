/**
 * BlogDetailPage.jsx — Dynamic article route (/blog/:slug).
 * Full editorial layout: gradient cover, meta chips, content sections with
 * optional lists, medical disclaimer banner, clinician author box and
 * related-article rail. Unknown slugs redirect to /blog.
 */
import { Link, Navigate, useParams } from "react-router-dom";
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  CalendarDays,
  Clock,
  Stethoscope,
  ShieldAlert,
} from "lucide-react";
import SEOHead from "../components/layout/SEOHead";
import { useBooking } from "../context/BookingContext";
import { BLOG_POSTS, getPostBySlug, TEAM } from "../data/clinicData";
import IMAGES from "../assets/images";

export default function BlogDetailPage() {
  const { slug } = useParams();
  const { openBooking } = useBooking();
  const post = getPostBySlug(slug);

  if (!post) return <Navigate to="/blog" replace />;

  const related = BLOG_POSTS.filter((p) => p.slug !== post.slug).slice(0, 2);
  const authorProfile = TEAM.find((m) => post.author.includes(m.name.split(" ")[1])) || TEAM[0];

  return (
    <>
      <SEOHead
        title={post.title}
        description={post.excerpt}
        path={`/blog/${post.slug}`}
      />

      <article className="pt-32 sm:pt-36 lg:pt-40 max-w-3xl mx-auto px-5 sm:px-8">
        <Link
          to="/blog"
          className="inline-flex items-center gap-2 text-sm font-display font-semibold text-teal-700 hover:gap-3 transition-all"
          data-reveal
        >
          <ArrowLeft size={16} /> All articles
        </Link>

        {/* ---- Header ----------------------------------------------------- */}
        <header className="mt-7">
          <div className="flex flex-wrap items-center gap-2.5" data-reveal data-delay="0.05">
            <span className="kicker !text-[10px]">{post.category}</span>
            <span className="text-xs text-slate-400 font-medium flex items-center gap-1.5">
              <CalendarDays size={13} className="text-teal-500" /> {post.date}
            </span>
            <span className="text-xs text-slate-400 font-medium flex items-center gap-1.5">
              <Clock size={13} className="text-teal-500" /> {post.readTime}
            </span>
          </div>

          <h1 className="font-display font-bold text-navy-deep tracking-tight leading-[1.08] text-3xl sm:text-[2.75rem] mt-5" data-reveal data-delay="0.1">
            {post.title}
          </h1>
          <p className="text-slate-med leading-relaxed mt-4 text-[15px] sm:text-base" data-reveal data-delay="0.16">
            {post.excerpt}
          </p>

          {/* Gradient cover tile */}
          <div className={`mt-8 h-56 sm:h-72 rounded-[30px] bg-gradient-to-br ${post.accent} relative overflow-hidden shadow-clay`} data-reveal data-delay="0.2" role="img" aria-label={`Decorative gradient cover for ${post.title}`}>
            <div className="absolute inset-0 opacity-30" style={{ background: "radial-gradient(26rem 14rem at 85% 10%, rgba(255,255,255,0.95), transparent 60%)" }} aria-hidden="true" />
            <BookOpen className="absolute bottom-6 right-6 w-14 h-14 text-white/70" aria-hidden="true" />
          </div>
        </header>

        {/* ---- Medical disclaimer banner (required) ------------------------- */}
        <div
          className="mt-8 rounded-3xl border border-amber-300/60 bg-gradient-to-r from-amber-50 to-orange-50 px-6 py-5 flex items-start gap-3.5"
          role="note"
          data-reveal
        >
          <ShieldAlert size={20} className="text-amber-500 mt-0.5 shrink-0" />
          <p className="text-[13px] leading-relaxed text-amber-800">
            <strong className="font-display">Medical disclaimer:</strong> This article is general
            educational content for a demo clinic website. It is not medical advice and cannot
            replace a personalised clinical examination — please consult a qualified dentist about
            your specific situation.
          </p>
        </div>

        {/* ---- Body sections ------------------------------------------------ */}
        <div className="mt-10 space-y-12">
          {post.sections.map((section, i) => (
            <section key={section.heading} data-reveal aria-label={section.heading}>
              <h2 className="font-display font-bold text-navy-deep tracking-tight text-2xl flex items-start gap-3.5">
                <span className="text-gradient font-display font-bold text-lg mt-1 shrink-0" aria-hidden="true">
                  {String(i + 1).padStart(2, "0")}
                </span>
                {section.heading}
              </h2>
              {section.paragraphs.map((p, j) => (
                <p key={j} className="text-slate-med leading-[1.85] mt-4 text-[15px]">
                  {p}
                </p>
              ))}
              {section.list && (
                <ul className="mt-5 space-y-2.5">
                  {section.list.map((li) => (
                    <li key={li} className="flex items-start gap-3 clay-inset rounded-2xl px-5 py-3 text-sm font-medium text-slate-700">
                      <span className="w-2 h-2 rounded-full bg-gradient-to-br from-teal-500 to-sky-500 mt-1.5 shrink-0" aria-hidden="true" />
                      {li}
                    </li>
                  ))}
                </ul>
              )}
            </section>
          ))}
        </div>

        {/* ---- Tags ---------------------------------------------------------- */}
        <div className="flex flex-wrap gap-2 mt-12" data-reveal>
          {post.tags.map((t) => (
            <span key={t} className="clay-inset rounded-full px-3.5 py-1.5 text-xs font-semibold text-teal-800">
              #{t}
            </span>
          ))}
        </div>

        {/* ---- Author box ----------------------------------------------------- */}
        <aside className="clay-lg p-7 sm:p-8 mt-12 flex flex-col sm:flex-row gap-6 items-start" data-reveal aria-label="About the author">
          <img
            src={IMAGES[authorProfile.image]}
            alt={`Portrait of ${post.author} (sample demo profile photo)`}
            className="w-24 h-24 rounded-3xl object-cover shadow-clay-sm border-4 border-white shrink-0"
            loading="lazy"
            decoding="async"
          />
          <div className="flex-1">
            <p className="text-[10px] font-display font-bold uppercase tracking-[0.2em] text-teal-600">Written & clinically reviewed by</p>
            <h3 className="font-display font-bold text-navy-deep text-xl mt-1.5">{post.author}</h3>
            <p className="text-sm text-teal-700 font-semibold mt-0.5">{post.authorRole}</p>
            <p className="text-sm text-slate-med leading-relaxed mt-3">
              Every guide in the Studio Journal is written by a treating clinician and reviewed for
              accuracy before publishing. Demo profile —{" "}
              <Link to="/team" className="font-semibold text-teal-700 underline underline-offset-2 hover:text-teal-800">
                meet the sample team
              </Link>
              .
            </p>
          </div>
        </aside>

        {/* ---- Inline CTA ------------------------------------------------------ */}
        <div className="mt-10 rounded-[28px] bg-navy-deep text-white p-8 sm:p-10 text-center relative overflow-hidden" data-reveal>
          <div className="pointer-events-none absolute inset-0" style={{ background: "radial-gradient(30rem 12rem at 50% 0%, rgba(13,148,136,0.35), transparent 65%)" }} aria-hidden="true" />
          <Stethoscope className="relative mx-auto text-teal-300" size={28} aria-hidden="true" />
          <h3 className="relative font-display font-bold text-2xl mt-4 tracking-tight">Prefer a professional set of eyes?</h3>
          <p className="relative text-slate-400 text-sm mt-2 max-w-sm mx-auto">
            Reading helps; examining answers. A checkup turns general advice into your personal plan.
          </p>
          <button type="button" onClick={() => openBooking()} className="relative btn-emerald mt-6">
            Book a Checkup — $49 demo
          </button>
        </div>
      </article>

      {/* ---- Related articles ------------------------------------------------- */}
      <section className="max-w-4xl mx-auto px-5 sm:px-8 mt-20" aria-label="Related articles">
        <h2 className="font-display font-bold text-navy-deep text-2xl sm:text-3xl tracking-tight" data-reveal>
          Keep <span className="text-gradient">reading</span>
        </h2>
        <div className="grid sm:grid-cols-2 gap-6 mt-8" data-reveal-group>
          {related.map((p) => (
            <Link
              key={p.slug}
              to={`/blog/${p.slug}`}
              data-reveal-item
              className="clay clay-hover group p-6 flex flex-col"
            >
              <span className="kicker !text-[10px] !py-1.5 self-start">{p.category}</span>
              <h3 className="font-display font-bold text-navy-deep text-lg leading-snug mt-4 group-hover:text-teal-700 transition-colors flex-1">
                {p.title}
              </h3>
              <span className="mt-4 inline-flex items-center gap-1.5 font-display font-bold text-teal-700 text-sm">
                Read article <ArrowRight size={14} className="transition-transform duration-300 group-hover:translate-x-1" />
              </span>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}

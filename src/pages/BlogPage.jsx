/**
 * BlogPage.jsx — Dental health blog & FAQ hub route (/blog).
 * Live search (title, excerpt, tags) + category chips filter the article
 * grid; each clay card links to its dynamic /blog/:slug route. A full
 * accessible FAQ accordion closes the page.
 */
import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, BookOpen, CalendarDays, Clock, Newspaper, SearchX, Search } from "lucide-react";
import SEOHead from "../components/layout/SEOHead";
import SectionHeading from "../components/ui/SectionHeading";
import FAQAccordion from "../components/ui/FAQAccordion";
import { BLOG_CATEGORIES, BLOG_POSTS, GENERAL_FAQS } from "../data/clinicData";

export default function BlogPage() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All Articles");

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    return BLOG_POSTS.filter((p) => {
      const inCategory = category === "All Articles" || p.category === category;
      if (!q) return inCategory;
      const hay = `${p.title} ${p.excerpt} ${p.tags.join(" ")}`.toLowerCase();
      return inCategory && hay.includes(q);
    });
  }, [query, category]);

  return (
    <>
      <SEOHead
        title="Dental Health Blog & Patient FAQ"
        description="Plain-language dental guides: prevention habits, honest treatment comparisons and children's dental care — plus the questions patients ask most. Demo clinic blog."
        path="/blog"
      />

      {/* ---- Hero + search ------------------------------------------------- */}
      <section className="pt-32 sm:pt-36 lg:pt-40 max-w-6xl mx-auto px-5 sm:px-8">
        <SectionHeading
          align="left"
          kicker="The Studio Journal"
          title="Dental wisdom,"
          accent="zero jargon."
          intro="Educational guides written by our clinicians — prevention, honest treatment comparisons and family care. Search anything, or browse by topic."
        />

        {/* Live search */}
        <div className="max-w-xl mt-8" data-reveal>
          <label className="flex items-center gap-3 clay-inset rounded-2xl px-5 py-4">
            <Search size={18} className="text-teal-600 shrink-0" aria-hidden="true" />
            <span className="sr-only">Search articles</span>
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Try “aligners”, “enamel”, “children”…"
              className="w-full bg-transparent outline-none text-[15px] font-medium text-navy-deep placeholder:text-slate-400"
              aria-label="Search blog articles"
            />
          </label>
        </div>

        {/* Category chips */}
        <div className="flex flex-wrap gap-2.5 mt-5" role="tablist" aria-label="Filter articles by category" data-reveal>
          {BLOG_CATEGORIES.map((c) => {
            const selected = category === c;
            return (
              <button
                key={c}
                role="tab"
                aria-selected={selected}
                onClick={() => setCategory(c)}
                className={`font-display text-[13px] font-semibold rounded-full px-4 py-2 transition-all duration-300 active:scale-95 ${
                  selected
                    ? "text-white bg-gradient-to-r from-teal-600 to-sky-600 shadow-clay-sm -translate-y-0.5"
                    : "text-slate-600 clay-sm hover:text-teal-700 hover:-translate-y-0.5"
                }`}
              >
                {c}
              </button>
            );
          })}
        </div>
      </section>

      {/* ---- Article grid ---------------------------------------------------- */}
      <section className="max-w-6xl mx-auto px-5 sm:px-8 mt-12" aria-live="polite" aria-label="Article results">
        {results.length === 0 ? (
          <div className="clay-lg p-14 text-center max-w-lg mx-auto">
            <span className="clay-inset w-14 h-14 rounded-2xl grid place-items-center text-teal-600 mx-auto">
              <SearchX size={24} />
            </span>
            <h2 className="font-display font-bold text-navy-deep text-xl mt-5">No articles match “{query}”</h2>
            <p className="text-sm text-slate-med mt-2">Try a simpler term like “whitening” or “gums” — or clear the search.</p>
            <button type="button" onClick={() => { setQuery(""); setCategory("All Articles"); }} className="btn-ghost mt-6 !py-2.5 text-sm">
              Clear search
            </button>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-2 gap-7" data-reveal-group>
            {results.map((post, i) => (
              <article key={post.slug} data-reveal-item className="h-full">
                <Link
                  to={`/blog/${post.slug}`}
                  className="clay clay-hover group flex flex-col h-full p-7 sm:p-8"
                  aria-label={`Read article: ${post.title}`}
                >
                  {/* Gradient "cover" — textural brand tile instead of stock photo */}
                  <div className={`relative h-40 rounded-3xl overflow-hidden bg-gradient-to-br ${post.accent}`}>
                    <div className="absolute inset-0 opacity-25" style={{ background: "radial-gradient(18rem 10rem at 80% 0%, rgba(255,255,255,0.9), transparent 60%)" }} aria-hidden="true" />
                    <span className="absolute top-4 left-4 glass rounded-full px-3.5 py-1.5 text-[10px] font-display font-bold uppercase tracking-[0.14em] text-teal-900">
                      {post.category}
                    </span>
                    <span className="absolute bottom-4 left-4 w-11 h-11 rounded-2xl grid place-items-center bg-white/25 backdrop-blur-sm border border-white/40 text-white">
                      <Newspaper size={19} aria-hidden="true" />
                    </span>
                  </div>

                  <h2 className="font-display font-bold text-navy-deep text-xl sm:text-[1.35rem] leading-snug mt-6 group-hover:text-teal-700 transition-colors">
                    {post.title}
                  </h2>
                  <p className="text-sm text-slate-med leading-relaxed mt-2.5 flex-1">{post.excerpt}</p>

                  <div className="flex items-center gap-4 mt-5 pt-5 border-t border-slate-100 text-xs text-slate-400 font-medium">
                    <span className="flex items-center gap-1.5"><CalendarDays size={13} className="text-teal-500" />{post.date}</span>
                    <span className="flex items-center gap-1.5"><Clock size={13} className="text-teal-500" />{post.readTime}</span>
                    <span className="ml-auto flex items-center gap-1.5 font-display font-bold text-teal-700">
                      Read <ArrowRight size={13} className="transition-transform duration-300 group-hover:translate-x-1" />
                    </span>
                  </div>
                </Link>
              </article>
            ))}
          </div>
        )}
      </section>

      {/* ---- FAQ block ------------------------------------------------------- */}
      <section className="max-w-4xl mx-auto px-5 sm:px-8 mt-24" aria-label="Frequently asked questions">
        <SectionHeading
          kicker="Patient FAQ"
          title="Quick answers to"
          accent="common questions"
          intro="The questions our front desk answers every single day — collected here, in plain language."
        />
        <div className="mt-10" data-reveal>
          <FAQAccordion items={GENERAL_FAQS} prefix="blog-faq" />
        </div>
        <p className="text-center text-xs text-slate-400 mt-8 flex items-center justify-center gap-1.5">
          <BookOpen size={12} /> Educational content only — not a substitute for a clinical examination.
        </p>
      </section>
    </>
  );
}

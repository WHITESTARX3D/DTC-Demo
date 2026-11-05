/**
 * TestimonialSwiper.jsx — Patient stories carousel (Swiper.js).
 * Responsive 1→2→2.6 slide layout, autoplay with hover pause, loop mode and
 * claymorphic pagination bullets (styled in index.css). Each card renders a
 * starred rating, quote mark, text and a sample-review disclosure chip.
 */
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay, A11y } from "swiper/modules";
import { Star, Quote } from "lucide-react";
import "swiper/css";
import "swiper/css/pagination";

export default function TestimonialSwiper({ testimonials }) {
  return (
    <Swiper
      modules={[Pagination, Autoplay, A11y]}
      slidesPerView={1.05}
      spaceBetween={20}
      centeredSlides={false}
      loop={testimonials.length > 3}
      autoplay={{ delay: 4200, disableOnInteraction: false, pauseOnMouseEnter: true }}
      pagination={{ clickable: true }}
      breakpoints={{
        640: { slidesPerView: 1.5, spaceBetween: 22 },
        900: { slidesPerView: 2.05, spaceBetween: 24 },
        1280: { slidesPerView: 2.6, spaceBetween: 26 },
      }}
      a11y={{ prevSlideMessage: "Previous testimonials", nextSlideMessage: "Next testimonials" }}
      className="!overflow-visible"
      /* Reserve the slide lane before slides measure out — kills the
         carousel layout shift on first paint and route re-entry. */
      style={{ minHeight: "300px" }}
    >
      {testimonials.map((t) => (
        <SwiperSlide key={t.id} className="h-auto">
          <figure className="clay clay-hover h-full p-7 flex flex-col">
            {/* rating + quote mark */}
            <div className="flex items-center justify-between">
              <div className="flex gap-1" aria-label={`Rated ${t.rating} out of 5 stars`}>
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    size={16}
                    className={i < t.rating ? "text-amber-400 fill-amber-400" : "text-slate-200 fill-slate-200"}
                    aria-hidden="true"
                  />
                ))}
              </div>
              <span className="clay-inset w-9 h-9 rounded-xl grid place-items-center">
                <Quote size={15} className="text-teal-600" aria-hidden="true" />
              </span>
            </div>

            <blockquote className="mt-4 text-[15px] leading-relaxed text-slate-600 flex-1">
              “{t.text}”
            </blockquote>

            <figcaption className="mt-6 pt-5 border-t border-slate-100 flex items-center gap-3.5">
              {/* Monogram avatar (no fabricated photos) */}
              <span className="w-11 h-11 rounded-full grid place-items-center font-display font-bold text-white text-sm bg-gradient-to-br from-teal-500 to-sky-500 shadow-[0_8px_16px_-6px_rgba(13,148,136,0.5),inset_0_2px_4px_rgba(255,255,255,0.4)]">
                {t.name.charAt(0)}
              </span>
              <div className="min-w-0">
                <p className="font-display font-bold text-navy-deep text-sm truncate">{t.name}</p>
                <p className="text-[11px] text-slate-400 truncate">{t.meta}</p>
              </div>
              <span className="ml-auto text-[10px] font-semibold text-slate-400 whitespace-nowrap">{t.date}</span>
            </figcaption>
          </figure>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}

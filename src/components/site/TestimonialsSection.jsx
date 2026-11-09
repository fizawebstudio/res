import { Star } from 'lucide-react';
import { TESTIMONIALS } from '@/data/restaurantData';

function Stars({ rating }) {
  return (
    <div className="flex items-center gap-0.5" aria-label={`${rating} out of 5 stars`}>
      {Array.from({ length: 5 }).map((_, index) => (
        <Star
          key={index}
          className={`h-3.5 w-3.5 ${index < rating ? 'fill-sand text-sand' : 'text-line'}`}
          strokeWidth={index < rating ? 0 : 1.6}
        />
      ))}
    </div>
  );
}

export default function TestimonialsSection({ reviews = TESTIMONIALS }) {
  return (
    <section className="bg-warm py-16 md:py-20">
      <div className="ff-container">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="eyebrow flex items-center gap-3 text-ember">
              <span className="h-px w-7 bg-ember" />
              Guest reviews
            </p>
            <h2 className="type-section mt-3 text-ink">What people say after eating</h2>
          </div>
          <div className="flex items-center gap-3 rounded-xl border border-line bg-white px-4 py-3">
            <span className="font-display text-[22px] font-semibold text-ink">4.9</span>
            <div>
              <Stars rating={5} />
              <p className="mt-1 text-[11px] text-ink-soft">1,200+ reviews</p>
            </div>
          </div>
        </div>

        <div className="mt-8 grid gap-4 md:grid-cols-3 md:gap-5">
          {reviews.map((review) => (
            <figure
              key={review.name}
              className="flex flex-col rounded-xl border border-line bg-white p-6"
            >
              <Stars rating={review.rating} />
              <blockquote className="mt-3 flex-1 text-[13.5px] leading-relaxed text-ink">
                “{review.quote}”
              </blockquote>
              <figcaption className="mt-5 flex items-center gap-3 border-t border-line pt-4">
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-peach text-[12px] font-semibold text-ember-dark">
                  {review.name
                    .split(' ')
                    .map((part) => part[0])
                    .join('')
                    .slice(0, 2)}
                </span>
                <div>
                  <p className="text-[13px] font-semibold text-ink">{review.name}</p>
                  <p className="text-[11.5px] text-ink-soft">{review.meta}</p>
                </div>
              </figcaption>
            </figure>
          ))}
        </div>

        <p className="mt-5 text-[11.5px] text-ink-soft">
          Sample reviews shown for demonstration — replace them from your dashboard at any time.
        </p>
      </div>
    </section>
  );
}
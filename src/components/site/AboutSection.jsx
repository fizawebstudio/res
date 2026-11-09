import { Link } from 'react-router-dom';
import { ArrowRight, Check } from 'lucide-react';
import { Image } from '@/components/ui/image';
import { IMG } from '@/data/images';
import { STATS, STORY_POINTS } from '@/data/restaurantData';

export default function AboutSection() {
  return (
    <section id="story" className="bg-white py-16 md:py-20">
      <div className="ff-container grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
        <div className="relative mx-auto w-full max-w-[520px]">
          <div className="absolute -left-3 -top-3 h-24 w-24 rounded-2xl bg-blush" aria-hidden="true" />
          <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-line shadow-soft">
            <Image
              src={IMG.interior}
              alt="The FLAME & FORK dining room with oak tables and warm daylight"
              className="h-full w-full object-cover"
            />
          </div>
          <div className="absolute -bottom-8 right-2 hidden h-40 w-40 overflow-hidden rounded-xl border-4 border-white shadow-lift sm:block">
            <Image
              src={IMG.chef}
              alt="A chef plating a dish in the open kitchen"
              className="h-full w-full object-cover"
            />
          </div>
        </div>

        <div className="lg:pl-4">
          <p className="eyebrow flex items-center gap-3 text-ember">
            <span className="h-px w-7 bg-ember" />
            Our story
          </p>
          <h2 className="type-section mt-3 text-ink">Good food brings people together.</h2>
          <p className="mt-5 text-[14.5px] leading-relaxed text-ink-soft">
            FLAME &amp; FORK started as a twelve-seat counter with one flat top and a stubborn belief
            that a burger deserves the same care as a steak. A decade later the room is bigger, the
            grill is hotter, and the rule has not changed: quality ingredients, honest cooking, served
            by people who are glad you came.
          </p>
          <p className="mt-3 text-[14.5px] leading-relaxed text-ink-soft">
            We grind our own beef each morning, ferment our pizza dough for 72 hours, bread our
            chicken by hand and make every sauce in-house. What we cannot make well, we do not serve.
          </p>

          <ul className="mt-6 grid gap-2.5 sm:grid-cols-2">
            {STORY_POINTS.map((point) => (
              <li key={point} className="flex items-start gap-2 text-[13px] leading-relaxed text-ink">
                <span className="mt-0.5 flex h-[18px] w-[18px] shrink-0 items-center justify-center rounded-full bg-blush text-ember-dark">
                  <Check className="h-3 w-3" strokeWidth={3} />
                </span>
                {point}
              </li>
            ))}
          </ul>

          <div className="mt-7 grid grid-cols-2 gap-4 border-t border-line pt-6 sm:grid-cols-4">
            {STATS.map((stat) => (
              <div key={stat.label}>
                <p className="font-display text-[24px] font-semibold text-ink">{stat.value}</p>
                <p className="mt-0.5 text-[11.5px] leading-snug text-ink-soft">{stat.label}</p>
              </div>
            ))}
          </div>

          <Link
            to="/about"
            className="group mt-7 inline-flex items-center gap-2 rounded-[10px] border border-line px-5 py-3 text-[13px] font-semibold text-ink transition-colors hover:border-ember/40 hover:text-ember"
          >
            Read our story
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </Link>
        </div>
      </div>
    </section>
  );
}
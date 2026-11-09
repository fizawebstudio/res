import PageHero from '@/components/site/PageHero';
import AboutSection from '@/components/site/AboutSection';
import WhyUsSection from '@/components/site/WhyUsSection';
import GallerySection from '@/components/site/GallerySection';
import { IMG } from '@/data/images';

const MILESTONES = [
  {
    year: '2014',
    title: 'Twelve seats and one flat top',
    text: 'A small counter on Harbor View Avenue, open six nights a week, with a menu of four burgers.',
  },
  {
    year: '2017',
    title: 'The stone deck oven',
    text: 'A 72-hour cold ferment and a margherita that has not left the menu since the day it landed.',
  },
  {
    year: '2021',
    title: 'The room doubles',
    text: 'Long tables, tan leather booths and an open kitchen so guests can watch the pass at work.',
  },
  {
    year: '2026',
    title: 'Still the same rule',
    text: 'Quality ingredients, honest cooking, and a team that is genuinely glad you walked in.',
  },
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="Our story"
        title="A kitchen built on live fire"
        description="Since 2014, FLAME & FORK has been a neighbourhood kitchen built around generous plates, careful sourcing and a room that feels like it belongs to you."
        image={IMG.interior}
        imageAlt="The FLAME & FORK dining room in daylight"
      />

      <AboutSection />

      <section className="border-y border-line bg-mist py-16 md:py-20">
        <div className="ff-container">
          <div className="max-w-2xl">
            <p className="eyebrow flex items-center gap-3 text-ember">
              <span className="h-px w-7 bg-ember" />
              How we got here
            </p>
            <h2 className="type-section mt-3 text-ink">A short history</h2>
          </div>
          <div className="mt-9 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {MILESTONES.map((milestone) => (
              <div
                key={milestone.year}
                className="rounded-xl border border-line bg-white p-5"
              >
                <p className="font-display text-[22px] font-semibold text-ember">{milestone.year}</p>
                <h3 className="mt-2 font-display text-[15px] font-semibold text-ink">
                  {milestone.title}
                </h3>
                <p className="mt-1.5 text-[13px] leading-relaxed text-ink-soft">{milestone.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <WhyUsSection />
      <GallerySection />
    </>
  );
}
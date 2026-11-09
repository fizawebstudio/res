import { Image } from '@/components/ui/image';

export default function PageHero({ eyebrow, title, description, image, imageAlt = '' }) {
  return (
    <section className="border-b border-line bg-mist">
      <div className="ff-container py-12 md:py-16">
        <div className="grid items-center gap-8 lg:grid-cols-[1.15fr_1fr] lg:gap-14">
          <div>
            {eyebrow && (
              <p className="eyebrow flex items-center gap-3 text-ember">
                <span className="h-px w-7 bg-ember" />
                {eyebrow}
              </p>
            )}
            <h1 className="type-section mt-4 max-w-xl text-ink">{title}</h1>
            {description && (
              <p className="mt-4 max-w-xl text-[15px] leading-relaxed text-ink-soft">{description}</p>
            )}
          </div>
          {image && (
            <div className="relative h-[200px] overflow-hidden rounded-2xl border border-line shadow-soft sm:h-[260px] lg:h-[300px]">
              <Image
                src={image}
                alt={imageAlt || title}
                className="h-full w-full object-cover"
              />
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
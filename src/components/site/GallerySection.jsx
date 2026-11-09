import { Image } from '@/components/ui/image';
import { GALLERY } from '@/data/restaurantData';

export default function GallerySection() {
  return (
    <section className="bg-white py-16 md:py-20">
      <div className="ff-container">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="eyebrow flex items-center gap-3 text-ember">
              <span className="h-px w-7 bg-ember" />
              Gallery
            </p>
            <h2 className="type-section mt-3 text-ink">Inside the room and the kitchen</h2>
          </div>
          <p className="max-w-sm text-[13.5px] leading-relaxed text-ink-soft">
            A look at what leaves the pass and the room you will be eating it in.
          </p>
        </div>

        <div className="mt-8 grid auto-rows-[130px] grid-cols-2 gap-3 md:auto-rows-[165px] md:grid-cols-4 md:gap-4">
          {GALLERY.map((image, index) => (
            <figure
              key={`${image.src}-${index}`}
              className={`group relative overflow-hidden rounded-xl bg-mist ${image.className}`}
            >
              <Image
                src={image.src}
                alt={image.alt}
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.05]"
              />
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { Image } from '@/components/ui/image';
import { CATEGORIES } from '@/data/restaurantData';

export default function CategoryStrip() {
  return (
    <section className="bg-white py-16 md:py-20">
      <div className="ff-container">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="eyebrow flex items-center gap-3 text-ember">
              <span className="h-px w-7 bg-ember" />
              The menu
            </p>
            <h2 className="type-section mt-3 text-ink">Explore our kitchen</h2>
          </div>
          <Link
            to="/menu"
            className="group hidden items-center gap-2 text-[13px] font-semibold text-ink transition-colors hover:text-ember sm:flex"
          >
            View full menu
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </Link>
        </div>

        <div className="mt-8 grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-5">
          {CATEGORIES.map((category) => (
            <Link
              key={category.id}
              to={`/menu?category=${category.id}`}
              className="group overflow-hidden rounded-xl border border-line bg-white transition-all duration-300 hover:-translate-y-0.5 hover:border-ember/40 hover:shadow-soft"
            >
              <div className="relative aspect-[4/3] overflow-hidden">
                <Image
                  src={category.image}
                  alt={category.label}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.06]"
                />
              </div>
              <div className="flex items-center justify-between gap-2 px-4 py-3.5">
                <div>
                  <p className="font-display text-[15px] font-semibold leading-tight text-ink">
                    {category.label}
                  </p>
                  <p className="mt-0.5 text-[11.5px] text-ink-soft">{category.blurb}</p>
                </div>
                <ArrowRight className="h-4 w-4 shrink-0 text-ink-soft transition-colors group-hover:text-ember" />
              </div>
            </Link>
          ))}
        </div>

        <Link
          to="/menu"
          className="mt-6 flex items-center justify-center gap-2 rounded-[10px] border border-line py-3 text-[13px] font-semibold text-ink sm:hidden"
        >
          View full menu
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </section>
  );
}
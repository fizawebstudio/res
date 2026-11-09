import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { MENU_FILTERS } from '@/data/restaurantData';
import MenuItemCard from '@/components/site/MenuItemCard';
import ItemDialog from '@/components/site/ItemDialog';

export default function MenuSection({
  items,
  initialFilter = 'all',
  showViewAll = true,
  eyebrow = 'Our menu',
  title = 'Pick your craving',
  description,
}) {
  const [filter, setFilter] = useState(initialFilter);
  const [selected, setSelected] = useState(null);

  const visible = useMemo(
    () => (filter === 'all' ? items : items.filter((item) => item.category === filter)),
    [items, filter]
  );

  return (
    <section id="menu" className="bg-mist py-16 md:py-20">
      <div className="ff-container">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="eyebrow flex items-center gap-3 text-ember">
              <span className="h-px w-7 bg-ember" />
              {eyebrow}
            </p>
            <h2 className="type-section mt-3 text-ink">{title}</h2>
            {description && (
              <p className="mt-3 max-w-xl text-[14px] leading-relaxed text-ink-soft">{description}</p>
            )}
          </div>
          {showViewAll && (
            <Link
              to="/menu"
              className="group hidden items-center gap-2 text-[13px] font-semibold text-ink transition-colors hover:text-ember sm:flex"
            >
              View all menu
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
          )}
        </div>

        <div className="no-scrollbar -mx-5 mt-7 flex gap-2 overflow-x-auto px-5 pb-1 md:mx-0 md:flex-wrap md:px-0">
          {MENU_FILTERS.map((option) => (
            <button
              key={option.id}
              type="button"
              onClick={() => setFilter(option.id)}
              className={`shrink-0 rounded-[9px] border px-4 py-2 text-[12.5px] font-medium transition-colors ${
                filter === option.id
                  ? 'border-ember bg-ember text-white'
                  : 'border-line bg-white text-ink-soft hover:border-ember/40 hover:text-ink'
              }`}
            >
              {option.label}
            </button>
          ))}
        </div>

        <div className="mt-7 grid grid-cols-2 gap-4 md:grid-cols-3 md:gap-5 lg:grid-cols-4 xl:grid-cols-5">
          {visible.map((item) => (
            <MenuItemCard key={item.id} item={item} onSelect={setSelected} />
          ))}
        </div>

        {showViewAll && (
          <Link
            to="/menu"
            className="mt-7 flex items-center justify-center gap-2 rounded-[10px] border border-line bg-white py-3 text-[13px] font-semibold text-ink sm:hidden"
          >
            View all menu
            <ArrowRight className="h-4 w-4" />
          </Link>
        )}
      </div>

      {selected && <ItemDialog item={selected} onClose={() => setSelected(null)} />}
    </section>
  );
}
import { Plus } from 'lucide-react';
import { Image } from '@/components/ui/image';
import { formatPKR, useCart } from '@/lib/CartContext';

const BADGES = { bestseller: 'Bestseller', new: 'New' };

export default function MenuItemCard({ item, onSelect }) {
  const { addItem } = useCart();

  return (
    <article className="group flex flex-col overflow-hidden rounded-xl border border-line bg-white transition-all duration-300 hover:-translate-y-0.5 hover:shadow-soft">
      <button
        type="button"
        onClick={() => onSelect(item)}
        className="relative block aspect-[4/3] overflow-hidden text-left"
        aria-label={`View ${item.name}`}
      >
        <Image
          src={item.image}
          alt={item.name}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.05]"
        />
        {item.badge && (
          <span className="absolute left-3 top-3 flex items-center gap-1.5 rounded-full bg-white/95 px-2.5 py-1 text-[9.5px] font-semibold uppercase tracking-[0.14em] text-ink shadow-soft">
            <span className="h-1 w-1 rounded-full bg-ember" />
            {BADGES[item.badge] || item.badge}
          </span>
        )}
      </button>

      <div className="flex flex-1 flex-col p-4">
        <button type="button" onClick={() => onSelect(item)} className="text-left">
          <h3 className="font-display text-[15.5px] font-semibold leading-snug text-ink">
            {item.name}
          </h3>
        </button>
        <p className="mt-1.5 line-clamp-2 text-[12.5px] leading-relaxed text-ink-soft">
          {item.description}
        </p>

        <div className="mt-auto flex items-center justify-between gap-2 pt-4">
          <span className="font-display text-[16px] font-semibold text-ink">
            {formatPKR(item.price)}
          </span>
          <button
            type="button"
            onClick={() => addItem(item)}
            aria-label={`Add ${item.name} to cart`}
            className="inline-flex h-9 items-center gap-1.5 rounded-[9px] bg-blush px-3 text-[12px] font-semibold text-ember-dark transition-colors hover:bg-ember hover:text-white"
          >
            <Plus className="h-3.5 w-3.5" strokeWidth={2.4} />
            Add
          </button>
        </div>
      </div>
    </article>
  );
}
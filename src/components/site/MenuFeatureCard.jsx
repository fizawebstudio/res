import { ArrowUpRight, Plus } from 'lucide-react';
import { Image } from '@/components/ui/image';
import { formatPKR } from '@/lib/CartContext';

const BADGE_LABEL = { bestseller: 'Bestseller', new: 'New' };

export default function MenuFeatureCard({ item, index = 0, onOpen, onAdd }) {
  return (
    <article className="grid items-center gap-8 lg:grid-cols-12 lg:gap-12">
      <div
        role="button"
        tabIndex={0}
        onClick={() => onOpen(item)}
        onKeyDown={(event) => {
          if (event.key === 'Enter' || event.key === ' ') {
            event.preventDefault();
            onOpen(item);
          }
        }}
        className="group relative cursor-pointer overflow-hidden bg-carbon-soft lg:col-span-7"
        aria-label={`View ${item.name}`}
      >
        <Image
          src={item.image}
          alt={item.name}
          className="aspect-[16/11] w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
        />
        {item.badge && (
          <span className="micro absolute left-0 top-0 bg-ember px-3 py-1.5 text-parchment">
            {BADGE_LABEL[item.badge] || item.badge}
          </span>
        )}
      </div>

      <div className="lg:col-span-5">
        <p className="micro text-ember">Chef&apos;s pick · {String(index + 1).padStart(2, '0')}</p>
        <h3 className="type-sub mt-3 text-parchment">{item.name}</h3>
        <p className="mt-4 max-w-sm text-sm leading-relaxed text-bone">{item.description}</p>

        <div className="mt-8 flex items-end justify-between gap-6 border-t border-hairline pt-5">
          <div>
            <p className="micro text-bone/60">Price</p>
            <p className="mt-1.5 font-display text-2xl tracking-[0.02em] text-parchment">
              {formatPKR(item.price)}
            </p>
          </div>
          <button
            type="button"
            onClick={() => onAdd(item)}
            className="flex items-center gap-2.5 bg-ember px-6 py-3.5 text-parchment transition-colors hover:bg-ember-dark"
          >
            <span className="micro">Add to order</span>
            <Plus className="h-4 w-4" strokeWidth={2.2} />
          </button>
        </div>

        <button
          type="button"
          onClick={() => onOpen(item)}
          className="micro group mt-5 inline-flex items-center gap-2 text-bone transition-colors hover:text-ember"
        >
          Dish details
          <ArrowUpRight className="h-3.5 w-3.5" />
        </button>
      </div>
    </article>
  );
}
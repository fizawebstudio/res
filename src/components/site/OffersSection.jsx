import { Link } from 'react-router-dom';
import { ArrowRight, Check, Plus } from 'lucide-react';
import { Image } from '@/components/ui/image';
import { formatPKR, useCart } from '@/lib/CartContext';

const asCartItem = (offer) => ({
  id: offer.id,
  name: offer.title,
  price: offer.price,
  image: offer.image,
});

export default function OffersSection({ offers = [], showAll = true }) {
  const { addItem } = useCart();
  if (offers.length === 0) return null;

  const [feature, ...others] = offers;

  const orderButton = (offer, variant = 'primary') => (
    <button
      type="button"
      onClick={() => addItem(asCartItem(offer))}
      className={
        variant === 'primary'
          ? 'inline-flex items-center justify-center gap-2 rounded-[10px] bg-ember px-6 py-3.5 text-[13px] font-semibold text-white shadow-soft transition-colors hover:bg-ember-dark'
          : 'inline-flex items-center justify-center gap-2 rounded-[10px] border border-line bg-white px-5 py-3 text-[13px] font-semibold text-ink transition-colors hover:border-ember/40 hover:text-ember'
      }
    >
      <Plus className="h-3.5 w-3.5" strokeWidth={2.4} />
      Order Now
    </button>
  );

  const priceRow = (offer) => (
    <div className="flex items-baseline gap-2.5">
      <span className="font-display text-[22px] font-semibold text-ink">
        {formatPKR(offer.price)}
      </span>
      {offer.compareAt > offer.price && (
        <span className="text-[13px] text-ink-soft line-through">{formatPKR(offer.compareAt)}</span>
      )}
    </div>
  );

  const includesList = (offer, columns = false) => (
    <ul className={`mt-4 space-y-2 text-[13px] text-ink-soft ${columns ? 'sm:columns-2 sm:gap-6' : ''}`}>
      {offer.includes.map((line) => (
        <li key={line} className="flex items-start gap-2 break-inside-avoid">
          <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-ember" strokeWidth={2.6} />
          {line}
        </li>
      ))}
    </ul>
  );

  return (
    <section className="bg-warm py-16 md:py-20">
      <div className="ff-container">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="eyebrow flex items-center gap-3 text-ember">
              <span className="h-px w-7 bg-ember" />
              Special offers
            </p>
            <h2 className="type-section mt-3 text-ink">Combos worth sharing</h2>
            <p className="mt-3 max-w-xl text-[14px] leading-relaxed text-ink-soft">
              Bundled at a better price, packed to travel well and ready in the same twenty minutes
              as everything else on the menu.
            </p>
          </div>
          {showAll && (
            <Link
              to="/offers"
              className="group hidden items-center gap-2 text-[13px] font-semibold text-ink transition-colors hover:text-ember sm:flex"
            >
              All offers
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
          )}
        </div>

        <div className="mt-8 grid gap-5 lg:grid-cols-2">
          {feature && (
            <article className="grid overflow-hidden rounded-2xl border border-line bg-white shadow-soft md:grid-cols-2 lg:col-span-2">
              <div className="relative h-[220px] overflow-hidden md:h-full md:min-h-[330px]">
                <Image
                  src={feature.image}
                  alt={feature.title}
                  className="h-full w-full object-cover"
                />
                <span className="absolute left-4 top-4 rounded-full bg-white/95 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-ember-dark shadow-soft">
                  {feature.tag}
                </span>
              </div>
              <div className="flex flex-col justify-center p-6 sm:p-8 md:p-10">
                <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-ink-soft">
                  {feature.kicker}
                </p>
                <h3 className="mt-2 font-display text-[24px] font-semibold text-ink sm:text-[28px]">
                  {feature.title}
                </h3>
                {includesList(feature, true)}
                <div className="mt-6 flex flex-wrap items-center justify-between gap-4 border-t border-line pt-5">
                  {priceRow(feature)}
                  {orderButton(feature)}
                </div>
              </div>
            </article>
          )}

          {others.map((offer) => (
            <article
              key={offer.id}
              className="overflow-hidden rounded-2xl border border-line bg-white transition-shadow duration-300 hover:shadow-soft"
            >
              <div className="relative h-[190px] overflow-hidden">
                <Image src={offer.image} alt={offer.title} className="h-full w-full object-cover" />
                <span className="absolute left-4 top-4 rounded-full bg-white/95 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-ember-dark shadow-soft">
                  {offer.tag}
                </span>
              </div>
              <div className="p-6">
                <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-ink-soft">
                  {offer.kicker}
                </p>
                <h3 className="mt-1.5 font-display text-[21px] font-semibold text-ink">
                  {offer.title}
                </h3>
                {includesList(offer)}
                <div className="mt-5 flex items-center justify-between gap-3 border-t border-line pt-4">
                  {priceRow(offer)}
                  {orderButton(offer, 'ghost')}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
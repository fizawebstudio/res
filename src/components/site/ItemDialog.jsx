import { useEffect, useState } from 'react';
import { Minus, Plus, X } from 'lucide-react';
import { Image } from '@/components/ui/image';
import { MENU_FILTERS } from '@/data/restaurantData';
import { formatPKR, useCart } from '@/lib/CartContext';

export default function ItemDialog({ item, onClose }) {
  const [quantity, setQuantity] = useState(1);
  const { addItem } = useCart();

  useEffect(() => {
    const onKey = (event) => {
      if (event.key === 'Escape') onClose();
    };
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKey);
    };
  }, [onClose]);

  if (!item) return null;

  const categoryLabel =
    MENU_FILTERS.find((filter) => filter.id === item.category)?.label || 'Kitchen';

  return (
    <div className="fixed inset-0 z-[90] flex items-end justify-center bg-ink/40 backdrop-blur-sm sm:items-center sm:p-6">
      <button
        type="button"
        aria-label="Close item details"
        onClick={onClose}
        className="absolute inset-0 h-full w-full cursor-default"
      />
      <div className="fade-up relative z-10 max-h-[92vh] w-full max-w-3xl overflow-y-auto rounded-t-2xl bg-white shadow-lift sm:max-h-[88vh] sm:rounded-2xl">
        <button
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="absolute right-3 top-3 z-20 flex h-9 w-9 items-center justify-center rounded-full bg-white/95 text-ink shadow-soft transition-colors hover:text-ember"
        >
          <X className="h-4 w-4" />
        </button>
        <div className="grid md:grid-cols-2">
          <div className="h-[220px] overflow-hidden sm:h-[300px] md:h-full md:min-h-[400px]">
            <Image src={item.image} alt={item.name} className="h-full w-full object-cover" />
          </div>
          <div className="flex flex-col justify-center p-6 sm:p-8">
            <p className="eyebrow text-ember">{categoryLabel}</p>
            <h2 className="mt-2 font-display text-[26px] font-semibold leading-tight text-ink sm:text-[30px]">
              {item.name}
            </h2>
            <p className="mt-3 text-[14px] leading-relaxed text-ink-soft">{item.description}</p>

            <div className="mt-5 flex items-baseline gap-3 border-t border-line pt-5">
              <span className="font-display text-[22px] font-semibold text-ink">
                {formatPKR(item.price)}
              </span>
              <span className="text-[11.5px] text-ink-soft">Freshly prepared · 15–20 min</span>
            </div>

            <div className="mt-5 flex items-center gap-3">
              <div className="flex items-center rounded-[10px] border border-line">
                <button
                  type="button"
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  aria-label="Decrease quantity"
                  className="flex h-11 w-10 items-center justify-center text-ink transition-colors hover:text-ember"
                >
                  <Minus className="h-4 w-4" />
                </button>
                <span className="w-8 text-center font-display text-[15px] font-semibold text-ink">
                  {quantity}
                </span>
                <button
                  type="button"
                  onClick={() => setQuantity((q) => q + 1)}
                  aria-label="Increase quantity"
                  className="flex h-11 w-10 items-center justify-center text-ink transition-colors hover:text-ember"
                >
                  <Plus className="h-4 w-4" />
                </button>
              </div>
              <button
                type="button"
                onClick={() => {
                  addItem(item, quantity);
                  onClose();
                }}
                className="flex-1 rounded-[10px] bg-ember px-5 py-3.5 text-[13px] font-semibold text-white transition-colors hover:bg-ember-dark"
              >
                Add to cart · {formatPKR(item.price * quantity)}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
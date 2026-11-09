import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { Minus, Plus, ShoppingBag, Trash2, X } from 'lucide-react';
import { Image } from '@/components/ui/image';
import { BRAND } from '@/data/restaurantData';
import { formatPKR, useCart } from '@/lib/CartContext';

export default function CartDrawer() {
  const {
    items,
    count,
    subtotal,
    deliveryFee,
    total,
    freeDeliveryOver,
    isOpen,
    closeCart,
    setQuantity,
    removeItem,
  } = useCart();

  useEffect(() => {
    const onKey = (event) => {
      if (event.key === 'Escape') closeCart();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [closeCart]);

  const whatsappHref = () => {
    const lines = items.map(
      (item) => `• ${item.quantity} × ${item.name} — ${formatPKR(item.price * item.quantity)}`
    );
    const message = `Hi Flame & Fork, I'd like to order:\n${lines.join('\n')}\n\nSubtotal: ${formatPKR(
      subtotal
    )}${deliveryFee ? `\nDelivery: ${formatPKR(deliveryFee)}` : '\nDelivery: Free'}\nTotal: ${formatPKR(
      total
    )}`;
    return `https://wa.me/${BRAND.whatsapp}?text=${encodeURIComponent(message)}`;
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={closeCart}
            className="fixed inset-0 z-[95] bg-ink/35 backdrop-blur-sm"
          />
          <motion.aside
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="fixed right-0 top-0 z-[96] flex h-full w-full max-w-md flex-col border-l border-line bg-white sm:rounded-l-2xl"
            aria-label="Shopping cart"
          >
            <div className="flex items-center justify-between border-b border-line px-5 py-4">
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-ember">
                  Your order
                </p>
                <p className="mt-0.5 font-display text-[19px] font-semibold text-ink">
                  {count} {count === 1 ? 'item' : 'items'}
                </p>
              </div>
              <button
                type="button"
                onClick={closeCart}
                aria-label="Close cart"
                className="flex h-9 w-9 items-center justify-center rounded-[9px] border border-line text-ink transition-colors hover:text-ember"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {items.length === 0 ? (
              <div className="flex flex-1 flex-col items-center justify-center gap-4 px-8 text-center">
                <span className="flex h-14 w-14 items-center justify-center rounded-full bg-mist text-ink-soft">
                  <ShoppingBag className="h-6 w-6" strokeWidth={1.5} />
                </span>
                <p className="text-[13.5px] leading-relaxed text-ink-soft">
                  Your cart is empty. Add something from the menu and it will appear here.
                </p>
                <Link
                  to="/menu"
                  onClick={closeCart}
                  className="rounded-[10px] bg-ember px-5 py-3 text-[13px] font-semibold text-white transition-colors hover:bg-ember-dark"
                >
                  Browse the menu
                </Link>
              </div>
            ) : (
              <>
                <div className="flex-1 overflow-y-auto px-5">
                  {items.map((item) => (
                    <div key={item.id} className="flex gap-3 border-b border-line py-4 last:border-0">
                      <div className="h-16 w-16 shrink-0 overflow-hidden rounded-lg bg-mist">
                        <Image
                          src={item.image}
                          alt={item.name}
                          className="h-full w-full object-cover"
                        />
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="flex items-start justify-between gap-2">
                          <p className="text-[13.5px] font-semibold leading-snug text-ink">
                            {item.name}
                          </p>
                          <button
                            type="button"
                            onClick={() => removeItem(item.id)}
                            aria-label={`Remove ${item.name}`}
                            className="text-ink-soft transition-colors hover:text-ember"
                          >
                            <Trash2 className="h-3.5 w-3.5" />
                          </button>
                        </div>
                        <p className="mt-0.5 text-[11.5px] text-ink-soft">
                          {formatPKR(item.price)} each
                        </p>
                        <div className="mt-2.5 flex items-center justify-between">
                          <div className="flex items-center rounded-[9px] border border-line">
                            <button
                              type="button"
                              onClick={() => setQuantity(item.id, item.quantity - 1)}
                              aria-label={`Decrease ${item.name}`}
                              className="flex h-8 w-8 items-center justify-center text-ink transition-colors hover:text-ember"
                            >
                              <Minus className="h-3.5 w-3.5" />
                            </button>
                            <span className="w-7 text-center text-[13px] font-medium text-ink">
                              {item.quantity}
                            </span>
                            <button
                              type="button"
                              onClick={() => setQuantity(item.id, item.quantity + 1)}
                              aria-label={`Increase ${item.name}`}
                              className="flex h-8 w-8 items-center justify-center text-ink transition-colors hover:text-ember"
                            >
                              <Plus className="h-3.5 w-3.5" />
                            </button>
                          </div>
                          <span className="text-[13.5px] font-semibold text-ink">
                            {formatPKR(item.price * item.quantity)}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="border-t border-line px-5 py-5">
                  <dl className="space-y-1.5 text-[13px]">
                    <div className="flex justify-between text-ink-soft">
                      <dt>Subtotal</dt>
                      <dd>{formatPKR(subtotal)}</dd>
                    </div>
                    <div className="flex justify-between text-ink-soft">
                      <dt>Delivery</dt>
                      <dd>{deliveryFee === 0 ? 'Free' : formatPKR(deliveryFee)}</dd>
                    </div>
                    {subtotal < freeDeliveryOver && (
                      <p className="text-[11.5px] text-ember-dark">
                        Add {formatPKR(freeDeliveryOver - subtotal)} more for free delivery.
                      </p>
                    )}
                    <div className="flex items-baseline justify-between border-t border-line pt-3 text-ink">
                      <dt className="text-[13px] font-semibold">Total</dt>
                      <dd className="font-display text-[19px] font-semibold">{formatPKR(total)}</dd>
                    </div>
                  </dl>

                  <Link
                    to="/checkout"
                    onClick={closeCart}
                    className="mt-4 flex items-center justify-center rounded-[10px] bg-ember px-6 py-3.5 text-[13px] font-semibold text-white transition-colors hover:bg-ember-dark"
                  >
                    Proceed to checkout
                  </Link>
                  <a
                    href={whatsappHref()}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-2.5 flex items-center justify-center rounded-[10px] border border-line px-6 py-3 text-[13px] font-semibold text-ink transition-colors hover:border-ember/40 hover:text-ember"
                  >
                    Order on WhatsApp
                  </a>
                </div>
              </>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
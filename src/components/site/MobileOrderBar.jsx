import { ShoppingBag } from 'lucide-react';
import { formatPKR, useCart } from '@/lib/CartContext';

export default function MobileOrderBar() {
  const { count, total, openCart } = useCart();

  if (count === 0) return null;

  return (
    <div className="fixed inset-x-0 bottom-0 z-[80] border-t border-line bg-white/95 p-3 backdrop-blur-md lg:hidden">
      <button
        type="button"
        onClick={openCart}
        className="flex w-full items-center justify-between gap-4 rounded-[10px] bg-ember px-4 py-3 text-white shadow-soft"
      >
        <span className="flex items-center gap-2 text-[13px] font-semibold">
          <ShoppingBag className="h-4 w-4" />
          {count} {count === 1 ? 'item' : 'items'}
        </span>
        <span className="text-[13px] font-semibold">View order · {formatPKR(total)}</span>
      </button>
    </div>
  );
}
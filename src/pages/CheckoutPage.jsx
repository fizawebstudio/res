const db = globalThis.__B44_DB__ || { auth:{ isAuthenticated: async()=>false, me: async()=>null }, entities:new Proxy({}, { get:()=>({ filter:async()=>[], get:async()=>null, create:async()=>({}), update:async()=>({}), delete:async()=>({}) }) }), integrations:{ Core:{ UploadFile:async()=>({ file_url:'' }) } } };

import { useState } from 'react';
import { Link } from 'react-router-dom';

import { ArrowRight, Check, Loader2, MessageCircle, ShoppingBag } from 'lucide-react';
import { Image } from '@/components/ui/image';
import { BRAND } from '@/data/restaurantData';
import { formatPKR, useCart } from '@/lib/CartContext';

const EMPTY = { customer_name: '', phone: '', address: '', notes: '' };

const fieldClass =
  'mt-1.5 w-full rounded-[10px] border border-line bg-white px-3.5 py-2.5 text-[13.5px] text-ink outline-none transition-colors placeholder:text-ink-soft/60 focus:border-ember';

export default function CheckoutPage() {
  const { items, count, subtotal, deliveryFee, total, clearCart, freeDeliveryOver } = useCart();
  const [orderType, setOrderType] = useState('delivery');
  const [form, setForm] = useState(EMPTY);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState('idle');
  const [placed, setPlaced] = useState(null);

  const update = (field) => (event) => {
    setForm((prev) => ({ ...prev, [field]: event.target.value }));
    setErrors((prev) => ({ ...prev, [field]: undefined }));
  };

  const validate = () => {
    const next = {};
    if (form.customer_name.trim().length < 2) next.customer_name = 'Enter your name.';
    if (form.phone.replace(/\D/g, '').length < 10) next.phone = 'Enter a valid phone number.';
    if (orderType === 'delivery' && form.address.trim().length < 10) {
      next.address = 'Add a full delivery address.';
    }
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const waLink = (order) => {
    const lines = (order?.items || items).map(
      (item) => `• ${item.quantity} × ${item.name} — ${formatPKR(item.price * item.quantity)}`
    );
    const message = `Hi Flame & Fork, my order ${order ? order.reference : ''}:\n${lines.join('\n')}\n\nTotal: ${formatPKR(
      order ? order.total : total
    )}\nName: ${order ? order.customer_name : form.customer_name}\nPhone: ${order ? order.phone : form.phone}`;
    return `https://wa.me/${BRAND.whatsapp}?text=${encodeURIComponent(message)}`;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!validate()) return;
    setStatus('sending');
    try {
      const record = await db.entities.Order.create({
        customer_name: form.customer_name.trim(),
        phone: form.phone.trim(),
        order_type: orderType,
        address: orderType === 'delivery' ? form.address.trim() : '',
        items: items.map((item) => ({
          name: item.name,
          quantity: item.quantity,
          price: item.price,
        })),
        items_summary: items.map((item) => `${item.quantity}× ${item.name}`).join(', '),
        subtotal,
        delivery_fee: deliveryFee,
        total,
        notes: form.notes.trim(),
        channel: 'website',
        status: 'new',
      });
      setPlaced({
        ...record,
        reference: record.id ? record.id.slice(-6).toUpperCase() : 'NEW',
      });
      setStatus('done');
      clearCart();
    } catch (error) {
      setStatus('error');
    }
  };

  if (status === 'done' && placed) {
    return (
      <section className="bg-white py-16 md:py-20">
        <div className="ff-container max-w-2xl">
          <span className="flex h-11 w-11 items-center justify-center rounded-full bg-ember text-white">
            <Check className="h-5 w-5" />
          </span>
          <h1 className="type-section mt-5 text-ink">Order received</h1>
          <p className="mt-3 text-[14px] leading-relaxed text-ink-soft">
            Your order is saved with the kitchen as reference{' '}
            <span className="font-semibold text-ink">#{placed.reference}</span>. We will call{' '}
            {placed.phone} to confirm and give you a time. No payment has been taken online — you pay
            on delivery or at collection.
          </p>

          <dl className="mt-7 space-y-2.5 rounded-xl border border-line bg-mist p-5 text-[13.5px]">
            <div className="flex justify-between text-ink-soft">
              <dt>Items</dt>
              <dd className="max-w-[60%] text-right text-ink">{placed.items_summary}</dd>
            </div>
            <div className="flex justify-between text-ink-soft">
              <dt>{placed.order_type === 'delivery' ? 'Delivery' : 'Collection'}</dt>
              <dd className="text-ink">
                {placed.delivery_fee ? formatPKR(placed.delivery_fee) : 'Free'}
              </dd>
            </div>
            <div className="flex items-baseline justify-between border-t border-line pt-3">
              <dt className="text-[13px] font-semibold text-ink">Total</dt>
              <dd className="font-display text-[20px] font-semibold text-ink">
                {formatPKR(placed.total)}
              </dd>
            </div>
          </dl>

          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <a
              href={waLink(placed)}
              target="_blank"
              rel="noreferrer"
              className="flex items-center justify-center gap-2 rounded-[10px] bg-ember px-6 py-3.5 text-[13px] font-semibold text-white transition-colors hover:bg-ember-dark"
            >
              <MessageCircle className="h-4 w-4" />
              Confirm on WhatsApp
            </a>
            <Link
              to="/menu"
              className="flex items-center justify-center gap-2 rounded-[10px] border border-line bg-white px-6 py-3.5 text-[13px] font-semibold text-ink transition-colors hover:border-ember/40 hover:text-ember"
            >
              Order something else
            </Link>
          </div>
        </div>
      </section>
    );
  }

  if (count === 0) {
    return (
      <section className="bg-white py-20 md:py-24">
        <div className="ff-container flex max-w-xl flex-col items-start gap-4">
          <span className="flex h-14 w-14 items-center justify-center rounded-full bg-mist text-ink-soft">
            <ShoppingBag className="h-6 w-6" strokeWidth={1.5} />
          </span>
          <h1 className="type-section text-ink">Your cart is empty</h1>
          <p className="text-[14px] text-ink-soft">
            Add a few dishes from the menu and your order summary will appear here.
          </p>
          <Link
            to="/menu"
            className="rounded-[10px] bg-ember px-6 py-3.5 text-[13px] font-semibold text-white transition-colors hover:bg-ember-dark"
          >
            Browse the menu
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section className="bg-mist py-12 md:py-16">
      <div className="ff-container">
        <p className="eyebrow flex items-center gap-3 text-ember">
          <span className="h-px w-7 bg-ember" />
          Checkout
        </p>
        <h1 className="type-section mt-3 text-ink">Almost at the pass</h1>
        <p className="mt-3 max-w-xl text-[14px] leading-relaxed text-ink-soft">
          Tell us where the food is going. We will call to confirm the order and the delivery time.
        </p>

        <div className="mt-9 grid gap-8 lg:grid-cols-[1.15fr_1fr] lg:gap-12">
          <form
            onSubmit={handleSubmit}
            noValidate
            className="rounded-2xl border border-line bg-white p-6 shadow-soft sm:p-8"
          >
            <fieldset>
              <legend className="text-[12px] font-semibold text-ink">Order type</legend>
              <div className="mt-2.5 grid grid-cols-2 gap-3">
                {[
                  { id: 'delivery', label: 'Delivery' },
                  { id: 'pickup', label: 'Collection' },
                ].map((option) => (
                  <button
                    key={option.id}
                    type="button"
                    onClick={() => setOrderType(option.id)}
                    className={`rounded-[10px] border px-4 py-3 text-[13px] font-semibold transition-colors ${
                      orderType === option.id
                        ? 'border-ember bg-ember text-white'
                        : 'border-line bg-white text-ink-soft hover:border-ember/40 hover:text-ink'
                    }`}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            </fieldset>

            <div className="mt-5 space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label htmlFor="o-name" className="text-[12px] font-semibold text-ink">
                    Full name
                  </label>
                  <input
                    id="o-name"
                    value={form.customer_name}
                    onChange={update('customer_name')}
                    className={fieldClass}
                    aria-invalid={Boolean(errors.customer_name)}
                  />
                  {errors.customer_name && (
                    <p className="mt-1 text-[11.5px] text-ember-dark">{errors.customer_name}</p>
                  )}
                </div>
                <div>
                  <label htmlFor="o-phone" className="text-[12px] font-semibold text-ink">
                    Phone number
                  </label>
                  <input
                    id="o-phone"
                    inputMode="tel"
                    value={form.phone}
                    onChange={update('phone')}
                    className={fieldClass}
                    aria-invalid={Boolean(errors.phone)}
                  />
                  {errors.phone && (
                    <p className="mt-1 text-[11.5px] text-ember-dark">{errors.phone}</p>
                  )}
                </div>
              </div>

              {orderType === 'delivery' && (
                <div>
                  <label htmlFor="o-address" className="text-[12px] font-semibold text-ink">
                    Delivery address
                  </label>
                  <textarea
                    id="o-address"
                    rows={3}
                    value={form.address}
                    onChange={update('address')}
                    placeholder="Street, apartment, city"
                    className={`${fieldClass} resize-none`}
                    aria-invalid={Boolean(errors.address)}
                  />
                  {errors.address && (
                    <p className="mt-1 text-[11.5px] text-ember-dark">{errors.address}</p>
                  )}
                </div>
              )}

              <div>
                <label htmlFor="o-notes" className="text-[12px] font-semibold text-ink">
                  Kitchen notes (optional)
                </label>
                <textarea
                  id="o-notes"
                  rows={2}
                  value={form.notes}
                  onChange={update('notes')}
                  placeholder="Allergies, spice level, no onions…"
                  className={`${fieldClass} resize-none`}
                />
              </div>
            </div>

            {status === 'error' && (
              <p className="mt-4 rounded-[10px] border border-ember/30 bg-blush px-4 py-3 text-[12px] text-ember-dark">
                We could not save the order just now. Please try again, or order directly on WhatsApp
                at {BRAND.phone}.
              </p>
            )}

            <button
              type="submit"
              disabled={status === 'sending'}
              className="mt-5 flex w-full items-center justify-center gap-2 rounded-[10px] bg-ember px-6 py-3.5 text-[13px] font-semibold text-white transition-colors hover:bg-ember-dark disabled:opacity-60"
            >
              {status === 'sending' ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" /> Placing order
                </>
              ) : (
                <>
                  Place order · {formatPKR(total)}
                  <ArrowRight className="h-4 w-4" />
                </>
              )}
            </button>
            <p className="mt-2.5 text-[11.5px] leading-relaxed text-ink-soft">
              No online payment. We call to confirm before the kitchen starts cooking.
            </p>
          </form>

          <aside className="h-fit rounded-2xl border border-line bg-white p-6">
            <h2 className="font-display text-[18px] font-semibold text-ink">Your order</h2>
            <ul className="mt-4 space-y-3.5">
              {items.map((item) => (
                <li key={item.id} className="flex gap-3">
                  <div className="h-12 w-12 shrink-0 overflow-hidden rounded-lg bg-mist">
                    <Image src={item.image} alt={item.name} className="h-full w-full object-cover" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-[13px] font-medium text-ink">
                      {item.quantity} × {item.name}
                    </p>
                    <p className="text-[11.5px] text-ink-soft">{formatPKR(item.price)} each</p>
                  </div>
                  <span className="text-[13px] font-semibold text-ink">
                    {formatPKR(item.price * item.quantity)}
                  </span>
                </li>
              ))}
            </ul>

            <dl className="mt-5 space-y-1.5 border-t border-line pt-4 text-[13px]">
              <div className="flex justify-between text-ink-soft">
                <dt>Subtotal</dt>
                <dd>{formatPKR(subtotal)}</dd>
              </div>
              <div className="flex justify-between text-ink-soft">
                <dt>{orderType === 'delivery' ? 'Delivery' : 'Collection'}</dt>
                <dd>{deliveryFee === 0 ? 'Free' : formatPKR(deliveryFee)}</dd>
              </div>
              {orderType === 'delivery' && subtotal < freeDeliveryOver && (
                <p className="text-[11.5px] text-ember-dark">
                  Spend {formatPKR(freeDeliveryOver - subtotal)} more for free delivery.
                </p>
              )}
              <div className="flex items-baseline justify-between border-t border-line pt-3">
                <dt className="text-[13px] font-semibold text-ink">Total</dt>
                <dd className="font-display text-[20px] font-semibold text-ink">
                  {formatPKR(total)}
                </dd>
              </div>
            </dl>

            <a
              href={waLink(null)}
              target="_blank"
              rel="noreferrer"
              className="mt-5 flex items-center justify-center gap-2 rounded-[10px] border border-line px-5 py-3 text-[13px] font-semibold text-ink transition-colors hover:border-ember/40 hover:text-ember"
            >
              <MessageCircle className="h-4 w-4" />
              Order on WhatsApp
            </a>
          </aside>
        </div>
      </div>
    </section>
  );
}
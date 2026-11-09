import { UtensilsCrossed, Bike, ShoppingBag } from 'lucide-react';
import PageHero from '@/components/site/PageHero';
import LocationSection from '@/components/site/LocationSection';
import { BRAND } from '@/data/restaurantData';
import { IMG } from '@/data/images';

const SERVICES = [
  {
    Icon: UtensilsCrossed,
    title: 'Dine in',
    text: 'Walk-ins welcome seven days a week. Tables of six or more can be reserved by phone.',
  },
  {
    Icon: ShoppingBag,
    title: 'Pickup',
    text: 'Order ahead and collect from the counter — ready in around twenty minutes.',
  },
  {
    Icon: Bike,
    title: 'Delivery',
    text: 'Insulated packaging and our own riders across a 30-minute radius from the kitchen.',
  },
];

export default function LocationsPage() {
  return (
    <>
      <PageHero
        eyebrow="Our location"
        title="One kitchen, open every day"
        description={`Find us at ${BRAND.addressShort}. Dine in at the counter, collect on your way home, or have it delivered hot.`}
        image={IMG.kitchen}
        imageAlt="The open kitchen pass at FLAME & FORK"
      />

      <section className="bg-white py-12 md:py-16">
        <div className="ff-container grid gap-4 sm:grid-cols-3">
          {SERVICES.map(({ Icon, title, text }) => (
            <div key={title} className="rounded-xl border border-line bg-mist p-5">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-peach/70 text-ember-dark">
                <Icon className="h-4 w-4" strokeWidth={1.9} />
              </span>
              <h2 className="mt-3.5 font-display text-[15.5px] font-semibold text-ink">{title}</h2>
              <p className="mt-1.5 text-[13px] leading-relaxed text-ink-soft">{text}</p>
            </div>
          ))}
        </div>
      </section>

      <LocationSection />

      <section className="bg-warm py-12 md:py-14">
        <div className="ff-container grid gap-6 sm:grid-cols-2">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-ember">Opening hours</p>
            <ul className="mt-3 space-y-2 text-[13.5px] text-ink">
              {BRAND.hours.map((entry) => (
                <li key={entry.day} className="flex justify-between gap-6 border-b border-line pb-2">
                  <span className="text-ink-soft">{entry.day}</span>
                  <span className="font-medium">{entry.time}</span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-ember">Good to know</p>
            <ul className="mt-3 space-y-2 text-[13.5px] leading-relaxed text-ink-soft">
              <li>Street parking on Harbor View Avenue after 6 PM.</li>
              <li>Step-free entrance and accessible restrooms.</li>
              <li>Kitchen takes its last order 30 minutes before close.</li>
            </ul>
          </div>
        </div>
      </section>
    </>
  );
}
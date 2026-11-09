import {
  Bike,
  ChefHat,
  Flame,
  HeartHandshake,
  Leaf,
  ShieldCheck,
} from 'lucide-react';
import { WHY_US } from '@/data/restaurantData';

const ICONS = {
  leaf: Leaf,
  chef: ChefHat,
  shield: ShieldCheck,
  bike: Bike,
  flame: Flame,
  heart: HeartHandshake,
};

export default function WhyUsSection() {
  return (
    <section className="bg-mist py-16 md:py-20">
      <div className="ff-container">
        <div className="mx-auto max-w-2xl text-center">
          <p className="eyebrow text-ember">Why guests come back</p>
          <h2 className="type-section mt-3 text-ink">The details we refuse to rush</h2>
          <p className="mt-3 text-[14px] leading-relaxed text-ink-soft">
            Six small standards that decide how every plate leaves our pass.
          </p>
        </div>

        <div className="mt-10 grid gap-4 sm:grid-cols-2 md:gap-5 lg:grid-cols-3">
          {WHY_US.map((feature) => {
            const Icon = ICONS[feature.icon] || Flame;
            return (
              <div
                key={feature.title}
                className="rounded-xl border border-line bg-white p-6 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-soft"
              >
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-peach/70 text-ember-dark">
                  <Icon className="h-5 w-5" strokeWidth={1.8} />
                </span>
                <h3 className="mt-4 font-display text-[15.5px] font-semibold text-ink">
                  {feature.title}
                </h3>
                <p className="mt-1.5 text-[13px] leading-relaxed text-ink-soft">{feature.text}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
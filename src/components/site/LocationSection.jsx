import { ArrowUpRight, Clock, MapPin, Phone } from 'lucide-react';
import { BRAND } from '@/data/restaurantData';

export default function LocationSection() {
  return (
    <section id="location" className="bg-white pb-0 pt-16 md:pt-20">
      <div className="ff-container">
        <div className="grid gap-8 lg:grid-cols-[1fr_1.1fr] lg:items-end">
          <div>
            <p className="eyebrow flex items-center gap-3 text-ember">
              <span className="h-px w-7 bg-ember" />
              Find us
            </p>
            <h2 className="type-section mt-3 text-ink">Come visit us</h2>
            <p className="mt-3 max-w-md text-[14.5px] leading-relaxed text-ink-soft">
              Great food, a welcoming atmosphere, and a table waiting for you.
            </p>
          </div>

          <div className="grid gap-3 sm:grid-cols-3">
            <div className="rounded-xl border border-line bg-mist p-4">
              <MapPin className="h-4 w-4 text-ember" strokeWidth={1.9} />
              <p className="mt-2.5 text-[11px] font-semibold uppercase tracking-[0.14em] text-ink-soft">
                Address
              </p>
              <p className="mt-1 text-[13px] leading-relaxed text-ink">{BRAND.address}</p>
            </div>
            <div className="rounded-xl border border-line bg-mist p-4">
              <Clock className="h-4 w-4 text-ember" strokeWidth={1.9} />
              <p className="mt-2.5 text-[11px] font-semibold uppercase tracking-[0.14em] text-ink-soft">
                Opening hours
              </p>
              <p className="mt-1 text-[13px] leading-relaxed text-ink">
                {BRAND.hours[0].day}
                <br />
                {BRAND.hours[0].time}
              </p>
            </div>
            <div className="rounded-xl border border-line bg-mist p-4">
              <Phone className="h-4 w-4 text-ember" strokeWidth={1.9} />
              <p className="mt-2.5 text-[11px] font-semibold uppercase tracking-[0.14em] text-ink-soft">
                Reservations
              </p>
              <a
                href={BRAND.phoneHref}
                className="mt-1 block text-[13px] text-ink transition-colors hover:text-ember"
              >
                {BRAND.phone}
              </a>
            </div>
          </div>
        </div>

        <div className="mt-6 flex flex-wrap items-center justify-between gap-4">
          <a
            href={BRAND.directionsUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-[10px] bg-ember px-5 py-3 text-[13px] font-semibold text-white shadow-soft transition-colors hover:bg-ember-dark"
          >
            Get Directions
            <ArrowUpRight className="h-4 w-4" />
          </a>
          <p className="text-[11.5px] text-ink-soft">{BRAND.demoNote}</p>
        </div>
      </div>

      <div className="mt-8 w-full">
        <div className="h-[320px] w-full overflow-hidden rounded-[12px] border border-line bg-mist sm:h-[400px] md:h-[460px]">
          <iframe
            title={`Map showing ${BRAND.name}`}
            src={`https://www.google.com/maps?q=${encodeURIComponent(BRAND.mapQuery)}&output=embed`}
            className="h-full w-full border-0"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </div>
    </section>
  );
}
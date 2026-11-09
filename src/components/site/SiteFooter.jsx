import { Link } from 'react-router-dom';
import { Clock, Facebook, Instagram, Mail, MapPin, Phone, Twitter } from 'lucide-react';
import { BRAND, CATEGORIES, NAV_LINKS } from '@/data/restaurantData';
import Logo from '@/components/site/Logo';
import NewsletterForm from '@/components/site/NewsletterForm';

const SOCIALS = [
  { href: BRAND.social.instagram, label: 'Instagram', Icon: Instagram },
  { href: BRAND.social.facebook, label: 'Facebook', Icon: Facebook },
  { href: BRAND.social.x, label: 'X', Icon: Twitter },
];

export default function SiteFooter() {
  return (
    <footer className="border-t border-line bg-warm">
      <div className="ff-container">
        <div className="grid gap-8 border-b border-line py-10 md:py-12 lg:grid-cols-[1fr_auto] lg:items-center lg:gap-16">
          <div>
            <h2 className="font-display text-2xl font-semibold text-ink">
              Get the good stuff first.
            </h2>
            <p className="mt-2 max-w-md text-[14px] leading-relaxed text-ink-soft">
              New dishes, seasonal specials and members-only combos — one short email a month.
            </p>
          </div>
          <NewsletterForm />
        </div>

        <div className="grid gap-10 py-12 sm:grid-cols-2 lg:grid-cols-[1.6fr_1fr_1fr_1.2fr]">
          <div>
            <Logo />
            <p className="mt-4 max-w-xs text-[13.5px] leading-relaxed text-ink-soft">
              {BRAND.description}
            </p>
            <div className="mt-5 flex items-center gap-2">
              {SOCIALS.map(({ href, label, Icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={label}
                  className="flex h-9 w-9 items-center justify-center rounded-[9px] border border-line bg-white text-ink transition-colors hover:border-ember/50 hover:text-ember"
                >
                  <Icon className="h-4 w-4" strokeWidth={1.8} />
                </a>
              ))}
            </div>
          </div>

          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-ink">Explore</p>
            <ul className="mt-4 space-y-2.5 text-[13.5px] text-ink-soft">
              {NAV_LINKS.map((link) => (
                <li key={link.to}>
                  <Link to={link.to} className="transition-colors hover:text-ember">
                    {link.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link to="/checkout" className="transition-colors hover:text-ember">
                  Checkout
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-ink">Menu</p>
            <ul className="mt-4 space-y-2.5 text-[13.5px] text-ink-soft">
              {CATEGORIES.map((category) => (
                <li key={category.id}>
                  <Link
                    to={`/menu?category=${category.id}`}
                    className="transition-colors hover:text-ember"
                  >
                    {category.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-ink">Visit us</p>
            <ul className="mt-4 space-y-3 text-[13.5px] text-ink-soft">
              <li className="flex gap-2.5">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-ember" strokeWidth={1.8} />
                {BRAND.address}
              </li>
              <li className="flex gap-2.5">
                <Phone className="mt-0.5 h-4 w-4 shrink-0 text-ember" strokeWidth={1.8} />
                <a href={BRAND.phoneHref} className="transition-colors hover:text-ember">
                  {BRAND.phone}
                </a>
              </li>
              <li className="flex gap-2.5">
                <Mail className="mt-0.5 h-4 w-4 shrink-0 text-ember" strokeWidth={1.8} />
                <a href={`mailto:${BRAND.email}`} className="transition-colors hover:text-ember">
                  {BRAND.email}
                </a>
              </li>
              <li className="flex gap-2.5">
                <Clock className="mt-0.5 h-4 w-4 shrink-0 text-ember" strokeWidth={1.8} />
                <span>
                  {BRAND.hours[0].day}
                  <br />
                  {BRAND.hours[0].time}
                </span>
              </li>
            </ul>
          </div>
        </div>

        <div className="flex flex-col gap-2 border-t border-line py-6 text-[12px] text-ink-soft sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} {BRAND.name}. All rights reserved.
          </p>
          <p>{BRAND.demoNote}</p>
        </div>
      </div>
    </footer>
  );
}
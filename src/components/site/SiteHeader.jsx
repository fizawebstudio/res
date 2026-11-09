import { useEffect, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { ArrowRight, Menu as MenuIcon, ShoppingBag, X } from 'lucide-react';
import { BRAND, NAV_LINKS } from '@/data/restaurantData';
import { useCart } from '@/lib/CartContext';
import Logo from '@/components/site/Logo';

export default function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { count, openCart, pulseKey } = useCart();
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileOpen]);

  return (
    <>
      <header
        className={`sticky top-0 z-50 border-b bg-white/95 backdrop-blur-md transition-all duration-300 ${
          scrolled ? 'border-line shadow-soft' : 'border-line/70'
        }`}
      >
        <div className="ff-container flex items-center justify-between gap-6">
          <div className={`flex items-center transition-all ${scrolled ? 'h-16' : 'h-[76px]'}`}>
            <Logo />
          </div>

          <nav className="hidden items-center gap-7 xl:flex" aria-label="Main navigation">
            {NAV_LINKS.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                className={({ isActive }) =>
                  `relative py-2 text-[13px] font-medium transition-colors after:absolute after:-bottom-0.5 after:left-0 after:h-[2px] after:w-full after:origin-left after:rounded-full after:bg-ember after:transition-transform after:duration-300 ${
                    isActive
                      ? 'text-ink after:scale-x-100'
                      : 'text-ink-soft after:scale-x-0 hover:text-ink hover:after:scale-x-100'
                  }`
                }
              >
                {link.label}
              </NavLink>
            ))}
          </nav>

          <div className="flex items-center gap-2 sm:gap-3">
            <button
              type="button"
              onClick={openCart}
              className="relative flex h-10 w-10 items-center justify-center rounded-[10px] border border-line text-ink transition-colors hover:border-ember/50 hover:text-ember"
              aria-label={`Open cart, ${count} items`}
            >
              <ShoppingBag className="h-[18px] w-[18px]" strokeWidth={1.8} />
              {count > 0 && (
                <span
                  key={pulseKey}
                  className="animate-cart-pulse absolute -right-1.5 -top-1.5 flex h-[18px] min-w-[18px] items-center justify-center rounded-full bg-ember px-1 text-[10px] font-semibold leading-none text-white"
                >
                  {count}
                </span>
              )}
            </button>

            <Link
              to="/menu"
              className="group hidden items-center gap-2 rounded-[10px] bg-ember px-5 py-2.5 text-[13px] font-semibold text-white shadow-soft transition-colors hover:bg-ember-dark sm:flex"
            >
              Order Online
              <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5" />
            </Link>

            <button
              type="button"
              onClick={() => setMobileOpen(true)}
              className="flex h-10 w-10 items-center justify-center rounded-[10px] border border-line text-ink xl:hidden"
              aria-label="Open menu"
            >
              <MenuIcon className="h-5 w-5" strokeWidth={1.8} />
            </button>
          </div>
        </div>
      </header>

      {mobileOpen && (
        <div className="fixed inset-0 z-[70] flex flex-col bg-white xl:hidden">
          <div className="ff-container flex h-[76px] items-center justify-between border-b border-line">
            <Logo />
            <button
              type="button"
              onClick={() => setMobileOpen(false)}
              className="flex h-10 w-10 items-center justify-center rounded-[10px] border border-line text-ink"
              aria-label="Close menu"
            >
              <X className="h-5 w-5" strokeWidth={1.8} />
            </button>
          </div>
          <nav className="flex-1 overflow-y-auto px-5 py-4" aria-label="Mobile navigation">
            {NAV_LINKS.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                className={({ isActive }) =>
                  `block border-b border-line py-4 font-display text-xl font-semibold ${
                    isActive ? 'text-ember' : 'text-ink'
                  }`
                }
              >
                {link.label}
              </NavLink>
            ))}
            <NavLink to="/checkout" className="block border-b border-line py-4 font-display text-xl font-semibold text-ink">
              Checkout
            </NavLink>
          </nav>
          <div className="border-t border-line px-5 py-5">
            <Link
              to="/menu"
              className="flex w-full items-center justify-center gap-2 rounded-[10px] bg-ember px-6 py-3.5 text-sm font-semibold text-white"
            >
              Order Online
              <ArrowRight className="h-4 w-4" />
            </Link>
            <div className="mt-4 flex items-center justify-between text-[12px] text-ink-soft">
              <a href={BRAND.phoneHref} className="hover:text-ember">
                {BRAND.phone}
              </a>
              <span>{BRAND.addressShort}</span>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
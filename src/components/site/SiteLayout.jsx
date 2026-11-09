import { Outlet } from 'react-router-dom';
import { CartProvider } from '@/lib/CartContext';
import AnnouncementBar from '@/components/site/AnnouncementBar';
import SiteHeader from '@/components/site/SiteHeader';
import SiteFooter from '@/components/site/SiteFooter';
import CartDrawer from '@/components/site/CartDrawer';
import MobileOrderBar from '@/components/site/MobileOrderBar';

export default function SiteLayout() {
  return (
    <CartProvider>
      <div className="flex min-h-screen flex-col bg-white">
        <AnnouncementBar />
        <SiteHeader />
        <main className="flex-1">
          <Outlet />
        </main>
        <SiteFooter />
        <CartDrawer />
        <MobileOrderBar />
      </div>
    </CartProvider>
  );
}
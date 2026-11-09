import { Link } from 'react-router-dom';
import { Flame } from 'lucide-react';

export default function AnnouncementBar() {
  return (
    <div className="bg-ember text-white">
      <div className="ff-container flex h-9 items-center justify-center gap-3 text-[10.5px] font-medium tracking-[0.12em] sm:gap-4 sm:text-[11px]">
        <Flame className="h-3.5 w-3.5 shrink-0" strokeWidth={2} />
        <span className="uppercase">Freshly Prepared Daily</span>
        <span className="hidden h-3 w-px bg-white/40 sm:block" />
        <Link to="/menu" className="hidden uppercase underline-offset-4 hover:underline sm:inline">
          Order Online for Pickup &amp; Delivery
        </Link>
        <span className="uppercase sm:hidden">Pickup &amp; Delivery</span>
      </div>
    </div>
  );
}
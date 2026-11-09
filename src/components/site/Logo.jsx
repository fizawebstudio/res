import { Link } from 'react-router-dom';

export default function Logo({ compact = false }) {
  return (
    <Link to="/" className="flex items-center gap-2.5" aria-label="FLAME & FORK home">
      <span className="flex h-9 w-9 items-center justify-center rounded-[10px] bg-ember text-white shadow-soft">
        <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor" aria-hidden="true">
          <path d="M12 2c3.6 4.4 5.4 6.4 5.4 9.8A5.4 5.4 0 0 1 12 17.4a5.4 5.4 0 0 1-5.4-5.6C6.6 10 7.5 9.1 8.4 7.3c.9 1.8 1.8 2.7 2.7 2.7 0-2.7 0-5.4.9-8z" />
        </svg>
      </span>
      {!compact && (
        <span className="leading-none">
          <span className="block font-display text-[17px] font-semibold tracking-[0.01em] text-ink">
            FLAME <span className="text-ember">&amp;</span> FORK
          </span>
          <span className="mt-1 block text-[9px] font-semibold uppercase tracking-[0.28em] text-ink-soft">
            American Kitchen
          </span>
        </span>
      )}
    </Link>
  );
}
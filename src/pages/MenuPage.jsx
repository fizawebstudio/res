import { useSearchParams } from 'react-router-dom';
import PageHero from '@/components/site/PageHero';
import MenuSection from '@/components/site/MenuSection';
import { useMenuItems } from '@/lib/siteData';
import { IMG } from '@/data/images';

export default function MenuPage() {
  const [searchParams] = useSearchParams();
  const items = useMenuItems();
  const category = searchParams.get('category') || 'burgers';

  return (
    <>
      <PageHero
        eyebrow="Full menu"
        title="Everything we cook"
        description="Burgers pressed to order, pizza from a 72-hour dough, chicken fried twice and desserts made in-house. Prices include all taxes."
        image={IMG.pepperoni}
        imageAlt="A stone-baked pepperoni pizza"
      />
      <MenuSection
        key={category}
        items={items}
        initialFilter={category}
        showViewAll={false}
        eyebrow="Browse and order"
        title="Pick your craving"
        description="Tap any dish for the full description, or add it straight to your cart."
      />
    </>
  );
}
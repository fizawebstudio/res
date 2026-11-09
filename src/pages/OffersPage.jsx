import PageHero from '@/components/site/PageHero';
import OffersSection from '@/components/site/OffersSection';
import WhyUsSection from '@/components/site/WhyUsSection';
import { useOffers } from '@/lib/siteData';
import { IMG } from '@/data/images';

export default function OffersPage() {
  const offers = useOffers();

  return (
    <>
      <PageHero
        eyebrow="Special offers"
        title="Combos built for sharing"
        description="Bundle the favourites and pay less than ordering them one by one. Available for dine-in, pickup and delivery."
        image={IMG.comboFeast}
        imageAlt="A family feast spread of burgers, pizza, fried chicken and fries"
      />
      <OffersSection offers={offers} showAll={false} />
      <WhyUsSection />
    </>
  );
}
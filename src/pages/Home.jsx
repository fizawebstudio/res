import Hero from '@/components/site/Hero';
import CategoryStrip from '@/components/site/CategoryStrip';
import MenuSection from '@/components/site/MenuSection';
import OffersSection from '@/components/site/OffersSection';
import AboutSection from '@/components/site/AboutSection';
import WhyUsSection from '@/components/site/WhyUsSection';
import GallerySection from '@/components/site/GallerySection';
import TestimonialsSection from '@/components/site/TestimonialsSection';
import LocationSection from '@/components/site/LocationSection';
import ContactSection from '@/components/site/ContactSection';
import { useMenuItems, useOffers, useTestimonials } from '@/lib/siteData';

export default function Home() {
  const menuItems = useMenuItems();
  const offers = useOffers();
  const reviews = useTestimonials();

  return (
    <>
      <Hero />
      <CategoryStrip />
      <MenuSection
        items={menuItems}
        initialFilter="burgers"
        eyebrow="Fresh from the kitchen"
        title="Straight off the grill"
        description="Every dish is cooked to order. Switch a category to see the rest of the menu, or browse the full list."
      />
      <OffersSection offers={offers} />
      <AboutSection />
      <WhyUsSection />
      <GallerySection />
      <TestimonialsSection reviews={reviews} />
      <LocationSection />
      <ContactSection />
    </>
  );
}
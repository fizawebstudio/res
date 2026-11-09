import PageHero from '@/components/site/PageHero';
import ContactSection from '@/components/site/ContactSection';
import { IMG } from '@/data/images';

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="We would love to hear from you"
        description="Questions about a booking, a large order or something that could be better? Send a message and the team will get back within one working day."
        image={IMG.chef}
        imageAlt="A chef plating a dish in the open kitchen"
      />
      <ContactSection />
    </>
  );
}
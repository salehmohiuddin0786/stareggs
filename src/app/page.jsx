import HeroSection from '@/components/home/HeroSection';
import ServicePillars from '@/components/home/ServicePillars';
import ProductShowcase from '@/components/home/ProductShowcase';
import TelanganaMap from '@/components/home/TelanganaMap';
import WhyChooseUs from '@/components/home/WhyChooseUs';
import OrderingProcess from '@/components/home/OrderingProcess';
import TrustSection from '@/components/home/TrustSection';
import FaqSection from '@/components/home/FaqSection';
import ContactCta from '@/components/home/ContactCta';

export default function HomePage() {
  return (
    <>
      {/* 1. Cinematic 3D Hero */}
      <HeroSection />

      {/* 2. Service Cards (Wholesale, Retail, Institutional, Distribution) */}
      <ServicePillars />

      {/* 3. Product Showcase */}
      <ProductShowcase />

      {/* 4. Why Choose Star Eggs */}
      <WhyChooseUs />

      {/* 5. How Ordering Works */}
      <OrderingProcess />

      {/* 6. Telangana Distribution Coverage (Interactive Map & Directory) */}
      <TelanganaMap />

      {/* 7. Business Trust & Quality Standards */}
      <TrustSection />

      {/* 8. Frequently Asked Questions */}
      <FaqSection />

      {/* 9. Final Commercial CTA */}
      <ContactCta />
    </>
  );
}

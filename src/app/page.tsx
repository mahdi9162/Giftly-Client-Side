import CategorySection from '@/components/home/CategorySection';
import FeaturedProducts from '@/components/home/FeaturedProducts';
import HeroSection from '@/components/home/HeroSection';
import Navbar from '@/components/shared/Navbar';

export default function Home() {
  return (
    <>
      <div className="sticky top-0 z-50 pt-6">
        <Navbar />
      </div>

      <section className="relative -mt-22 pt-22 overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <div className="hero-gradient absolute inset-0" />
          <div className="hero-noise absolute inset-0 opacity-[0.06]" />
        </div>

        <HeroSection />
      </section>

      <CategorySection />
      <FeaturedProducts />
    </>
  );
}

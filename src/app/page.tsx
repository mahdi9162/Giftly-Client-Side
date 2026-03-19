import HeroSection from '@/components/home/HeroSection';
import Navbar from '@/components/shared/Navbar';

export default function Home() {
  return (
    <>
      <div className="hero-bg relative overflow-hidden">
        <div className="hero-gradient absolute inset-0 -z-20" />
        <div className="hero-noise absolute inset-0 -z-10 opacity-[0.06]" />
        <Navbar />
        <HeroSection />
      </div>
    </>
  );
}

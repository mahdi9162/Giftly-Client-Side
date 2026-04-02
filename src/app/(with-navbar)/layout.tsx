import Footer from '@/components/shared/Footer';
import Navbar from '@/components/shared/Navbar';

export default function WithNavbarLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <div className="sticky top-4 z-50">
        <Navbar />
      </div>
      <main>{children}</main>
      <Footer />
    </>
  );
}

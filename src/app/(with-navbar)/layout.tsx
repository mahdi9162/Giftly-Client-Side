import Navbar from '@/components/shared/Navbar';

export default function WithNavbarLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navbar />
      <main>{children}</main>
    </>
  );
}

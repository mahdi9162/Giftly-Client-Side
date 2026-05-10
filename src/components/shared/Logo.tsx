'use client';

import { useStoreSettings } from '@/hooks/useStoreSettings';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';

const Logo = () => {
  const { store } = useStoreSettings();

  const router = useRouter();
  const pathname = usePathname();

  const handleGoToHero = () => {
    // if already homepage
    if (pathname === '/') {
      const heroSection = document.getElementById('hero');

      heroSection?.scrollIntoView({
        behavior: 'smooth',
      });

      return;
    }

    // if another page
    router.push('/');

    setTimeout(() => {
      const heroSection = document.getElementById('hero');

      heroSection?.scrollIntoView({
        behavior: 'smooth',
      });
    }, 200);
  };

  return (
    <button onClick={handleGoToHero} aria-label="Go to homepage hero" className="cursor-pointer">
      <Image
        src={store?.logoUrl || '/assets/logo/logo-light.svg'}
        className="h-auto w-24"
        alt="Giftly Logo"
        width={120}
        height={40}
        priority
      />
    </button>
  );
};

export default Logo;

import { useStoreSettings } from '@/hooks/useStoreSettings';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

const Logo = () => {
  const { store } = useStoreSettings();
  return (
    <Link href={'/'}>
      <Image src={store?.logoUrl || '/assets/logo/logo-light.svg'} className="w-24 h-auto" alt="Logo" width={120} height={40} />
    </Link>
  );
};

export default Logo;

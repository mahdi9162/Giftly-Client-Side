import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

const Logo = () => {
  return (
    <Link href={'/'}>
      <Image src="/assets/logo/logo-light.svg" alt="Logo" width={120} height={120} />
    </Link>
  );
};

export default Logo;

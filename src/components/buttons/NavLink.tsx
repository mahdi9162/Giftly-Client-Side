'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';

type NavLinkProps = {
  href: string;
  children: React.ReactNode;
};

const NavLink = ({ href, children }: NavLinkProps) => {
  const path = usePathname();
  const isActive = href === '/' ? path === href : path.startsWith(href);
  return (
    <Link className={`${isActive && 'text-primary'} font-medium`} href={href}>
      {children}
    </Link>
  );
};

export default NavLink;

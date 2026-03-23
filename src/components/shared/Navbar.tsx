import React from 'react';
import Container from './Container';
import NavLink from '../buttons/NavLink';
import Link from 'next/link';
import { ShoppingCart } from 'lucide-react';
import Logo from './Logo';

const Navbar = () => {
  const nav = (
    <>
      <li>
        <NavLink href={'/'}>Home</NavLink>
      </li>
      <li>
        <NavLink href={'/shop'}>Shop</NavLink>
      </li>
      <li>
        <NavLink href={'/ai-gift-finder'}>AI Finder</NavLink>
      </li>
      <li>
        <NavLink href={'/contact'}>Contact</NavLink>
      </li>
      <li>
        <NavLink href={'/cart'}>Cart</NavLink>
      </li>
    </>
  );
  return (
    <nav className="sticky top-4 z-50 px-3 md:px-0">
      <Container>
        <div className="navbar rounded-[28px] border border-white/20 bg-white/5 px-5 shadow-[0_8px_30px_rgba(15,23,42,0.08)] backdrop-blur-lg">
          <div className="navbar-start">
            <div className="dropdown">
              <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" />
                </svg>
              </div>
              <ul tabIndex={-1} className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
                {nav}
              </ul>
            </div>
            <figure>
              <Logo />
            </figure>
          </div>

          <div className="navbar-center hidden lg:flex">
            <ul className="menu menu-horizontal px-1">{nav}</ul>
          </div>

          <div className="navbar-end gap-5">
            <Link className="btn btn-secondary" href={'/cart'}>
              <ShoppingCart size={20} />
            </Link>
            <div className="flex gap-5">
              <Link className="btn btn-primary" href={'/login'}>
                Login
              </Link>
              <Link className="btn btn-outline btn-secondary" href={'/register'}>
                Register
              </Link>
            </div>
          </div>
        </div>
      </Container>
    </nav>
  );
};

export default Navbar;

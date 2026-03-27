'use client';
import React from 'react';
import Container from './Container';
import NavLink from '../buttons/NavLink';
import Link from 'next/link';
import Logo from './Logo';
import { useAuth } from '@/hooks/useAuth';
import Image from 'next/image';

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

  const { user, loading, logout } = useAuth();

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
                {
                  <>
                    {nav}
                    {!user && (
                      <div className="flex flex-col gap-4">
                        <li className="mt-2">
                          <Link className="btn btn-primary w-full" href="/login">
                            Login
                          </Link>
                        </li>
                        <li>
                          <Link className="btn btn-outline btn-secondary w-full" href="/register">
                            Register
                          </Link>
                        </li>
                      </div>
                    )}
                  </>
                }
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
            {loading ? (
              <p className="text-sm text-slate-500">Loading...</p>
            ) : user ? (
              <div className="dropdown dropdown-end">
                <div tabIndex={0} role="button" className="avatar avatar-online cursor-pointer  transition hover:scale-105">
                  <div className="w-12 rounded-full">
                    <Image src="/assets/images/avatar.svg" alt="User Avatar" width={48} height={48} className="object-cover" />
                  </div>
                </div>

                <ul
                  tabIndex={0}
                  className="menu dropdown-content z-100 mt-3 w-56 rounded-2xl border border-slate-200 bg-white p-2 shadow-lg"
                >
                  <li className="pointer-events-none border-b border-slate-100 px-4 py-2">
                    <p className="text-sm font-semibold text-slate-800">{user?.name}</p>
                    <p className="text-xs text-slate-500">{user?.email}</p>
                  </li>
                  <li>
                    <Link href="/dashboard/profile">Profile</Link>
                  </li>
                  <li>
                    <Link href="/dashboard/orders">My Orders</Link>
                  </li>
                  <li>
                    <button onClick={logout}>Logout</button>
                  </li>
                </ul>
              </div>
            ) : (
              <>
                <div className="hidden lg:flex items-center gap-3">
                  <Link className="btn btn-primary" href="/login">
                    Login
                  </Link>
                  <Link className="btn btn-outline btn-secondary" href="/register">
                    Register
                  </Link>
                </div>
              </>
            )}
          </div>
        </div>
      </Container>
    </nav>
  );
};

export default Navbar;

'use client';

import React, { useState } from 'react';
import Container from './Container';
import Link from 'next/link';
import Logo from './Logo';
import { useAuth } from '@/hooks/useAuth';
import Image from 'next/image';
import { ShoppingCart } from 'lucide-react';
import NavLink from '../buttons/NavLink';
import CartDrawer from '../cart/CartDrawer';
import { useCartStore } from '@/store/useCartStore';

const Navbar = () => {
  const { user, loading, logout } = useAuth();
  const [isCartOpen, setIsCartOpen] = useState(false);

  const totalItems = useCartStore((state) => state.getTotalItems());

  const nav = (
    <>
      <li>
        <NavLink href="/">Home</NavLink>
      </li>
      <li>
        <NavLink href="/shop">Shop</NavLink>
      </li>
      <li>
        <NavLink href="/ai-gift-finder">AI Finder</NavLink>
      </li>
      {user && (
        <li>
          <NavLink href="/dashboard">Dashboard</NavLink>
        </li>
      )}
      <li>
        <NavLink href="/contact">Contact</NavLink>
      </li>
      <li>
        <NavLink href="/about">About</NavLink>
      </li>
    </>
  );

  return (
    <>
      <nav className="px-3 md:px-0">
        <Container>
          <div className="navbar relative z-50 rounded-[28px] border border-white/20 bg-white/5 px-4 sm:px-5 shadow-[0_8px_30px_rgba(15,23,42,0.08)] backdrop-blur-lg">
            <div className="navbar-start gap-2">
              {/* Mobile Menu */}
              <div className="dropdown lg:hidden">
                <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" />
                  </svg>
                </div>

                <ul
                  tabIndex={0}
                  className="menu dropdown-content z-60 mt-3 w-72 rounded-2xl border border-slate-200 bg-white p-3 shadow-xl"
                >
                  {user && (
                    <li className="pointer-events-none mb-2 rounded-xl border border-slate-100 bg-slate-50/80 px-4 py-3">
                      <p className="text-sm font-semibold text-slate-800">{user?.name}</p>
                      <p className="text-xs text-slate-500">{user?.email}</p>
                    </li>
                  )}

                  {nav}

                  {user ? (
                    <>
                      <li className="mt-2">
                        <Link href="/dashboard/profile">Profile</Link>
                      </li>
                      <li>
                        <Link href="/dashboard/orders">My Orders</Link>
                      </li>
                      <li>
                        <button onClick={logout}>Logout</button>
                      </li>
                    </>
                  ) : (
                    <div className="mt-3 flex flex-col gap-3">
                      <li>
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
                </ul>
              </div>

              <figure>
                <Logo />
              </figure>
            </div>

            {/* Desktop Nav */}
            <div className="navbar-center hidden lg:flex">
              <ul className="menu menu-horizontal px-1">{nav}</ul>
            </div>

            <div className="navbar-end gap-2 sm:gap-3">
              {/* Cart Button */}
              <div className="relative">
                <button onClick={() => setIsCartOpen(true)} className="btn btn-primary btn-square">
                  <ShoppingCart />
                </button>

                {totalItems > 0 && <div className="badge badge-secondary badge-sm absolute -top-2 -right-2">{totalItems}</div>}
              </div>

              {loading ? (
                <p className="hidden text-sm text-slate-500 lg:block">Loading...</p>
              ) : user ? (
                <>
                  {/* Desktop Avatar Only */}
                  <div className="hidden lg:block">
                    <div className="dropdown dropdown-end">
                      <div tabIndex={0} role="button" className="avatar avatar-online cursor-pointer transition hover:scale-105">
                        <div className="w-10 md:w-12 rounded-full">
                          <Image src="/assets/images/avatar.svg" alt="User Avatar" width={48} height={48} className="object-cover" />
                        </div>
                      </div>

                      <ul
                        tabIndex={0}
                        className="menu dropdown-content z-50 mt-3 w-56 rounded-2xl border border-slate-200 bg-white p-2 shadow-lg"
                      >
                        <li className="pointer-events-none border-b border-slate-100 px-4 py-2">
                          <p className="text-sm font-semibold text-slate-800">{user?.name}</p>
                          <p className="text-xs text-slate-500">{user?.email}</p>
                        </li>
                        <li>
                          <Link className="text-sm md:text-base" href="/dashboard/profile">
                            Profile
                          </Link>
                        </li>
                        <li>
                          <Link className="text-sm md:text-base" href="/dashboard/orders">
                            My Orders
                          </Link>
                        </li>
                        <li>
                          <button className="text-sm md:text-base" onClick={logout}>
                            Logout
                          </button>
                        </li>
                      </ul>
                    </div>
                  </div>
                </>
              ) : (
                <>
                  {/* Desktop Auth Buttons Only */}
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

      <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </>
  );
};

export default Navbar;

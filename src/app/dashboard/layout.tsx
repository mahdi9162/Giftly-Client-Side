'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, type ReactNode } from 'react';
import Logo from '@/components/shared/Logo';
import { useAuth } from '@/hooks/useAuth';
import { Bell, PanelLeftClose, PanelLeftOpen, X } from 'lucide-react';
import { adminRoutes, userRoutes } from '@/lib/dashboardSidebar';

type DashboardLayoutProps = {
  children: ReactNode;
};

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  const { logout } = useAuth();
  const pathname = usePathname();

  const [isSidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [isMobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  const { user } = useAuth();
  const role = user?.role || 'user';

  const sidebarRoutes = role === 'admin' ? adminRoutes : userRoutes;
  const sectionTitle = role === 'admin' ? 'Admin Control' : 'User Menu';

  const desktopSidebarWidth = isSidebarCollapsed ? 'lg:w-[92px]' : 'lg:w-[280px]';
  const desktopContentPadding = isSidebarCollapsed ? 'lg:pl-[92px]' : 'lg:pl-[280px]';

  const renderSidebarContent = (collapsed = false, isMobile = false) => {
    const isProfileActive = pathname === '/dashboard/profile';
    return (
      <>
        {/* Brand */}
        <div className="border-b border-slate-100/80 px-4 py-4">
          <div className={`flex items-center ${collapsed ? 'justify-center' : 'justify-between gap-3'}`}>
            <div className="overflow-hidden">
              <div className={`transition-all duration-300 ease-in-out ${collapsed ? 'scale-90 opacity-100' : 'scale-100 opacity-100'}`}>
                <Logo />
              </div>
            </div>

            {!collapsed && isMobile && (
              <button
                onClick={() => setMobileSidebarOpen(false)}
                className="grid size-10 place-items-center rounded-2xl border border-rose-100 bg-white text-slate-600 shadow-sm"
              >
                <X className="size-5" />
              </button>
            )}
          </div>
        </div>

        {/* Navigation */}
        <div className="flex-1 overflow-y-auto px-3 py-5 text-slate-800">
          <div className="mb-4 overflow-hidden px-3">
            <p
              className={`whitespace-nowrap text-[10px] font-black uppercase tracking-[0.24em] ${
                role === 'admin' ? 'text-primary' : 'text-slate-400'
              } transition-all duration-300 ease-in-out ${collapsed ? '-translate-x-2 opacity-0' : 'translate-x-0 opacity-100'}`}
            >
              {sectionTitle}
            </p>
          </div>

          <ul className="space-y-1.5">
            {sidebarRoutes.map((item) => {
              const isActive = pathname === item.href;

              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    onClick={() => isMobile && setMobileSidebarOpen(false)}
                    title={collapsed ? item.label : ''}
                    className={`group flex items-center rounded-2xl transition-all duration-300 ${
                      isActive
                        ? 'bg-linear-to-r from-primary to-fuchsia-500 text-white shadow-lg shadow-primary/20'
                        : 'text-slate-500 hover:bg-rose-50 hover:text-slate-800'
                    } ${collapsed ? 'justify-center px-0 py-3.5' : 'gap-3 px-4 py-3.5'}`}
                  >
                    <item.icon className="size-5 shrink-0" />
                    <span
                      className={`overflow-hidden whitespace-nowrap text-sm font-bold transition-all duration-300 ease-in-out ${
                        collapsed ? 'max-w-0 -translate-x-2 opacity-0' : 'max-w-45 translate-x-0 opacity-100'
                      }`}
                    >
                      {item.label}
                    </span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>

        {/* Footer / Account */}
        <div className="border-t border-slate-100/80 p-4">
          <div
            className={`overflow-hidden transition-all duration-300 ease-in-out ${collapsed ? 'max-h-0 opacity-0' : 'max-h-40 opacity-100'}`}
          >
            <div className="rounded-2xl border border-orange-100 bg-linear-to-br from-orange-50 via-rose-50 to-violet-50 p-4">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">Account Settings</p>
              <div className="mt-3 space-y-2">
                <Link
                  href="/dashboard/profile"
                  onClick={() => isMobile && setMobileSidebarOpen(false)}
                  className={`block rounded-xl px-3 py-2 text-sm font-semibold transition ${
                    isProfileActive
                      ? 'bg-linear-to-r from-primary to-fuchsia-500 text-white shadow-lg shadow-primary/20'
                      : 'text-slate-700 hover:bg-white'
                  }`}
                >
                  My Profile
                </Link>
                <button
                  onClick={logout}
                  className="w-full rounded-xl px-3 py-2 text-left text-sm font-semibold text-rose-500 transition hover:bg-white cursor-pointer"
                >
                  Log Out
                </button>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-rose-50 via-orange-50/40 to-violet-50/50">
      {/* Mobile / Tablet overlay */}
      {isMobileSidebarOpen && (
        <div className="fixed inset-0 z-40 bg-slate-900/30 backdrop-blur-[2px] lg:hidden" onClick={() => setMobileSidebarOpen(false)} />
      )}

      {/* Mobile / Tablet Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-75 max-w-[85vw] border-r border-white/60 bg-white/90 backdrop-blur-2xl transition-transform duration-300 ease-in-out lg:hidden ${
          isMobileSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex h-full flex-col">{renderSidebarContent(false, true)}</div>
      </aside>

      {/* Desktop Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-30 hidden border-r border-white/60 bg-white/82 backdrop-blur-2xl transition-[width] duration-300 ease-in-out lg:flex lg:flex-col ${desktopSidebarWidth}`}
      >
        {renderSidebarContent(isSidebarCollapsed, false)}
      </aside>

      {/* Main Content */}
      <div className={`transition-[padding] duration-300 ease-in-out ${desktopContentPadding}`}>
        {/* Topbar */}
        <header className="sticky top-0 z-20 px-4 pt-4 md:px-6">
          <div className="flex h-18.5 items-center justify-between rounded-[28px] border border-white/30 bg-linear-to-r from-primary via-rose-500 to-fuchsia-600 px-4 md:px-6 shadow-[0_20px_60px_rgba(236,72,153,0.18)]">
            {/* Left */}
            <div className="flex items-center gap-3 md:gap-4">
              {/* Mobile / Tablet toggle */}
              <button
                onClick={() => setMobileSidebarOpen(true)}
                className="grid size-10 place-items-center rounded-2xl bg-white/15 text-white transition-all hover:bg-white/22 lg:hidden cursor-pointer"
                aria-label="Open sidebar"
              >
                <PanelLeftOpen className="size-5" />
              </button>

              {/* Desktop collapse toggle */}
              <button
                onClick={() => setSidebarCollapsed((prev) => !prev)}
                className="hidden lg:grid lg:size-11 lg:place-items-center lg:rounded-2xl lg:bg-white/15 lg:text-white lg:transition-all lg:hover:bg-white/22 cursor-pointer"
                aria-label={isSidebarCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
                title={isSidebarCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
              >
                {isSidebarCollapsed ? <PanelLeftOpen className="size-5" /> : <PanelLeftClose className="size-5" />}
              </button>
            </div>

            {/* Right */}
            <div className="flex items-center gap-2 md:gap-4 text-white">
              <button className="grid size-10 place-items-center rounded-2xl bg-white/12 transition-all hover:bg-white/20 cursor-pointer">
                <Bell className="size-5" />
              </button>

              <div className="hidden h-8 w-px bg-white/20 sm:block" />

              <div className="dropdown dropdown-end cursor-pointer">
                <button className="flex items-center gap-3 rounded-2xl bg-white/12 p-1.5 pl-3 pr-2 transition-all hover:bg-white/20 sm:pl-4 cursor-pointer">
                  <span className="hidden text-xs font-bold uppercase tracking-wider md:block">{user?.name || 'Giftly User'}</span>
                  <div className="grid size-10 place-items-center rounded-xl bg-white font-black text-primary shadow-sm text-xs">
                    {user?.name?.slice(0, 2).toUpperCase() || 'GU'}
                  </div>
                </button>

                <ul className="menu dropdown-content z-50 mt-3 w-56 rounded-3xl border border-slate-100 bg-white p-2 text-slate-800 shadow-2xl">
                  <li className="menu-title px-4 py-2 text-[10px] font-black uppercase tracking-widest text-slate-400">Account Settings</li>
                  <li>
                    <Link href="/dashboard/profile" className="rounded-2xl py-3 font-semibold">
                      My Profile
                    </Link>
                  </li>
                  <li>
                    <button onClick={logout} className="rounded-2xl py-3 font-bold text-rose-500 hover:bg-rose-50 cursor-pointer">
                      Log Out
                    </button>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </header>

        {/* Body */}
        <main className="p-4 md:p-6 lg:p-10">{children}</main>
      </div>
    </div>
  );
};

export default DashboardLayout;

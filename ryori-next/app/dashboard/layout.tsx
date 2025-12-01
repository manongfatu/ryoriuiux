'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import type { Route } from 'next';

type NavItem = {
  href: Route;
  label: string;
  icon: JSX.Element;
  ariaLabel?: string;
};

const navItems: NavItem[] = [
  { href: '/dashboard', label: 'Dashboard', icon: <span aria-hidden="true" className="ico ico--db"></span> },
  { href: '/dashboard/orders', label: 'Orders', icon: <span aria-hidden="true" className="ico ico--orders"></span> },
  { href: '/dashboard/menu', label: 'Menu', icon: <span aria-hidden="true" className="ico ico--menu"></span> },
  { href: '/dashboard/tables', label: 'Tables', icon: <span aria-hidden="true" className="ico ico--tables"></span> },
  { href: '/dashboard/reports', label: 'Reports', icon: <span aria-hidden="true" className="ico ico--reports"></span> },
  { href: '/dashboard/settings', label: 'Settings', icon: <span aria-hidden="true" className="ico ico--settings"></span> }
];

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isSidebarExpanded, setIsSidebarExpanded] = useState(true);
  const userName = 'User';
  const pathname = usePathname();

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsSidebarOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  return (
    <>
      <a className="skip-link" href="#dash-main">Skip to content</a>
      <div className={`dash-shell ${isSidebarExpanded ? 'is-expanded' : 'is-collapsed'}`}>
        {/* Sidebar / Drawer */}
        <aside
          className={`dash-sidebar ${isSidebarOpen ? 'is-open' : ''}`}
          aria-label="Primary"
        >
          <div className="sidebar-head">
            <Link href="/" className="brand" aria-label="Ryori home">
              <img className="brand-mark--small" src="https://ryoriapp.com/wp-content/uploads/2024/05/ryoriv2.png" alt="" aria-hidden="true" />
            </Link>
            <button
              className="sidebar-close"
              aria-label="Close menu"
              onClick={() => setIsSidebarOpen(false)}
            >
              <span aria-hidden="true" className="ico ico--close"></span>
            </button>
          </div>
          <nav>
            <ul className="side-nav" role="list">
              {navItems.map(item => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="side-link"
                    aria-current={pathname.startsWith(item.href as string) ? 'page' : undefined}
                  >
                    {item.icon}
                    <span className="side-text">{item.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <div className="sidebar-foot">
            {/* Desktop expand/collapse remains; hidden on mobile via CSS */}
            <button
              className="btn btn--ghost btn--sm expand-toggle"
              aria-pressed={isSidebarExpanded}
              aria-label={isSidebarExpanded ? 'Collapse sidebar' : 'Expand sidebar'}
              onClick={() => setIsSidebarExpanded(v => !v)}
            >
              <span aria-hidden="true" className="ico ico--chev"></span>
              <span className="side-text">{isSidebarExpanded ? 'Collapse' : 'Expand'}</span>
            </button>
            {/* Mobile profile area */}
            <div className="mobile-profile" aria-label="Profile quick actions">
              <div className="mobile-profile-info">
                <div className="avatar" aria-hidden="true"></div>
                <div className="mp-text">
                  <div className="mp-hello">Hello,</div>
                  <div className="mp-name">{userName}</div>
                </div>
              </div>
              <Link href="/dashboard/profile" className="btn btn--sm mp-btn">View Profile</Link>
            </div>
          </div>
        </aside>
        {/* Drawer overlay */}
        <button
          className={`drawer-overlay ${isSidebarOpen ? 'is-visible' : ''}`}
          aria-label="Close menu"
          onClick={() => setIsSidebarOpen(false)}
        />

        {/* Top bar */}
        <header className="dash-topbar">
          <div className="topbar-left">
            <button
              className="icon-btn"
              aria-label="Open menu"
              onClick={() => setIsSidebarOpen(true)}
            >
              <span aria-hidden="true" className="ico ico--menu"></span>
            </button>
            <h1 className="topbar-title">Dashboard</h1>
          </div>
          <div className="topbar-right">
            <label className="sr-only" htmlFor="dash-search">Search</label>
            <input id="dash-search" className="dash-search" placeholder="Search orders, tables, items…" />
            <button className="icon-btn" aria-label="Notifications">
              <span aria-hidden="true" className="ico ico--bell"></span>
            </button>
            <button className="icon-btn" aria-label="Account">
              <span aria-hidden="true" className="ico ico--user"></span>
            </button>
            <div className="user-greet">
              <span className="hello">Hello, <strong>{userName}</strong>!</span>
              <Link href="/dashboard/profile" className="btn btn--sm btn--ghost profile-btn" aria-label="View your profile">
                View Profile
              </Link>
            </div>
          </div>
        </header>

        {/* Main content */}
        <main id="dash-main" className="dash-main" tabIndex={-1}>
          {children}
        </main>

        {/* Bottom navigation (mobile) */}
        <nav className="dash-bottomnav" aria-label="Bottom">
          <Link href="/dashboard" className="bottom-link" aria-current="page">
            <span aria-hidden="true" className="ico ico--db"></span>
            <span className="bottom-text">Dashboard</span>
          </Link>
          <Link href="/dashboard/orders" className="bottom-link">
            <span aria-hidden="true" className="ico ico--orders"></span>
            <span className="bottom-text">Orders</span>
          </Link>
          <Link href="/dashboard/menu" className="bottom-link">
            <span aria-hidden="true" className="ico ico--menu"></span>
            <span className="bottom-text">Menu</span>
          </Link>
          <Link href="/dashboard/settings" className="bottom-link">
            <span aria-hidden="true" className="ico ico--settings"></span>
            <span className="bottom-text">Settings</span>
          </Link>
        </nav>
      </div>
    </>
  );
}



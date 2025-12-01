import type { Metadata, Viewport } from 'next';
import './globals.css';
import AppShell from './components/AppShell';

export const metadata: Metadata = {
  title: 'Ryori – Effortless QR Ordering for Restaurants',
  description:
    'Ryori is an intuitive QR-code restaurant ordering system. Scan → Order → Enjoy. Manage menus, branches, inventory, and more.',
  themeColor: '#C8102E',
  icons: [{ rel: 'icon', url: '/assets/favicon.svg' }]
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  viewportFit: 'cover'
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <AppShell>{children}</AppShell>
      </body>
    </html>
  );
}










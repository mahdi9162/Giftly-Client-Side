import type { Metadata } from 'next';
import { Geist, Geist_Mono, Satisfy } from 'next/font/google';
import './globals.css';
import TanStackProvider from '@/providers/TanStackProvider';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

const satisfy = Satisfy({
  variable: '--font-satisfy',
  subsets: ['latin'],
  weight: '400',
});

export const metadata: Metadata = {
  title: 'Giftly - Find the Perfect Gift with AI',
  description:
    'Discover thoughtful gift ideas for any occasion using AI-powered recommendations. Find the perfect gift for your loved ones effortlessly.',

  keywords: ['gift ideas', 'AI gift finder', 'online gift shop', 'gift recommendation', 'birthday gifts', 'anniversary gifts'],

  authors: [{ name: 'Mahdi Hasan' }],

  openGraph: {
    title: 'Giftly - AI Gift Finder',
    description: 'Find the perfect gift for any occasion with AI-powered suggestions.',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable} ${satisfy.variable} antialiased`}>
        <TanStackProvider>
          <main>{children}</main>
        </TanStackProvider>
      </body>
    </html>
  );
}

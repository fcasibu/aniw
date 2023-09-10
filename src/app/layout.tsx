import { Header } from '@/components';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Something something',
};

type LayoutProps = {
  children: React.ReactNode;
};

export default function Layout({ children }: LayoutProps) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <a
          href="#main-content"
          className="sr-only !fixed left-2 top-2 z-10 !p-1 focus:not-sr-only"
        >
          Skip to main content
        </a>
        <Header />
        <main id="main-content" className="mx-auto max-w-7xl">
          {children}
        </main>
      </body>
    </html>
  );
}

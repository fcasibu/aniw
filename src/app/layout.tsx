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
        <Header />
        <main className="mx-auto flex max-w-7xl flex-col gap-5">
          {children}
        </main>
      </body>
    </html>
  );
}

import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Menu } from '@/components/menu';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Baba Balance',
  description: 'Baba Balance - Equilibre seus times de futebol recreativo',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <head>
        <link rel="icon" href="/favicon.ico" type="image/x-icon" />
      </head>
      <body className={inter.className + ' bg-background min-h-screen'}>
        <Menu />
        {children}
      </body>
    </html>
  );
}

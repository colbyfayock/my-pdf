import { Metadata } from 'next';

import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: 'Invoicipedia',
  description: 'Invoicipedia',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <div className="min-h-screen grid grid-rows-[auto_1fr_auto]">
          <Header />
          <main>{ children }</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}

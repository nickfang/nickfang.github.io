import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Toaster } from 'sonner';
import MainHeader from '@/components/main-header/main-header';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Nicholas Fang - Dev',
  description: 'Personal Website.',
};

const RootLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <html lang="en">
      <body className={inter.className}>
        <MainHeader />
        <div className="sm:w-full md:w-3/4 lg:w-2/3 sm:m-0 md:m-auto p-0">{children}</div>
        <Toaster />
      </body>
    </html>
  );
};

export default RootLayout;

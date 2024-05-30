import type { Metadata } from "next";
import { Inter } from "next/font/google";
import MainHeader from '@/components/main-header/main-header';
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Nicholas Fang - Dev",
  description: "Personal Website.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <MainHeader />
        <div className="m-[120px]">
          {children}
        </div>
      </body>
    </html>
  );
}

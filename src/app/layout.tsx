import type { Metadata } from "next";
import { Kanit } from 'next/font/google';
import { Geist_Mono } from 'next/font/google';
import "./globals.css";
import Navbar from "./navbar";
import Footer from "./footer";

// โหลดฟอนต์ Kanit
const kanit = Kanit({
  subsets: ['thai', 'latin'],
  weight: ['400', '700'],
  display: 'swap',
  variable: "--font-kanit"
});

// โหลดฟอนต์ Geist Mono
const geistMono = Geist_Mono({
  subsets: ['latin'],
  variable: "--font-geist-mono"
});

export const metadata: Metadata = {
  title: "NextFetchAPI",
  description: "NextFetchAPI",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${kanit.variable} ${geistMono.variable} antialiased max-w-7xl mx-auto`} 
      >
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}

import localFont from "next/font/local";
import "../styles/globals.css";
import Navbar from '@/components/Navbar';
import Provider from '@/components/Provider';
import { Analytics } from '@vercel/analytics/react';
import Footer from '@/components/Footer';

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata = {
  title: "PomoGoo App",
  description: "Handle your productive time",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Provider>
          <main className="app">
            <Navbar />
            {children}
            <Analytics />
            <Footer />
          </main>
        </Provider>
      </body>
    </html>
  );
}

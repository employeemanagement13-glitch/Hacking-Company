import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Poppins } from "next/font/google";
import Footer from "@/Components/Footer";
import Navbar from "@/Components/Navbar";
import { ClerkProvider } from "@clerk/nextjs";
import Providers from './providers';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const poppins = Poppins({
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
  variable: "--font-poppins",
});

export const metadata: Metadata = {
  title: "Wabnet | Hacking Company",
  description: "Wabnet a well known security services provider in all 7 continents. Our clients trust due to our secured solutions includes Google, Nvidia, Apple, Devsinc, OpenAI, MindhyveAI and many others. ",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body
          className={`${geistSans.variable} ${geistMono.variable} ${poppins.className} antialiased overflow-x-hidden`}
        >
          <Navbar />
          <Providers>
          {children}
          </Providers>
          <Footer />
        </body>
      </html>
    </ClerkProvider>
  );
}

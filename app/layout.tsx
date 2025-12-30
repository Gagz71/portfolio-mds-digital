import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";
import SiteHeader from "@/components/SiteHeader";
import Footer from "@/components/Footer";


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const blenderProBook = localFont({
  src: [{ path: "../public/fonts/blender-pro-book.ttf" }],
  variable: "--font-blenderProBook",
});

const orbitronBlack = localFont({
  src: [{ path: "../public/fonts/Orbitron-Black.ttf" }],
  variable: "--font-orbitronBlack",
});

const deltha = localFont({
  src: [{ path: "../public/fonts/Deltha.ttf" }],
  variable: "--font-deltha",
});
const orbitronRegular = localFont({
  src: [{ path: "../public/fonts/Orbitron-Regular.ttf" }],
  variable: "--font-orbitronRegular",
});
const orbitronMedium = localFont({
  src: [{ path: "../public/fonts/Orbitron-Medium.ttf" }],
  variable: "--font-orbitronMedium",
});
const orbitronSemiBold = localFont({
  src: [{ path: "../public/fonts/Orbitron-SemiBold.ttf" }],
  variable: "--font-orbitronSemiBold",
});


export const metadata: Metadata = {
  title: "MDS DIGITAL",
  description: "Vos idées, nos codes",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${blenderProBook.variable} ${orbitronBlack.variable} ${deltha.variable} ${orbitronRegular.variable} ${orbitronMedium.variable} ${orbitronSemiBold.variable} antialiased`}
      >
        <SiteHeader />
        {children}
        <Footer />
      </body>
    </html>
  );
}

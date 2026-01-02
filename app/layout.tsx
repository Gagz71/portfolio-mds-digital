import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";

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
  metadataBase: new URL('https://mds-digital.fr'),
  title: {
    default: "MDS DIGITAL - Solutions Web Sur-Mesure",
    template: "%s | MDS DIGITAL",
  },
  description:
    "MDS Digital conçoit des solutions web & mobiles sur-mesure pour gagner en visibilité et en efficacité. Sites modernes, applications intuitives, outils concrets : du propre, du rapide, du maintenable.",
  keywords: [
    "développement web",
    "création site internet",
    "application web",
    "Next.js",
    "React",
    "freelance développeur",
    "Mâcon",
    "Bourgogne",
  ],
  authors: [{ name: "Dounia Manhouli", url: "https://mds-digital.fr" }],
  creator: "MDS Digital",
  publisher: "MDS Digital",
  openGraph: {
    type: "website",
    locale: "fr_FR",
    url: "https://mds-digital.fr",
    title: "MDS Digital - Solutions Web Sur-Mesure",
    description:
      "Solutions web & mobiles sur-mesure pour gagner en visibilité et en efficacité.",
    siteName: "MDS Digital",
    images: [
      {
        url: "/icon-512.png",
        width: 512,
        height: 512,
        alt: "MDS Digital Logo",
      },
    ],
  },
  twitter: {
    card: "summary",
    title: "MDS Digital - Solutions Web Sur-Mesure",
    description:
      "Solutions web & mobiles sur-mesure pour gagner en visibilité et en efficacité.",
    images: ["/icon-512.png"],
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/icon-192.png", sizes: "192x192", type: "image/png" },
      { url: "/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" }],
  },
  manifest: "/site.webmanifest",
  robots: {
    index: true,
    follow: true,
  },
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
        {children}
      </body>
    </html>
  );
}
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";
import GoogleAnalytics from '../components/GoogleAnalytics'

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
    'développeur web',
    'développeur mobile',
    'développeur full-stack',
    "développement sur-mesure",
    "application sur-mesure",
    "création site internet",
    "application web",
    "Next.js",
    "React",
    "freelance développeur",
    "Mâcon",
    "Bourgogne",
    'freelance', 
    'React Native', 
    'TypeScript', 
    'e-commerce', 
    'Symfony', 
    'Node.js'
  ],
  authors: [{ name: "Dounia Manhouli - MDS Digital", url: "https://mds-digital.fr" }],
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
    url: 'https://mds-digital.fr/brand/logo-mds-panel.png',
    width: 1200,
    height: 630,
    alt: 'MDS Digital - Solutions Web Sur-Mesure'
  }
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
   // Robots
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'cAuxjtTNk4zH_Iju0k1U_AElroUhkmqr2UVdNU6a-ck'
  }
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
        <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_ID!} />
        {/* Schema.org pour Google */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'ProfessionalService',
              name: 'MDS Digital',
              description: 'MDS Digital - Solutions Web Sur-Mesure',
              url: 'https://mds-digital.fr',
              telephone: '+33-6-95-69-55-03', // Ajoute ton numéro si tu veux
              email: 'contact@mds-digital.fr',
              address: {
                '@type': 'PostalAddress',
                addressCountry: 'FR',
              },
              sameAs: [
                'https://github.com/Gagz71',
                // Ajoute LinkedIn, etc. si tu as
              ],
            }),
          }}
        />
        {children}
      </body>
    </html>
  );
}
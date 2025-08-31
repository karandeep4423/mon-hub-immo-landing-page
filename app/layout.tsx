import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "./Header";
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "MonHubimmo - La plateforme collaborative pour les professionnels de l'immobilier",
  description: "Découvrez MonHubimmo, la 1ère plateforme collaborative dédiée aux agents immobiliers. Partagez vos mandats, collaborez entre professionnels, tous réseaux confondus. 3 mois offerts pour les premiers inscrits !",
  keywords: "immobilier, agent immobilier, mandataire, collaboration, partage mandats, IAD, SAFTI, Century 21, Orpi",
  
  // Open Graph meta tags pour le partage social
  openGraph: {
    title: "MonHubimmo - Plateforme collaborative immobilier",
    description: "La 1ère plateforme collaborative pour tous les professionnels de l'immobilier. Partagez vos mandats et collaborez sans barrière de réseau.",
    url: "https://www.monhubimmo.com",
    siteName: "MonHubimmo",
    images: [
      {
        url: "/logo.png",
        width: 1200,
        height: 630,
        alt: "MonHubimmo - Plateforme collaborative immobilier",
      },
    ],
    locale: "fr_FR",
    type: "website",
  },
  
  // Twitter Card meta tags
  twitter: {
    card: "summary_large_image",
    title: "MonHubimmo - Plateforme collaborative immobilier",
    description: "La 1ère plateforme collaborative pour tous les professionnels de l'immobilier.",
    images: ["/logo.png"],
    creator: "@monhubimmo",
  },
  
  // Autres meta tags
  robots: {
    index: true,
    follow: true,
  },
  
  // Favicon et icônes
  icons: {
    icon: "/logo.png",
    shortcut: "/logo.png",
    apple: "/logo.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <Header/>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}

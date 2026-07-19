import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { SITE_URL, SITE_NAME } from "@/lib/site";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Bonvo Ski — 3D Ski Maps & Ski Trips from the US to the Alps",
    template: `%s | ${SITE_NAME}`,
  },
  description:
    "3D ski resort maps and hand-built ski trip packages from the US to the European Alps. Navigate, search, and ski the world's biggest ski areas for less than a week in Colorado.",
  keywords: [
    "ski",
    "snowboard",
    "3D maps",
    "ski resort",
    "ski trip to Europe",
    "ski packages",
    "Alps ski vacation",
  ],
  openGraph: {
    siteName: SITE_NAME,
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
  },
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
    <html lang="en">
      <body className={`${inter.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}

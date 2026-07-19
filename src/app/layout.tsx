import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Bonvo Ski - Navigate Ski Resorts in 3D",
  description: "3D ski resort maps and services for skiers and snowboarders. Navigate, search, and discover the best spots on the mountain.",
  keywords: "ski, snowboard, 3D maps, ski resort, navigation, slopes, lifts",
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

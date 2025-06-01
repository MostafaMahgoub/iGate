import type React from "react";
import "./globals.css";
import { Philosopher, Inter } from "next/font/google";
import { ThemeProvider } from "@/components/ui/theme-provider";
import type { Metadata } from "next";

const philosopher = Philosopher({
  subsets: ["latin"],
  weight: ["400", "700"],
  display: "swap",
  variable: "--font-philosopher",
});

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: {
    template: "%s | E-commerce Store",
    default: "E-commerce Store - Product Listing",
  },
  description:
    "Browse our extensive collection of products with advanced filtering and search capabilities.",
  keywords: "e-commerce, products, shopping, online store",
  authors: [{ name: "E-commerce Store" }],
  creator: "E-commerce Store",
  publisher: "E-commerce Store",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://example.com",
    siteName: "E-commerce Store",
  },
  twitter: {
    card: "summary_large_image",
    title: "E-commerce Store - Product Listing",
    description:
      "Browse our extensive collection of products with advanced filtering and search capabilities.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${philosopher.variable} ${inter.variable}`}>
      <body className="min-h-screen bg-background font-inter antialiased">
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem={false}
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}

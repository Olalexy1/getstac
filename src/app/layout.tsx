import type { Metadata } from "next";
import { Inter } from "next/font/google"
import "./globals.css";
import { Toaster } from "sonner";
import { siteConfig } from "@/config/site";
import { TailwindIndicator } from "@/components/tailwind-indicator";

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: siteConfig.name,
    template: `%s - ${siteConfig.name}`,
  },
  description: siteConfig.description,
  authors: [
    {
      name: "Ajayi Olalekan",
      url: "https://lexy-portfolio-frontend.vercel.app/",
    },
  ],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteConfig.url,
    title: siteConfig.name,
    description: siteConfig.description,
    siteName: siteConfig.name,
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.name,
  },
  robots: "index, follow",
  alternates: {
    canonical: siteConfig.url,
    languages: {
      "en-US": "/",
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.className} font-sans antialiased`}
      >
        {children}
        <Toaster />
        <TailwindIndicator />
      </body>
    </html>
  );
}

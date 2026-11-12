import type { Metadata, Viewport } from "next";
import { Inter, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  viewportFit: "cover",
  themeColor: "#0B1730",
};

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-plus-jakarta",
  display: "swap",
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://www.zeninsystems.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default:
      "Zenin Systems Solutions LLP | Industrial CCTV, AI Video Analytics & Automation",
    template: "%s | Zenin Systems Solutions LLP",
  },
  description:
    "Enterprise B2B industrial security, CCTV surveillance, 21+ AI video analytics applications, video management systems, building automation (IBMS), fire safety, and engineering solutions.",
  openGraph: {
    type: "website",
    siteName: "Zenin Systems Solutions LLP",
    title:
      "Zenin Systems Solutions LLP — Industrial Security, AI Vision & Engineering Solutions",
    description:
      "Explore integrated industrial surveillance, AI-powered video analytics, intelligent automation, and facility engineering solutions designed for modern operations.",
    url: siteUrl,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const orgJsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Zenin Systems Solutions LLP",
    url: siteUrl,
    description:
      "Industrial security, CCTV surveillance, AI video analytics, industrial automation, fire safety, building management, and integrated engineering solutions provider.",
  };

  return (
    <html lang="en" className={`${inter.variable} ${plusJakarta.variable}`}>
      <body className="min-h-screen bg-white text-[#172033] antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd) }}
        />
        {children}
      </body>
    </html>
  );
}

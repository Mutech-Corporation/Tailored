import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.designcentura.com"),
  title: "Custom Logo Maker | Online Logo Maker | Design Centura",
  description:
    "Need a custom logo maker that converts? Get a powerful, memorable logo built for growth and brand authority, start designing now with Design Centura!",
  keywords: [
    "home designcentura",
    "creative agency",
    "branding",
    "web development",
  ],
  authors: [{ name: "Design Centura Team" }],
  alternates: { canonical: "https://www.designcentura.com/" },
  robots: { index: true, follow: true },
  icons: { icon: "/seo/favicon.png" },
  openGraph: {
    type: "website",
    title: "DesignCentura Reviews - 1000+ Verified Client Testimonials",
    description:
      "See thousands of verified DesignCentura reviews from Google, Trustpilot, and Facebook. Real client experiences, 4.9★ average rating.",
    url: "https://www.DesignCentura.com/reviews.php/",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      className={`${inter.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}

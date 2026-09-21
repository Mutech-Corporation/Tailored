import type { Metadata } from "next";
import { Inter, Montserrat } from "next/font/google";
import { ScrollReveal } from "@/components/ScrollReveal";
import { ScrollToTop } from "@/components/ScrollToTop";
import { SITE } from "@/config/site";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  display: "swap",
});

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
  display: "swap",
});

const HOME_TITLE = `${SITE.name} | Branding, Websites, AI & Digital Growth`;

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: HOME_TITLE,
    template: `%s | ${SITE.name}`,
  },
  description: SITE.description,
  keywords: [
    "creative agency",
    "branding",
    "logo design",
    "website design",
    "AI automation",
    "SEO",
    "digital marketing",
  ],
  authors: [{ name: SITE.name }],
  robots: { index: true, follow: true },
  openGraph: {
    type: "website",
    siteName: SITE.name,
    title: HOME_TITLE,
    description: SITE.description,
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
      className={`${inter.variable} ${montserrat.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        {children}
        <ScrollReveal />
        <ScrollToTop />
      </body>
    </html>
  );
}

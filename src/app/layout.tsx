import type { Metadata } from "next";
import { Inter, Noto_Sans_KR } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import BottomNav from "@/components/layout/BottomNav";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const notoSansKr = Noto_Sans_KR({ subsets: ["latin"], variable: "--font-noto-sans-kr" });

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL
  ?? (process.env.VERCEL_PROJECT_PRODUCTION_URL ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}` : null)
  ?? (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : null)
  ?? "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "Central FC",
  description: "안양 평촌 조기축구회 중앙 FC",
  openGraph: {
    title: "Central FC",
    description: "안양 평촌 조기축구회 중앙 FC",
    locale: "ko_KR",
    type: "website",
    images: [
      {
        url: "/hero-image.jpg",
        alt: "Central FC (평촌 중앙 FC)",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Central FC",
    description: "안양 평촌 조기축구회 중앙 FC",
    images: ["/hero-image.jpg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body
        className={`${inter.variable} ${notoSansKr.variable} font-sans antialiased bg-gray-50 text-gray-900 pb-16`}
      >
        <Header />
        <main className="min-h-screen">
          {children}
        </main>
        <BottomNav />
      </body>
    </html>
  );
}

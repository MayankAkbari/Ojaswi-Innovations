import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/lib/auth-context";
import { AuthGate } from "@/components/AuthGate";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["400", "600", "700", "900"],
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Ojaswi Innovations | Guided by Vision. Powered by Innovation.",
  description: "India's fastest-growing premium website development company. 48-Hour delivery, free post-launch changes, and lowest AMC in India (₹5,500/year Independence Day Offer). Flagship of Tejomay Group Pvt Ltd.",
  keywords: "Website Development Company India, Website Developer Ahmedabad, Business Website Development India, Professional Website Development, Ecommerce Website Development, SEO Website Company, Full Stack Website Company, Fast Website Development, Premium Website Designer India",
  openGraph: {
    title: "Ojaswi Innovations | Premium Enterprise Website Development",
    description: "48-Hour Rapid Delivery. Guaranteed Free Changes. Lowest AMC in India. Built for High ROI & Scalability.",
    url: "https://ojaswi.com",
    siteName: "Ojaswi Innovations",
    images: [
      {
        url: "/logo.png",
        width: 1200,
        height: 630,
        alt: "Ojaswi Innovations Logo",
      },
    ],
    locale: "en_IN",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${playfair.variable} ${inter.variable} antialiased scroll-smooth`}>
      <body className="min-h-screen bg-ivory-50 text-charcoal-900 selection:bg-gold-500/30 selection:text-navy-900">
        <AuthProvider>
          <AuthGate>
            {children}
          </AuthGate>
        </AuthProvider>
      </body>
    </html>
  );
}

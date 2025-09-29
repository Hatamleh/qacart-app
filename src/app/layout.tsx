import type { Metadata } from "next";
import { IBM_Plex_Sans_Arabic, Oswald, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { AuthProvider } from '@/contexts/AuthContext';

// Configure IBM Plex Sans Arabic for body text
const ibmPlexArabic = IBM_Plex_Sans_Arabic({
  subsets: ["arabic", "latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-arabic",
  display: "swap",
});

// Configure Oswald for headers (coding style)
const oswald = Oswald({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-headers",
  display: "swap",
});

// Configure JetBrains Mono for code/monospace
const jetBrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "QAcart - منصة تعلم اختبار البرمجيات",
  description: "تعلم اختبار البرمجيات من الصفر مع خبراء المجال في منصة QAcart التعليمية",
  keywords: ["اختبار البرمجيات", "تعلم", "QA", "Testing", "Software"],
  authors: [{ name: "QAcart Team" }],
  robots: "index, follow",
  openGraph: {
    title: "QAcart - منصة تعلم اختبار البرمجيات",
    description: "تعلم اختبار البرمجيات من الصفر مع خبراء المجال",
    type: "website",
    locale: "ar_SA",
    alternateLocale: "en_US",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ar"
      dir="rtl"
      className={`${ibmPlexArabic.variable} ${oswald.variable} ${jetBrainsMono.variable}`}
      data-scroll-behavior="smooth"
    >
      <body className={`${ibmPlexArabic.className} antialiased`}>
        <AuthProvider>
          <div className="min-h-screen flex flex-col">
            <Navbar />
            <main className="flex-1">
              {children}
            </main>
            <Footer />
          </div>
        </AuthProvider>
      </body>
    </html>
  );
}
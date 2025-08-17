import type { Metadata } from "next";
import { Cairo } from "next/font/google";
import "./globals.css";
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { AuthProvider } from '@/contexts/AuthContext';

// Configure Cairo font with Arabic support
const cairo = Cairo({
  subsets: ["latin", "arabic"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-cairo",
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
    <html lang="ar" dir="rtl" className={cairo.variable} data-scroll-behavior="smooth">
      <body className={`${cairo.className} antialiased`}>
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
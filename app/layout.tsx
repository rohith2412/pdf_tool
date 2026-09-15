import type { Metadata, Viewport } from "next";
import Link from "next/link";
import Script from "next/script";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";
import { HeaderNav } from "@/components/HeaderNav";
import { JsonLd } from "@/components/JsonLd";
import { Providers } from "@/components/Providers";
import { VisitPing } from "@/components/VisitPing";
import { organizationLd } from "@/lib/seo/jsonld";
import { SITE_NAME, SITE_URL } from "@/lib/seo/meta";

const ADSENSE_CLIENT = "ca-pub-7656656037446061";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "pdfeditorkit - private, in-browser PDF utilities",
    template: "%s · pdfeditorkit",
  },
  description:
    "A small collection of PDF utilities that run entirely in your browser. No uploads, no signup, no watermark.",
  applicationName: "pdfeditorkit",
  robots: { index: true, follow: true },
  formatDetection: { telephone: false, email: false, address: false },
  openGraph: {
    type: "website",
    siteName: "pdfeditorkit",
    locale: "en_US",
  },
  twitter: { card: "summary_large_image" },
  other: {
    "google-adsense-account": ADSENSE_CLIENT,
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0a0a0a" },
  ],
  colorScheme: "light",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-white font-sans text-base antialiased">
        <JsonLd data={organizationLd()} />
        <Providers>
          <VisitPing />
          <header className="sticky top-0 z-20 border-b border-line bg-white/85 backdrop-blur-md">
            <div className="mx-auto flex max-w-page items-center justify-between px-4 py-3 sm:px-6">
              <Link
                href="/"
                className="inline-flex no-underline transition-opacity hover:opacity-80"
                aria-label={`${SITE_NAME} home`}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/logo-mark.svg"
                  alt={SITE_NAME}
                  width={28}
                  height={28}
                  className="h-7 w-7"
                />
              </Link>
              <HeaderNav />
            </div>
          </header>
          <main className="mx-auto max-w-page px-4 py-10 sm:px-6">{children}</main>
          <footer className="mt-24 border-t border-line bg-surface">
            <div className="mx-auto flex max-w-page flex-col gap-4 px-4 py-8 text-xs text-muted sm:flex-row sm:items-center sm:justify-between sm:px-6">
              <span>
                © {new Date().getFullYear()} {SITE_NAME}. Files never leave your browser.
              </span>
              <div className="flex gap-5">
                <Link href="/privacy" className="hover:text-ink">
                  Privacy
                </Link>
                <Link href="/about" className="hover:text-ink">
                  About
                </Link>
              </div>
            </div>
          </footer>
        </Providers>
        <Analytics />
        <Script
          async
          src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${ADSENSE_CLIENT}`}
          crossOrigin="anonymous"
          strategy="afterInteractive"
        />
      </body>
    </html>
  );
}

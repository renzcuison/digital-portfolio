import type { Metadata, Viewport } from "next";
import { Noto_Sans_JP } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/ui/env/theme-provider";
import { SiteConfig } from "@/lib/constants";
import { CursorFollower } from "@/components/ui/cursor/cursor-follower";

const notoSansJP = Noto_Sans_JP({
  subsets: ["latin"],
  weight: ["200", "400", "600", "700", "900"],
  variable: "--font-noto-sans-jp",
  display: "swap",
});

export const metadata: Metadata = {
  title: SiteConfig.name,
  description: "Digital Portfolio #1. Creative Developer. Exploring 3d space.",
  metadataBase: new URL('https://renzcuison.vercel.app'),
  openGraph: {
    title: SiteConfig.name,
    description: 'Digital Portfolio #1. Creative Developer. Exploring 3d space.',
    url: 'https://renzcuison.vercel.app',
    siteName: SiteConfig.name,
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Renz Cuison — Creative Developer Portfolio',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: SiteConfig.name,
    description: 'Digital Portfolio #1. Creative Developer. Exploring 3d space.',
    images: ['/og-image.png'],
  },
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
  },
  manifest: "/site.webmanifest",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  viewportFit: "cover",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#000000" },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${notoSansJP.variable} font-sans antialiased selection:bg-black selection:text-white bg-white text-black`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          forcedTheme="light"
          enableSystem={false}
          disableTransitionOnChange
        >
          <CursorFollower />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
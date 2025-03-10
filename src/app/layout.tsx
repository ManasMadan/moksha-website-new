import type { Metadata } from "next";
import { Cinzel } from "next/font/google";
import "./globals.css";
import NavBar from "@/components/NavBar";
import SessionProvider from "@/lib/SessionProvider";
import { Toaster } from "react-hot-toast";

const cinzel = Cinzel({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Moksha 2025",
  description: "The official website of Moksha 2025",
  icons: {
    icon: "/favicon.ico",
    shortcut: "/icon.png",
    apple: "/icon.png",
  },
  openGraph: {
    title: "Moksha 2025",
    description: "The official website of Moksha 2025",
    url: "https://preview.mokshansut.com",
    siteName: "Moksha 2025",
    images: [
      {
        url: "https://preview.mokshansut.com/og.png",
        width: 1200,
        height: 630,
        alt: "Moksha 2025",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  manifest: "https://preview.mokshansut.com/manifest.json",
  twitter: {
    card: "summary_large_image",
    title: "Moksha 2025",
    description: "The official website of Moksha 2025",
    images: ["https://preview.mokshansut.com/og.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <meta property="og:image:type" content="image/png" />
        <meta property="og:image:url" content="https://preview.mokshansut.com/og.png"></meta>
        <meta property="og:image:secure_url" content="https://preview.mokshansut.com/og.png"></meta>
        <meta property="og:image:secure" content="https://preview.mokshansut.com/og.png"></meta>
        <meta property="og:logo" content="https://preview.mokshansut.com/logo.png" />
      </head>
      <body className={`${cinzel.className} antialiased`}>
        <SessionProvider>
          <NavBar />
          {children}
          <Toaster position="bottom-center" />
        </SessionProvider>
      </body>
    </html>
  );
}
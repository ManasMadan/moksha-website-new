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
  openGraph: {
    title: "Moksha 2025",
    description: "The official website of Moksha 2025",
    images: [
      {
        url: "https://preview.mokshansut.com/og.png",
        width: 1200,
        height: 630,
        alt: "Moksha 2025",
      },
    ],
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
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

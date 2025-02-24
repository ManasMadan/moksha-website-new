import type { Metadata } from "next";
import { Cinzel } from "next/font/google";
import "./globals.css";
import NavBar from "@/components/NavBar";

const cinzel = Cinzel({
  subsets: ["latin"],
})

export const metadata: Metadata = {
  title: "Moksha 2025",
  description: "The official website of Moksha 2025",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${cinzel.className} antialiased`}
      >
        <NavBar />
        {children}
      </body>
    </html>
  );
}

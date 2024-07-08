import type { Metadata } from "next";
import { Grand_Hotel } from "next/font/google";

import "./globals.css";

const titlefont = Grand_Hotel({ subsets: ["latin"], weight: "400" });

export const metadata: Metadata = {
  title: "Pickup Line Generator",
  description: "Generate one for me",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={titlefont.className}>{children}</body>
    </html>
  );
}

import { Toaster } from "@/components/ui/sonner";
import type { Metadata } from "next";
import PlausibleProvider from "next-plausible";
import { Grand_Hotel } from "next/font/google";
import "./globals.css";

const titlefont = Grand_Hotel({ subsets: ["latin"], weight: "400" });

export const metadata: Metadata = {
  title: "Pickup Line Generator | Generate pickup line for your crush now!",
  description: "Generate one for me",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <PlausibleProvider domain={process.env.NEXT_PUBLIC_APP_DOMAIN!}>
        <body className={titlefont.className}>
          <main>{children}</main>
          <Toaster richColors />
        </body>
      </PlausibleProvider>
    </html>
  );
}

import { cn } from "@/lib/cn";
import { Analytics } from "@vercel/analytics/react";
import type { Metadata } from "next";
import { Open_Sans } from "next/font/google";
import { Toaster } from "react-hot-toast";
import { CertificateProvider } from "./_components/certificate";

import "./globals.css";

export const metadata: Metadata = {
  title: "CertifyPro",
  description:
    "CertifyPro is an easy-to-use certificate generator for creating individual or bulk certificates quickly and efficiently.",
};

const openSans = Open_Sans({
  subsets: ["latin"],
  weight: ["400", "500"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={cn(
          "flex h-dvh w-dvw items-center justify-center bg-linear-to-br from-zinc-600 to-zinc-800 antialiased",
          openSans.className,
        )}
      >
        <aside>
          <Toaster position="bottom-right" />
        </aside>
        <CertificateProvider>{children}</CertificateProvider>
        <aside>
          <Analytics />
        </aside>
      </body>
    </html>
  );
}

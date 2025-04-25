import { cn } from "@/lib/cn";
import type { Metadata } from "next";
import { Open_Sans } from "next/font/google";
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
          "h-screen w-screen overflow-hidden bg-linear-to-br from-zinc-600 to-zinc-800 antialiased",
          openSans.className,
        )}
      >
        <CertificateProvider>{children}</CertificateProvider>
      </body>
    </html>
  );
}

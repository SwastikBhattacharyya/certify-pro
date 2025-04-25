import type { Metadata } from "next";
import { CertificateProvider } from "./_components/certificate";
import "./globals.css";

export const metadata: Metadata = {
  title: "CertifyPro",
  description:
    "CertifyPro is an easy-to-use certificate generator for creating individual or bulk certificates quickly and efficiently.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="h-screen w-screen overflow-hidden bg-linear-to-br from-zinc-600 to-zinc-800 antialiased">
        <CertificateProvider>{children}</CertificateProvider>
      </body>
    </html>
  );
}

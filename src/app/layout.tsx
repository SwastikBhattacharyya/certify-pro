import type { Metadata } from "next";
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
      <body className="antialiased">{children}</body>
    </html>
  );
}

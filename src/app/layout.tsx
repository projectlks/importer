import type { Metadata } from "next";
import { Manrope, Noto_Sans_Myanmar, Sora } from "next/font/google";
import "./globals.css";

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
});

const sora = Sora({
  variable: "--font-sora",
  subsets: ["latin"],
});

const notoSansMyanmar = Noto_Sans_Myanmar({
  variable: "--font-mm",
  subsets: ["myanmar", "latin"],
});

export const metadata: Metadata = {
  title: "TradeNet 2.0 UI Guide",
  description:
    "Next.js UI project based on Member Registration User Guide PDF with Tailwind CSS and Heroicons.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${manrope.variable} ${sora.variable} ${notoSansMyanmar.variable} h-full antialiased`}
    >
      <body className="min-h-full">{children}</body>
    </html>
  );
}

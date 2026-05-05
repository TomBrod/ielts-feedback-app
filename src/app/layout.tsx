import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Image from "next/image";
import Link from "next/link";
import Footer from "@/components/Footer";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Brodie Academy — IELTS Writing Feedback",
  description: "Get instant, examiner-quality feedback on your IELTS writing",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        {/* Main header bar */}
        <header
          className="relative overflow-hidden"
          style={{ backgroundColor: "#1F3E9C", minHeight: "80px" }}
        >
          {/* Red diagonal accent — bottom-right flourish */}
          <div
            className="absolute inset-y-0 right-0 w-64 pointer-events-none"
            style={{
              background: "#E8322A",
              clipPath: "polygon(45% 100%, 100% 0%, 100% 100%)",
            }}
          />

          <div
            className="relative z-10 max-w-6xl mx-auto px-6 flex items-center justify-between gap-4"
            style={{ minHeight: "80px", paddingTop: "16px", paddingBottom: "16px" }}
          >
            {/* Left: logo + name */}
            <Link href="/" className="flex items-center gap-4">
              <Image
                src="/brodie-logo.png"
                alt="Brodie Academy logo"
                height={50}
                width={50}
                style={{ mixBlendMode: "screen", height: 50, width: "auto" }}
              />
              <div>
                <p className="text-white font-bold text-2xl leading-tight">
                  Brodie Academy
                </p>
                <p className="text-white/80 text-sm leading-tight">
                  Expert IELTS feedback, instantly.
                </p>
              </div>
            </Link>

            {/* Right: navigation */}
            <nav className="flex items-center gap-1">
              <Link
                href="/"
                className="px-4 py-2 rounded-lg text-sm font-semibold text-white/80 hover:text-white hover:bg-white/10 transition-colors"
              >
                Home
              </Link>
              <Link
                href="/about"
                className="px-4 py-2 rounded-lg text-sm font-semibold text-white/80 hover:text-white hover:bg-white/10 transition-colors"
              >
                About
              </Link>
              <Link
                href="/contact"
                className="px-4 py-2 rounded-lg text-sm font-semibold text-white/80 hover:text-white hover:bg-white/10 transition-colors"
              >
                Contact
              </Link>
            </nav>
          </div>
        </header>

        <div className="flex-1">{children}</div>
        <Footer />
      </body>
    </html>
  );
}

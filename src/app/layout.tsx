import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Image from "next/image";
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
        <header style={{ backgroundColor: "#1F3E9C", borderBottom: "3px solid #E8322A" }} className="px-6 py-4">
          <div className="max-w-4xl mx-auto flex items-center gap-4">
            <Image
              src="/brodie-logo.png"
              alt="Brodie Academy logo"
              height={45}
              width={45}
              style={{ mixBlendMode: "screen", height: 45, width: "auto" }}
            />
            <div>
              <p className="text-white font-bold text-lg leading-tight">
                Brodie Academy
              </p>
              <p className="text-white/80 text-sm leading-tight">
                Expert IELTS feedback, instantly.
              </p>
            </div>
          </div>
        </header>
        {children}
      </body>
    </html>
  );
}

import { Suspense } from "react";
import { Young_Serif, Hanken_Grotesk } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const display = Young_Serif({ subsets: ["latin"], weight: "400", variable: "--font-display", display: "swap" });
const body = Hanken_Grotesk({ subsets: ["latin"], variable: "--font-body", display: "swap" });

export const metadata = {
  title: "Pustaka Senja | Ruang Baca Komunitas",
  description: "Ruang baca dan perpustakaan komunitas dekat kampus dengan berbagai koleksi buku pilihan.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="id" className={`${display.variable} ${body.variable}`}>
      <body className="min-h-screen flex flex-col">
        <a href="#konten" className="lewati">Lewati ke konten</a>
        <Suspense fallback={<div className="navbar" style={{ height: "4.2rem" }} />}>
          <Navbar />
        </Suspense>
        <main id="konten" className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}

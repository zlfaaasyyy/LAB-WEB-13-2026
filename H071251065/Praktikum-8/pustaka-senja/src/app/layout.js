import { Poppins } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-poppins",
});

export const metadata = {
  title: "Pustaka Senja | Ruang Baca Komunitas",
  description: "Katalog buku dan usulan koleksi Pustaka Senja, ruang baca komunitas dekat kampus.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="id">
      <body className={`${poppins.variable} font-sans min-h-screen flex flex-col`}>
        <Navbar />
        <main className="flex-1 w-full max-w-5xl mx-auto px-5 py-10">{children}</main>
        <Footer />
      </body>
    </html>
  );
}

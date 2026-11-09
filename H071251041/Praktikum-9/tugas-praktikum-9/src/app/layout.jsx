import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata = {
  title: "Pustaka Senja",
  description: "Katalog buku Pustaka Senja dengan Next.js dan PostgreSQL",
};

export default function RootLayout({ children }) {
  return (
    <html lang="id" className="overflow-y-scroll">
      <body className="flex min-h-screen bg-(--putih) flex-col text-(--coklat)">
        <Navbar />
        <main className="mx-auto w-full max-w-5xl flex-1 px-4 py-8 md:px-6">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}

import Link from "next/link";
import Hero from "@/components/Hero";
import { dataBuku } from "@/data/dataBuku";

export default function HomePage() {
  const total = dataBuku.length;
  const tersedia = dataBuku.filter((buku) => buku.tersedia).length;
  const dipinjam = dataBuku.filter((buku) => !buku.tersedia).length;

  const statistik = [
    { label: "Total Koleksi Buku", nilai: total },
    { label: "Buku Tersedia", nilai: tersedia },
    { label: "Buku Dipinjam", nilai: dipinjam },
  ];

  return (
    <div className="space-y-10">
      <Hero
        nama="Pustaka Senja"
        deskripsi="Ruang baca dan perpustakaan komunitas di dekat kampus. Datang, pilih buku, dan baca sampai senja."
        lokasi="Dekat kampus, Makassar"
        jamBuka="Setiap hari, 10.00 - 20.00"
      />

      <section className="grid grid-cols-1 border-y border-[#d9d0c4] sm:grid-cols-3">
        {statistik.map((item) => (
          <div
            key={item.label}
            className="border-b border-[#d9d0c4] py-5 sm:border-b-0 sm:px-5 sm:first:pl-0 sm:not-last:border-r"
          >
            <p className="font-serif text-4xl text-[#a64f37]">{item.nilai}</p>
            <p className="mt-1 text-sm text-[#766d62]">{item.label}</p>
          </div>
        ))}
      </section>

      <div className="flex flex-wrap gap-4">
        <Link
          href="/katalog"
          className="bg-[#a64f37] px-5 py-3 text-sm font-medium text-[#fffaf2] transition hover:bg-[#873d2b]"
        >
          Jelajahi Katalog
        </Link>
        <Link
          href="/usulan"
          className="border border-[#b8aa99] px-5 py-3 text-sm font-medium text-[#453d34] transition hover:bg-[#e8dfd3]"
        >
          Usulkan Buku
        </Link>
      </div>
    </div>
  );
}

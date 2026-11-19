import Link from "next/link";
import BukuCard from "@/components/BukuCard";
import pool from "@/lib/db";

const daftarKategori = ["Semua", "Teknologi", "Fiksi", "Pengembangan Diri"];

export default async function Katalog({ searchParams }) {
  const { kategori } = await searchParams;

  let kategoriAktif = "Semua";
  if (daftarKategori.includes(kategori)) {
    kategoriAktif = kategori;
  }

  let hasil;
  if (kategoriAktif === "Semua") {
    hasil = await pool.query("SELECT * FROM buku ORDER BY id");
  } else {
    hasil = await pool.query(
      "SELECT * FROM buku WHERE kategori = $1 ORDER BY id",
      [kategoriAktif]
    );
  }
  const bukuTampil = hasil.rows;

  function cekWarna(kategori) {
    if (kategori === kategoriAktif) {
      return "rounded-full bg-(--merah) px-4 py-2 text-xs font-semibold text-white shadow-md md:px-5 md:py-2 md:text-sm";
    } else {
      return "rounded-full border border-(--merah) bg-white px-4 py-2 text-xs font-semibold text-(--maroon) transition hover:bg-(--pink) md:px-5 md:py-2 md:text-sm";
    }
  }

  return (
    <section>
      <h1 className="text-3xl font-bold text-(--maroon)">Katalog Buku</h1>
      <p className="mb-6 mt-1 text-(--coklat)">
        Pilih kategori untuk menyaring daftar buku.
      </p>

      <div className="mb-6 flex flex-wrap gap-2">
        {daftarKategori.map((kategori) => (
          <Link
            key={kategori}
            href={kategori === "Semua" ? "/katalog" : "/katalog?kategori=" + kategori}
            className={cekWarna(kategori)}
          >
            {kategori}
          </Link>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3">
        {bukuTampil.map((buku) => (
          <BukuCard
            key={buku.id}
            id={buku.id}
            judul={buku.judul}
            penulis={buku.penulis}
            kategori={buku.kategori}
            tahun={buku.tahun}
            tersedia={buku.tersedia}
          />
        ))}
      </div>
    </section>
  );
}
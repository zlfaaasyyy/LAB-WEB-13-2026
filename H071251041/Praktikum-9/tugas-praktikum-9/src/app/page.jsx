import Hero from "@/components/Hero";
import pool from "@/lib/db";


export default async function Beranda() {
  const hasilTotal = await pool.query("SELECT COUNT(*) FROM buku");
  const hasilTersedia = await pool.query(
    "SELECT COUNT(*) FROM buku WHERE tersedia = true"
  );
  const hasilDipinjam = await pool.query(
    "SELECT COUNT(*) FROM buku WHERE tersedia = false"
  );

  const total = hasilTotal.rows[0].count;
  const tersedia = hasilTersedia.rows[0].count;
  const dipinjam = hasilDipinjam.rows[0].count;

  const ringkasan = [
    { label: "Total Koleksi Buku", nilai: total },
    { label: "Buku Tersedia", nilai: tersedia },
    { label: "Buku Dipinjam", nilai: dipinjam },
  ];

  return (
    <div className="space-y-6">
      <Hero
        nama="Pustaka Senja"
        deskripsi="Ruang baca dan perpustakaan komunitas di dekat kampus. Temukan buku favoritmu, simpan, dan kelola koleksi bersama kami."
        lokasi="Dekat Kampus"
        jamBuka="Senin - Sabtu, 09.00 - 20.00"
      />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        {ringkasan.map((item) => (
          <div
            key={item.label}
            className="rounded-2xl border border-(--merah) bg-white p-6 text-center shadow-md"
          >
            <p className="text-3xl font-bold text-(--maroon)">{item.nilai}</p>
            <p className="mt-1 text-xs font-semibold text-(--merah)">
              {item.label}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
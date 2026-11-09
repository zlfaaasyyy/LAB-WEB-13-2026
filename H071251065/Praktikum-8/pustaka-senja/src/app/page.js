import Hero from "@/components/Hero";
import { dataBuku } from "@/data/dataBuku";

export default function BerandaPage() {
  const total = dataBuku.length;
  const tersedia = dataBuku.filter((buku) => buku.tersedia).length;
  const dipinjam = dataBuku.filter((buku) => !buku.tersedia).length;

  const statistik = [
    { label: "Total Koleksi Buku", nilai: total },
    { label: "Buku Tersedia", nilai: tersedia },
    { label: "Buku Dipinjam", nilai: dipinjam },
  ];

  return (
    <div className="space-y-8">
      <Hero
        nama="Pustaka Senja"
        slogan="Ruang baca komunitas dekat kampus. Pinjam buku, baca sampai sore, lalu bahas bersama."
        lokasi="Dekat kampus"
        jamBuka="Setiap hari, 10.00 sampai 20.00"
      />

      <section aria-label="Ringkasan koleksi" className="grid gap-4 sm:grid-cols-3">
        {statistik.map((item) => (
          <div key={item.label} className="rounded-2xl border border-dusk-700 bg-dusk-900 p-6">
            <p className="text-4xl font-bold text-lamp">{item.nilai}</p>
            <p className="mt-1 text-sm text-mute">{item.label}</p>
          </div>
        ))}
      </section>
    </div>
  );
}

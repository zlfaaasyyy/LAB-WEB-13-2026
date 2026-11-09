import Hero from "@/components/Hero";
import dataBuku from "@/data/dataBuku";

export default function BerandaPage() {
  const totalBuku = dataBuku.length;
  const bukuTersedia = dataBuku.filter((buku) => buku.tersedia).length;
  const bukuDipinjam = dataBuku.filter((buku) => !buku.tersedia).length;

  const statistik = [
    { label: "Total Koleksi Buku", nilai: totalBuku },
    { label: "Buku Tersedia", nilai: bukuTersedia },
    { label: "Buku Dipinjam", nilai: bukuDipinjam },
  ];

  return (
    <div>
      <Hero
        nama="Pustaka Senja"
        deskripsi="Ruang baca dan perpustakaan komunitas di dekat kampus, tempat nyaman untuk membaca, belajar, dan berbagi buku."
        lokasi="Dekat Kampus"
        jamBuka="Buka setiap hari 10.00 - 20.00"
      />

      <section className="mt-8 bg-white border border-slate-200 rounded-2xl p-6 shadow-md">
        <h2 className="text-xl font-bold text-slate-900 mb-4">
          Ringkasan Koleksi
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {statistik.map((item) => (
            <div
              key={item.label}
              className="bg-slate-50 border border-slate-200 rounded-xl p-5 text-center"
            >
              <p className="text-4xl font-bold text-indigo-600">{item.nilai}</p>
              <p className="text-sm text-slate-500 mt-1">{item.label}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

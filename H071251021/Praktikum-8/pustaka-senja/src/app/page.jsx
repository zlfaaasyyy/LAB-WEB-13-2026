import Link from "next/link";
import Hero from "@/components/Hero";
import BerandaAktivitas from "@/components/BerandaAktivitas";
import { dataBuku } from "@/data/dataBuku";

export default function HomePage() {
  const totalKoleksi = dataBuku.length;
  const bukuTersedia = dataBuku.filter((buku) => buku.tersedia).length;
  const bukuDipinjam = dataBuku.filter((buku) => !buku.tersedia).length;

  return (
    <div className="space-y-10">
      <Hero
        nama="Pustaka Senja"
        slogan="Ruang baca dan perpustakaan komunitas terbuka bagi mahasiswa dan masyarakat sekitar untuk membaca, berdiskusi, dan memperluas wawasan."
        lokasi="Jl. Pendidikan No. 12 (Dekat Kampus) • Buka Setiap Hari: 09.00 - 21.00"
      />

      <section aria-labelledby="statistik-heading" className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 id="statistik-heading" className="text-xl font-bold text-white">
            Ringkasan Koleksi
          </h2>
          <span className="text-xs text-slate-400">
            Pembaruan data terkini
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-5">
            <p className="text-xs uppercase tracking-wider text-slate-400 font-medium">
              Total Koleksi
            </p>
            <p className="text-3xl font-bold text-white mt-2">
              {totalKoleksi}{" "}
              <span className="text-base font-normal text-slate-400">buku</span>
            </p>
            <p className="text-xs text-slate-500 mt-2">
              Koleksi terdaftar di Pustaka Senja
            </p>
          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-xl p-5">
            <p className="text-xs uppercase tracking-wider text-emerald-400 font-medium">
              Buku Tersedia
            </p>
            <p className="text-3xl font-bold text-emerald-400 mt-2">
              {bukuTersedia}{" "}
              <span className="text-base font-normal text-slate-400">buku</span>
            </p>
            <p className="text-xs text-slate-500 mt-2">
              Siap dibaca di tempat atau dipinjam
            </p>
          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-xl p-5">
            <p className="text-xs uppercase tracking-wider text-slate-400 font-medium">
              Sedang Dipinjam
            </p>
            <p className="text-3xl font-bold text-slate-300 mt-2">
              {bukuDipinjam}{" "}
              <span className="text-base font-normal text-slate-400">buku</span>
            </p>
            <p className="text-xs text-slate-500 mt-2">
              Saat ini berada di tangan peminjam
            </p>
          </div>
        </div>
      </section>

      {/* Komponen interaktif: Buku Favorit Tersimpan & Buku yang Diusulkan */}
      <BerandaAktivitas dataBuku={dataBuku} />

      <section className="bg-slate-900 border border-slate-800 rounded-xl p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <h3 className="text-base font-bold text-white">
            Ingin mencari buku favorit lainnya?
          </h3>
          <p className="text-sm text-slate-400 mt-0.5">
            Jelajahi seluruh daftar koleksi berdasarkan kategori atau usulkan judul buku baru.
          </p>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <Link
            href="/katalog"
            className="bg-blue-600 hover:bg-blue-500 text-white text-sm font-medium px-4 py-2 rounded-lg transition"
          >
            Buka Katalog
          </Link>
          <Link
            href="/usulan"
            className="bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 text-sm font-medium px-4 py-2 rounded-lg transition"
          >
            Usul Buku
          </Link>
        </div>
      </section>
    </div>
  );
}

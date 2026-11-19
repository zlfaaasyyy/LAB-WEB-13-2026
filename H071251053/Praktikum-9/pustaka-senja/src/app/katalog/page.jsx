import pool from "@/lib/db";
import DaftarKatalog from "@/components/DaftarKatalog";
import { tambahBuku } from "./actions";

export const dynamic = "force-dynamic";

const daftarKategori = ["Teknologi", "Fiksi", "Pengembangan Diri"];

export default async function KatalogPage() {
  const { rows } = await pool.query("SELECT * FROM buku ORDER BY id ASC");

  return (
    <section>
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-slate-900">Katalog Buku</h1>
        <p className="text-slate-500 mt-1">
          Jelajahi seluruh koleksi buku Pustaka Senja.
        </p>
      </div>

      <DaftarKatalog daftarBuku={rows} />

      <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-md mt-8">
        <h2 className="text-xl font-bold text-slate-900 mb-4">
          Tambah Buku Baru
        </h2>
        <form
          action={tambahBuku}
          className="grid grid-cols-1 sm:grid-cols-2 gap-4"
        >
          <div>
            <label className="block text-sm text-slate-700 mb-1">Judul</label>
            <input
              name="judul"
              type="text"
              placeholder="Judul buku"
              maxLength={150}
              required
              className="w-full bg-slate-50 border border-slate-300 rounded-lg px-4 py-2 text-slate-900 focus:outline-none focus:border-orange-400"
            />
          </div>
          <div>
            <label className="block text-sm text-slate-700 mb-1">Penulis</label>
            <input
              name="penulis"
              type="text"
              placeholder="Nama penulis"
              maxLength={100}
              required
              className="w-full bg-slate-50 border border-slate-300 rounded-lg px-4 py-2 text-slate-900 focus:outline-none focus:border-orange-400"
            />
          </div>
          <div>
            <label className="block text-sm text-slate-700 mb-1">Kategori</label>
            <select
              name="kategori"
              className="w-full bg-slate-50 border border-slate-300 rounded-lg px-4 py-2 text-slate-900 focus:outline-none focus:border-orange-400"
            >
              {daftarKategori.map((kategori) => (
                <option key={kategori} value={kategori}>
                  {kategori}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm text-slate-700 mb-1">
              Tahun Terbit
            </label>
            <input
              name="tahun"
              type="number"
              min="1"
              max="9999"
              placeholder="Contoh: 2020"
              required
              className="w-full bg-slate-50 border border-slate-300 rounded-lg px-4 py-2 text-slate-900 focus:outline-none focus:border-orange-400"
            />
          </div>
          <div className="sm:col-span-2">
            <label className="block text-sm text-slate-700 mb-1">
              Status Ketersediaan
            </label>
            <select
              name="tersedia"
              className="w-full bg-slate-50 border border-slate-300 rounded-lg px-4 py-2 text-slate-900 focus:outline-none focus:border-orange-400"
            >
              <option value="true">Tersedia</option>
              <option value="false">Sedang Dipinjam</option>
            </select>
          </div>
          <div className="sm:col-span-2">
            <label className="block text-sm text-slate-700 mb-1">Sinopsis</label>
            <textarea
              name="sinopsis"
              rows={3}
              placeholder="Tulis sinopsis singkat..."
              required
              className="w-full bg-slate-50 border border-slate-300 rounded-lg px-4 py-2 text-slate-900 focus:outline-none focus:border-orange-400"
            />
          </div>
          <div className="sm:col-span-2">
            <button
              type="submit"
              className="bg-orange-400 hover:bg-orange-500 text-white font-medium px-5 py-2.5 rounded-lg transition"
            >
              Tambah Buku
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}
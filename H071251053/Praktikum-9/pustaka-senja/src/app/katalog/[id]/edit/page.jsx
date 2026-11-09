import Link from "next/link";
import pool from "@/lib/db";
import { ubahBuku } from "../../actions";

export const dynamic = "force-dynamic";

const daftarKategori = ["Teknologi", "Fiksi", "Pengembangan Diri"];

export default async function EditBukuPage({ params }) {
  const { id } = await params;
  const idAngka = Number(id);
  const idValid =
    Number.isInteger(idAngka) && idAngka > 0 && idAngka < 2147483648;

  let buku = null;
  if (idValid) {
    const { rows } = await pool.query("SELECT * FROM buku WHERE id = $1", [
      idAngka,
    ]);
    buku = rows[0];
  }

  if (!buku) {
    return (
      <div className="text-center py-16">
        <h1 className="text-2xl font-bold text-red-500 mb-4">
          Buku dengan ID &quot;{id}&quot; tidak ditemukan!
        </h1>
        <Link href="/katalog" className="text-indigo-600 hover:underline">
          &larr; Kembali ke Katalog
        </Link>
      </div>
    );
  }

  return (
    <section className="max-w-lg mx-auto">
      <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-lg">
        <h1 className="text-2xl font-bold text-slate-900 mb-2">
          Edit Buku #{buku.id}
        </h1>
        <p className="text-slate-500 text-sm mb-6">
          Ubah informasi buku, lalu simpan perubahan.
        </p>

        <form action={ubahBuku} className="space-y-4">
          <input type="hidden" name="id" value={buku.id} />
          <div>
            <label className="block text-sm text-slate-700 mb-1">Judul</label>
            <input
              name="judul"
              type="text"
              defaultValue={buku.judul}
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
              defaultValue={buku.penulis}
              maxLength={100}
              required
              className="w-full bg-slate-50 border border-slate-300 rounded-lg px-4 py-2 text-slate-900 focus:outline-none focus:border-orange-400"
            />
          </div>
          <div>
            <label className="block text-sm text-slate-700 mb-1">Kategori</label>
            <select
              name="kategori"
              defaultValue={buku.kategori}
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
              defaultValue={buku.tahun}
              required
              className="w-full bg-slate-50 border border-slate-300 rounded-lg px-4 py-2 text-slate-900 focus:outline-none focus:border-orange-400"
            />
          </div>
          <div>
            <label className="block text-sm text-slate-700 mb-1">
              Status Ketersediaan
            </label>
            <select
              name="tersedia"
              defaultValue={buku.tersedia ? "true" : "false"}
              className="w-full bg-slate-50 border border-slate-300 rounded-lg px-4 py-2 text-slate-900 focus:outline-none focus:border-orange-400"
            >
              <option value="true">Tersedia</option>
              <option value="false">Sedang Dipinjam</option>
            </select>
          </div>
          <div>
            <label className="block text-sm text-slate-700 mb-1">Sinopsis</label>
            <textarea
              name="sinopsis"
              rows={4}
              defaultValue={buku.sinopsis}
              required
              className="w-full bg-slate-50 border border-slate-300 rounded-lg px-4 py-2 text-slate-900 focus:outline-none focus:border-orange-400"
            />
          </div>
          <div className="flex gap-3">
            <button
              type="submit"
              className="bg-orange-400 hover:bg-orange-500 text-white font-medium px-5 py-2.5 rounded-lg transition"
            >
              Simpan Perubahan
            </button>
            <Link
              href="/katalog"
              className="px-5 py-2.5 text-slate-600 hover:underline"
            >
              Batal
            </Link>
          </div>
        </form>
      </div>
    </section>
  );
}
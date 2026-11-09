import Link from "next/link";
import pool from "@/lib/db";

export const dynamic = "force-dynamic";

export default async function DetailBukuPage({ params }) {
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
          Kembali ke Katalog
        </Link>
      </div>
    );
  }

  return (
    <article className="max-w-3xl mx-auto bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-lg flex flex-col md:flex-row">
      {buku.id <= 9 ? (
        <img
          src={`/buku/${buku.id}.jpg`}
          alt={`Sampul buku ${buku.judul}`}
          className="w-full md:w-64 h-80 md:h-auto object-cover"
        />
      ) : (
        <div className="w-full md:w-64 h-80 md:h-auto bg-indigo-100 flex items-center justify-center text-indigo-400 text-sm font-medium">
          Belum ada sampul
        </div>
      )}
      <div className="p-6">
        <span className="text-xs bg-indigo-100 text-indigo-600 px-3 py-1 rounded-full font-medium">
          {buku.kategori} • {buku.tahun}
        </span>
        <h1 className="text-2xl font-bold text-slate-900 mt-3 mb-1">
          {buku.judul}
        </h1>
        <p className="text-slate-500 mb-3">Oleh {buku.penulis}</p>
        <span
          className={
            buku.tersedia
              ? "inline-block text-xs font-medium px-3 py-1 rounded-full bg-green-100 text-green-700 mb-4"
              : "inline-block text-xs font-medium px-3 py-1 rounded-full bg-red-100 text-red-700 mb-4"
          }
        >
          {buku.tersedia ? "Tersedia" : "Sedang Dipinjam"}
        </span>
        <h2 className="text-sm font-semibold text-slate-900 mb-1">Sinopsis</h2>
        <p className="text-slate-600 leading-relaxed mb-6">{buku.sinopsis}</p>
        <div className="flex flex-wrap gap-3">
          <Link
            href="/katalog"
            className="inline-block bg-orange-400 hover:bg-orange-500 text-white text-sm px-4 py-2 rounded-lg transition"
          >
            Kembali ke Katalog
          </Link>
          <Link
            href={`/katalog/${buku.id}/edit`}
            className="inline-block border border-slate-300 hover:bg-slate-100 text-slate-700 text-sm px-4 py-2 rounded-lg transition"
          >
            Edit Buku
          </Link>
        </div>
      </div>
    </article>
  );
}
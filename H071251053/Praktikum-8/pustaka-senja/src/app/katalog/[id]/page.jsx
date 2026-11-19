import Link from "next/link";
import dataBuku from "@/data/dataBuku";

export default async function DetailBukuPage({ params }) {
  const { id } = await params;
  const buku = dataBuku.find((item) => item.id === id);

  if (!buku) {
    return (
      <div className="text-center py-16">
        <h1 className="text-2xl font-bold text-red-500 mb-4">
          Buku dengan ID &quot;{id}&quot; tidak ditemukan!
        </h1>
        <Link href="/katalog" className="inline-block bg-orange-400 hover:bg-orange-500 text-white text-sm px-4 py-2 rounded-lg transition">
          Kembali ke Katalog
        </Link>
      </div>
    );
  }

  return (
    <article className="max-w-3xl mx-auto bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-lg flex flex-col md:flex-row">
      <img
        src={`/buku/${buku.id}.jpg`}
        alt={`Sampul buku ${buku.judul}`}
        className="w-full md:w-64 h-80 md:h-auto object-cover"
      />
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
        <Link
          href="/katalog"
          className="inline-block bg-orange-400 hover:bg-orange-500 text-white text-sm px-4 py-2 rounded-lg transition"
        >
          Kembali ke Katalog
        </Link>
      </div>
    </article>
  );
}

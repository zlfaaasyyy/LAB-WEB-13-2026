import Link from "next/link";
import { dataBuku } from "@/data/dataBuku";

export function generateStaticParams() {
  return dataBuku.map((buku) => ({
    id: buku.id,
  }));
}

export const dynamicParams = true;

export default async function DetailBukuPage({ params }) {
  const { id } = await params;
  const buku = dataBuku.find((item) => item.id === id);

  if (!buku) {
    return (
      <section className="max-w-xl mx-auto my-12 bg-slate-900 border border-slate-800 rounded-2xl p-8 text-center shadow-sm">
        <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-rose-950/80 border border-rose-800 flex items-center justify-center text-rose-400 text-lg">
          ✕
        </div>
        <h1 className="text-xl font-bold text-white mb-2">
          Buku Tidak Ditemukan
        </h1>
        <p className="text-sm text-slate-400 mb-6">
          Buku dengan ID <span className="text-rose-400 font-mono">&quot;{id}&quot;</span> tidak
          terdaftar dalam koleksi Pustaka Senja.
        </p>
        <Link
          href="/katalog"
          className="inline-flex items-center gap-1.5 bg-blue-600 hover:bg-blue-500 text-white text-sm font-medium px-4 py-2 rounded-lg transition"
        >
          <span>&larr;</span>
          <span>Kembali ke Katalog</span>
        </Link>
      </section>
    );
  }

  return (
    <article className="max-w-3xl mx-auto bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8 shadow-sm">
      <div className="flex flex-wrap items-center justify-between gap-3 mb-5 pb-5 border-b border-slate-800">
        <Link
          href="/katalog"
          className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-medium text-slate-400 hover:text-white transition"
        >
          <span>&larr;</span>
          <span>Kembali ke Katalog</span>
        </Link>

        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold px-2.5 py-1 rounded bg-slate-800 text-blue-400 border border-slate-700">
            {buku.kategori}
          </span>
          <span
            className={`text-xs font-medium px-2.5 py-1 rounded border ${
              buku.tersedia
                ? "bg-emerald-950/80 border-emerald-700 text-emerald-300"
                : "bg-slate-800 border-slate-700 text-slate-400"
            }`}
          >
            {buku.tersedia ? "Tersedia" : "Sedang Dipinjam"}
          </span>
        </div>
      </div>

      <div className="space-y-4">
        <div>
          <span className="text-xs font-mono text-slate-500">ID Buku: #{buku.id}</span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight mt-1">
            {buku.judul}
          </h1>
          <p className="text-sm text-slate-300 mt-1">
            Penulis: <span className="font-medium text-white">{buku.penulis}</span>
          </p>
          <p className="text-xs text-slate-400 mt-0.5">
            Tahun Publikasi: {buku.tahun}
          </p>
        </div>

        <div className="pt-4 border-t border-slate-800">
          <h2 className="text-sm font-semibold uppercase tracking-wider text-slate-400 mb-2">
            Sinopsis Buku
          </h2>
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            {buku.sinopsis}
          </p>
        </div>

        <div className="pt-6 border-t border-slate-800 flex items-center justify-between">
          <span className="text-xs text-slate-400">
            Status:{" "}
            <strong className={buku.tersedia ? "text-emerald-400" : "text-slate-300"}>
              {buku.tersedia
                ? "Buku dapat dibaca langsung di ruang baca atau dipinjam ke pengelola."
                : "Buku sedang dipinjam oleh anggota lain."}
            </strong>
          </span>

          <Link
            href="/katalog"
            className="bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-200 text-xs font-medium px-3.5 py-2 rounded-lg transition"
          >
            Tutup &amp; Kembali
          </Link>
        </div>
      </div>
    </article>
  );
}

import Link from "next/link";
import { dataBuku } from "@/data/dataBuku";

export default async function DetailBukuPage({ params }) {
  const { id } = await params;
  const buku = dataBuku.find((item) => item.id === id);

  if (!buku) {
    return (
      <div className="py-16 text-center">
        <h1 className="mb-4 font-serif text-2xl font-bold text-rose-700">
          Buku dengan ID &quot;{id}&quot; tidak ditemukan.
        </h1>
        <Link href="/katalog" className="text-[#a64f37] hover:underline">
          &larr; Kembali ke Katalog
        </Link>
      </div>
    );
  }

  return (
    <article className="mx-auto max-w-2xl border border-[#d9d0c4] bg-[#faf8f3] p-6 sm:p-8">
      <div className="flex flex-wrap items-center gap-3">
        <span className="bg-[#a64f37]/10 px-3 py-1 text-xs font-medium text-[#a64f37]">
          {buku.kategori}
        </span>
        <span
          className={
            buku.tersedia
              ? "rounded-full bg-emerald-800/10 px-3 py-1 text-xs font-medium text-emerald-800"
              : "rounded-full bg-rose-800/10 px-3 py-1 text-xs font-medium text-rose-800"
          }
        >
          {buku.tersedia ? "Tersedia" : "Sedang Dipinjam"}
        </span>
      </div>

      <h1 className="mt-4 font-serif text-4xl font-normal tracking-tight text-[#29251f]">{buku.judul}</h1>
      <p className="mt-1 text-[#766d62]">
        {buku.penulis}, terbit {buku.tahun}
      </p>

      <h2 className="mt-6 text-sm font-semibold uppercase tracking-wide text-[#8b8174]">Sinopsis</h2>
      <p className="mt-1 mb-8 leading-relaxed text-[#453d34]">{buku.sinopsis}</p>

      <Link
        href="/katalog"
        className="inline-block bg-[#eee8df] px-4 py-2 text-sm text-[#453d34] transition hover:bg-[#e2d7ca]"
      >
        &larr; Kembali ke Katalog
      </Link>
    </article>
  );
}

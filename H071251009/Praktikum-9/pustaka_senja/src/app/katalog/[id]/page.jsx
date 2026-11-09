import Link from "next/link";
import { notFound } from "next/navigation";
import { ambilBukuById } from "@/lib/queries";
import TombolHapus from "@/components/TombolHapus";

export const dynamic = "force-dynamic";

export default async function DetailBukuPage({ params }) {
  const { id } = await params;
  const buku = await ambilBukuById(id);

  if (!buku) {
    notFound();
  }

  return (
    <article className="mx-auto max-w-4xl rounded-[28px] border border-[#d9d0c4] bg-[#faf8f3] p-6 shadow-[0_18px_60px_rgba(78,51,37,0.12)] sm:p-8">
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <span className="rounded-full bg-[#f4e7dc] px-3 py-1 text-xs font-semibold uppercase tracking-[0.14em] text-[#a64f37]">
          {buku.kategori}
        </span>
        <span
          className={
            buku.tersedia
              ? "rounded-full bg-emerald-100 px-3 py-1 text-xs font-medium text-emerald-800"
              : "rounded-full bg-rose-100 px-3 py-1 text-xs font-medium text-rose-800"
          }
        >
          {buku.tersedia ? "Tersedia" : "Sedang Dipinjam"}
        </span>
      </div>

      <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
        <div>
          <h1 className="font-serif text-4xl font-semibold tracking-tight text-[#29251f]">
            {buku.judul}
          </h1>
          <p className="mt-3 text-lg text-[#5b5349]">oleh {buku.penulis}</p>

          <div className="mt-6 space-y-3 text-sm text-[#5b5349]">
            <p>
              <span className="font-semibold text-[#29251f]">Tahun terbit:</span> {buku.tahun}
            </p>
            <p>
              <span className="font-semibold text-[#29251f]">Status:</span>{" "}
              {buku.tersedia ? "Buku siap dipinjam" : "Belum tersedia untuk dipinjam"}
            </p>
          </div>

          <div className="mt-8 rounded-2xl border border-[#e3dbd0] bg-[#f3efe9] p-5">
            <h2 className="text-lg font-semibold text-[#29251f]">Sinopsis</h2>
            <p className="mt-3 leading-7 text-[#5b5349]">{buku.sinopsis}</p>
          </div>
        </div>

        <aside className="rounded-2xl border border-[#e3dbd0] bg-[#f7f2ec] p-5">
          <h2 className="text-lg font-semibold text-[#29251f]">Aksi</h2>
          <div className="mt-4 space-y-3">
            <Link
              href={`/katalog/${buku.id}/edit`}
              className="block rounded-lg bg-[#a64f37] px-4 py-2.5 text-center text-sm font-medium text-white transition hover:bg-[#873d2b]"
            >
              Edit Buku
            </Link>
            <Link
              href="/katalog"
              className="block rounded-lg border border-[#d0c5b7] px-4 py-2.5 text-center text-sm font-medium text-[#453d34] transition hover:bg-[#eee8df]"
            >
              Kembali ke Katalog
            </Link>
            <div className="pt-2">
              <TombolHapus id={buku.id} judul={buku.judul} />
            </div>
          </div>
        </aside>
      </div>
    </article>
  );
}
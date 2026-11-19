import Link from "next/link";
import { dataBuku, warnaKategori } from "@/data/dataBuku";

export default async function DetailBukuPage({ params }) {
  const { id } = await params;
  const buku = dataBuku.find((item) => item.id === id);

  if (!buku) {
    return (
      <div className="py-16 text-center">
        <h1 className="text-2xl font-bold text-rose-300">
          Buku dengan ID &quot;{id}&quot; tidak ditemukan
        </h1>
        <p className="mt-2 text-mute">Periksa kembali alamat yang kamu buka, atau pilih buku dari katalog.</p>
        <Link
          href="/katalog"
          className="mt-6 inline-block rounded-lg bg-lamp px-5 py-2.5 font-medium text-dusk-950 transition hover:brightness-110"
        >
          Kembali ke Katalog
        </Link>
      </div>
    );
  }

  return (
    <article className="mx-auto max-w-2xl overflow-hidden rounded-2xl border border-dusk-700 bg-dusk-900">
      <div className={`p-8 pt-20 ${warnaKategori[buku.kategori] ?? "bg-dusk-700"}`}>
        <h1 className=" text-3xl font-bold leading-tight">{buku.judul}</h1>
        <p className="mt-1 text-paper/80">{buku.penulis}</p>
      </div>

      <div className="p-8">
        <dl className="grid grid-cols-3 gap-4 text-sm">
          <div>
            <dt className="text-mute">Kategori</dt>
            <dd className="mt-1">{buku.kategori}</dd>
          </div>
          <div>
            <dt className="text-mute">Tahun terbit</dt>
            <dd className="mt-1">{buku.tahun}</dd>
          </div>
          <div>
            <dt className="text-mute">Status</dt>
            <dd className="mt-1">
              <span
                className={
                  buku.tersedia
                    ? "rounded-full bg-emerald-500/15 px-3 py-1 text-xs font-medium text-emerald-300"
                    : "rounded-full bg-rose-500/15 px-3 py-1 text-xs font-medium text-rose-300"
                }
              >
                {buku.tersedia ? "Tersedia" : "Sedang Dipinjam"}
              </span>
            </dd>
          </div>
        </dl>

        <h2 className="mt-8 text-lg font-bold">Sinopsis</h2>
        <p className="mt-2 leading-relaxed text-paper/90">{buku.sinopsis}</p>

        <Link
          href="/katalog"
          className="mt-8 inline-block rounded-lg border border-dusk-700 px-4 py-2 text-sm transition hover:bg-dusk-800"
        >
          Kembali ke Katalog
        </Link>
      </div>
    </article>
  );
}

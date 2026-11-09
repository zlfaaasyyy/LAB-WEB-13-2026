import Link from "next/link";
import pool from "@/lib/db";
import Status from "@/components/Status";
import TombolHapus from "@/components/TombolHapus";

export default async function DetailBuku({ params, searchParams }) {
  const { id } = await params;
  const search = await searchParams;

  let buku = null;

  if (id) {
    try {
      const hasil = await pool.query("SELECT * FROM buku WHERE id = $1", [id]);
      buku = hasil.rows[0];
    } catch {
      buku = null;
    }
  }

  if (!buku) {
    return (
      <div className="mx-auto max-w-md py-20 text-center">
        <h1 className="mb-6 text-xl font-bold text-(--merah)">
          {`Buku dengan ID "${id}" tidak ditemukan!`}
        </h1>
        <Link
          href="/katalog"
          className="inline-block rounded-full bg-(--merah) px-6 py-2.5 text-sm font-semibold text-white shadow-xs transition hover:bg-(--maroon)"
        >
          Kembali ke Katalog
        </Link>
      </div>
    );
  }

  let pesanSukses = null;
  if (search) {
    if (search.sukses === "edit") {
      pesanSukses = (
        <div className="mb-6 rounded-xl border border-emerald-200 bg-emerald-50 p-4 text-sm font-bold text-emerald-800 shadow-xs">
          Perubahan berhasil disimpan!
        </div>
      );
    }
  }

  return (
    <div className="mx-auto max-w-2xl overflow-hidden rounded-2xl border border-(--pink--muda) bg-white shadow-md">
      {/* Garis pembuat struktur pembungkus atas (warna solid maroon, tanpa gradient) */}
      <div className="h-2 bg-(--maroon)"></div>


      <div className="p-6 md:p-8">
        {pesanSukses}

        <div className="mb-4 flex flex-wrap items-center gap-2">
          <span className="rounded-full bg-(--pink--muda) px-3 py-1 text-xs font-semibold text-(--merah)">
            {buku.kategori}
          </span>
          <Status tersedia={buku.tersedia} />
        </div>

        <h1 className="text-2xl font-bold leading-tight text-(--maroon) md:text-3xl">
          {buku.judul}
        </h1>
        <p className="mt-2 text-sm font-medium text-(--coklat)">
          {buku.penulis} <span className="mx-1 text-gray-300">•</span> Terbit: {buku.tahun}
        </p>

        <div className="my-6 border-t border-gray-100 pt-5">
          <h2 className="text-xs font-bold uppercase tracking-wider text-(--merah)">
            Sinopsis
          </h2>
          <p className="mt-2 text-sm leading-relaxed text-(--coklat)">
            {buku.sinopsis}
          </p>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-4 border-t border-gray-100 pt-5">
          <Link
            href="/katalog"
            className="rounded-full bg-(--merah) px-5 py-2.5 text-sm font-semibold text-white shadow-xs transition hover:bg-(--maroon)"
          >
            ← Kembali ke Katalog
          </Link>

          <div className="flex items-center gap-3">
            <Link
              href={"/katalog/" + buku.id + "/edit"}
              className="rounded-full border border-(--merah) bg-white px-5 py-2.5 text-sm font-semibold text-(--maroon) transition hover:bg-(--pink--muda)"
            >
              ✎ Edit Buku
            </Link>
            <TombolHapus
              id={buku.id}
              judul={buku.judul}
              className="cursor-pointer rounded-full border border-red-300 bg-white px-5 py-2.5 text-sm font-semibold text-red-600 transition hover:bg-red-50"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
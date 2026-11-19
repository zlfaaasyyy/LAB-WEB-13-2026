import Link from "next/link";

export default function KatalogNotFound() {
  return (
    <div className="py-16 text-center">
      <h1 className="mb-4 text-2xl font-bold text-rose-300">
        Buku tidak ditemukan.
      </h1>
      <p className="mb-6 text-indigo-200">
        Buku yang Anda cari tidak ada atau sudah dihapus.
      </p>
      <Link href="/katalog" className="text-amber-300 hover:underline">
        &larr; Kembali ke Katalog
      </Link>
    </div>
  );
}

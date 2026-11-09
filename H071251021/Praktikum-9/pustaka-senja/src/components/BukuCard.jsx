"use client";

import Link from "next/link";
import { useOptimistic } from "react";
import { toggleFavorit } from "@/app/katalog/favorit-actions";
import { hueKategori } from "@/lib/kategori";
import TombolHapus from "@/components/TombolHapus";

export default function BukuCard({ buku, favorit = false, tampilAksi = false }) {
  const [suka, setSuka] = useOptimistic(favorit, (_lama, baru) => baru);

  async function aksiFavorit(formData) {
    setSuka(!suka);
    await toggleFavorit(formData);
  }

  return (
    <article className="entri" style={{ "--h": hueKategori(buku.kategori) }}>
      <div className="entri-bilah" aria-hidden="true" />
      <div className="entri-isi">
        <div className="entri-meta">
          <span className="chip chip-kat">{buku.kategori}</span>
          <span className={`chip ${buku.tersedia ? "chip-ok" : "chip-pinjam"}`}>
            {buku.tersedia ? "Tersedia" : "Sedang Dipinjam"}
          </span>
        </div>
        <h3 className="entri-judul">{buku.judul}</h3>
        <p className="t-kabut" style={{ fontSize: "0.95rem" }}>Penulis: {buku.penulis}</p>
        <p className="t-redup" style={{ fontSize: "0.85rem" }}>Tahun terbit: {buku.tahun}</p>

        <div className="entri-aksi">
          <form action={aksiFavorit}>
            <input type="hidden" name="id" value={buku.id} />
            <button
              type="submit"
              className="suka"
              aria-pressed={suka}
              aria-label={suka ? `Hapus ${buku.judul} dari favorit` : `Tambah ${buku.judul} ke favorit`}
            >
              <span aria-hidden="true">{suka ? "❤️" : "🤍"}</span>
              <span>{suka ? "Favorit" : "Suka"}</span>
            </button>
          </form>
          <Link href={`/katalog/${buku.id}`} className="tautan">Lihat Detail</Link>
          {tampilAksi && (
            <>
              <Link href={`/katalog/${buku.id}/edit`} className="aksi-teks">Edit</Link>
              <TombolHapus id={buku.id} judul={buku.judul} />
            </>
          )}
        </div>
      </div>
    </article>
  );
}

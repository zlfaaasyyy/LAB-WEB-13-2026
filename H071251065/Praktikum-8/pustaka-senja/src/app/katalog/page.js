"use client";

import { useState } from "react";
import BukuCard from "@/components/BukuCard";
import { dataBuku, daftarKategori } from "@/data/dataBuku";

export default function KatalogPage() {
  const [kategoriAktif, setKategoriAktif] = useState("Semua");

  const bukuTampil =
    kategoriAktif === "Semua"
      ? dataBuku
      : dataBuku.filter((buku) => buku.kategori === kategoriAktif);

  return (
    <section>
      <h1 className="text-3xl font-bold">Katalog Buku</h1>
      <p className="mt-1 text-mute">Pilih kategori untuk menyaring koleksi.</p>

      <div className="mt-6 flex flex-wrap gap-2">
        {daftarKategori.map((kategori) => (
          <button
            key={kategori}
            type="button"
            onClick={() => setKategoriAktif(kategori)}
            aria-pressed={kategoriAktif === kategori}
            className={
              kategoriAktif === kategori
                ? "rounded-full bg-lamp px-4 py-1.5 text-sm font-medium text-dusk-950"
                : "rounded-full border border-dusk-700 px-4 py-1.5 text-sm text-mute transition hover:text-paper hover:shadow-lg hover:shadow-lamp/20 "
            }
          >
            {kategori}
          </button>
        ))}
      </div>

      <p className="mt-4 text-sm text-mute">Menampilkan {bukuTampil.length} buku</p>

      <div className="mt-4 grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3">
        {bukuTampil.map((buku) => (
          <BukuCard
            key={buku.id}
            id={buku.id}
            judul={buku.judul}
            penulis={buku.penulis}
            kategori={buku.kategori}
            tahun={buku.tahun}
            tersedia={buku.tersedia}
          />
        ))}
      </div>
    </section>
  );
}

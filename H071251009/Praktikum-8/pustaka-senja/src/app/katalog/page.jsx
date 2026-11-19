"use client";

import { useState } from "react";
import BukuCard from "@/components/BukuCard";
import { dataBuku } from "@/data/dataBuku";

const daftarFilter = ["Semua", "Teknologi", "Fiksi", "Pengembangan Diri"];

export default function KatalogPage() {
  const [kategoriAktif, setKategoriAktif] = useState("Semua");
  const [kataKunci, setKataKunci] = useState("");

  // Filter berdasarkan kategori dan kata kunci pencarian (judul/nama buku)
  const bukuTampil = dataBuku.filter((buku) => {
    const sesuaiKategori =
      kategoriAktif === "Semua" || buku.kategori === kategoriAktif;
    const sesuaiPencarian = buku.judul
      .toLowerCase()
      .includes(kataKunci.toLowerCase());
    return sesuaiKategori && sesuaiPencarian;
  });

  return (
    <section>
      <div className="mb-6">
        <h1 className="font-serif text-4xl font-normal tracking-tight text-[#29251f]">
          Katalog Buku
        </h1>
        <p className="mt-2 text-[#766d62]">
          Menampilkan {bukuTampil.length} dari {dataBuku.length} buku.
        </p>
      </div>

      {/* Input Pencarian */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Cari judul buku..."
          value={kataKunci}
          onChange={(e) => setKataKunci(e.target.value)}
          className="w-full max-w-md rounded-md border border-[#d0c5b7] px-4 py-2 text-sm text-[#29251f] placeholder-[#9e9488] focus:border-[#a64f37] focus:outline-none"
        />
      </div>

      {/* Filter Kategori */}
      <div className="mb-6 flex flex-wrap gap-2">
        {daftarFilter.map((kategori) => (
          <button
            key={kategori}
            type="button"
            onClick={() => setKategoriAktif(kategori)}
            aria-pressed={kategoriAktif === kategori}
            className={
              kategoriAktif === kategori
                ? "border border-[#a64f37] bg-[#a64f37] px-4 py-1.5 text-sm font-semibold text-white"
                : "border border-[#d0c5b7] px-4 py-1.5 text-sm text-[#5b5349] transition hover:bg-[#e9e0d5]"
            }
          >
            {kategori}
          </button>
        ))}
      </div>

      {/* Daftar Buku atau Pesan Kosong */}
      {bukuTampil.length > 0 ? (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3">
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
      ) : (
        <div className="py-12 text-center text-[#766d62]">
          <p>Tidak ada buku yang ditemukan dengan kata kunci "{kataKunci}".</p>
        </div>
      )}
    </section>
  );
}
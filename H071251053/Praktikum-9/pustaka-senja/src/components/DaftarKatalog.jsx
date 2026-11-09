"use client";

import { useState } from "react";
import BukuCard from "@/components/BukuCard";

const daftarKategori = ["Semua", "Teknologi", "Fiksi", "Pengembangan Diri"];

export default function DaftarKatalog({ daftarBuku }) {
  const [kategoriAktif, setKategoriAktif] = useState("Semua");

  const bukuTampil =
    kategoriAktif === "Semua"
      ? daftarBuku
      : daftarBuku.filter((buku) => buku.kategori === kategoriAktif);

  return (
    <div>
      <div className="flex flex-wrap gap-2 mb-6">
        {daftarKategori.map((kategori) => (
          <button
            key={kategori}
            onClick={() => setKategoriAktif(kategori)}
            className={
              kategoriAktif === kategori
                ? "bg-slate-900 text-white text-sm font-medium px-4 py-2 rounded-lg transition"
                : "bg-white border border-slate-300 text-slate-600 hover:bg-slate-200 text-sm px-4 py-2 rounded-lg transition"
            }
          >
            {kategori}
          </button>
        ))}
      </div>

      {bukuTampil.length === 0 && (
        <p className="text-slate-500">Belum ada buku pada kategori ini.</p>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
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
    </div>
  );
}
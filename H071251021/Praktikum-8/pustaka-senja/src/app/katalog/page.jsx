"use client";

import { useState } from "react";
import BukuCard from "@/components/BukuCard";
import { dataBuku } from "@/data/dataBuku";

const kategoriList = ["Semua", "Teknologi", "Fiksi", "Pengembangan Diri"];

export default function KatalogPage() {
  const [kategoriAktif, setKategoriAktif] = useState("Semua");

  const bukuTerfilter =
    kategoriAktif === "Semua"
      ? dataBuku
      : dataBuku.filter((buku) => buku.kategori === kategoriAktif);

  return (
    <section className="space-y-6">
      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
          Katalog Buku
        </h1>
        <p className="text-sm text-slate-400 mt-1">
          Daftar koleksi buku utama di Pustaka Senja. Silakan filter sesuai kategori yang Anda minati.
        </p>
      </div>

      <div className="flex flex-wrap items-center gap-2 pt-1">
        {kategoriList.map((kategori) => {
          const isActive = kategoriAktif === kategori;
          return (
            <button
              key={kategori}
              type="button"
              onClick={() => setKategoriAktif(kategori)}
              className={`text-xs sm:text-sm font-medium px-3.5 py-1.5 rounded-lg border transition ${
                isActive
                  ? "bg-blue-600 border-blue-500 text-white"
                  : "bg-slate-900 border-slate-800 text-slate-300 hover:bg-slate-800 hover:text-white"
              }`}
            >
              {kategori}
            </button>
          );
        })}
      </div>

      <div className="flex items-center justify-between text-xs text-slate-400 pt-2 border-t border-slate-800/80">
        <span>
          Menampilkan <strong className="text-slate-200">{bukuTerfilter.length}</strong> buku
          {kategoriAktif !== "Semua" && (
            <span> pada kategori <strong className="text-blue-400">{kategoriAktif}</strong></span>
          )}
        </span>
      </div>

      {bukuTerfilter.length === 0 ? (
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-8 text-center text-slate-400 text-sm">
          Tidak ada buku pada kategori ini.
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
          {bukuTerfilter.map((buku) => (
            <BukuCard key={buku.id} buku={buku} />
          ))}
        </div>
      )}
    </section>
  );
}


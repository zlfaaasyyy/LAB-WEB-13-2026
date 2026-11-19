"use client";

import { useState } from "react";
import Link from "next/link";
import TombolHapus from "@/components/TombolHapus";

function BukuCard({ id, judul, penulis, kategori, tahun, tersedia }) {
  const [favorit, setFavorit] = useState(false);

  function cekStatus() {
    if (tersedia) {
      return "rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-700 shrink-0";
    } else {
      return "rounded-full bg-red-100 px-3 py-1 text-xs font-semibold text-red-700 shrink-0";
    }
  }

  function cekFavorit() {
    if (favorit) {
      return "cursor-pointer rounded-full border border-(--merah) bg-(--merah) px-4 py-2 text-sm font-semibold text-white transition hover:bg-(--maroon) motion-safe:hover:scale-105 motion-safe:active:scale-95";
    } else {
      return "cursor-pointer rounded-full border border-(--merah) bg-white px-4 py-2 text-sm font-semibold text-(--maroon) transition hover:bg-(--pink) motion-safe:hover:scale-105 motion-safe:active:scale-95";
    }
  }

  function teksStatus() {
    if (tersedia) {
      return "Tersedia";
    } else {
      return "Sedang Dipinjam";
    }
  }

  function teksFavorit() {
    if (favorit) {
      return "♥ Favorite";
    } else {
      return "♡ Favorite";
    }
  }

  return (
    <div className="flex h-full flex-col justify-between rounded-2xl border border-(--merah) bg-white p-5 shadow-md transition duration-300 hover:border-(--merah) hover:shadow-xl motion-safe:hover:-translate-y-1.5">
      {/* 1. Header (Persis Desain Asli): Kategori di Kiri, Status Badge di Kanan Atas */}
      <div className="mb-3 flex items-center justify-between gap-2">
        <span className="text-xs font-semibold text-(--merah)">
          {kategori}
        </span>
        <span className={cekStatus()}>
          {teksStatus()}
        </span>
      </div>

      {/* 2. Isi Utama: Judul, Penulis, Tahun (Ruang Bernapas Bebas) */}
      <div className="flex-1">
        <h3 className="text-lg font-bold text-(--maroon)">{judul}</h3>
        <p className="mt-1 text-sm text-(--coklat)">{penulis}</p>
        <p className="mt-1 text-sm text-(--coklat)">Terbit: {tahun}</p>
      </div>

      {/* 3. Aksi Admin Mini (Edit | Hapus) Rapi di Atas Garis Footer */}
      <div className="mb-2 mt-4 flex items-center justify-end gap-2.5 text-xs font-semibold">
        <Link
          href={"/katalog/" + id + "/edit"}
          className="text-(--maroon) hover:underline"
        >
          ✎ Edit
        </Link>
        <span className="text-gray-300">|</span>
        <TombolHapus
          id={id}
          judul={judul}
          className="cursor-pointer text-red-600 hover:underline"
        />
      </div>

      {/* 4. Footer Bawah (Persis Desain Asli): Favorite di Kiri & Lihat Detail di Kanan */}
      <div className="flex items-center justify-between border-t border-(--pink--muda) pt-3">
        <button
          type="button"
          onClick={() => setFavorit(!favorit)}
          className={cekFavorit()}
        >
          {teksFavorit()}
        </button>

        <Link
          href={"/katalog/" + id}
          className="text-sm font-semibold text-(--merah) hover:underline"
        >
          Lihat Detail
        </Link>
      </div>
    </div>
  );
}

export default BukuCard;
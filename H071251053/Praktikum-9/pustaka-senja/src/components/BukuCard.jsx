"use client";

import { useState } from "react";
import Link from "next/link";
import TombolHapus from "@/components/TombolHapus";

function BukuCard({ id, judul, penulis, kategori, tahun, tersedia }) {
  const [favorit, setFavorit] = useState(false);

  return (
    <article className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-md flex flex-col justify-between">
      <div>
        {id <= 9 ? (
          <img
            src={`/buku/${id}.jpg`}
            alt={`Sampul buku ${judul}`}
            className="w-full h-auto"
          />
        ) : (
          <div className="w-full h-64 bg-indigo-100 flex items-center justify-center text-indigo-400 text-sm font-medium">
            Belum ada sampul
          </div>
        )}
        <div className="p-4">
          <span className="text-xs text-indigo-500 font-medium">
            {kategori} • {tahun}
          </span>
          <h3 className="text-lg font-semibold text-slate-900 mt-1">{judul}</h3>
          <p className="text-sm text-slate-500 mb-3">{penulis}</p>
          <span
            className={
              tersedia
                ? "inline-block text-xs font-medium px-3 py-1 rounded-full bg-green-100 text-green-700"
                : "inline-block text-xs font-medium px-3 py-1 rounded-full bg-red-100 text-red-700"
            }
          >
            {tersedia ? "Tersedia" : "Sedang Dipinjam"}
          </span>
        </div>
      </div>
      <div className="px-4 pb-4 border-t border-slate-100 pt-3 space-y-3">
        <div className="flex items-center justify-between">
          <button
            onClick={() => setFavorit(!favorit)}
            className={
              favorit
                ? "bg-rose-300 text-black text-sm px-3 py-1.5 rounded-lg transition"
                : "bg-slate-100 hover:bg-slate-200 text-slate-700 text-sm px-3 py-1.5 rounded-lg transition"
            }
          >
            {favorit ? "❤ Favorit" : "♡ Favorit"}
          </button>
          <Link
            href={`/katalog/${id}`}
            className="bg-orange-400 text-white text-sm px-3 py-1.5 rounded-lg transition"
          >
            Lihat Detail
          </Link>
        </div>
        <div className="flex items-center gap-4 text-sm">
          <Link
            href={`/katalog/${id}/edit`}
            className="text-blue-500 hover:underline"
          >
            Edit
          </Link>
          <TombolHapus id={id} judul={judul} />
        </div>
      </div>
    </article>
  );
}

export default BukuCard;
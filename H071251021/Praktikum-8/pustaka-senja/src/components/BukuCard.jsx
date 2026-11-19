"use client";

import { useSyncExternalStore } from "react";
import Link from "next/link";

function subscribeFavorit(callback) {
  window.addEventListener("storage", callback);
  window.addEventListener("pustaka_favorit_updated", callback);
  return () => {
    window.removeEventListener("storage", callback);
    window.removeEventListener("pustaka_favorit_updated", callback);
  };
}

function getFavoritSnapshot() {
  return localStorage.getItem("pustaka_senja_favorit") || "[]";
}

function getServerFavoritSnapshot() {
  return "[]";
}

export default function BukuCard({
  buku,
  id: propId,
  judul: propJudul,
  penulis: propPenulis,
  kategori: propKategori,
  tahun: propTahun,
  tersedia: propTersedia,
  onFavoritChange,
}) {
  const id = buku?.id ?? propId;
  const judul = buku?.judul ?? propJudul;
  const penulis = buku?.penulis ?? propPenulis;
  const kategori = buku?.kategori ?? propKategori;
  const tahun = buku?.tahun ?? propTahun;
  const tersedia = buku?.tersedia ?? propTersedia;

  const favoritRaw = useSyncExternalStore(
    subscribeFavorit,
    getFavoritSnapshot,
    getServerFavoritSnapshot
  );

  let isFavorit = false;
  try {
    const list = JSON.parse(favoritRaw);
    if (Array.isArray(list)) {
      isFavorit = list.includes(id);
    }
  } catch (err) {
    console.error("Gagal membaca status favorit:", err);
  }

  function handleToggleFavorit() {
    try {
      const stored = localStorage.getItem("pustaka_senja_favorit");
      let ids = stored ? JSON.parse(stored) : [];
      if (!Array.isArray(ids)) ids = [];

      const nextStatus = !isFavorit;
      if (nextStatus) {
        if (!ids.includes(id)) ids.push(id);
      } else {
        ids = ids.filter((itemId) => itemId !== id);
      }

      localStorage.setItem("pustaka_senja_favorit", JSON.stringify(ids));
      window.dispatchEvent(new Event("pustaka_favorit_updated"));

      if (onFavoritChange) {
        onFavoritChange(id, nextStatus);
      }
    } catch (err) {
      console.error("Gagal memperbarui status favorit:", err);
    }
  }

  return (
    <article className="bg-slate-900 border border-slate-800 rounded-xl p-5 flex flex-col justify-between hover:border-slate-700 transition">
      <div>
        <div className="flex items-start justify-between gap-2 mb-3">
          <span className="text-xs font-semibold px-2.5 py-1 rounded bg-slate-800 text-blue-400 border border-slate-700">
            {kategori}
          </span>
          <span
            className={`text-xs font-medium px-2.5 py-1 rounded border ${
              tersedia
                ? "bg-emerald-950/80 border-emerald-700 text-emerald-300"
                : "bg-slate-800 border-slate-700 text-slate-400"
            }`}
          >
            {tersedia ? "Tersedia" : "Sedang Dipinjam"}
          </span>
        </div>

        <h3 className="text-lg font-bold text-white mb-1 line-clamp-2">
          {judul}
        </h3>
        <p className="text-sm text-slate-400 mb-1">
          Penulis: <span className="text-slate-300">{penulis}</span>
        </p>
        <p className="text-xs text-slate-500 mb-4">Tahun Terbit: {tahun}</p>
      </div>

      <div className="pt-4 border-t border-slate-800 flex items-center justify-between gap-2">
        <button
          type="button"
          onClick={handleToggleFavorit}
          className={`text-xs font-medium px-3 py-1.5 rounded-lg border transition flex items-center gap-1.5 ${
            isFavorit
              ? "bg-rose-950/60 border-rose-700 text-rose-300"
              : "bg-slate-800 border-slate-700 text-slate-300 hover:bg-slate-700"
          }`}
          aria-label={isFavorit ? "Hapus dari favorit" : "Tambah ke favorit"}
        >
          <span>{isFavorit ? "❤️" : "🤍"}</span>
          <span>{isFavorit ? "Favorit" : "Suka"}</span>
        </button>

        <Link
          href={`/katalog/${id}`}
          className="text-xs font-semibold text-blue-400 hover:text-blue-300 hover:underline inline-flex items-center gap-1 transition"
        >
          <span>Lihat Detail</span>
          <span>&rarr;</span>
        </Link>
      </div>
    </article>
  );
}

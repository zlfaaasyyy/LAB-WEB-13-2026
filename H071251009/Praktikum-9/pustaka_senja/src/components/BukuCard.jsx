"use client";

import { useState } from "react";
import Link from "next/link";

function BukuCard({ id, judul, penulis, kategori, tahun, tersedia }) {
  const [favorit, setFavorit] = useState(false);

  return (
    <article className="group flex h-full flex-col justify-between rounded-2xl border border-[#d9d0c4] bg-[#fdfaf6] p-5 shadow-sm transition duration-200 hover:-translate-y-1 hover:border-[#b99984] hover:shadow-[0_16px_40px_rgba(85,62,44,0.12)]">
      <div>
        <div className="flex items-start justify-between gap-3">
          <span className="rounded-full bg-[#f4e7dc] px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-[#a64f37]">
            {kategori}
          </span>
          <span
            className={
              tersedia
                ? "rounded-full bg-emerald-100 px-2.5 py-1 text-[10px] font-medium text-emerald-800"
                : "rounded-full bg-rose-100 px-2.5 py-1 text-[10px] font-medium text-rose-800"
            }
          >
            {tersedia ? "Tersedia" : "Dipinjam"}
          </span>
        </div>

        <h3 className="mt-4 font-serif text-2xl font-semibold leading-tight text-[#2b241f]">
          {judul}
        </h3>
        <p className="mt-2 text-sm text-[#5d534d]">{penulis}</p>
        <p className="mt-1 text-sm text-[#857a71]">Terbit {tahun}</p>
      </div>

      <div className="mt-5 flex items-center justify-between gap-3 border-t border-[#e7ddd0] pt-4">
        <button
          type="button"
          onClick={() => setFavorit(!favorit)}
          aria-pressed={favorit}
          className={
            favorit
              ? "rounded-lg bg-[#a64f37] px-3 py-2 text-sm font-medium text-white shadow-sm transition"
              : "rounded-lg bg-[#efe7df] px-3 py-2 text-sm font-medium text-[#453d34] transition hover:bg-[#e7dacb]"
          }
        >
          {favorit ? "★ Tersimpan" : "☆ Simpan"}
        </button>

        <Link
          href={`/katalog/${id}`}
          className="text-sm font-medium text-[#a64f37] transition hover:text-[#7d3a2a] hover:underline"
        >
          Lihat Detail
        </Link>
      </div>
    </article>
  );
}

export default BukuCard;

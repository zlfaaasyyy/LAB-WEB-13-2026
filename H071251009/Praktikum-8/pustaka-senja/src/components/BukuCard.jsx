"use client";

import { useState } from "react";
import Link from "next/link";

function BukuCard({ id, judul, penulis, kategori, tahun, tersedia }) {
  const [favorit, setFavorit] = useState(false);

  return (
    <article className="flex flex-col justify-between border border-[#d9d0c4] bg-[#faf8f3] p-5 transition hover:-translate-y-1 hover:border-[#b8aa99]">
      <div>
        <div className="flex items-start justify-between gap-2">
          <span className="text-xs font-medium uppercase tracking-wide text-[#a64f37]">{kategori}</span>
          <span
            className={
              tersedia
                ? "rounded-full bg-emerald-800/10 px-2.5 py-0.5 text-xs font-medium text-emerald-800"
                : "rounded-full bg-rose-800/10 px-2.5 py-0.5 text-xs font-medium text-rose-800"
            }
          >
            {tersedia ? "Tersedia" : "Sedang Dipinjam"}
          </span>
        </div>
        <h3 className="mt-2 font-serif text-xl font-semibold text-[#29251f]">{judul}</h3>
        <p className="text-sm text-[#5b5349]">{penulis}</p>
        <p className="mt-1 text-sm text-[#8b8174]">Terbit {tahun}</p>
      </div>

      <div className="mt-4 flex items-center justify-between border-t border-[#e3dbd0] pt-3">
        <button
          type="button"
          onClick={() => setFavorit(!favorit)}
          aria-pressed={favorit}
          className={
            favorit
              ? "bg-[#a64f37] px-3 py-1.5 text-sm font-medium text-white transition"
              : "bg-[#eee8df] px-3 py-1.5 text-sm text-[#453d34] transition hover:bg-[#e2d7ca]"
          }
        >
          {favorit ? "★ Tersimpan" : "☆ Simpan"}
        </button>
        <Link
          href={`/katalog/${id}`}
          className="text-sm text-[#a64f37] hover:underline"
        >
          Lihat Detail
        </Link>
      </div>
    </article>
  );
}

export default BukuCard;

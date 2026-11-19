"use client";

import { useState } from "react";
import Link from "next/link";
import { warnaKategori } from "@/data/dataBuku";

function BukuCard({ id, judul, penulis, kategori, tahun, tersedia }) {
  const [favorit, setFavorit] = useState(false);

  return (
    <article className="group flex flex-col overflow-hidden rounded-2xl border border-line bg-surface transition duration-300 hover:border-berry/40 hover:shadow-xl hover:shadow-berry/20 motion-safe:hover:-translate-y-1.5">
      <div className="h-32 overflow-hidden">
        <div
          className={`flex h-full items-end p-4 transition duration-500 group-hover:brightness-110 ${
            warnaKategori[kategori] ?? "bg-peri"
          }`}
        >
          <p className="text-lg font-bold leading-snug text-white">{judul}</p>
        </div>
      </div>

      <div className="flex flex-1 flex-col gap-3 p-4">
        <div>
          <p className="text-sm text-ink transition-colors group-hover:text-berry">{penulis}</p>
          <p className="text-xs text-mute">
            {kategori}, terbit {tahun}
          </p>
        </div>

        <span
          className={
            tersedia
              ? "w-fit rounded-full bg-emerald-500/10 px-3 py-1 text-xs font-medium text-emerald-700"
              : "w-fit rounded-full bg-rose-500/10 px-3 py-1 text-xs font-medium text-rose-700"
          }
        >
          {tersedia ? "Tersedia" : "Sedang Dipinjam"}
        </span>

        <div className="mt-auto flex items-center justify-between border-t border-line pt-3">
          <button
            type="button"
            onClick={() => setFavorit((sebelumnya) => !sebelumnya)}
            aria-pressed={favorit}
            className={
              favorit
                ? "rounded-lg bg-berry px-3 py-1.5 text-sm font-medium text-white transition hover:bg-berry-dark motion-safe:hover:scale-105 motion-safe:active:scale-95"
                : "rounded-lg bg-soft px-3 py-1.5 text-sm transition hover:bg-line motion-safe:hover:scale-105 motion-safe:active:scale-95"
            }
          >
            {favorit ? "♥ Favorit" : "♡ Favorit"}
          </button>
          <Link
            href={`/katalog/${id}`}
            className="text-sm font-medium text-berry underline-offset-4 transition hover:text-berry-dark hover:underline"
          >
            Lihat Detail
          </Link>
        </div>
      </div>
    </article>
  );
}

export default BukuCard;
import { useState } from "react";

function MenuCard({ id, nama, gambar, kategori, harga, tersedia, deskripsi, onTambah }) {
  const [detailTerbuka, setDetailTerbuka] = useState(false);

  return (
    <li className="flex flex-col rounded-2xl bg-white p-3 shadow-sm">
      <div className="relative">
        <img
          src={gambar}
          alt={nama}
          className={
            "aspect-[4/3] w-full rounded-xl object-cover " +
            (tersedia ? "" : "grayscale opacity-60")
          }
        />
        {!tersedia && (
          <span className="absolute left-2 top-2 rounded-full bg-kopi-900 px-3 py-1 text-xs font-bold text-white">
            Habis
          </span>
        )}
      </div>

      <div className="mt-3">
        <h3 className="font-bold leading-tight">{nama}</h3>
        <p className="text-xs text-kopi-600">{kategori}</p>
        <p className="mt-1 whitespace-nowrap text-lg font-extrabold">
          Rp {harga.toLocaleString("id-ID")}
        </p>
      </div>

      {detailTerbuka && <p className="mt-2 text-sm leading-relaxed">{deskripsi}</p>}

      <button
        type="button"
        onClick={() => setDetailTerbuka(!detailTerbuka)}
        aria-expanded={detailTerbuka}
        className="mt-2 self-start text-sm font-semibold text-kopi-600 underline-offset-2 hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-kopi-600"
      >
        {detailTerbuka ? "Tutup detail" : "Lihat detail"}
      </button>

      <div className="mt-auto pt-3">
      <button
        type="button"
        onClick={() => onTambah(id)}
        disabled={!tersedia}
        className="w-full rounded-full bg-kopi-600 px-5 py-2.5 text-sm font-bold text-white transition-colors hover:bg-kopi-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-kopi-600 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:bg-stone-300 disabled:text-stone-600"
      >
        {tersedia ? "Tambah" : "Habis"}
      </button>
      </div>
    </li>
  );
}

export default MenuCard;

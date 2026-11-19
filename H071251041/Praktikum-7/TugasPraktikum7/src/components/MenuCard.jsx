import { useState } from "react";

function MenuCard({ nama, kategori, harga, tersedia, deskripsi, onTambah }) {
  const [terbuka, setTerbuka] = useState(false);

  // untuk detail
  let teksDetail;
  if (terbuka === true) {
    teksDetail = "Tutup";
  } else {
    teksDetail = "Detail";
  }

  // untuk tambah
  let teksTambah;
  if (tersedia === true) {
    teksTambah = "Tambah";
  } else {
    teksTambah = "Tidak tersedia";
  }

  // habis
  let labelHabis;
  if (tersedia === false) {
    labelHabis = (
      <span className="rounded-full bg-(--pink--muda) px-3 py-1 text-xs font-semibold text-(--merah)">
        Habis
      </span>
    );
  }


  let teksDeskripsi;
  if (terbuka === true) {
    teksDeskripsi = (
      <p className="rounded-lg border-l-4 border-(--merah) bg-(--pink--muda) p-3 text-sm text-(--coklat)">
        {deskripsi}
      </p>
    );
  }

  //tutup buka deskripsi
  function ubahTerbuka() {
    if (terbuka === true) {
      setTerbuka(false);
    } else {
      setTerbuka(true);
    }
  }

  return (
    <div className="flex flex-col gap-3 rounded-2xl border border-(--pink) bg-white p-5 shadow-sm">
      <div className="flex items-start justify-between gap-2">
        <div>
          <h3 className="text-lg font-bold text-(--maroon)">{nama}</h3>
          <p className="text-xs text-(--merah)">{kategori}</p>
        </div>
        
        {labelHabis}
      </div>

      <p className="text-base font-bold text-(--coklat)">
        Rp{harga.toLocaleString("id-ID")}
      </p>

      {teksDeskripsi}

      <div className="mt-auto flex gap-2">
        <button
          onClick={ubahTerbuka}
          className="cursor-pointer rounded-lg border border-(--merah) px-3 py-2 text-sm text-(--maroon) hover:bg-(--pink--muda)"
        >
          {teksDetail}
        </button>
        <button
          onClick={onTambah}
          disabled={tersedia === false}
          className="flex-1 cursor-pointer rounded-lg bg-(--merah) px-3 py-2 text-sm font-semibold text-white hover:bg-(--maroon) disabled:cursor-not-allowed disabled:bg-gray-300"
        >
          {teksTambah}
        </button>
      </div>
    </div>
  );
}

export default MenuCard;
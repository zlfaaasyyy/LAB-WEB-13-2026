import { useState } from "react";

function MenuCard({ nama, foto, kategori, harga, tersedia, deskripsi, onTambah }) {
  const [terbuka, setTerbuka] = useState(false);

  function ambilKelasKartu() {
    if (tersedia) {
      return "flex flex-col gap-3 rounded-2xl border border-sage-tua/30 bg-krem p-3 shadow-sm";
    } else {
      return "flex flex-col gap-3 rounded-2xl border border-sage-tua/30 bg-krem-tua p-3";
    }
  }

  function ambilKelasFoto() {
    if (tersedia) {
      return "aspect-video w-full rounded-xl bg-sage-muda object-cover";
    } else {
      return "aspect-video w-full rounded-xl bg-sage-muda object-cover grayscale";
    }
  }

  function ambilTeksTombol() {
    if (tersedia) {
      return "+ Tambah";
    } else {
      return "Habis";
    }
  }

  function ambilKelasStatus() {
    if (tersedia) {
      return "rounded-full bg-sage-muda px-3 py-1 text-xs font-bold text-hutan-gelap";
    } else {
      return "rounded-full bg-tinta px-3 py-1 text-xs font-bold text-krem";
    }
  }

  function ambilTeksStatus() {
    if (tersedia) {
      return "Tersedia";
    } else {
      return "Habis";
    }
  }

  return (
    <article className={ambilKelasKartu()}>
      <img src={foto} alt={nama} className={ambilKelasFoto()} />

      <div className="flex items-start justify-between gap-2">
        <div>
          <h3 className="text-base font-extrabold">{nama}</h3>
          <p className="text-xs font-semibold text-hutan">{kategori}</p>
        </div>
        {!tersedia && (
          <span className="rounded-full bg-tinta px-2 py-0.5 text-xs font-bold text-krem">
            Habis
          </span>
        )}
      </div>

      <p className="font-bold">Rp {harga.toLocaleString("id-ID")}</p>

      <div className="mt-auto flex gap-2">
        <button
          type="button"
          onClick={() => setTerbuka(true)}
          className="flex-1 rounded-full border border-hutan px-3 py-2 text-sm font-semibold text-hutan hover:bg-sage-muda"
        >
          Lihat detail
        </button>
        <button
          type="button"
          onClick={onTambah}
          disabled={!tersedia}
          className="flex-1 rounded-full bg-hutan px-3 py-2 text-sm font-bold text-krem hover:bg-hutan-gelap disabled:cursor-not-allowed disabled:bg-sage-tua/60 disabled:text-tinta/60"
        >
          {ambilTeksTombol()}
        </button>
      </div>

      {terbuka && (
        <div
          onClick={() => setTerbuka(false)}
          className="fixed inset-0 z-50 flex items-center justify-center bg-tinta/60 p-4"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="max-h-full w-full max-w-md overflow-y-auto rounded-3xl bg-krem p-4 shadow-2xl"
          >
            <img
              src={foto}
              alt={nama}
              className="aspect-video w-full rounded-2xl bg-sage-muda object-cover"
            />

            <div className="mt-4 flex items-start justify-between gap-2">
              <div>
                <h3 className="text-xl font-extrabold">{nama}</h3>
                <p className="text-sm font-semibold text-hutan">{kategori}</p>
              </div>
              <span className={ambilKelasStatus()}>{ambilTeksStatus()}</span>
            </div>

            <p className="mt-3 text-sm text-tinta/80">{deskripsi}</p>
            <p className="mt-3 text-lg font-extrabold text-hutan-gelap">
              Rp {harga.toLocaleString("id-ID")}
            </p>

            <div className="mt-4 flex gap-2">
              <button
                type="button"
                onClick={() => setTerbuka(false)}
                className="flex-1 rounded-full border border-hutan px-3 py-2 text-sm font-semibold text-hutan hover:bg-sage-muda"
              >
                Tutup
              </button>
              <button
                type="button"
                onClick={onTambah}
                disabled={!tersedia}
                className="flex-1 rounded-full bg-hutan px-3 py-2 text-sm font-bold text-krem hover:bg-hutan-gelap disabled:cursor-not-allowed disabled:bg-sage-tua/60 disabled:text-tinta/60"
              >
                {ambilTeksTombol()}
              </button>
            </div>
          </div>
        </div>
      )}
    </article>
  );
}

export default MenuCard;
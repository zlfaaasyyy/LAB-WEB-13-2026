const kategoriList = ["Semua", "Kopi", "Non-Kopi", "Makanan"];

function Navbar({ kategoriAktif, onPilihKategori, totalItem, totalHarga }) {
  return (
    <header className="sticky top-0 z-10 rounded-t-3xl bg-peach-100/95 px-5 pb-3 pt-5 backdrop-blur">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h1 className="flex items-center gap-2 text-xl font-extrabold">
          <span aria-hidden="true"></span> Kedai Kopi Senja
        </h1>
        <p className="rounded-full bg-jeruk px-4 py-2 text-sm font-bold text-kopi-900">
          {totalItem} item &middot; Rp {totalHarga.toLocaleString("id-ID")}
        </p>
      </div>

      <h2 className="mt-4 text-3xl font-extrabold">Menu</h2>
      <nav className="mt-3 flex gap-2 overflow-x-auto pb-1" aria-label="Kategori menu">
        {kategoriList.map((kategori) => (
          <button
            key={kategori}
            type="button"
            onClick={() => onPilihKategori(kategori)}
            aria-pressed={kategori === kategoriAktif}
            className={
              "whitespace-nowrap rounded-full border px-5 py-2 text-sm font-semibold transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-kopi-600 " +
              (kategori === kategoriAktif
                ? "border-jeruk bg-jeruk text-kopi-900"
                : "border-peach-300 bg-white/60 hover:bg-white")
            }
          >
            {kategori}
          </button>
        ))}
      </nav>
    </header>
  );
}

export default Navbar;

function Navbar({ kategoriAktif, onKategoriClick, totalJumlah, totalHarga }) {
  const daftarKategori = ["Semua", "Kopi", "Non-Kopi", "Makanan"];

  return (
    <header className="sticky top-0 z-10 border-b border-sage/40 bg-krem/95 backdrop-blur">
      <nav className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3 px-4 py-3">
        <div className="flex items-center gap-3">
          <div>
            <h1 className="text-xl font-extrabold text-hutan-gelap leading-tight">Kedai Kopi Senja</h1>
          </div>
        </div>

        <ul className="order-3 flex w-full gap-2 overflow-x-auto pb-1 md:order-none md:w-auto md:pb-0">
          {daftarKategori.map((item) => {
            if (item === kategoriAktif) {
              return (
                <li key={item}>
                  <button
                    type="button"
                    onClick={() => onKategoriClick(item)}
                    className="whitespace-nowrap rounded-full bg-hutan px-4 py-1.5 text-sm font-bold text-krem"
                  >
                    {item}
                  </button>
                </li>
              );
            } else {
              return (
                <li key={item}>
                  <button
                    type="button"
                    onClick={() => onKategoriClick(item)}
                    className="whitespace-nowrap rounded-full px-4 py-1.5 text-sm font-semibold text-hutan hover:bg-sage-muda"
                  >
                    {item}
                  </button>
                </li>
              );
            }
          })}
        </ul>

        <div className="rounded-full bg-jingga px-4 py-2 text-sm font-bold text-white shadow">
          {totalJumlah} item · Rp {totalHarga.toLocaleString("id-ID")}
        </div>
      </nav>
    </header>
  );
}

export default Navbar;
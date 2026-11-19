function Navbar({ jumlahItem, totalHarga, daftarKategori, kategoriAktif, onKategoriClick }) {
  
  function cekWarna(kategori) {
    if (kategori === kategoriAktif) {
      return "cursor-pointer rounded-full bg-(--merah) px-2 py-1 text-[10px] font-semibold text-white md:px-5 md:py-2 md:text-sm";
    } else {
      return "cursor-pointer rounded-full border border-(--merah) bg-white px-2 py-1 text-[10px] font-semibold text-(--maroon) hover:bg-(--pink) md:px-5 md:py-2 md:text-sm";
    }
  }

  return (
    <nav className="sticky top-0 z-50 border-b border-(--merah) bg-(--pink--muda) px-2 py-2 md:px-16 md:py-3">
      <div className="flex items-center justify-between gap-1 md:gap-4">
        
        <h2 className="text-sm font-bold text-(--maroon) md:text-2xl lg:text-4xl">
          Kopi Senja
        </h2>

        <div className="flex items-center gap-1 md:gap-2">
          {daftarKategori.map((kategori) => (
            <button
              key={kategori}
              onClick={() => onKategoriClick(kategori)}
              className={cekWarna(kategori)}
            >
              {kategori}
            </button>
          ))}
        </div>

        <div className="flex flex-col flex-nowrap text-right text-(--maroon)">
          <p className="text-[10px] md:text-sm">
            Pesanan: <span className="font-bold">{jumlahItem}</span> item
          </p>
          <p className="text-xs font-bold text-(--merah) md:text-base">
            Rp{totalHarga.toLocaleString("id-ID")}
          </p>
        </div>

      </div>
    </nav>
  );
}

export default Navbar;
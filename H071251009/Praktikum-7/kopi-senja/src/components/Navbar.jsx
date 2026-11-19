export default function Navbar({
  daftarKategori,
  kategoriAktif,
  onPilihKategori,
  jumlahItem,
  totalHarga,
}) {
  return (
    <header className="sticky top-0 z-20 overflow-hidden bg-ink text-kabut shadow-lg shadow-ink/30">
      {/* Matahari senja: setengah tenggelam di sudut kanan atas */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-8 -top-20 h-52 w-52 rounded-full opacity-90"
        style={{
          backgroundImage:
            'repeating-linear-gradient(to bottom, #F0A03C 0 10px, transparent 10px 14px)',
        }}
      />

      <div className="relative mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3 px-4 pt-4">
        <div>
          <h1 className="font-display text-2xl font-bold leading-none">Kopi Senja</h1>
          <p className="mt-1 text-sm text-kabut/70">Pilih dari meja, pesanan langsung diantar.</p>
        </div>

        <div
          aria-live="polite"
          className="rounded-xl bg-kabut px-4 py-2 text-right text-ink shadow-md"
        >
          <p className="text-xs font-medium text-ink/60">{jumlahItem} item dipesan</p>
          <p className="font-display text-lg font-bold tabular-nums leading-tight">
            Rp {totalHarga.toLocaleString('id-ID')}
          </p>
        </div>
      </div>

      <nav
        aria-label="Kategori menu"
        className="relative mx-auto flex max-w-6xl gap-2 overflow-x-auto px-4 pb-4 pt-4"
      >
        {daftarKategori.map((kategori) => {
          const aktif = kategori === kategoriAktif
          return (
            <button
              key={kategori}
              type="button"
              aria-pressed={aktif}
              onClick={() => onPilihKategori(kategori)}
              className={`whitespace-nowrap rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${
                aktif
                  ? 'bg-senja text-ink'
                  : 'bg-kabut/10 text-kabut hover:bg-kabut/20'
              }`}
            >
              {kategori}
            </button>
          )
        })}
      </nav>
    </header>
  )
}

function Navbar({ daftarKategori, kategoriAktif, onPilihKategori, totalJumlah, totalHarga }) {
  return (
    <header className="sticky top-0 z-10 bg-senja-malam text-white shadow-lg">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3 px-4 py-3">
        <h1 className="text-2xl font-extrabold tracking-tight">
          Kedai Kopi <span className="text-senja-api">Senja</span>
        </h1>
        <p className="rounded-full bg-white/10 px-4 py-1.5 text-sm" aria-live="polite">
          <span className="font-semibold">{totalJumlah}</span> item &middot;{' '}
          <span className="font-semibold text-senja-api">Rp {totalHarga.toLocaleString('id-ID')}</span>
        </p>
      </div>
      <nav aria-label="Kategori menu" className="mx-auto flex max-w-6xl gap-2 overflow-x-auto px-4 pb-3">
        {daftarKategori.map((k) => (
          <button
            key={k}
            type="button"
            onClick={() => onPilihKategori(k)}
            aria-pressed={k === kategoriAktif}
            className={
              'whitespace-nowrap rounded-full px-4 py-1.5 text-sm font-semibold transition focus:outline-none focus-visible:ring-2 focus-visible:ring-senja-api ' +
              (k === kategoriAktif
                ? 'bg-senja-api text-senja-malam'
                : 'bg-white/10 text-white hover:bg-white/20')
            }
          >
            {k}
          </button>
        ))}
      </nav>
    </header>
  )
}

export default Navbar

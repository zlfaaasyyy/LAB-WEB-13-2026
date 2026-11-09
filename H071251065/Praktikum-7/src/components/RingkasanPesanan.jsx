function RingkasanPesanan({ items, totalJumlah, totalHarga, onTambah, onKurang }) {
  return (
    <section aria-label="Ringkasan pesanan" className="rounded-xl bg-white p-4 shadow-sm">
      <h2 className="text-lg font-bold">Pesananmu</h2>

      {items.length === 0 ? (
        <p className="mt-2 text-sm text-slate-600">Belum ada pesanan. Tekan Tambah pada menu untuk mulai memilih.</p>
      ) : (
        <ul className="mt-3 divide-y divide-slate-100">
          {items.map((i) => (
            <li key={i.id} className="flex items-center justify-between gap-2 py-2">
              <div>
                <p className="text-sm font-semibold">{i.nama}</p>
                <p className="text-xs text-slate-500">Rp {(i.harga * i.jumlah).toLocaleString('id-ID')}</p>
              </div>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => onKurang(i.id)}
                  aria-label={'Kurangi ' + i.nama}
                  className="h-7 w-7 rounded-full bg-slate-100 font-bold hover:bg-slate-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-senja-api"
                >
                  -
                </button>
                <span className="w-5 text-center text-sm font-semibold">{i.jumlah}</span>
                <button
                  type="button"
                  onClick={() => onTambah(i.id)}
                  aria-label={'Tambah ' + i.nama}
                  className="h-7 w-7 rounded-full bg-slate-100 font-bold hover:bg-slate-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-senja-api"
                >
                  +
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}

      <div className="mt-3 flex items-center justify-between border-t border-slate-200 pt-3">
        <p className="text-sm text-slate-600">{totalJumlah} item</p>
        <p className="text-lg font-extrabold">Rp {totalHarga.toLocaleString('id-ID')}</p>
      </div>
    </section>
  )
}

export default RingkasanPesanan

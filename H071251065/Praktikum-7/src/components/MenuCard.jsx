import { useState } from 'react'

function MenuCard({ id, nama, kategori, harga, tersedia, deskripsi, onTambah }) {
  const [detailTerbuka, setDetailTerbuka] = useState(false)

  return (
    <li className={'flex flex-col rounded-xl bg-white p-4 shadow-sm ' + (tersedia ? '' : 'opacity-60')}>
      <div className="flex items-start justify-between gap-2">
        <div>
          <h2 className="text-lg font-bold leading-tight">{nama}</h2>
          <p className="text-xs text-slate-500">{kategori}</p>
        </div>
        <p className="font-semibold text-senja-bara">Rp {harga.toLocaleString('id-ID')}</p>
      </div>

      {detailTerbuka && <p className="mt-3 text-sm text-slate-600">{deskripsi}</p>}

      <div className="mt-4 flex items-center justify-between gap-2">
        <button
          type="button"
          onClick={() => setDetailTerbuka(!detailTerbuka)}
          aria-expanded={detailTerbuka}
          className="text-sm font-semibold text-senja-malam underline-offset-2 hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-senja-api"
        >
          {detailTerbuka ? 'Tutup detail' : 'Lihat detail'}
        </button>
        <button
          type="button"
          onClick={() => onTambah(id)}
          disabled={!tersedia}
          className="rounded-lg bg-senja-malam px-4 py-2 text-sm font-semibold text-white transition hover:bg-senja-malam/90 focus:outline-none focus-visible:ring-2 focus-visible:ring-senja-api disabled:cursor-not-allowed disabled:bg-slate-300 disabled:text-slate-600"
        >
          {tersedia ? 'Tambah' : 'Habis'}
        </button>
      </div>
    </li>
  )
}

export default MenuCard

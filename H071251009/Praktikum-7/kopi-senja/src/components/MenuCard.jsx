import { useState } from 'react'

export default function MenuCard({ menu, jumlahDipesan, onTambah }) {
  // State detail milik tiap kartu sendiri, jadi membuka satu menu tidak memengaruhi yang lain.
  const [detailTerbuka, setDetailTerbuka] = useState(false)
  const { id, nama, kategori, harga, tersedia, deskripsi } = menu

  return (
    <li className="flex items-start gap-4 py-4">
      <div className={`min-w-0 flex-1 ${tersedia ? '' : 'opacity-55'}`}>
        <div className="flex items-baseline gap-2">
          <h3 className="font-display text-lg font-bold">{nama}</h3>
          <span aria-hidden="true" className="mb-1 min-w-4 flex-1 border-b-2 border-dotted border-ink/25" />
          <span className="font-medium tabular-nums">Rp {harga.toLocaleString('id-ID')}</span>
        </div>

        <div className="mt-1 flex items-center gap-3 text-sm">
          <span className="text-ink/60">{kategori}</span>
          {!tersedia && (
            <span className="rounded bg-bata/10 px-2 py-0.5 text-xs font-medium text-bata">
              Sedang habis
            </span>
          )}
          <button
            type="button"
            aria-expanded={detailTerbuka}
            aria-controls={`detail-${id}`}
            onClick={() => setDetailTerbuka(!detailTerbuka)}
            className="font-medium text-plum underline underline-offset-4 hover:text-ink"
          >
            {detailTerbuka ? 'Tutup detail' : 'Lihat detail'}
          </button>
        </div>

        {detailTerbuka && (
          <p id={`detail-${id}`} className="mt-3 border-l-4 border-senja pl-3 text-sm leading-relaxed text-ink/80">
            {deskripsi}
          </p>
        )}
      </div>

      <div className="flex w-24 shrink-0 flex-col items-stretch gap-1">
        <button
          type="button"
          disabled={!tersedia}
          onClick={() => onTambah(id)}
          className="rounded-lg bg-ink px-3 py-2 text-sm font-medium text-kabut transition-colors hover:bg-plum disabled:cursor-not-allowed disabled:bg-ink/15 disabled:text-ink/40"
        >
          {tersedia ? 'Tambah' : 'Habis'}
        </button>
        {jumlahDipesan > 0 && (
          <span className="text-center text-xs font-medium text-daun">{jumlahDipesan} di pesanan</span>
        )}
      </div>
    </li>
  )
}

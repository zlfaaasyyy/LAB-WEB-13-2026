import { useState } from 'react'

export default function FormPesan({ jumlahItem, pesananTerkirim, onKirim }) {
  const [nama, setNama] = useState('')
  const [meja, setMeja] = useState('')
  const [galat, setGalat] = useState({})

  function handleUbahNama(e) {
    setNama(e.target.value)
    setGalat((sebelumnya) => ({ ...sebelumnya, nama: '' }))
  }

  function handleUbahMeja(e) {
    setMeja(e.target.value)
    setGalat((sebelumnya) => ({ ...sebelumnya, meja: '' }))
  }

  function handleSubmit(e) {
    e.preventDefault()
    const hasil = {}
    const namaBersih = nama.trim()
    const mejaBersih = meja.trim()

    if (jumlahItem === 0) {
      hasil.pesanan = 'Pesanan masih kosong. Tambahkan minimal satu menu dulu.'
    }
    if (namaBersih === '') {
      hasil.nama = 'Nama wajib diisi.'
    } else if (namaBersih.length < 3) {
      hasil.nama = 'Nama minimal 3 karakter.'
    } else if (!/^[\p{L}\s.'-]+$/u.test(namaBersih)) {
      hasil.nama = 'Nama hanya boleh berisi huruf.'
    }
    if (mejaBersih === '') {
      hasil.meja = 'Nomor meja wajib diisi.'
    } else if (!/^\d+$/.test(mejaBersih) || Number(mejaBersih) < 1 || Number(mejaBersih) > 20) {
      hasil.meja = 'Nomor meja berupa angka 1 sampai 20.'
    }

    setGalat(hasil)
    if (Object.keys(hasil).length > 0) return

    onKirim({ nama: namaBersih, meja: Number(mejaBersih) })
    setNama('')
    setMeja('')
  }

  const kelasInput = (adaGalat) =>
    `mt-1 w-full rounded-lg border bg-white px-3 py-2 ${
      adaGalat ? 'border-bata' : 'border-ink/20'
    }`

  return (
    <section aria-label="Kirim pesanan" className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-ink/10">
      <h2 className="font-display text-xl font-bold">Kirim pesanan</h2>

      {pesananTerkirim && (
        <div role="status" className="mt-3 rounded-lg bg-daun/10 p-3 text-sm text-daun">
          <p className="font-bold">Terima kasih, {pesananTerkirim.nama}!</p>
          <p className="mt-1">
            Pesanan {pesananTerkirim.jumlahItem} item (Rp{' '}
            {pesananTerkirim.totalHarga.toLocaleString('id-ID')}) sedang disiapkan dan akan diantar
            ke meja {pesananTerkirim.meja}.
          </p>
        </div>
      )}

      <form onSubmit={handleSubmit} noValidate className="mt-3 flex flex-col gap-4">
        <div>
          <label htmlFor="nama" className="text-sm font-medium">Nama</label>
          <input
            id="nama"
            type="text"
            value={nama}
            onChange={handleUbahNama}
            aria-invalid={Boolean(galat.nama)}
            className={kelasInput(galat.nama)}
          />
          {galat.nama && <p className="mt-1 text-sm text-bata">{galat.nama}</p>}
        </div>

        <div>
          <label htmlFor="meja" className="text-sm font-medium">Nomor meja</label>
          <input
            id="meja"
            type="text"
            inputMode="numeric"
            value={meja}
            onChange={handleUbahMeja}
            aria-invalid={Boolean(galat.meja)}
            className={kelasInput(galat.meja)}
          />
          {galat.meja && <p className="mt-1 text-sm text-bata">{galat.meja}</p>}
        </div>

        {galat.pesanan && (
          <p role="alert" className="rounded-lg bg-bata/10 p-3 text-sm text-bata">
            {galat.pesanan}
          </p>
        )}

        <button
          type="submit"
          className="rounded-lg bg-senja px-4 py-3 font-bold text-ink transition-colors hover:bg-plum hover:text-kabut"
        >
          Kirim pesanan
        </button>
      </form>
    </section>
  )
}

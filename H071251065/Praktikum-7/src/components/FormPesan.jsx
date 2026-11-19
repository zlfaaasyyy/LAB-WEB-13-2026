import { useState } from 'react'

function FormPesan({ pesananKosong, onKirim }) {
  const [nama, setNama] = useState('')
  const [meja, setMeja] = useState('')
  const [galat, setGalat] = useState([])

  function handleSubmit(e) {
    e.preventDefault()
    const pesanGalat = []
    if (pesananKosong) pesanGalat.push('Pesanan masih kosong. Tambahkan minimal satu menu.')
    if (nama.trim().length < 2) pesanGalat.push('Nama wajib diisi, minimal 2 karakter.')
    if (pesanGalat.length > 0) {
      setGalat(pesanGalat)
      return
    }

    onKirim(nama.trim())
    setNama('')
    setMeja('')
    setGalat([])
  }

  const inputClass =
    'mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-senja-malam focus:outline-none focus:ring-2 focus:ring-senja-api'

  return (
    <form onSubmit={handleSubmit} noValidate className="rounded-xl bg-white p-4 shadow-sm">
      <h2 className="text-lg font-bold">Kirim pesanan</h2>

      <label className="mt-3 block text-sm font-semibold" htmlFor="nama">
        Nama
        <input id="nama" type="text" value={nama} onChange={(e) => setNama(e.target.value)} placeholder="Nama kamu" className={inputClass}/>
      </label>

      <label className="mt-3 block text-sm font-semibold" htmlFor="meja">
        Nomor meja
        <input id="meja" type="text" inputMode="numeric" value={meja} onChange={(e) => setMeja(e.target.value)} placeholder="Contoh: 5" className={inputClass}
        />
      </label>

      {galat.length > 0 && (
        <ul role="alert" className="mt-3 list-inside list-disc rounded-lg bg-red-50 p-3 text-sm text-red-700">
          {galat.map((g) => (
            <li key={g}>{g}</li>
          ))}
        </ul>
      )}

      <button
        type="submit"
        className="mt-4 w-full rounded-lg bg-senja-api px-4 py-2.5 font-bold text-senja-malam transition hover:brightness-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-senja-malam"
      >
        Kirim pesanan
      </button>
    </form>
  )
}

export default FormPesan

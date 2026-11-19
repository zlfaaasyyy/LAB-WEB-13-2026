import { useState } from 'react'
import Navbar from './components/Navbar.jsx'
import MenuList from './components/MenuList.jsx'
import RingkasanPesanan from './components/RingkasanPesanan.jsx'
import FormPesan from './components/FormPesan.jsx'
import Footer from './components/Footer.jsx'

const dataMenu = [
  { id: 1, nama: 'Kopi Susu', kategori: 'Kopi', harga: 18000, tersedia: true, deskripsi: 'Espresso dengan susu segar dan gula aren.' },
  { id: 2, nama: 'Americano', kategori: 'Kopi', harga: 15000, tersedia: true, deskripsi: 'Espresso dengan air panas, rasa kuat dan bersih.' },
  { id: 3, nama: 'Cappuccino', kategori: 'Kopi', harga: 22000, tersedia: true, deskripsi: 'Espresso, susu panas, dan busa susu tebal.' },
  { id: 4, nama: 'Matcha Latte', kategori: 'Non-Kopi', harga: 24000, tersedia: true, deskripsi: 'Teh hijau matcha dengan susu.' },
  { id: 5, nama: 'Teh Tarik', kategori: 'Non-Kopi', harga: 14000, tersedia: false, deskripsi: 'Teh susu yang ditarik hingga berbusa.' },
  { id: 6, nama: 'Cokelat Panas', kategori: 'Non-Kopi', harga: 20000, tersedia: true, deskripsi: 'Cokelat pekat dengan susu hangat.' },
  { id: 7, nama: 'Roti Bakar', kategori: 'Makanan', harga: 16000, tersedia: true, deskripsi: 'Roti tebal dengan selai cokelat dan keju.' },
  { id: 8, nama: 'Pisang Goreng', kategori: 'Makanan', harga: 12000, tersedia: false, deskripsi: 'Pisang goreng renyah dengan taburan keju.' },
  { id: 9, nama: 'Nasi Goreng', kategori: 'Makanan', harga: 25000, tersedia: true, deskripsi: 'Nasi goreng kampung dengan telur mata sapi.' },
]

const daftarKategori = ['Semua', 'Kopi', 'Non-Kopi', 'Makanan']

function App() {
  const [kategoriAktif, setKategoriAktif] = useState('Semua')
  const [pesanan, setPesanan] = useState([])
  const [pemesanTerkirim, setPemesanTerkirim] = useState('')

  const menuTampil = kategoriAktif === 'Semua'? dataMenu : dataMenu.filter((m) => m.kategori === kategoriAktif)

  const itemPesanan = pesanan.map((p) => {
    const menu = dataMenu.find((m) => m.id === p.id)
    return {...menu, jumlah: p.jumlah }
  })
  const totalJumlah = itemPesanan.reduce((s, i) => s + i.jumlah, 0)
  const totalHarga = itemPesanan.reduce((s, i) => s + i.jumlah * i.harga, 0)

  function tambah(id) {
    setPemesanTerkirim('')
    setPesanan((prev) =>
      prev.some((p) => p.id === id)
        ? prev.map((p) => (p.id === id ? { ...p, jumlah: p.jumlah + 1 } : p))
        : [...prev, { id, jumlah: 1 }],
    )
  }

  function kurang(id) {
    setPesanan((prev) =>
      prev
        .map((p) => (p.id === id ? { ...p, jumlah: p.jumlah - 1 } : p))
        .filter((p) => p.jumlah > 0),
    )
  }

  function kirim(nama) {
    setPemesanTerkirim(nama)
    setPesanan([])
  }

  return (
    <div className="min-h-screen bg-senja-langit font-sans text-senja-tinta">
      <Navbar daftarKategori={daftarKategori} kategoriAktif={kategoriAktif} onPilihKategori={setKategoriAktif} totalJumlah={totalJumlah} totalHarga={totalHarga}
      />

      <main className="mx-auto grid max-w-6xl gap-8 px-4 py-8 lg:grid-cols-[1fr_22rem]">
        <section aria-label="Daftar menu">
          <MenuList menu={menuTampil} onTambah={tambah} />
        </section>

        <aside className="space-y-6 lg:sticky lg:top-28 lg:self-start">
          {pemesanTerkirim !== '' && (
            <div role="status" className="rounded-lg border-l-4 border-senja-api bg-white p-4 shadow-sm">
              <p className="font-bold">Terima kasih, {pemesanTerkirim}!</p>
              <p className="text-sm text-slate-600">Pesananmu sudah kami terima dan segera disiapkan.</p>
            </div>
          )}
          <RingkasanPesanan items={itemPesanan} totalJumlah={totalJumlah} totalHarga={totalHarga} onTambah={tambah} onKurang={kurang}
          />
          <FormPesan pesananKosong={totalJumlah === 0} onKirim={kirim} />
        </aside>
      </main>

      <Footer />
    </div>
  )
}

export default App

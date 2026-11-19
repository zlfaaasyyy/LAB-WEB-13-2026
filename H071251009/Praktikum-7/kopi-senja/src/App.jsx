import { useState } from 'react'
import Navbar from './components/Navbar'
import MenuList from './components/MenuList'
import RingkasanPesanan from './components/RingkasanPesanan'
import FormPesan from './components/FormPesan'
import Footer from './components/Footer'

// Satu-satunya sumber data menu. Komponen lain hanya menerimanya lewat props.
const DAFTAR_MENU = [
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

const DAFTAR_KATEGORI = ['Semua', 'Kopi', 'Non-Kopi', 'Makanan']

export default function App() {
  const [kategoriAktif, setKategoriAktif] = useState('Semua')
  // Pesanan hanya menyimpan id dan jumlah. Nama dan harga selalu dibaca dari DAFTAR_MENU.
  const [pesanan, setPesanan] = useState([])
  const [pesananTerkirim, setPesananTerkirim] = useState(null)

  // Nilai turunan: dihitung dari state, tidak disimpan sebagai state lagi,
  // sehingga angka di Navbar dan di Ringkasan pasti selalu sama.
  const menuTampil =
    kategoriAktif === 'Semua'
      ? DAFTAR_MENU
      : DAFTAR_MENU.filter((menu) => menu.kategori === kategoriAktif)

  const itemPesanan = pesanan.map((p) => {
    const menu = DAFTAR_MENU.find((m) => m.id === p.id)
    return { ...menu, jumlah: p.jumlah }
  })
  const jumlahItem = itemPesanan.reduce((hasil, item) => hasil + item.jumlah, 0)
  const totalHarga = itemPesanan.reduce((hasil, item) => hasil + item.harga * item.jumlah, 0)

  function handleTambah(id) {
    const menu = DAFTAR_MENU.find((m) => m.id === id)
    if (!menu || !menu.tersedia) return

    setPesananTerkirim(null)
    setPesanan((sebelumnya) =>
      sebelumnya.some((p) => p.id === id)
        ? sebelumnya.map((p) => (p.id === id ? { ...p, jumlah: p.jumlah + 1 } : p))
        : [...sebelumnya, { id, jumlah: 1 }],
    )
  }

  function handleKurang(id) {
    setPesanan((sebelumnya) =>
      sebelumnya
        .map((p) => (p.id === id ? { ...p, jumlah: p.jumlah - 1 } : p))
        .filter((p) => p.jumlah > 0),
    )
  }

  function handleHapus(id) {
    setPesanan((sebelumnya) => sebelumnya.filter((p) => p.id !== id))
  }

  function handleKirim(dataPemesan) {
    setPesananTerkirim({ ...dataPemesan, jumlahItem, totalHarga })
    setPesanan([])
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar
        daftarKategori={DAFTAR_KATEGORI}
        kategoriAktif={kategoriAktif}
        onPilihKategori={setKategoriAktif}
        jumlahItem={jumlahItem}
        totalHarga={totalHarga}
      />

      <main className="mx-auto grid w-full max-w-6xl flex-1 gap-6 px-4 py-6 lg:grid-cols-[1fr_22rem]">
        <MenuList daftarMenu={menuTampil} pesanan={pesanan} onTambah={handleTambah} />

        <div className="flex flex-col gap-6 lg:sticky lg:top-40 lg:self-start">
          <RingkasanPesanan
            itemPesanan={itemPesanan}
            jumlahItem={jumlahItem}
            totalHarga={totalHarga}
            onTambah={handleTambah}
            onKurang={handleKurang}
            onHapus={handleHapus}
          />
          <FormPesan
            jumlahItem={jumlahItem}
            pesananTerkirim={pesananTerkirim}
            onKirim={handleKirim}
          />
        </div>
      </main>

      <Footer />
    </div>
  )
}

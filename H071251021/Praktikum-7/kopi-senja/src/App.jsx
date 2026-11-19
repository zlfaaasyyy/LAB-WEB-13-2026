import { useState } from "react";
import Navbar from "./components/Navbar.jsx";
import MenuList from "./components/MenuList.jsx";
import RingkasanPesanan from "./components/RingkasanPesanan.jsx";
import FormPesan from "./components/FormPesan.jsx";
import Footer from "./components/Footer.jsx";

const menuData = [
  { id: 1, nama: "Kopi Susu", gambar: "/menu/kopi susu.jpg", kategori: "Kopi", harga: 18000, tersedia: true, deskripsi: "Espresso dengan susu segar dan gula aren." },
  { id: 2, nama: "Americano", gambar: "/menu/americano.jpg", kategori: "Kopi", harga: 15000, tersedia: true, deskripsi: "Espresso dengan air panas, rasa kuat dan bersih." },
  { id: 3, nama: "Cappuccino", gambar: "/menu/cappuccino.jpg", kategori: "Kopi", harga: 22000, tersedia: true, deskripsi: "Espresso, susu panas, dan busa susu tebal." },
  { id: 4, nama: "Matcha Latte", gambar: "/menu/matcha latte.jpg", kategori: "Non-Kopi", harga: 24000, tersedia: true, deskripsi: "Teh hijau matcha dengan susu." },
  { id: 5, nama: "Teh Tarik", gambar: "/menu/teh tarik.jpg", kategori: "Non-Kopi", harga: 14000, tersedia: false, deskripsi: "Teh susu yang ditarik hingga berbusa." },
  { id: 6, nama: "Cokelat Panas", gambar: "/menu/cokelat panas.jpg", kategori: "Non-Kopi", harga: 20000, tersedia: true, deskripsi: "Cokelat pekat dengan susu hangat." },
  { id: 7, nama: "Roti Bakar", gambar: "/menu/roti bakar.jpg", kategori: "Makanan", harga: 16000, tersedia: true, deskripsi: "Roti tebal dengan selai cokelat dan keju." },
  { id: 8, nama: "Pisang Goreng", gambar: "/menu/pisang goreng.jpg", kategori: "Makanan", harga: 12000, tersedia: false, deskripsi: "Pisang goreng renyah dengan taburan keju." },
  { id: 9, nama: "Nasi Goreng", gambar: "/menu/nasi goreng.jpg", kategori: "Makanan", harga: 25000, tersedia: true, deskripsi: "Nasi goreng kampung dengan telur mata sapi." },
];

function App() {
  const [kategoriAktif, setKategoriAktif] = useState("Semua");
  const [pesanan, setPesanan] = useState([]);
  const [terkirim, setTerkirim] = useState(false);

  const menuTampil =
    kategoriAktif === "Semua"
      ? menuData
      : menuData.filter((m) => m.kategori === kategoriAktif);

  const itemPesanan = pesanan.map((p) => {
    const m = menuData.find((x) => x.id === p.id);
    return { id: m.id, nama: m.nama, gambar: m.gambar, harga: m.harga, jumlah: p.jumlah };
  });
  const totalItem = itemPesanan.reduce((t, i) => t + i.jumlah, 0);
  const totalHarga = itemPesanan.reduce((t, i) => t + i.harga * i.jumlah, 0);

  function handleTambah(id) {
    const menu = menuData.find((m) => m.id === id);
    if (!menu || !menu.tersedia) return;
    setTerkirim(false);
    setPesanan((prev) =>
      prev.some((p) => p.id === id)
        ? prev.map((p) => (p.id === id ? { ...p, jumlah: p.jumlah + 1 } : p))
        : [...prev, { id, jumlah: 1 }]
    );
  }

  function handleKurang(id) {
    setPesanan((prev) =>
      prev
        .map((p) => (p.id === id ? { ...p, jumlah: p.jumlah - 1 } : p))
        .filter((p) => p.jumlah > 0)
    );
  }

  function handleKirim(dataPelanggan) {
    console.log("Pesanan dikirim:", { ...dataPelanggan, itemPesanan, totalHarga });
    setPesanan([]);
    setTerkirim(true);
  }

  return (
    <div className="min-h-screen p-3 sm:p-6">
      <div className="mx-auto flex max-w-7xl flex-col rounded-3xl bg-peach-100 shadow-lg">
        <Navbar
          kategoriAktif={kategoriAktif}
          onPilihKategori={setKategoriAktif}
          totalItem={totalItem}
          totalHarga={totalHarga}
        />
        <main className="grid flex-1 gap-6 px-5 py-4 lg:grid-cols-[1fr_21rem]">
          <MenuList daftarMenu={menuTampil} onTambah={handleTambah} />
          <aside className="flex flex-col gap-4">
            <RingkasanPesanan
              itemPesanan={itemPesanan}
              totalItem={totalItem}
              totalHarga={totalHarga}
              onTambah={handleTambah}
              onKurang={handleKurang}
            />
            <FormPesan
              jumlahItem={totalItem}
              terkirim={terkirim}
              onKirim={handleKirim}
            />
          </aside>
        </main>
        <Footer />
      </div>
    </div>
  );
}

export default App;

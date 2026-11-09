import { useState } from "react";
import Navbar from "./components/Navbar.jsx";
import MenuList from "./components/MenuList.jsx";
import RingkasanPesanan from "./components/RingkasanPesanan.jsx";
import FormPesan from "./components/FormPesan.jsx";
import Footer from "./components/Footer.jsx";

const dataMenu = [
  { id: 1, nama: "Kopi Susu", kategori: "Kopi", harga: 18000, tersedia: true, deskripsi: "Espresso dengan susu segar dan gula aren." },
  { id: 2, nama: "Americano", kategori: "Kopi", harga: 15000, tersedia: true, deskripsi: "Espresso dengan air panas, rasa kuat dan bersih." },
  { id: 3, nama: "Cappuccino", kategori: "Kopi", harga: 22000, tersedia: true, deskripsi: "Espresso, susu panas, dan busa susu tebal." },
  { id: 4, nama: "Matcha Latte", kategori: "Non-Kopi", harga: 24000, tersedia: true, deskripsi: "Teh hijau matcha dengan susu." },
  { id: 5, nama: "Teh Tarik", kategori: "Non-Kopi", harga: 14000, tersedia: false, deskripsi: "Teh susu yang ditarik hingga berbusa." },
  { id: 6, nama: "Cokelat Panas", kategori: "Non-Kopi", harga: 20000, tersedia: true, deskripsi: "Cokelat pekat dengan susu hangat." },
  { id: 7, nama: "Roti Bakar", kategori: "Makanan", harga: 16000, tersedia: true, deskripsi: "Roti tebal dengan selai cokelat dan keju." },
  { id: 8, nama: "Pisang Goreng", kategori: "Makanan", harga: 12000, tersedia: false, deskripsi: "Pisang goreng renyah dengan taburan keju." },
  { id: 9, nama: "Nasi Goreng", kategori: "Makanan", harga: 25000, tersedia: true, deskripsi: "Nasi goreng kampung dengan telur mata sapi." },
];

function App() {
  const [kategoriAktif, setKategoriAktif] = useState("Semua");
  const [pesanan, setPesanan] = useState({
    item: dataMenu.map((menu) => ({
      id: menu.id,
      nama: menu.nama,
      harga: menu.harga,
      jumlah: 0,
    })),
    totalJumlah: 0,
    totalHarga: 0,
  });

  function tambahMenu(id, harga) {
    setPesanan({
      item: pesanan.item.map((menu) => {
        if (menu.id === id) {
          return { id: menu.id, nama: menu.nama, harga: menu.harga, jumlah: menu.jumlah + 1 };
        } else {
          return menu;
        }
      }),
      totalJumlah: pesanan.totalJumlah + 1,
      totalHarga: pesanan.totalHarga + harga,
    });
  }

  function kurangiMenu(id, harga) {
    setPesanan({
      item: pesanan.item.map((menu) => {
        if (menu.id === id) {
          return { id: menu.id, nama: menu.nama, harga: menu.harga, jumlah: menu.jumlah - 1 };
        } else {
          return menu;
        }
      }),
      totalJumlah: pesanan.totalJumlah - 1,
      totalHarga: pesanan.totalHarga - harga,
    });
  }

  function kosongkanPesanan() {
    setPesanan({
      item: pesanan.item.map((menu) => ({
        id: menu.id,
        nama: menu.nama,
        harga: menu.harga,
        jumlah: 0,
      })),
      totalJumlah: 0,
      totalHarga: 0,
    });
  }

  return (
    <div className="min-h-screen bg-krem font-sans text-tinta">
      <Navbar
        kategoriAktif={kategoriAktif}
        onKategoriClick={setKategoriAktif}
        totalJumlah={pesanan.totalJumlah}
        totalHarga={pesanan.totalHarga}
      />

      <main className="mx-auto grid max-w-6xl gap-6 px-4 py-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <MenuList
            daftarMenu={dataMenu}
            kategoriAktif={kategoriAktif}
            onTambah={tambahMenu}
          />
        </div>

        <aside className="flex flex-col gap-6 lg:sticky lg:top-28 lg:self-start">
          <RingkasanPesanan
            itemPesanan={pesanan.item}
            totalJumlah={pesanan.totalJumlah}
            totalHarga={pesanan.totalHarga}
            onTambah={tambahMenu}
            onKurangi={kurangiMenu}
          />
          <FormPesan 
            totalJumlah={pesanan.totalJumlah} 
            onKirim={kosongkanPesanan} />
        </aside>
      </main>

      <Footer />
    </div>
  );
}

export default App;

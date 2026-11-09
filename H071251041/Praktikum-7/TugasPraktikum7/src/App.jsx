import { useState } from "react";

import Navbar from "./components/Navbar.jsx";
import ListMenu from "./components/ListMenu.jsx";
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

const daftarKategori = ["Semua", "Kopi", "Non-Kopi", "Makanan"];

function App() {
  const [kategoriAktif, setKategoriAktif] = useState("Semua");
  // cuma id n jumlah
  const [pesanan, setPesanan] = useState([]);

  const itemPesanan = pesanan.map((isiKeranjang) => {
    const detailMenu = dataMenu.find((menuAsli) => {
      return menuAsli.id === isiKeranjang.id;
    });
    return { 
      id: isiKeranjang.id, 
      nama: detailMenu.nama, 
      harga: detailMenu.harga, 
      jumlah: isiKeranjang.jumlah 
    };
  });

  // total item
  const jumlahItem = itemPesanan.reduce((hasil, item) => hasil + item.jumlah, 0);
  
  // total uang
  const totalHarga = itemPesanan.reduce((hasil, item) => hasil + item.harga * item.jumlah, 0);

  // berdasarkan kategori
  function filterMenu() {
    if (kategoriAktif === "Semua") {
      return dataMenu;
    } else {
      return dataMenu.filter((menuAsli) => {
        return menuAsli.kategori === kategoriAktif;
      });
    }
  }
  const menuTampil = filterMenu();

  function tambahPesanan(id) {
    // cek sudah masuk keranjang atau tidak
    const sudahAda = pesanan.find((isiKeranjang) => {
      return isiKeranjang.id === id;
    });

    if (sudahAda) {
      const pesananBaru = pesanan.map((isiKeranjang) => {
        if (isiKeranjang.id === id) {
          return { id: isiKeranjang.id, jumlah: isiKeranjang.jumlah + 1 };
        } else {
          return isiKeranjang; // kalau id beda, biarkan saja
        }
      });
      setPesanan(pesananBaru);
    } else {
      // kalau belum pernah ditambahkan
      setPesanan(pesanan.concat({ id: id, jumlah: 1 }));
    }
  }


  function kurangiPesanan(id) {
    const pesananUpdate = pesanan.map((isiKeranjang) => {
      if (isiKeranjang.id === id) {
        return { id: isiKeranjang.id, jumlah: isiKeranjang.jumlah - 1 };
      } else {
        return isiKeranjang;
      }
    });

    // kalau porsinya jadi 0 buang dari keranjang
    const pesananValid = pesananUpdate.filter((isiKeranjang) => {
      return isiKeranjang.jumlah > 0;
    });

    setPesanan(pesananValid);
  }

  // hapus sekaligus
  function hapusPesanan(id) {
    const pesananSisa = pesanan.filter((isiKeranjang) => {
      if (isiKeranjang.id === id) {
        return false;
      } else {
        return true;
      }
    });
    setPesanan(pesananSisa);
  }

  // reset kalau sudah pencet kirim
  function kosongkanPesanan() {
    setPesanan([]);
  }


  return (
    <div className="min-h-screen bg-(--putih)">
      
      {/* kirim angka totalan dan fungsi ganti ganti */}
      <Navbar 
        jumlahItem={jumlahItem} 
        totalHarga={totalHarga} 
        daftarKategori={daftarKategori}
        kategoriAktif={kategoriAktif}
        onKategoriClick={setKategoriAktif}
      />

      <div className="flex flex-col gap-8 px-6 py-8 sm:px-8 md:px-16 lg:flex-row">
        
        {/* kiri */}
        <div className="w-full lg:w-3/5">
          <ListMenu
          listMenu={menuTampil}
          onTambah={tambahPesanan} />
        </div>

        {/* kanan*/}
        <div className="flex w-full flex-col gap-6 lg:w-2/5 lg:mt-16">
          <RingkasanPesanan
            itemPesanan={itemPesanan}
            jumlahItem={jumlahItem}
            totalHarga={totalHarga}
            onKurangi={kurangiPesanan}
            onTambah={tambahPesanan}
            onHapus={hapusPesanan}
          />

          <FormPesan jumlahItem={jumlahItem} onKirim={kosongkanPesanan} />
        </div>
        
      </div>

      <Footer />
    </div>
  );
}

export default App;
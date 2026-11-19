import MenuCard from "./MenuCard.jsx";
import foto1 from "../assets/gallery/kopi-susu.jpg"; 
import foto2 from "../assets/gallery/americano.jpg"; 
import foto3 from "../assets/gallery/cappuccino.jpg"; 
import foto4 from "../assets/gallery/matcha-latte.jpg"; 
import foto5 from "../assets/gallery/teh-tarik.jpg"; 
import foto6 from "../assets/gallery/cokelat-panas.jpg"; 
import foto7 from "../assets/gallery/roti-bakar.jpg"; 
import foto8 from "../assets/gallery/pisang-goreng.jpg"; 
import foto9 from "../assets/gallery/nasi-goreng.jpg"; 

const galeriFoto = {
  1: foto1,
  2: foto2,
  3: foto3,
  4: foto4,
  5: foto5,
  6: foto6,
  7: foto7,
  8: foto8,
  9: foto9,
};

function MenuList({ daftarMenu, kategoriAktif, onTambah }) {
  return (
    <section className="rounded-3xl bg-sage p-5 shadow-md sm:p-6">
      <div className="mb-5">
        <h2 className="text-2xl font-extrabold text-hutan-gelap">
          {kategoriAktif === "Semua" ? "Semua Menu" : "Menu " + kategoriAktif}
        </h2>
        <p className="text-sm text-hutan-gelap/80">
          Pilih menu favorit Anda, lalu tekan Tambah.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        {daftarMenu.map(
          (menu) =>
            (kategoriAktif === "Semua" || menu.kategori === kategoriAktif) && (
              <MenuCard
                key={menu.id}
                nama={menu.nama}
                foto={galeriFoto[menu.id]}
                kategori={menu.kategori}
                harga={menu.harga}
                tersedia={menu.tersedia}
                deskripsi={menu.deskripsi}
                onTambah={() => onTambah(menu.id, menu.harga)}
              />
            )
        )}
      </div>
    </section>
  );
}

export default MenuList;

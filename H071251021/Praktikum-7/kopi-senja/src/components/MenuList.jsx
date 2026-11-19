import MenuCard from "./MenuCard.jsx";

function MenuList({ daftarMenu, onTambah }) {
  return (
    <section aria-label="Daftar menu">
      <ul className="grid grid-cols-[repeat(auto-fill,minmax(13rem,1fr))] gap-4">
        {daftarMenu.map((menu) => (
          <MenuCard
            key={menu.id}
            id={menu.id}
            nama={menu.nama}
            gambar={menu.gambar}
            kategori={menu.kategori}
            harga={menu.harga}
            tersedia={menu.tersedia}
            deskripsi={menu.deskripsi}
            onTambah={onTambah}
          />
        ))}
      </ul>
    </section>
  );
}

export default MenuList;

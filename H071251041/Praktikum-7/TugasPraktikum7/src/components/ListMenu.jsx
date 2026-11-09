import MenuCard from "./MenuCard.jsx";

// hapus props kategori dari sini
function ListMenu({ listMenu, onTambah }) {
  return (
    <section className="flex flex-col gap-6">
      <h2 className="text-3xl font-bold text-(--maroon) md:text-4xl">
        Daftar <span className="text-(--merah)">Menu</span>
      </h2>

      <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
        {listMenu.map((menuAsli) => (
          <MenuCard
            key={menuAsli.id}
            nama={menuAsli.nama}
            kategori={menuAsli.kategori}
            harga={menuAsli.harga}
            tersedia={menuAsli.tersedia}
            deskripsi={menuAsli.deskripsi}
            onTambah={() => onTambah(menuAsli.id)}
          />
        ))}
      </div>
    </section>
  );
}

export default ListMenu;
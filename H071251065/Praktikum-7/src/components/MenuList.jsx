import MenuCard from './MenuCard.jsx'

function MenuList({ menu, onTambah }) {
  if (menu.length === 0) {
    return <p className="text-slate-600">Belum ada menu di kategori ini.</p>
  }
  return (
    <ul className="grid gap-4 sm:grid-cols-2">
      {menu.map((m) => (
        <MenuCard key={m.id} id={m.id} nama={m.nama} kategori={m.kategori} harga={m.harga} tersedia={m.tersedia} deskripsi={m.deskripsi} onTambah={onTambah}
        />
      ))}
    </ul>
  )
}

export default MenuList

import MenuCard from './MenuCard'

export default function MenuList({ daftarMenu, pesanan, onTambah }) {
  return (
    <section aria-label="Daftar menu" className="rounded-2xl bg-white px-5 shadow-sm ring-1 ring-ink/10">
      <ul className="divide-y divide-ink/10">
        {daftarMenu.map((menu) => (
          <MenuCard
            key={menu.id}
            menu={menu}
            jumlahDipesan={pesanan.find((p) => p.id === menu.id)?.jumlah ?? 0}
            onTambah={onTambah}
          />
        ))}
      </ul>
    </section>
  )
}

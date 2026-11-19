const menuItems = [
  { id: 1, label: 'Beranda', href: '#beranda' },
  { id: 2, label: 'Tentang', href: '#tentang' },
  { id: 3, label: 'Keahlian', href: '#keahlian' },
  { id: 4, label: 'Galeri', href: '#galeri' },
]

function Navbar() {
  return (
    <header className="sticky top-3 z-50 px-4">
      <nav className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-2 rounded-3xl border border-white/15 bg-brand-dark/60 px-6 py-3 shadow-lg shadow-brand/40 backdrop-blur-xl sm:flex-row sm:rounded-full">
        <a href="#beranda" className="text-xl font-extrabold uppercase tracking-[0.2em] text-white">
          Zahwa</a>
        <ul className="flex flex-wrap items-center justify-center gap-1 text-sm font-semibold">
          {menuItems.map((menu) => (
            <li key={menu.id}>
              <a
                href={menu.href}
                onClick={() => console.log(menu.label)}
                className="rounded-full border border-transparent px-4 py-2 text-white/80 transition hover:border-accent hover:text-accent"
              >
                {menu.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  )
}

export default Navbar

const menus = [
  { id: 1, label: 'Beranda', href: '#beranda' },
  { id: 2, label: 'Tentang', href: '#tentang' },
  { id: 3, label: 'Keahlian', href: '#keahlian' },
  { id: 4, label: 'Galeri', href: '#galeri' },
]

function Navbar() {
  return (
    <header className="fixed inset-x-0 bottom-0 z-50 border-t border-line bg-ink/90 backdrop-blur md:bottom-auto md:top-0 md:border-b md:border-t-0">
      <nav
        aria-label="Navigasi utama"
        className="mx-auto flex max-w-6xl items-center justify-around px-4 md:justify-between md:px-8"
      >
        <a
          href="#beranda"
          className="hidden font-display text-lg font-bold text-mint md:block"
        >
          Muh Naufal Alim
        </a>
        <ul className="flex w-full items-center justify-around md:w-auto md:gap-2">
          {menus.map((menu) => (
            <li key={menu.id}>
              <a
                href={menu.href}
                onClick={() => console.log(menu.label)}
                className="block px-3 py-4 text-sm font-medium text-muted transition-colors hover:text-mint focus-visible:text-mint focus-visible:outline-2 focus-visible:outline-mint md:px-4"
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

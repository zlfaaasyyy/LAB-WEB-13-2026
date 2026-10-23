const menus = ["Home", "About", "Skills", "Gallery"];

function Navbar() {
  return (
    <nav className="sticky top-0 z-50 border-b border-(--merah) bg-(--pink--muda) px-6 py-3 sm:px-8 md:px-16">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold text-(--maroon) md:text-4xl">
          Addah
        </h2>

        {/* Menu Desktop */}
        <ul className="hidden items-center gap-8 text-(--maroon) md:flex">
          {menus.map((menu) => (
            <li key={menu}>
              <a
                href={"#" + menu}
                className="cursor-pointer text-base hover:text-(--merah)"
                onClick={() => console.log(menu)}
              >
                {menu}
              </a>
            </li>
          ))}
        </ul>

        {/* Pembungkus Tombol & Kotak Menu HP (Bikin posisinya sejajar pas di bawah hamburger) */}
        <div className="relative flex items-center md:hidden">
          <input type="checkbox" id="menu-toggle" className="peer hidden" ></input>

          <label
            htmlFor="menu-toggle"
            className="cursor-pointer text-2xl text-(--maroon)">
            ☰
          </label>

          {/* ATUR POSISI DI SINI: top-full (di bawah ☰) dan mt-2 (jarak kerapatan) */}
          <ul className="absolute right-0 top-full mt-2 flex w-40 origin-top-right flex-col gap-1 rounded-xl border border-(--merah) bg-(--pink--muda) p-2 shadow-xl opacity-0 scale-95 pointer-events-none transition-all duration-200 peer-checked:opacity-100 peer-checked:scale-100 peer-checked:pointer-events-auto">
            {menus.map((menu) => (
              <li key={menu}>
                <a
                  href={"#" + menu}
                  
                  className="block cursor-pointer rounded-lg px-3 py-2 text-sm text-(--maroon) transition-colors hover:bg-white/50 hover:text-(--merah)"
                  onClick={() => console.log(menu)}
                >
                  {menu}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
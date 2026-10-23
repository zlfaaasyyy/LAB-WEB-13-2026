function Navbar() {
  const menu = ['Home', 'About', 'Skills', 'Gallery']

  return (
    <nav className="sticky top-0 z-50 bg-forest text-cream shadow-lg shadow-black/20">
      <div className="mx-auto flex w-full max-w-295 flex-col items-center gap-2 px-5 py-3 sm:h-17.5 sm:flex-row sm:justify-between sm:gap-0 sm:py-0 md:px-6">
        <h2 className="font-head text-2xl">
          <span className="text-ember">✦</span> Fira's Folio
        </h2>
        <ul className="flex flex-wrap justify-center gap-x-5 gap-y-1 sm:gap-x-8">
          {menu.map((item, index) => (
            <li
              key={index}
              onClick={() => console.log(item)}
              className="relative cursor-pointer py-1.5 font-mono text-[.72rem] uppercase tracking-[.12em] transition-colors duration-300 after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 after:bg-sun after:transition-all after:duration-300 hover:text-sun hover:after:w-full"
            >
              <a href={`#${item}`}>{item}</a>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  )
}

export default Navbar

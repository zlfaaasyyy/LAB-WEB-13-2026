function Navbar() {
  const menu = [
    { id: 1, nama: "Home", target: "#home" },
    { id: 2, nama: "About", target: "#about" },
    { id: 3, nama: "Skills", target: "#skills" },
    { id: 4, nama: "Gallery", target: "#gallery" },
    { id: 5, nama: "Contact", target: "#contact" },
  ];

  const handleClick = (nama) => {
    console.log("Menu diklik:", nama);
  };

  return (
    <nav className="sticky top-0 z-10 border-b border-slate-800 bg-slate-950/80 backdrop-blur">
      <div className="mx-auto flex max-w-5xl flex-col items-center gap-2 px-6 py-3 sm:flex-row sm:justify-between">
        <h2 className="text-xl font-bold text-indigo-400 transition hover:text-indigo-300">
          Arenjiee
        </h2>
        <ul className="flex flex-wrap justify-center gap-5">
          {menu.map((item) => (
            <li key={item.id}>
              <a href={item.target} onClick={() => handleClick(item.nama)} className="font-medium text-slate-400 underline-offset-8 transition hover:text-white hover:underline">
                {item.nama}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;

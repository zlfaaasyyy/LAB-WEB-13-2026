"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const daftarMenu = [
  { nama: "Beranda", path: "/" },
  { nama: "Katalog", path: "/katalog" },
  { nama: "Usulan Buku", path: "/usulan" },
];

function Navbar() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-10 border-b border-line bg-surface/90 shadow-sm shadow-berry/5 backdrop-blur">
      <nav className="mx-auto flex max-w-5xl flex-wrap items-center justify-between gap-3 px-5 py-4">
        <Link
          href="/"
          className="text-xl font-bold text-berry transition hover:text-berry-dark motion-safe:hover:scale-105"
        >
          Pustaka Senja
        </Link>
        <ul className="flex items-center gap-2 text-sm">
          {daftarMenu.map((item) => {
            const isActive =
              item.path === "/" ? pathname === "/" : pathname?.startsWith(item.path);
            return (
              <li key={item.path}>
                <Link
                  href={item.path}
                  aria-current={isActive ? "page" : undefined}
                  className={
                    isActive
                      ? "block rounded-full bg-berry px-4 py-1.5 font-semibold text-white shadow-md shadow-berry/30"
                      : "block rounded-full px-4 py-1.5 text-mute transition hover:bg-soft hover:text-berry"
                  }
                >
                  {item.nama}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </header>
  );
}

export default Navbar;
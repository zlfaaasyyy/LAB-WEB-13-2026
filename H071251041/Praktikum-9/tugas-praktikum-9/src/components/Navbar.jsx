"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const daftarMenu = [
  { nama: "Beranda", path: "/" },
  { nama: "Katalog", path: "/katalog" },
  { nama: "Usulan Buku", path: "/usulan" }
];

function Navbar() {
  const pathname = usePathname();

  function cekWarna(path) {
    let aktif = false;
    if (path === "/") {
      aktif = pathname === "/";
    } else {
      aktif = pathname.startsWith(path);
    }

    if (aktif) {
      return "rounded-full bg-(--merah) px-4 py-1.5 text-xs font-bold text-white shadow-xs md:px-5 md:py-2 md:text-sm";
    } else {
      return "rounded-full px-4 py-1.5 text-xs font-semibold text-(--coklat) transition hover:bg-white/50 hover:text-(--maroon) md:px-5 md:py-2 md:text-sm";
    }
  }

  return (
    <nav className="sticky top-0 z-50 border-b border-(--merah)/20 bg-(--pink--muda) px-4 py-3 shadow-xs md:px-16">
      <div className="flex items-center justify-between gap-3 md:gap-6">
        {/* Brand / Logo */}
        <Link
          href="/"
          className="text-lg font-bold tracking-tight text-(--maroon) transition hover:opacity-85 md:text-2xl"
        >
          Pustaka Senja
        </Link>

        {/* Area Navigasi Kanan */}
        <div className="flex items-center gap-3 md:gap-4">
          {/* Menu Pilihan */}
          <ul className="flex items-center gap-1 md:gap-1.5">
            {daftarMenu.map((item) => (
              <li key={item.path}>
                <Link href={item.path} className={cekWarna(item.path)}>
                  {item.nama}
                </Link>
              </li>
            ))}
          </ul>

          {/*tambah buku*/}
          <Link
            href="/katalog/tambah"
            className="inline-flex items-center rounded-full border border-(--merah) bg-(--putih) px-4 py-1.5 text-xs font-bold text-(--maroon) shadow-xs transition duration-200 hover:bg-white hover:shadow-md motion-safe:hover:scale-[1.02] md:px-5 md:py-2 md:text-sm"
          >
            + Tambah Buku
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
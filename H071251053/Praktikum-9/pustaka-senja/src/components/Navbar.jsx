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
    <nav className="bg-slate-900 border-b border-slate-800 sticky top-0 z-10">
      <div className="max-w-5xl mx-auto px-6 py-4 flex flex-wrap items-center justify-between gap-3">
        <Link href="/" className="text-lg font-bold tracking-widest text-white">
          PUSTAKA <span className="text-orange-400">SENJA</span>
        </Link>
        <ul className="flex items-center gap-5 sm:gap-6">
          {daftarMenu.map((item) => {
            const isActive =
              item.path === "/"
                ? pathname === "/"
                : pathname.startsWith(item.path);

            return (
              <li key={item.path}>
                <Link
                  href={item.path}
                  className={
                    isActive
                      ? "text-white text-sm font-semibold border-b-2 border-orange-400 pb-1"
                      : "text-slate-400 text-sm hover:text-slate-200 transition"
                  }
                >
                  {item.nama}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;

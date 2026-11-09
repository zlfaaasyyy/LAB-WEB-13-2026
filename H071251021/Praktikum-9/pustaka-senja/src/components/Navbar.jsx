"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const daftarMenu = [
  { nama: "Beranda", path: "/" },
  { nama: "Katalog", path: "/katalog" },
  { nama: "Usulan Buku", path: "/usulan" },
];

export default function Navbar() {
  const pathname = usePathname();

  return (
    <nav className="navbar" aria-label="Navigasi utama">
      <div className="wrap navbar-isi">
        <Link href="/" className="merek">
          <svg className="merek-tanda" viewBox="0 0 32 32" aria-hidden="true">
            <circle cx="16" cy="19" r="9" fill="#f4b07a" />
            <rect x="0" y="19" width="32" height="13" fill="#17121f" />
            <path d="M2 21h28M5 25h22M9 29h14" stroke="#f2e9dc" strokeWidth="1.6" strokeLinecap="round" />
          </svg>
          <span>Pustaka Senja</span>
        </Link>

        <ul className="menu">
          {daftarMenu.map((item) => {
            const aktif =
              item.path === "/" ? pathname === "/" : pathname.startsWith(item.path);
            return (
              <li key={item.path}>
                <Link href={item.path} aria-current={aktif ? "page" : undefined}>
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

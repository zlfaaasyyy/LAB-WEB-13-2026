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
    <nav className="sticky top-0 z-10 border-b border-[#d9d0c4] bg-[#f3efe8]/95 backdrop-blur">
      <div className="mx-auto flex max-w-5xl flex-col gap-3 px-6 py-4 sm:flex-row sm:items-center sm:justify-between">
        <Link href="/" className="font-serif text-xl font-bold tracking-tight text-[#a64f37]">
          Pustaka Senja
        </Link>

        <ul className="flex items-center gap-6">
          {daftarMenu.map((item) => {
            // "/" hanya aktif bila persis di "/", menu lain aktif juga di sub-halaman (/katalog/1)
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
                      ? "border-b border-[#a64f37] pb-1 font-semibold text-[#29251f]"
                      : "text-[#766d62] transition hover:text-[#a64f37]"
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

"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const daftarMenu = [
  { nama: "Home", path: "/" },
  { nama: "About", path: "/about" },
  { nama: "Contact", path: "/contact" },
];

export default function Navbar() {
  const pathname = usePathname();

  return (
    <nav className="">
      <ul className="flex flex-row gap-5 justify-center">
        {daftarMenu.map((item) => {
          const isActive =
            item.path === "/"
              ? pathname === "/"
              : pathname.startsWith(item.path);

          return (
            <li key={item.path}>
              <Link
                href={item.path}
                style={{
                  fontWeight: isActive ? "bold" : "normal",
                }}
              >
                {item.nama}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
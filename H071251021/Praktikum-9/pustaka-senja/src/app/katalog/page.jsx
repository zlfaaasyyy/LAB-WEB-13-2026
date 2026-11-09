import Link from "next/link";
import pool from "@/lib/db";
import RakBuku from "@/components/RakBuku";
import BukuCard from "@/components/BukuCard";
import { idPengunjung } from "@/lib/pengunjung";

export const dynamic = "force-dynamic";
export const metadata = { title: "Katalog | Pustaka Senja" };

export default async function KatalogPage() {
  const pengunjung = await idPengunjung();
  const [{ rows: buku }, { rows: fav }] = await Promise.all([
    pool.query("SELECT * FROM buku ORDER BY id"),
    pengunjung
      ? pool.query("SELECT buku_id FROM favorit WHERE pengunjung_id = $1", [pengunjung])
      : { rows: [] },
  ]);
  const idFavorit = new Set(fav.map((r) => r.buku_id));

  return (
    <>
      <header className="wrap flex flex-wrap items-end justify-between gap-5" style={{ paddingBlock: "clamp(2rem, 6vw, 4rem) 0" }}>
        <div>
          <h1 className="judul-halaman">Katalog</h1>
          <p className="lead" style={{ marginTop: "0.75rem" }}>
            {buku.length} buku tersimpan di rak. Geser rak untuk menjelajah, atau lihat daftar lengkapnya di bawah.
          </p>
        </div>
        <Link href="/katalog/baru" className="btn btn-utama">Tambah Buku</Link>
      </header>

      <RakBuku buku={buku} />

      <section className="wrap" style={{ marginTop: "4.5rem" }} aria-labelledby="semua-heading">
        <h2 id="semua-heading" className="judul-seksi" style={{ marginBottom: "1.5rem" }}>Semua koleksi</h2>
        {buku.length === 0 ? (
          <p className="t-kabut">Belum ada buku.</p>
        ) : (
          <div className="daftar-buku">
            {buku.map((b) => <BukuCard key={b.id} buku={b} favorit={idFavorit.has(b.id)} tampilAksi />)}
          </div>
        )}
      </section>
    </>
  );
}

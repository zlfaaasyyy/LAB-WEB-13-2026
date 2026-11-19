import pool from "@/lib/db";
import Hero from "@/components/Hero";
import RakBuku from "@/components/RakBuku";
import BerandaAktivitas from "@/components/BerandaAktivitas";
import { idPengunjung } from "@/lib/pengunjung";

export const dynamic = "force-dynamic";

export default async function BerandaPage() {
  const pengunjung = await idPengunjung();
  const [{ rows: buku }, { rows: stat }, { rows: favorit }, { rows: usulan }] = await Promise.all([
    pool.query("SELECT * FROM buku ORDER BY id"),
    pool.query(
      `SELECT COUNT(*)::int AS total,
              COUNT(*) FILTER (WHERE tersedia)::int AS tersedia,
              COUNT(*) FILTER (WHERE NOT tersedia)::int AS dipinjam
         FROM buku`
    ),
    pengunjung
      ? pool.query(
          `SELECT b.* FROM favorit f JOIN buku b ON b.id = f.buku_id
            WHERE f.pengunjung_id = $1 ORDER BY f.dibuat_pada DESC`,
          [pengunjung]
        )
      : { rows: [] },
    pool.query("SELECT * FROM usulan ORDER BY dibuat_pada DESC, id DESC LIMIT 6"),
  ]);
  const { total, tersedia, dipinjam } = stat[0];

  return (
    <>
      <Hero>
        <p className="kalimat-stat">
          Total koleksi <b>{total}</b> buku, <b className="ok">{tersedia}</b> tersedia,{" "}
          <b className="pinjam">{dipinjam}</b> sedang dipinjam.
        </p>
      </Hero>

      <RakBuku buku={buku} />

      <div className="wrap" style={{ marginTop: "5rem" }}>
        <BerandaAktivitas bukuFavorit={favorit} usulan={usulan} />
      </div>
    </>
  );
}

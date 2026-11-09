import Link from "next/link";
import { notFound } from "next/navigation";
import pool from "@/lib/db";
import { idValid } from "@/lib/validasi";
import { hueKategori } from "@/lib/kategori";
import Sampul from "@/components/Sampul";
import TombolHapus from "@/components/TombolHapus";

export const dynamic = "force-dynamic";

export default async function DetailBukuPage({ params }) {
  const { id } = await params;
  if (!idValid(id)) notFound();

  const { rows } = await pool.query("SELECT * FROM buku WHERE id = $1", [id]);
  const buku = rows[0];
  if (!buku) notFound();

  return (
    <div className="wrap" style={{ paddingBlock: "clamp(1.5rem, 5vw, 3.5rem)" }}>
      <Link href="/katalog" className="tautan" style={{ display: "inline-block", marginBottom: "2rem" }}>
        Kembali ke katalog
      </Link>

      <div className="detail">
        <div className="detail-sampul" style={{ "--h": hueKategori(buku.kategori) }}>
          <div className="papan"><Sampul buku={buku} besar /></div>
        </div>

        <article>
          <div className="entri-meta">
            <span className="chip chip-kat">{buku.kategori}</span>
            <span className={`chip ${buku.tersedia ? "chip-ok" : "chip-pinjam"}`}>
              {buku.tersedia ? "Tersedia" : "Sedang Dipinjam"}
            </span>
          </div>
          <h1 className="judul-halaman" style={{ marginBlock: "0.5rem 0.75rem" }}>{buku.judul}</h1>
          <p className="lead">Ditulis oleh {buku.penulis}</p>

          <dl className="fakta">
            <div><dt>Kategori</dt><dd>{buku.kategori}</dd></div>
            <div><dt>Tahun terbit</dt><dd>{buku.tahun}</dd></div>
            <div><dt>Status</dt><dd>{buku.tersedia ? "Tersedia" : "Sedang Dipinjam"}</dd></div>
          </dl>

          <h2 className="t-redup" style={{ fontSize: "0.9rem", fontWeight: 500, marginBottom: "0.5rem" }}>Sinopsis</h2>
          <p className="sinopsis">{buku.sinopsis}</p>

          <div className="flex flex-wrap items-center gap-3" style={{ marginTop: "2.25rem" }}>
            <Link href={`/katalog/${buku.id}/edit`} className="btn btn-garis">Edit Buku</Link>
            <TombolHapus id={buku.id} judul={buku.judul} kembali="katalog" gaya="tombol" />
          </div>
        </article>
      </div>
    </div>
  );
}

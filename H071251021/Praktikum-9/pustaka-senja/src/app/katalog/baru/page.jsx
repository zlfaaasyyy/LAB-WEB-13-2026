import pool from "@/lib/db";
import FormBuku from "@/components/FormBuku";
import { tambahBuku } from "../actions";

export const dynamic = "force-dynamic";
export const metadata = { title: "Tambah Buku | Pustaka Senja" };

export default async function TambahBukuPage() {
  const { rows } = await pool.query("SELECT DISTINCT kategori FROM buku ORDER BY kategori");

  return (
    <div className="wrap" style={{ paddingBlock: "clamp(2rem, 6vw, 4rem)", maxWidth: "44rem" }}>
      <h1 className="judul-halaman" style={{ marginBottom: "0.75rem" }}>Tambah buku</h1>
      <p className="lead" style={{ marginBottom: "2rem" }}>Buku baru langsung masuk ke rak dan statistik koleksi.</p>
      <FormBuku
        aksi={tambahBuku}
        awal={{ judul: "", penulis: "", kategori: "", tahun: "", tersedia: "true", sinopsis: "" }}
        kategoriSaran={rows.map((r) => r.kategori)}
        labelKirim="Simpan Buku"
        batalHref="/katalog"
      />
    </div>
  );
}

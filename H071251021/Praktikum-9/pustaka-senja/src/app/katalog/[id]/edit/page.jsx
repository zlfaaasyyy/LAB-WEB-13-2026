import { notFound } from "next/navigation";
import pool from "@/lib/db";
import { idValid } from "@/lib/validasi";
import FormBuku from "@/components/FormBuku";
import { ubahBuku } from "../../actions";

export const dynamic = "force-dynamic";
export const metadata = { title: "Edit Buku | Pustaka Senja" };

export default async function EditBukuPage({ params }) {
  const { id } = await params;
  if (!idValid(id)) notFound();

  const { rows } = await pool.query("SELECT * FROM buku WHERE id = $1", [id]);
  const buku = rows[0];
  if (!buku) notFound();

  const { rows: kat } = await pool.query("SELECT DISTINCT kategori FROM buku ORDER BY kategori");

  return (
    <div className="wrap" style={{ paddingBlock: "clamp(2rem, 6vw, 4rem)", maxWidth: "44rem" }}>
      <h1 className="judul-halaman" style={{ marginBottom: "0.75rem" }}>Edit buku</h1>
      <p className="lead" style={{ marginBottom: "2rem" }}>Mengubah data buku nomor {buku.id}.</p>
      <FormBuku
        aksi={ubahBuku}
        id={buku.id}
        awal={{
          judul: buku.judul,
          penulis: buku.penulis,
          kategori: buku.kategori,
          tahun: String(buku.tahun),
          tersedia: String(buku.tersedia),
          sinopsis: buku.sinopsis,
        }}
        kategoriSaran={kat.map((r) => r.kategori)}
        labelKirim="Simpan Perubahan"
        batalHref={`/katalog/${buku.id}`}
      />
    </div>
  );
}

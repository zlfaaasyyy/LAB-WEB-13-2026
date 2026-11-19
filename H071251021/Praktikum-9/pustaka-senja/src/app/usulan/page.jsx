import pool from "@/lib/db";
import FormUsulan from "@/components/FormUsulan";
import KartuUsulan from "@/components/KartuUsulan";

export const dynamic = "force-dynamic";
export const metadata = { title: "Usulan Buku | Pustaka Senja" };

export default async function UsulanPage() {
  const { rows } = await pool.query("SELECT * FROM usulan ORDER BY dibuat_pada DESC, id DESC");

  return (
    <div className="wrap" style={{ paddingBlock: "clamp(2rem, 6vw, 4rem)", maxWidth: "44rem" }}>
      <h1 className="judul-halaman" style={{ marginBottom: "0.75rem" }}>Usulkan buku baru</h1>
      <p className="lead" style={{ marginBottom: "2rem" }}>
        Punya rekomendasi buku yang ingin Anda baca di Pustaka Senja? Sampaikan lewat formulir ini.
      </p>

      <FormUsulan />

      {rows.length > 0 && (
        <section aria-labelledby="daftar-usulan-heading" className="grid gap-4" style={{ marginTop: "3.5rem" }}>
          <h2 id="daftar-usulan-heading" className="judul-seksi">Daftar usulan ({rows.length})</h2>
          {rows.map((item) => <KartuUsulan key={item.id} item={item} />)}
        </section>
      )}
    </div>
  );
}

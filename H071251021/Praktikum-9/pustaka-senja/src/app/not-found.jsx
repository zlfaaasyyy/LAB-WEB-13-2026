import Link from "next/link";

export const metadata = { title: "Buku tidak ditemukan | Pustaka Senja" };

export default function NotFound() {
  return (
    <div className="wrap" style={{ paddingBlock: "clamp(3rem, 10vw, 7rem)" }}>
      <p className="hero-judul" aria-hidden="true">404</p>
      <h1 className="judul-seksi" style={{ marginBlock: "1rem 0.5rem" }}>Rak ini kosong</h1>
      <p className="lead" style={{ marginBottom: "1.5rem" }}>
        Buku atau halaman yang Anda cari tidak ditemukan. Mungkin nomornya salah, atau bukunya sudah dihapus.
      </p>
      <Link href="/katalog" className="btn btn-utama">Kembali ke Katalog</Link>
    </div>
  );
}

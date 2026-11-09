"use client";

export default function Error({ reset }) {
  return (
    <div className="wrap" style={{ paddingBlock: "clamp(3rem, 10vw, 7rem)" }}>
      <h1 className="judul-seksi">Data belum bisa dimuat</h1>
      <p className="lead" style={{ marginBlock: "0.75rem 1.5rem" }}>
        Aplikasi tidak dapat menghubungi database. Pastikan PostgreSQL berjalan dan DATABASE_URL di .env.local sudah benar.
      </p>
      <button type="button" className="btn btn-utama" onClick={() => reset()}>Coba Lagi</button>
    </div>
  );
}

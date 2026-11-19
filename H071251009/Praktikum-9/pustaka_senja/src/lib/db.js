import { Pool } from "pg";

// Pool dibuat satu kali dan disimpan di globalThis agar tidak membuat koneksi
// baru setiap kali Next.js me-reload kode saat mode development.
// Berkas ini hanya boleh diimpor oleh kode server (Server Component / Server Action).
const globalForPg = globalThis;

const pool =
  globalForPg.pgPool ??
  new Pool({
    connectionString: process.env.DATABASE_URL,
  });

if (process.env.NODE_ENV !== "production") {
  globalForPg.pgPool = pool;
}

export default pool;

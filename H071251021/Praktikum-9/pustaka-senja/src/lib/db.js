import "server-only";
import { Pool } from "pg";

// Satu Pool dipakai bersama. Disimpan di globalThis agar tidak membuat
// koneksi baru setiap kali file di-reload saat `npm run dev`.
const pool =
  globalThis.__pustakaPool ??
  new Pool({ connectionString: process.env.DATABASE_URL });

if (process.env.NODE_ENV !== "production") {
  globalThis.__pustakaPool = pool;
}

export default pool;

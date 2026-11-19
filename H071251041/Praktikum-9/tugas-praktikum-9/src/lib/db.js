import { Pool } from "pg";

// Pool = kumpulan koneksi ke PostgreSQL yang dipakai bergantian.
// File ini HANYA boleh diimpor dari kode server (Server Component / Server Action).
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

export default pool;

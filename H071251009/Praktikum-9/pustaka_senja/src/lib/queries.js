import pool from "@/lib/db";

const BATAS_INTEGER = 2147483647;

// ID dari URL harus berupa bilangan bulat positif yang muat di kolom SERIAL.
export function idValid(id) {
  const teks = String(id);
  return /^\d+$/.test(teks) && Number(teks) > 0 && Number(teks) <= BATAS_INTEGER;
}

export async function ambilSemuaBuku(kategori = "Semua", pencarian = "") {
  const kondisi = [];
  const nilai = [];

  if (kategori !== "Semua") {
    nilai.push(kategori);
    kondisi.push(`kategori = $${nilai.length}`);
  }

  if (pencarian) {
    nilai.push(pencarian);
    kondisi.push(
      `(POSITION(LOWER($${nilai.length}) IN LOWER(judul)) > 0
        OR POSITION(LOWER($${nilai.length}) IN LOWER(penulis)) > 0)`
    );
  }

  const where = kondisi.length > 0 ? `WHERE ${kondisi.join(" AND ")}` : "";
  const { rows } = await pool.query(
    `SELECT id, judul, penulis, kategori, tahun, tersedia, sinopsis
     FROM buku ${where}
     ORDER BY id ASC`,
    nilai
  );
  return rows;
}

export async function ambilBukuById(id) {
  if (!idValid(id)) return null;

  const { rows } = await pool.query(
    "SELECT id, judul, penulis, kategori, tahun, tersedia, sinopsis FROM buku WHERE id = $1",
    [Number(id)]
  );
  return rows[0] ?? null;
}

export async function ambilStatistik() {
  const { rows } = await pool.query(
    `SELECT
       COUNT(*)::int AS total,
       COUNT(*) FILTER (WHERE tersedia)::int AS tersedia,
       COUNT(*) FILTER (WHERE NOT tersedia)::int AS dipinjam
     FROM buku`
  );
  return rows[0];
}

"use server";

import { revalidatePath } from "next/cache";
import pool from "@/lib/db";
import { idValid } from "@/lib/validasi";
import { pastikanIdPengunjung } from "@/lib/pengunjung";

// Menambah favorit bila belum ada, menghapusnya bila sudah ada.
export async function toggleFavorit(formData) {
  const id = String(formData.get("id") ?? "");
  if (!idValid(id)) return;

  try {
    const pengunjung = await pastikanIdPengunjung();
    const hapus = await pool.query(
      "DELETE FROM favorit WHERE pengunjung_id = $1 AND buku_id = $2",
      [pengunjung, id]
    );
    if (hapus.rowCount === 0) {
      await pool.query(
        "INSERT INTO favorit (pengunjung_id, buku_id) VALUES ($1, $2) ON CONFLICT DO NOTHING",
        [pengunjung, id]
      );
    }
  } catch (err) {
    console.error("Gagal mengubah favorit:", err);
    return;
  }

  revalidatePath("/");
  revalidatePath("/katalog");
}

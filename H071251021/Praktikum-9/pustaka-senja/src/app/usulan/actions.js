"use server";

import { revalidatePath } from "next/cache";
import pool from "@/lib/db";
import { bacaFormUsulan } from "@/lib/validasi";

const KOSONG = { namaPengusul: "", judulBuku: "", kategori: "", alasan: "" };

export async function kirimUsulan(_state, formData) {
  const { ok, errors, nilai } = bacaFormUsulan(formData);
  if (!ok) return { errors, nilai };

  try {
    await pool.query(
      "INSERT INTO usulan (nama_pengusul, judul_buku, kategori, alasan) VALUES ($1, $2, $3, $4)",
      [nilai.namaPengusul, nilai.judulBuku, nilai.kategori, nilai.alasan]
    );
  } catch (err) {
    console.error("Gagal INSERT usulan:", err);
    return { errors: {}, nilai, pesan: "Usulan belum tersimpan karena database bermasalah. Coba lagi sebentar lagi." };
  }

  revalidatePath("/");
  revalidatePath("/usulan");
  return {
    errors: {},
    nilai: KOSONG,
    sukses: `Terima kasih, ${nilai.namaPengusul}! Usulan buku "${nilai.judulBuku}" berhasil dikirim untuk dipertimbangkan.`,
  };
}

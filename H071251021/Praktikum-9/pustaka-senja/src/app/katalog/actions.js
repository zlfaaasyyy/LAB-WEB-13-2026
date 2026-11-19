"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import pool from "@/lib/db";
import { bacaFormBuku, idValid } from "@/lib/validasi";

const PESAN_DB = "Perubahan belum tersimpan karena database sedang bermasalah. Coba lagi sebentar lagi.";

function segarkan(id) {
  revalidatePath("/");
  revalidatePath("/katalog");
  if (id) revalidatePath(`/katalog/${id}`);
}

// CREATE
export async function tambahBuku(_state, formData) {
  const { ok, errors, nilai, data } = bacaFormBuku(formData);
  if (!ok) return { errors, nilai };

  try {
    await pool.query(
      "INSERT INTO buku (judul, penulis, kategori, tahun, tersedia, sinopsis) VALUES ($1, $2, $3, $4, $5, $6)",
      [data.judul, data.penulis, data.kategori, data.tahun, data.tersedia, data.sinopsis]
    );
  } catch (err) {
    console.error("Gagal INSERT buku:", err);
    return { errors: {}, nilai, pesan: PESAN_DB };
  }

  segarkan();
  redirect("/katalog"); // redirect melempar error internal: harus di luar try/catch
}

// UPDATE
export async function ubahBuku(_state, formData) {
  const id = String(formData.get("id") ?? "");
  const { ok, errors, nilai, data } = bacaFormBuku(formData);
  if (!idValid(id)) return { errors: {}, nilai, pesan: "ID buku tidak valid." };
  if (!ok) return { errors, nilai };

  let ditemukan = false;
  try {
    const hasil = await pool.query(
      "UPDATE buku SET judul = $1, penulis = $2, kategori = $3, tahun = $4, tersedia = $5, sinopsis = $6 WHERE id = $7",
      [data.judul, data.penulis, data.kategori, data.tahun, data.tersedia, data.sinopsis, id]
    );
    ditemukan = hasil.rowCount > 0;
  } catch (err) {
    console.error("Gagal UPDATE buku:", err);
    return { errors: {}, nilai, pesan: PESAN_DB };
  }

  if (!ditemukan) return { errors: {}, nilai, pesan: "Buku ini sudah tidak ada di database." };

  segarkan(id);
  redirect(`/katalog/${id}`);
}

// DELETE
export async function hapusBuku(formData) {
  const id = String(formData.get("id") ?? "");
  if (!idValid(id)) return;

  try {
    await pool.query("DELETE FROM buku WHERE id = $1", [id]);
  } catch (err) {
    console.error("Gagal DELETE buku:", err);
    return;
  }

  segarkan(id);
  if (formData.get("kembali") === "katalog") redirect("/katalog");
}

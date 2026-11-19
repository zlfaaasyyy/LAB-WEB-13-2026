"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import pool from "@/lib/db";
import { idValid } from "@/lib/queries";
import { daftarKategori } from "@/lib/kategori";

// Validasi bersama untuk Create dan Update. Fungsi ini tidak diekspor
// (berkas "use server" hanya boleh mengekspor fungsi async / Server Action).
function validasiBuku(formData) {
  const values = {
    judul: String(formData.get("judul") ?? "").trim(),
    penulis: String(formData.get("penulis") ?? "").trim(),
    kategori: String(formData.get("kategori") ?? "").trim(),
    tahun: String(formData.get("tahun") ?? "").trim(),
    tersedia: formData.get("tersedia") === "on",
    sinopsis: String(formData.get("sinopsis") ?? "").trim(),
  };

  const errors = {};
  const tahunSekarang = new Date().getFullYear();
  const tahunAngka = Number(values.tahun);

  if (values.judul === "") errors.judul = "Judul wajib diisi.";
  else if (values.judul.length > 200) errors.judul = "Judul maksimal 200 karakter.";

  if (values.penulis === "") errors.penulis = "Penulis wajib diisi.";
  else if (values.penulis.length > 100) errors.penulis = "Penulis maksimal 100 karakter.";

  if (!daftarKategori.includes(values.kategori)) {
    errors.kategori = "Pilih salah satu kategori yang tersedia.";
  }

  if (values.tahun === "" || !Number.isInteger(tahunAngka)) {
    errors.tahun = "Tahun terbit harus berupa bilangan bulat.";
  } else if (tahunAngka < 1400 || tahunAngka > tahunSekarang + 1) {
    errors.tahun = `Tahun terbit harus antara 1400 dan ${tahunSekarang + 1}.`;
  }

  if (values.sinopsis === "") errors.sinopsis = "Sinopsis wajib diisi.";

  return { errors, values, tahunAngka };
}

// ---------- CREATE ----------
export async function tambahBuku(prevState, formData) {
  const { errors, values, tahunAngka } = validasiBuku(formData);

  if (Object.keys(errors).length > 0) {
    return { errors, values, pesan: "Periksa kembali isian form." };
  }

  try {
    await pool.query(
      `INSERT INTO buku (judul, penulis, kategori, tahun, tersedia, sinopsis)
       VALUES ($1, $2, $3, $4, $5, $6)`,
      [values.judul, values.penulis, values.kategori, tahunAngka, values.tersedia, values.sinopsis]
    );
  } catch (error) {
    console.error("Gagal menambah buku:", error.message);
    return { errors: {}, values, pesan: "Gagal menyimpan ke database. Coba lagi." };
  }

  revalidatePath("/");
  revalidatePath("/katalog");
  redirect("/katalog"); // redirect harus di luar try/catch
}

// ---------- UPDATE ----------
// Dipanggil dengan .bind(null, id) sehingga argumen pertama adalah id buku.
export async function ubahBuku(id, prevState, formData) {
  if (!idValid(id)) {
    return { errors: {}, values: null, pesan: "ID buku tidak valid." };
  }

  const { errors, values, tahunAngka } = validasiBuku(formData);

  if (Object.keys(errors).length > 0) {
    return { errors, values, pesan: "Periksa kembali isian form." };
  }

  let hasil;
  try {
    hasil = await pool.query(
      `UPDATE buku
       SET judul = $1, penulis = $2, kategori = $3, tahun = $4, tersedia = $5, sinopsis = $6
       WHERE id = $7`,
      [values.judul, values.penulis, values.kategori, tahunAngka, values.tersedia, values.sinopsis, Number(id)]
    );
  } catch (error) {
    console.error("Gagal mengubah buku:", error.message);
    return { errors: {}, values, pesan: "Gagal menyimpan perubahan. Coba lagi." };
  }

  if (hasil.rowCount === 0) {
    return { errors: {}, values, pesan: "Buku tidak ditemukan atau sudah dihapus." };
  }

  revalidatePath("/");
  revalidatePath("/katalog");
  revalidatePath(`/katalog/${id}`);
  redirect(`/katalog/${id}`);
}

// ---------- DELETE ----------
export async function hapusBuku(id) {
  if (!idValid(id)) {
    throw new Error("ID buku tidak valid.");
  }

  try {
    await pool.query("DELETE FROM buku WHERE id = $1", [Number(id)]);
  } catch (error) {
    console.error("Gagal menghapus buku:", error.message);
    throw new Error("Gagal menghapus buku.");
  }

  revalidatePath("/");
  revalidatePath("/katalog");
  redirect("/katalog");
}

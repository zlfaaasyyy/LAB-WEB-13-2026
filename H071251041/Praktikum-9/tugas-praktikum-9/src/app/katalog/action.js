"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import pool from "@/lib/db";

// validasi apakah ID berupa angka bulat positif
function idValid(id) {
  if (!id) {
    return false;
  }
  const angka = Number(id);
  if (Number.isInteger(angka) && angka > 0) {
    return true;
  }
  return false;
}

// ambil data dari form
function ambilData(formData) {
  const judul = String(formData.get("judul") || "").trim();
  const penulis = String(formData.get("penulis") || "").trim();
  const kategori = String(formData.get("kategori") || "").trim();
  const tahun = Number(formData.get("tahun"));
  const tersedia = formData.get("tersedia") === "true";
  const sinopsis = String(formData.get("sinopsis") || "").trim();

  return { judul, penulis, kategori, tahun, tersedia, sinopsis };
}

// CREATE
export async function tambahBuku(formData) {
  const data = ambilData(formData);

  await pool.query(
    "INSERT INTO buku (judul, penulis, kategori, tahun, tersedia, sinopsis) VALUES ($1, $2, $3, $4, $5, $6)",
    [data.judul, data.penulis, data.kategori, data.tahun, data.tersedia, data.sinopsis]
  );

  revalidatePath("/");
  revalidatePath("/katalog");
  redirect("/katalog");
}


// UPDATE
export async function ubahBuku(formData) {
  const id = formData.get("id");

  if (!idValid(id)) {
    redirect("/katalog");
  }

  const data = ambilData(formData);

  await pool.query(
    "UPDATE buku SET judul = $1, penulis = $2, kategori = $3, tahun = $4, tersedia = $5, sinopsis = $6 WHERE id = $7",
    [data.judul, data.penulis, data.kategori, data.tahun, data.tersedia, data.sinopsis, id]
  );


  revalidatePath("/");
  revalidatePath("/katalog");
  revalidatePath("/katalog/" + id);
  redirect("/katalog/" + id);
}

// DELETE
export async function hapusBuku(formData) {
  const id = formData.get("id");

  if (!idValid(id)) {
    redirect("/katalog");
  }

  await pool.query("DELETE FROM buku WHERE id = $1", [id]);

  revalidatePath("/");
  revalidatePath("/katalog");
  redirect("/katalog");
}
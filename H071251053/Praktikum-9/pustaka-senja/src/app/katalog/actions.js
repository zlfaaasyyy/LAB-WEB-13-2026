"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import pool from "@/lib/db";

export async function tambahBuku(formData) {
  const judul = formData.get("judul");
  const penulis = formData.get("penulis");
  const kategori = formData.get("kategori");
  const tahun = Number(formData.get("tahun"));
  const tersedia = formData.get("tersedia") === "true";
  const sinopsis = formData.get("sinopsis");

  if (!judul || !penulis || !kategori || !sinopsis) return;
  if (judul.trim() === "" || penulis.trim() === "" || sinopsis.trim() === "") {
    return;
  }
  if (!Number.isInteger(tahun) || tahun < 1700 || tahun > 3000) return;

  await pool.query(
    "INSERT INTO buku (judul, penulis, kategori, tahun, tersedia, sinopsis) VALUES ($1, $2, $3, $4, $5, $6)",
    [judul.trim(), penulis.trim(), kategori, tahun, tersedia, sinopsis.trim()]
  );
  revalidatePath("/katalog");
  revalidatePath("/");
}

export async function ubahBuku(formData) {
  const id = Number(formData.get("id"));
  const judul = formData.get("judul");
  const penulis = formData.get("penulis");
  const kategori = formData.get("kategori");
  const tahun = Number(formData.get("tahun"));
  const tersedia = formData.get("tersedia") === "true";
  const sinopsis = formData.get("sinopsis");

  if (!Number.isInteger(id)) return;
  if (!judul || !penulis || !kategori || !sinopsis) return;
  if (judul.trim() === "" || penulis.trim() === "" || sinopsis.trim() === "") {
    return;
  }
  if (!Number.isInteger(tahun) || tahun < 1 || tahun > 9999) return;

  await pool.query(
    "UPDATE buku SET judul = $1, penulis = $2, kategori = $3, tahun = $4, tersedia = $5, sinopsis = $6 WHERE id = $7",
    [judul.trim(), penulis.trim(), kategori, tahun, tersedia, sinopsis.trim(), id]
  );
  revalidatePath("/katalog");
  revalidatePath(`/katalog/${id}`);
  revalidatePath("/");
  redirect(`/katalog/${id}`);
}

export async function hapusBuku(formData) {
  const id = Number(formData.get("id"));

  if (!Number.isInteger(id)) return;

  await pool.query("DELETE FROM buku WHERE id = $1", [id]);
  revalidatePath("/katalog");
  revalidatePath("/");
}
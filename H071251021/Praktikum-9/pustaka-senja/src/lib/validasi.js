// Validasi input form buku. Dipakai oleh Server Actions (sisi server).
const TAHUN_MIN = 1000;
const TAHUN_MAX = 2100;

export function idValid(id) {
  // hanya angka bulat positif, maksimum 9 digit (aman untuk kolom INTEGER)
  return typeof id === "string" && /^[1-9]\d{0,8}$/.test(id);
}

function teks(formData, nama) {
  return String(formData.get(nama) ?? "").trim();
}

export function bacaFormBuku(formData) {
  const nilai = {
    judul: teks(formData, "judul"),
    penulis: teks(formData, "penulis"),
    kategori: teks(formData, "kategori"),
    tahun: teks(formData, "tahun"),
    tersedia: teks(formData, "tersedia"),
    sinopsis: teks(formData, "sinopsis"),
  };
  const errors = {};

  if (!nilai.judul) errors.judul = "Judul wajib diisi.";
  else if (nilai.judul.length > 200) errors.judul = "Judul maksimal 200 karakter.";

  if (!nilai.penulis) errors.penulis = "Penulis wajib diisi.";
  else if (nilai.penulis.length > 150) errors.penulis = "Nama penulis maksimal 150 karakter.";

  if (!nilai.kategori) errors.kategori = "Kategori wajib diisi.";
  else if (nilai.kategori.length > 50) errors.kategori = "Kategori maksimal 50 karakter.";

  const tahun = Number(nilai.tahun);
  if (!nilai.tahun) errors.tahun = "Tahun terbit wajib diisi.";
  else if (!/^\d+$/.test(nilai.tahun) || !Number.isInteger(tahun))
    errors.tahun = "Tahun harus berupa bilangan bulat, misalnya 2018.";
  else if (tahun < TAHUN_MIN || tahun > TAHUN_MAX)
    errors.tahun = `Tahun harus antara ${TAHUN_MIN} dan ${TAHUN_MAX}.`;

  if (nilai.tersedia !== "true" && nilai.tersedia !== "false")
    errors.tersedia = "Pilih status ketersediaan.";

  if (!nilai.sinopsis) errors.sinopsis = "Sinopsis wajib diisi.";
  else if (nilai.sinopsis.length > 1500) errors.sinopsis = "Sinopsis maksimal 1500 karakter.";

  const ok = Object.keys(errors).length === 0;
  return {
    ok,
    errors,
    nilai,
    data: ok ? { ...nilai, tahun, tersedia: nilai.tersedia === "true" } : null,
  };
}

export const KATEGORI_USULAN = ["Teknologi", "Fiksi", "Pengembangan Diri", "Lainnya"];

export function bacaFormUsulan(formData) {
  const nilai = {
    namaPengusul: teks(formData, "namaPengusul"),
    judulBuku: teks(formData, "judulBuku"),
    kategori: teks(formData, "kategori"),
    alasan: teks(formData, "alasan"),
  };
  const errors = {};

  if (!nilai.namaPengusul) errors.namaPengusul = "Nama pengusul wajib diisi.";
  else if (nilai.namaPengusul.length > 100) errors.namaPengusul = "Nama maksimal 100 karakter.";

  if (!nilai.judulBuku) errors.judulBuku = "Judul buku wajib diisi.";
  else if (nilai.judulBuku.length > 200) errors.judulBuku = "Judul maksimal 200 karakter.";

  if (!KATEGORI_USULAN.includes(nilai.kategori)) errors.kategori = "Pilih salah satu kategori.";

  if (!nilai.alasan) errors.alasan = "Alasan usulan wajib diisi.";
  else if (nilai.alasan.length > 1000) errors.alasan = "Alasan maksimal 1000 karakter.";

  return { ok: Object.keys(errors).length === 0, errors, nilai };
}

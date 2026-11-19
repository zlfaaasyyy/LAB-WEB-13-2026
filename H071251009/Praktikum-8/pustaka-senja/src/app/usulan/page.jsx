"use client";

import { useState } from "react";
const daftarKategori = ["Teknologi", "Fiksi", "Pengembangan Diri"];

const inputClass =
  "w-full border border-[#d0c5b7] bg-[#faf8f3] px-4 py-2 text-[#29251f] placeholder:text-[#9b9185] focus:border-[#a64f37] focus:outline-none";

function validateNama(value) {
  const trimmedValue = value.trim();
  if (
    trimmedValue &&
    (trimmedValue.length < 5 || !/^[\p{L} ]+$/u.test(trimmedValue))
  ) {
    return "Nama hanya boleh berisi huruf dan minimal 5 karakter.";
  }
  return "";
}

function validateJudul(value) {
  return value.trim() && value.trim().length < 4
    ? "Judul buku minimal 4 karakter."
    : "";
}

export default function UsulanPage() {
  const [nama, setNama] = useState("");
  const [judul, setJudul] = useState("");
  const [kategori, setKategori] = useState("");
  const [alasan, setAlasan] = useState("");
  const [status, setStatus] = useState(null); // null | "kosong" | "berhasil"
  const [errors, setErrors] = useState({});
  const [daftarUsulan, setDaftarUsulan] = useState([]);

  function handleSubmit(e) {
    e.preventDefault();

    const nextErrors = {
      nama: validateNama(nama),
      judul: validateJudul(judul),
    };
    setErrors(nextErrors);

    const adaKolomKosong =
      nama.trim() === "" ||
      judul.trim() === "" ||
      kategori === "" ||
      alasan.trim() === "";

    setStatus(adaKolomKosong ? "kosong" : null);

    if (adaKolomKosong || nextErrors.nama || nextErrors.judul) {
      return;
    }

    const usulanBaru = {
      id: Date.now(),
      nama: nama.trim(),
      judul: judul.trim(),
      kategori,
      alasan: alasan.trim(),
    };

    setDaftarUsulan([usulanBaru, ...daftarUsulan]);
    setStatus("berhasil");
    setErrors({});
    setNama("");
    setJudul("");
    setKategori("");
    setAlasan("");
  }

  return (
    <section className="mx-auto max-w-lg">
      <div className="border-y border-[#d9d0c4] bg-[#faf8f3] p-6 sm:p-8">
        <h1 className="mb-2 font-serif text-3xl font-normal text-[#29251f]">Usulan Buku</h1>
        <p className="mb-6 text-sm text-[#766d62]">
          Ada buku yang ingin dibaca di Pustaka Senja? Usulkan judulnya di sini.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="nama" className="mb-1 block text-sm text-[#5b5349]">
              Nama Pengusul
            </label>
            <input
              id="nama"
              type="text"
              placeholder="Masukkan nama Anda"
              value={nama}
              onChange={(e) => {
                setNama(e.target.value);
                setErrors((previous) => ({
                  ...previous,
                  nama: validateNama(e.target.value),
                }));
              }}
              className={inputClass}
              aria-invalid={Boolean(errors.nama)}
              aria-describedby={errors.nama ? "nama-error" : undefined}
            />
            {errors.nama && (
              <p id="nama-error" className="mt-1 text-sm text-rose-700">
                {errors.nama}
              </p>
            )}
          </div>

          <div>
            <label htmlFor="judul" className="mb-1 block text-sm text-[#5b5349]">
              Judul Buku yang Diusulkan
            </label>
            <input
              id="judul"
              type="text"
              placeholder="Contoh: Sapiens"
              value={judul}
              onChange={(e) => {
                setJudul(e.target.value);
                setErrors((previous) => ({
                  ...previous,
                  judul: validateJudul(e.target.value),
                }));
              }}
              className={inputClass}
              aria-invalid={Boolean(errors.judul)}
              aria-describedby={errors.judul ? "judul-error" : undefined}
            />
            {errors.judul && (
              <p id="judul-error" className="mt-1 text-sm text-rose-700">
                {errors.judul}
              </p>
            )}
          </div>

          <div>
            <label htmlFor="kategori" className="mb-1 block text-sm text-[#5b5349]">
              Kategori
            </label>
            <select
              id="kategori"
              value={kategori}
              onChange={(e) => setKategori(e.target.value)}
              className={inputClass}
            >
              <option value="">Pilih kategori</option>
              {daftarKategori.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="alasan" className="mb-1 block text-sm text-[#5b5349]">
              Alasan Usulan
            </label>
            <textarea
              id="alasan"
              rows={4}
              placeholder="Mengapa buku ini perlu ada?"
              value={alasan}
              onChange={(e) => setAlasan(e.target.value)}
              className={inputClass}
            />
          </div>

          <button
            type="submit"
            className="w-full bg-[#a64f37] py-2.5 font-medium text-white transition hover:bg-[#873d2b]"
          >
            Kirim Usulan
          </button>
        </form>

        {status === "kosong" && (
          <p
            role="alert"
            className="mt-4 border border-rose-700/20 bg-rose-700/5 p-3 text-center text-sm text-rose-800"
          >
            Semua kolom wajib diisi sebelum usulan dikirim.
          </p>
        )}
        {status === "berhasil" && (
          <p
            role="status"
            className="mt-4 border border-emerald-700/20 bg-emerald-700/5 p-3 text-center text-sm text-emerald-800"
          >
            Terima kasih, usulan buku Anda sudah terkirim!
          </p>
        )}
      </div>

      {daftarUsulan.length > 0 && (
        <div className="mt-8">
          <h2 className="mb-3 text-lg font-semibold">
            Usulan Anda sesi ini ({daftarUsulan.length})
          </h2>
          <ul className="space-y-3">
            {daftarUsulan.map((usulan) => (
              <li
                key={usulan.id}
                className="border border-[#d9d0c4] bg-[#faf8f3] p-4"
              >
                <p className="font-semibold"> Judul: {usulan.judul}</p>
                <p className="text-xs text-[#a64f37]">Katergorinya: {usulan.kategori}</p>
                <p className="mt-2 text-sm text-[#5b5349]">Alasan mengusulkan: {usulan.alasan}</p>
                <p className="mt-2 text-xs text-[#8b8174]">
                  Diusulkan oleh {usulan.nama}
                </p>
              </li>
            ))}
          </ul>
        </div>
      )}
    </section>
  );
}

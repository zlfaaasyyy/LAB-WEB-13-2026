"use client";

import { useState } from "react";

const daftarKategori = ["Teknologi", "Fiksi", "Pengembangan Diri"];

const inputClass =
  "w-full rounded-xl border border-[#d6c8bb] bg-[#fffdfb] px-4 py-3 text-[#2d2623] shadow-sm placeholder:text-[#9d9187] focus:border-[#a64f37] focus:outline-none focus:ring-2 focus:ring-[#f0d8c3]";

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
  const [status, setStatus] = useState(null);
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

    setDaftarUsulan((previous) => [usulanBaru, ...previous]);
    setStatus("berhasil");
    setErrors({});
    setNama("");
    setJudul("");
    setKategori("");
    setAlasan("");
  }

  return (
    <section className="mx-auto max-w-5xl space-y-8">
      <div className="rounded-[28px] border border-[#d9d0c4] bg-[#f8f3ee] p-6 shadow-[0_18px_45px_rgba(64,46,35,0.08)] sm:p-8">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#a64f37]">
          Komunitas Membaca
        </p>
        <h1 className="mt-2 font-serif text-4xl font-semibold text-[#2a241f]">
          Usulan Buku
        </h1>
        <p className="mt-2 max-w-xl text-sm text-[#685f59]">
          Ada judul yang ingin kamu baca di Pustaka Senja? Kirim usulanmu, dan kami akan
          mempertimbangkan untuk menambahkannya ke katalog.
        </p>

        <form onSubmit={handleSubmit} className="mt-8 space-y-5">
          <div>
            <label htmlFor="nama" className="mb-1.5 block text-sm font-medium text-[#4f4742]">
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
            <label htmlFor="judul" className="mb-1.5 block text-sm font-medium text-[#4f4742]">
              Judul Buku
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

          <div className="grid gap-5 md:grid-cols-2">
            <div>
              <label htmlFor="kategori" className="mb-1.5 block text-sm font-medium text-[#4f4742]">
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
              <label className="mb-1.5 block text-sm font-medium text-[#4f4742]">
                Prioritas
              </label>
              <div className="flex h-[48px] items-center rounded-xl border border-[#d6c8bb] bg-[#fffdfb] px-4 text-sm text-[#5b534d] shadow-sm">
                Direkomendasikan komunitas
              </div>
            </div>
          </div>

          <div>
            <label htmlFor="alasan" className="mb-1.5 block text-sm font-medium text-[#4f4742]">
              Alasan Usulan
            </label>
            <textarea
              id="alasan"
              rows={4}
              placeholder="Mengapa buku ini perlu ada di Pustaka Senja?"
              value={alasan}
              onChange={(e) => setAlasan(e.target.value)}
              className={inputClass}
            />
          </div>

          <button
            type="submit"
            className="w-full rounded-xl bg-[#a64f37] py-3 text-sm font-semibold text-white transition hover:bg-[#873d2b]"
          >
            Kirim Usulan
          </button>
        </form>

        {status === "kosong" && (
          <p
            role="alert"
            className="mt-5 rounded-xl border border-rose-200 bg-rose-50 p-3 text-center text-sm text-rose-700"
          >
            Semua kolom wajib diisi sebelum usulan dikirim.
          </p>
        )}

        {status === "berhasil" && (
          <p
            role="status"
            className="mt-5 rounded-xl border border-emerald-200 bg-emerald-50 p-3 text-center text-sm text-emerald-700"
          >
            Terima kasih, usulan buku Anda sudah terkirim!
          </p>
        )}
      </div>

      {daftarUsulan.length > 0 && (
        <div className="rounded-[24px] border border-[#d9d0c4] bg-[#f8f3ee] p-5 shadow-sm">
          <h2 className="mb-4 text-xl font-semibold text-[#2b241f]">
            Usulan Anda ({daftarUsulan.length})
          </h2>

          <ul className="space-y-3">
            {daftarUsulan.map((usulan) => (
              <li
                key={usulan.id}
                className="rounded-2xl border border-[#e4d7cc] bg-[#fffdfa] p-4"
              >
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <p className="font-semibold text-[#2a241f]">{usulan.judul}</p>
                  <span className="rounded-full bg-[#f4e7dc] px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-[#a64f37]">
                    {usulan.kategori}
                  </span>
                </div>
                <p className="mt-2 text-sm text-[#5d534d]">Alasan: {usulan.alasan}</p>
                <p className="mt-2 text-xs text-[#857a71]">Diusulkan oleh {usulan.nama}</p>
              </li>
            ))}
          </ul>
        </div>
      )}
    </section>
  );
}

"use client";

import { useState } from "react";
import { daftarKategori } from "@/data/dataBuku";

const kategoriPilihan = daftarKategori.filter((kategori) => kategori !== "Semua");
const kelasInput =
  "w-full rounded-lg border border-dusk-700 bg-dusk-950 px-4 py-2 text-paper focus:border-lamp focus:outline-none";

export default function UsulanPage() {
  const [nama, setNama] = useState("");
  const [judul, setJudul] = useState("");
  const [kategori, setKategori] = useState("");
  const [alasan, setAlasan] = useState("");
  const [peringatan, setPeringatan] = useState("");
  const [berhasil, setBerhasil] = useState(false);
  const [daftarUsulan, setDaftarUsulan] = useState([]);

  function handleSubmit(e) {
    e.preventDefault();

    const data = {
      nama: nama.trim(),
      judul: judul.trim(),
      kategori: kategori.trim(),
      alasan: alasan.trim(),
    };

    if (!data.nama || !data.judul || !data.kategori || !data.alasan) {
      setBerhasil(false);
      setPeringatan("Semua kolom wajib diisi sebelum usulan dikirim.");
      return;
    }

    setDaftarUsulan((sebelumnya) => [{ id: crypto.randomUUID(), ...data }, ...sebelumnya]);
    setPeringatan("");
    setBerhasil(true);
    setNama("");
    setJudul("");
    setKategori("");
    setAlasan("");
  }

  return (
    <section className="mx-auto max-w-lg">
      <h1 className="text-3xl font-bold">Usulan Buku</h1>
      <p className="mt-1 text-mute">Ada buku yang ingin kamu temukan di Pustaka Senja? Ceritakan di sini.</p>

      <form
        onSubmit={handleSubmit}
        className="mt-6 space-y-4 rounded-2xl border border-dusk-700 bg-dusk-900 p-6"
      >
        <div>
          <label htmlFor="nama" className="mb-1 block text-sm text-mute">
            Nama Pengusul
          </label>
          <input
            id="nama"
            type="text"
            value={nama}
            onChange={(e) => setNama(e.target.value)}
            placeholder="Nama kamu"
            className={kelasInput}
          />
        </div>

        <div>
          <label htmlFor="judul" className="mb-1 block text-sm text-mute">
            Judul Buku yang Diusulkan
          </label>
          <input
            id="judul"
            type="text"
            value={judul}
            onChange={(e) => setJudul(e.target.value)}
            placeholder="Judul buku"
            className={kelasInput}
          />
        </div>

        <div>
          <label htmlFor="kategori" className="mb-1 block text-sm text-mute">
            Kategori
          </label>
          <select
            id="kategori"
            value={kategori}
            onChange={(e) => setKategori(e.target.value)}
            className={kelasInput}
          >
            <option value="">Pilih kategori</option>
            {kategoriPilihan.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="alasan" className="mb-1 block text-sm text-mute">
            Alasan Usulan
          </label>
          <textarea
            id="alasan"
            rows={4}
            value={alasan}
            onChange={(e) => setAlasan(e.target.value)}
            placeholder="Kenapa buku ini layak ada di sini?"
            className={kelasInput}
          />
        </div>

        {peringatan && (
          <p role="alert" className="rounded-lg border border-rose-500/30 bg-rose-500/10 p-3 text-sm text-rose-300">
            {peringatan}
          </p>
        )}

        <button
          type="submit"
          className="w-full rounded-lg bg-lamp py-2.5 font-medium text-dusk-950 transition hover:shadow-lg  "
        >
          Kirim Usulan
        </button>
      </form>

      {berhasil && (
        <p
          role="status"
          className="mt-4 rounded-lg border border-emerald-500/30 bg-emerald-500/10 p-3 text-center text-sm text-emerald-300"
        >
          Usulan berhasil dikirim. Terima kasih!
        </p>
      )}

      {daftarUsulan.length > 0 && (
        <div className="mt-8">
          <h2 className="text-xl font-bold">Usulan sesi ini</h2>
          <ul className="mt-3 space-y-3">
            {daftarUsulan.map((usulan) => (
              <li key={usulan.id} className="rounded-xl border border-dusk-700 bg-dusk-900 p-4">
                <p className="font-medium">{usulan.judul}</p>
                <p className="text-xs text-mute">
                  {usulan.kategori}, diusulkan oleh {usulan.nama}
                </p>
                <p className="mt-2 text-sm text-paper/90">{usulan.alasan}</p>
              </li>
            ))}
          </ul>
        </div>
      )}
    </section>
  );
}

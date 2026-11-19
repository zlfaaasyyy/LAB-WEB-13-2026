"use client";

import { useState } from "react";

const daftarKategori = ["Teknologi", "Fiksi", "Pengembangan Diri"];

export default function UsulanPage() {
  const [nama, setNama] = useState("");
  const [judul, setJudul] = useState("");
  const [kategori, setKategori] = useState("Teknologi");
  const [alasan, setAlasan] = useState("");
  const [peringatan, setPeringatan] = useState("");
  const [terkirim, setTerkirim] = useState(false);
  const [daftarUsulan, setDaftarUsulan] = useState([]);

  function handleSubmit(e) {
    e.preventDefault();

    if (
      nama.trim() === "" ||
      judul.trim() === "" ||
      kategori.trim() === "" ||
      alasan.trim() === ""
    ) {
      setPeringatan("Mohon lengkapi semua kolom sebelum mengirim usulan.");
      setTerkirim(false);
      return;
    }

    const usulanBaru = {
      id: `${Date.now()}`,
      nama: nama.trim(),
      judul: judul.trim(),
      kategori: kategori,
      alasan: alasan.trim(),
    };

    setDaftarUsulan([usulanBaru, ...daftarUsulan]);
    setPeringatan("");
    setTerkirim(true);
    setNama("");
    setJudul("");
    setKategori("Teknologi");
    setAlasan("");
  }

  return (
    <section className="max-w-lg mx-auto">
      <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-lg">
        <h1 className="text-2xl font-bold text-slate-900 mb-2">Usulan Buku</h1>
        <p className="text-slate-500 text-sm mb-6">
          Usulkan judul buku baru yang ingin kamu temukan di Pustaka Senja.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm text-slate-700 mb-1">
              Nama Pengusul
            </label>
            <input
              type="text"
              placeholder="Masukkan nama Anda"
              value={nama}
              onChange={(e) => setNama(e.target.value)}
              className="w-full bg-slate-50 border border-slate-300 rounded-lg px-4 py-2 text-slate-900 focus:outline-none focus:border-orange-400"
            />
          </div>
          <div>
            <label className="block text-sm text-slate-700 mb-1">
              Judul Buku yang Diusulkan
            </label>
            <input
              type="text"
              placeholder="Contoh: The Pragmatic Programmer"
              value={judul}
              onChange={(e) => setJudul(e.target.value)}
              className="w-full bg-slate-50 border border-slate-300 rounded-lg px-4 py-2 text-slate-900 focus:outline-none focus:border-orange-400"
            />
          </div>
          <div>
            <label className="block text-sm text-slate-700 mb-1">Kategori</label>
            <select
              value={kategori}
              onChange={(e) => setKategori(e.target.value)}
              className="w-full bg-slate-50 border border-slate-300 rounded-lg px-4 py-2 text-slate-900 focus:outline-none focus:border-orange-400"
            >
              {daftarKategori.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm text-slate-700 mb-1">
              Alasan Usulan
            </label>
            <textarea
              rows={4}
              placeholder="Tulis alasan Anda..."
              value={alasan}
              onChange={(e) => setAlasan(e.target.value)}
              className="w-full bg-slate-50 border border-slate-300 rounded-lg px-4 py-2 text-slate-900 focus:outline-none focus:border-orange-400"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-orange-400 hover:bg-orange-500 text-white font-medium py-2.5 rounded-lg transition"
          >
            Kirim Usulan
          </button>
        </form>

        {peringatan !== "" && (
          <p className="mt-4 p-3 bg-red-50 border border-red-200 text-red-600 text-sm rounded-lg text-center">
            {peringatan}
          </p>
        )}

        {terkirim && (
          <p className="mt-4 p-3 bg-emerald-50 border border-emerald-200 text-emerald-700 text-sm rounded-lg text-center">
            Terima kasih, usulan Anda berhasil dikirim!
          </p>
        )}
      </div>

      {daftarUsulan.length > 0 && (
        <div className="mt-8">
          <h2 className="text-xl font-bold text-slate-900 mb-4">
            Usulan Terkirim
          </h2>
          <ul className="space-y-3">
            {daftarUsulan.map((usulan) => (
              <li
                key={usulan.id}
                className="bg-white border border-slate-200 rounded-xl p-4 shadow-sm"
              >
                <p className="font-semibold text-slate-900">{usulan.judul}</p>
                <p className="text-xs text-indigo-500 mb-2">
                  {usulan.kategori} • diusulkan oleh {usulan.nama}
                </p>
                <p className="text-sm text-slate-600">{usulan.alasan}</p>
              </li>
            ))}
          </ul>
        </div>
      )}
    </section>
  );
}

"use client";

import { useState, useSyncExternalStore } from "react";

function subscribeUsulan(callback) {
  window.addEventListener("storage", callback);
  window.addEventListener("pustaka_usulan_updated", callback);
  return () => {
    window.removeEventListener("storage", callback);
    window.removeEventListener("pustaka_usulan_updated", callback);
  };
}

function getUsulanSnapshot() {
  return localStorage.getItem("pustaka_senja_usulan") || "[]";
}

function getServerSnapshot() {
  return "[]";
}

export default function UsulanPage() {
  const [formData, setFormData] = useState({
    namaPengusul: "",
    judulBuku: "",
    kategori: "",
    alasan: "",
  });

  const [pesanError, setPesanError] = useState("");
  const [pesanSukses, setPesanSukses] = useState("");

  const usulanRaw = useSyncExternalStore(
    subscribeUsulan,
    getUsulanSnapshot,
    getServerSnapshot
  );

  let daftarUsulan = [];
  try {
    const parsed = JSON.parse(usulanRaw);
    if (Array.isArray(parsed)) daftarUsulan = parsed;
  } catch (err) {
    console.error("Gagal parse usulan:", err);
  }

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  function handleSubmit(e) {
    e.preventDefault();

    setPesanError("");
    setPesanSukses("");

    // Validasi setelah di-trim()
    const namaBersih = formData.namaPengusul.trim();
    const judulBersih = formData.judulBuku.trim();
    const kategoriBersih = formData.kategori.trim();
    const alasanBersih = formData.alasan.trim();

    if (!namaBersih || !judulBersih || !kategoriBersih || !alasanBersih) {
      setPesanError(
        "Semua kolom wajib diisi. Mohon lengkapi seluruh formulir sebelum mengirim usulan."
      );
      return;
    }

    const usulanBaru = {
      id: Date.now().toString(),
      namaPengusul: namaBersih,
      judulBuku: judulBersih,
      kategori: kategoriBersih,
      alasan: alasanBersih,
      waktu: new Date().toLocaleTimeString("id-ID", {
        hour: "2-digit",
        minute: "2-digit",
      }),
      tanggal: new Date().toLocaleDateString("id-ID", {
        day: "numeric",
        month: "short",
        year: "numeric",
      }),
    };

    const updated = [usulanBaru, ...daftarUsulan];

    try {
      localStorage.setItem("pustaka_senja_usulan", JSON.stringify(updated));
      window.dispatchEvent(new Event("pustaka_usulan_updated"));
    } catch (err) {
      console.error("Gagal menyimpan usulan:", err);
    }

    setPesanSukses(
      `Terima kasih, ${namaBersih}! Usulan buku "${judulBersih}" berhasil dikirim untuk dipertimbangkan.`
    );

    // Kosongkan form kembali
    setFormData({
      namaPengusul: "",
      judulBuku: "",
      kategori: "",
      alasan: "",
    });
  }

  return (
    <section className="max-w-2xl mx-auto space-y-8">
      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
          Usulkan Buku Baru
        </h1>
        <p className="text-sm text-slate-400 mt-1">
          Punya rekomendasi buku yang ingin Anda baca di Pustaka Senja? Sampaikan usulan Anda melalui formulir di bawah ini.
        </p>
      </div>

      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8 shadow-sm">
        {pesanError && (
          <div
            role="alert"
            className="mb-6 p-4 rounded-xl bg-rose-950/70 border border-rose-800 text-rose-300 text-sm"
          >
            <p className="font-semibold">Perhatian</p>
            <p className="mt-0.5">{pesanError}</p>
          </div>
        )}

        {pesanSukses && (
          <div
            role="status"
            className="mb-6 p-4 rounded-xl bg-emerald-950/70 border border-emerald-800 text-emerald-300 text-sm"
          >
            <p className="font-semibold">Berhasil Terkirim</p>
            <p className="mt-0.5">{pesanSukses}</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label
              htmlFor="namaPengusul"
              className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5"
            >
              Nama Pengusul
            </label>
            <input
              id="namaPengusul"
              name="namaPengusul"
              type="text"
              value={formData.namaPengusul}
              onChange={handleChange}
              placeholder="Contoh: Naufal Harits"
              className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3.5 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 transition"
            />
          </div>

          <div>
            <label
              htmlFor="judulBuku"
              className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5"
            >
              Judul Buku yang Diusulkan
            </label>
            <input
              id="judulBuku"
              name="judulBuku"
              type="text"
              value={formData.judulBuku}
              onChange={handleChange}
              placeholder="Contoh: Pragmatic Programmer"
              className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3.5 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 transition"
            />
          </div>

          <div>
            <label
              htmlFor="kategori"
              className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5"
            >
              Kategori
            </label>
            <select
              id="kategori"
              name="kategori"
              value={formData.kategori}
              onChange={handleChange}
              className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-blue-500 transition"
            >
              <option value="" className="bg-slate-900 text-slate-400">
                -- Pilih Kategori Buku --
              </option>
              <option value="Teknologi" className="bg-slate-900 text-white">
                Teknologi
              </option>
              <option value="Fiksi" className="bg-slate-900 text-white">
                Fiksi
              </option>
              <option
                value="Pengembangan Diri"
                className="bg-slate-900 text-white"
              >
                Pengembangan Diri
              </option>
              <option value="Lainnya" className="bg-slate-900 text-white">
                Lainnya
              </option>
            </select>
          </div>

          <div>
            <label
              htmlFor="alasan"
              className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5"
            >
              Alasan Usulan
            </label>
            <textarea
              id="alasan"
              name="alasan"
              rows={4}
              value={formData.alasan}
              onChange={handleChange}
              placeholder="Jelaskan secara singkat mengapa buku ini penting atau menarik untuk dihadirkan..."
              className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3.5 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 transition resize-y"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-500 text-white font-medium text-sm py-2.5 px-4 rounded-lg transition"
          >
            Kirim Usulan Buku
          </button>
        </form>
      </div>

      {daftarUsulan.length > 0 && (
        <section aria-labelledby="daftar-usulan-heading" className="space-y-4">
          <div className="flex items-center justify-between border-t border-slate-800 pt-6">
            <h2
              id="daftar-usulan-heading"
              className="text-lg font-bold text-white"
            >
              Daftar Usulan Buku ({daftarUsulan.length})
            </h2>
            <span className="text-xs text-slate-400">
              Tersimpan dalam riwayat usulan
            </span>
          </div>

          <div className="space-y-3">
            {daftarUsulan.map((item) => (
              <article
                key={item.id}
                className="bg-slate-900 border border-slate-800 rounded-xl p-4 space-y-2"
              >
                <div className="flex items-start justify-between gap-2">
                  <h3 className="text-base font-bold text-white">
                    {item.judulBuku}
                  </h3>
                  <div className="flex items-center gap-2">
                    <span className="text-xs px-2 py-0.5 rounded bg-slate-800 text-blue-400 border border-slate-700">
                      {item.kategori}
                    </span>
                    <span className="text-xs text-slate-500">{item.waktu}</span>
                  </div>
                </div>

                <p className="text-xs text-slate-400">
                  Diusulkan oleh:{" "}
                  <strong className="text-slate-200">{item.namaPengusul}</strong>
                </p>

                <p className="text-sm text-slate-300 bg-slate-950/60 p-3 rounded-lg border border-slate-800/80 leading-relaxed">
                  &ldquo;{item.alasan}&rdquo;
                </p>
              </article>
            ))}
          </div>
        </section>
      )}
    </section>
  );
}

"use client";

import { useSyncExternalStore } from "react";
import Link from "next/link";
import BukuCard from "@/components/BukuCard";

function subscribeFavorit(callback) {
  window.addEventListener("storage", callback);
  window.addEventListener("pustaka_favorit_updated", callback);
  return () => {
    window.removeEventListener("storage", callback);
    window.removeEventListener("pustaka_favorit_updated", callback);
  };
}

function getFavoritSnapshot() {
  return localStorage.getItem("pustaka_senja_favorit") || "[]";
}

function getServerSnapshot() {
  return "[]";
}

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

export default function BerandaAktivitas({ dataBuku = [] }) {
  const favoritRaw = useSyncExternalStore(
    subscribeFavorit,
    getFavoritSnapshot,
    getServerSnapshot
  );

  const usulanRaw = useSyncExternalStore(
    subscribeUsulan,
    getUsulanSnapshot,
    getServerSnapshot
  );

  let favoritIds = [];
  try {
    const parsed = JSON.parse(favoritRaw);
    if (Array.isArray(parsed)) favoritIds = parsed;
  } catch (err) {
    console.error("Gagal parse favorit:", err);
  }

  let daftarUsulan = [];
  try {
    const parsed = JSON.parse(usulanRaw);
    if (Array.isArray(parsed)) daftarUsulan = parsed;
  } catch (err) {
    console.error("Gagal parse usulan:", err);
  }

  const bukuFavorit = dataBuku.filter((buku) => favoritIds.includes(buku.id));

  return (
    <div className="space-y-10">
      {/* Bagian Buku Favorit Tersimpan */}
      <section aria-labelledby="favorit-heading" className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 id="favorit-heading" className="text-xl font-bold text-white flex items-center gap-2">
              <span>Buku Favorit Tersimpan</span>
              {bukuFavorit.length > 0 && (
                <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-rose-950/70 border border-rose-800 text-rose-300">
                  {bukuFavorit.length}
                </span>
              )}
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">
              Koleksi yang Anda tandai sebagai favorit saat menjelajahi katalog
            </p>
          </div>

          <Link
            href="/katalog"
            className="text-xs font-medium text-blue-400 hover:text-blue-300 hover:underline shrink-0"
          >
            Lihat Semua Katalog &rarr;
          </Link>
        </div>

        {bukuFavorit.length === 0 ? (
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-8 text-center">
            <p className="text-slate-300 text-sm font-medium">
              Belum ada buku yang Anda simpan sebagai favorit
            </p>
            <p className="text-xs text-slate-500 mt-1 max-w-md mx-auto">
              Buka halaman katalog buku, lalu tekan tombol 🤍 Suka/Favorit pada kartu buku yang Anda sukai untuk menyimpannya di beranda ini.
            </p>
            <Link
              href="/katalog"
              className="mt-4 inline-block bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 text-xs font-medium px-4 py-2 rounded-lg transition"
            >
              Jelajahi Katalog Buku
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
            {bukuFavorit.map((buku) => (
              <BukuCard key={buku.id} buku={buku} />
            ))}
          </div>
        )}
      </section>

      {/* Bagian Buku yang Diusulkan Pengunjung */}
      <section aria-labelledby="usulan-pengunjung-heading" className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 id="usulan-pengunjung-heading" className="text-xl font-bold text-white flex items-center gap-2">
              <span>Buku yang Diusulkan</span>
              {daftarUsulan.length > 0 && (
                <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-blue-950/70 border border-blue-800 text-blue-300">
                  {daftarUsulan.length} judul
                </span>
              )}
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">
              Rekomendasi judul buku baru yang diusulkan oleh pengunjung ruang baca
            </p>
          </div>

          <Link
            href="/usulan"
            className="text-xs font-medium text-blue-400 hover:text-blue-300 hover:underline shrink-0"
          >
            + Usulkan Buku Baru
          </Link>
        </div>

        {daftarUsulan.length === 0 ? (
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-8 text-center">
            <p className="text-slate-300 text-sm font-medium">
              Belum ada buku yang diusulkan
            </p>
            <p className="text-xs text-slate-500 mt-1 max-w-md mx-auto">
              Punya ide judul buku yang ingin Anda baca di Pustaka Senja? Sampaikan rekomendasi Anda melalui formulir usulan.
            </p>
            <Link
              href="/usulan"
              className="mt-4 inline-block bg-blue-600 hover:bg-blue-500 text-white text-xs font-medium px-4 py-2 rounded-lg transition"
            >
              Kirim Usulan Pertama
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {daftarUsulan.map((item) => (
              <article
                key={item.id}
                className="bg-slate-900 border border-slate-800 rounded-xl p-5 flex flex-col justify-between hover:border-slate-700 transition"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span className="text-xs px-2.5 py-0.5 rounded bg-slate-800 text-blue-400 border border-slate-700 font-semibold">
                      {item.kategori}
                    </span>
                    <span className="text-xs text-slate-500">{item.waktu || item.tanggal}</span>
                  </div>

                  <h3 className="text-base font-bold text-white mb-1">
                    {item.judulBuku}
                  </h3>

                  <p className="text-xs text-slate-400 mb-3">
                    Diusulkan oleh:{" "}
                    <strong className="text-slate-200">{item.namaPengusul}</strong>
                  </p>

                  <p className="text-xs sm:text-sm text-slate-300 bg-slate-950/60 p-3 rounded-lg border border-slate-800/80 leading-relaxed italic">
                    &ldquo;{item.alasan}&rdquo;
                  </p>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}

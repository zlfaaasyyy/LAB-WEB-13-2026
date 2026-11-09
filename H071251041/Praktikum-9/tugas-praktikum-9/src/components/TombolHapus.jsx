"use client";

import { useState } from "react";
import { hapusBuku } from "@/app/katalog/action";

export default function TombolHapus({ id, judul, className }) {
  const [konfirmasiHapus, setKonfirmasiHapus] = useState(false);

  return (
    <>
      <button
        type="button"
        onClick={() => setKonfirmasiHapus(true)}
        className={className}
      >
        Hapus
      </button>

      {/* Kotak dialog konfirmasi langsung muncul di sini jika bernilai true */}
      {konfirmasiHapus && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-xs">
          <div className="w-full max-w-md rounded-2xl border border-(--merah) bg-white p-6 shadow-2xl">
            <h2 className="mb-2 text-xl font-bold text-(--maroon)">
              Konfirmasi Hapus Buku
            </h2>
            <p className="mb-6 text-sm text-(--coklat)">
              Apakah Anda yakin ingin menghapus buku{" "}
              <span className="font-semibold text-gray-900">{`"${judul}"`}</span>? Data yang dihapus tidak dapat dikembalikan.
            </p>

            <div className="flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={() => setKonfirmasiHapus(false)}
                className="rounded-full border border-gray-300 px-5 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100"
              >
                Batal
              </button>

              <form action={hapusBuku}>
                <input type="hidden" name="id" value={id} />
                <button
                  type="submit"
                  className="rounded-full bg-(--merah) px-5 py-2 text-sm font-semibold text-white hover:bg-(--maroon)"
                >
                  Ya, Hapus
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
"use client";

import { useActionState } from "react";
import Link from "next/link";
import { daftarKategori } from "@/lib/kategori";

const stateAwal = { errors: {}, values: null, pesan: null };

const inputClass =
  "w-full rounded-xl border border-[#d6c8bb] bg-[#fffdfb] px-4 py-3 text-[#2d2623] shadow-sm placeholder:text-[#9d9187] focus:border-[#a64f37] focus:outline-none focus:ring-2 focus:ring-[#f0d8c3]";
const errorClass = "mt-1 text-sm text-rose-700";

// Dipakai untuk Tambah dan Edit. "aksi" adalah Server Action dari halaman induk.
function FormBuku({ aksi, buku = null, labelTombol, hrefBatal }) {
  const [state, formAction, pending] = useActionState(aksi, stateAwal);

  // Sumber nilai: hasil validasi terakhir (jika ada), lalu data buku, lalu kosong.
  const nilai = state.values ?? buku ?? {};

  return (
    <form action={formAction} className="space-y-5">
      <div>
        <label htmlFor="judul" className="mb-1.5 block text-sm font-medium text-[#4f4742]">
          Judul
        </label>
        <input
          id="judul"
          name="judul"
          type="text"
          defaultValue={nilai.judul ?? ""}
          className={inputClass}
        />
        {state.errors.judul && <p className={errorClass}>{state.errors.judul}</p>}
      </div>

      <div>
        <label htmlFor="penulis" className="mb-1.5 block text-sm font-medium text-[#4f4742]">
          Penulis
        </label>
        <input
          id="penulis"
          name="penulis"
          type="text"
          defaultValue={nilai.penulis ?? ""}
          className={inputClass}
        />
        {state.errors.penulis && <p className={errorClass}>{state.errors.penulis}</p>}
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="kategori" className="mb-1.5 block text-sm font-medium text-[#4f4742]">
            Kategori
          </label>
          <select
            id="kategori"
            name="kategori"
            defaultValue={nilai.kategori ?? ""}
            className={inputClass}
          >
            <option value="">Pilih kategori</option>
            {daftarKategori.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
          {state.errors.kategori && <p className={errorClass}>{state.errors.kategori}</p>}
        </div>

        <div>
          <label htmlFor="tahun" className="mb-1.5 block text-sm font-medium text-[#4f4742]">
            Tahun Terbit
          </label>
          <input
            id="tahun"
            name="tahun"
            type="number"
            defaultValue={nilai.tahun ?? ""}
            className={inputClass}
          />
          {state.errors.tahun && <p className={errorClass}>{state.errors.tahun}</p>}
        </div>
      </div>

      <label className="flex items-center gap-2 text-sm text-[#4f4742]">
        <input
          name="tersedia"
          type="checkbox"
          defaultChecked={nilai.tersedia ?? true}
          className="h-4 w-4 accent-[#a64f37]"
        />
        Buku tersedia (tidak sedang dipinjam)
      </label>

      <div>
        <label htmlFor="sinopsis" className="mb-1.5 block text-sm font-medium text-[#4f4742]">
          Sinopsis
        </label>
        <textarea
          id="sinopsis"
          name="sinopsis"
          rows={5}
          defaultValue={nilai.sinopsis ?? ""}
          className={inputClass}
        />
        {state.errors.sinopsis && <p className={errorClass}>{state.errors.sinopsis}</p>}
      </div>

      {state.pesan && (
        <p
          role="alert"
          className="rounded-xl border border-rose-200 bg-rose-50 p-3 text-center text-sm text-rose-700"
        >
          {state.pesan}
        </p>
      )}

      <div className="flex flex-col-reverse gap-3 sm:flex-row">
        <button
          type="submit"
          disabled={pending}
          className="flex-1 rounded-xl bg-[#a64f37] py-3 text-sm font-semibold text-white transition hover:bg-[#873d2b] disabled:cursor-not-allowed disabled:opacity-60"
        >
          {pending ? "Menyimpan..." : labelTombol}
        </button>
        <Link
          href={hrefBatal}
          className="rounded-xl border border-[#d0c5b7] px-5 py-3 text-center text-sm font-medium text-[#453d34] transition hover:bg-[#eee8df]"
        >
          Batal
        </Link>
      </div>
    </form>
  );
}

export default FormBuku;

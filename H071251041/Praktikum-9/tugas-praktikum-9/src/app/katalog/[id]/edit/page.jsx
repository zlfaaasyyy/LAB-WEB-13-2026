import Link from "next/link";
import pool from "@/lib/db";
import { ubahBuku } from "../../action";

const daftarKategori = ["Teknologi", "Fiksi", "Pengembangan Diri"];

export default async function EditBuku({ params, searchParams }) {
  const { id } = await params;
  const { error } = await searchParams;

  let buku = null;

  // ambil data dari database, kalau tidak ada maka null
  if (id) {
    try {
      const respon = await pool.query("SELECT * FROM buku WHERE id = $1", [id]);
      buku = respon.rows[0];
    } catch {
      buku = null;
    }
  }

  // kalau buku tidak ada di database, tampilkan pesan error ini dan hentikan proses eksekusi kode di bawahnya
  if (!buku) {
    return (
      <div className="mx-auto max-w-md py-20 text-center">
        <h1 className="mb-6 text-xl font-bold text-(--merah)">
          {`Buku dengan ID "${id}" tidak ditemukan!`}
        </h1>
        <Link
          href="/katalog"
          className="inline-block rounded-full bg-(--merah) px-6 py-2.5 text-sm font-semibold text-white shadow-xs transition hover:bg-(--maroon)"
        >
          Kembali ke Katalog
        </Link>
      </div>
    );
  }

  const tahunSekarang = new Date().getFullYear();
  const inputClass =
    "w-full rounded-lg border border-(--merah) bg-white px-4 py-2 text-(--coklat)";
  const labelClass = "mb-1 block text-sm font-semibold text-(--maroon)";

  return (
    <section className="mx-auto max-w-lg">
      <div className="rounded-2xl border border-(--merah) bg-white p-6 shadow-md md:p-8">
        <h1 className="mb-1 text-2xl font-bold text-(--maroon)">
          Edit Data Buku
        </h1>
        <p className="mb-6 text-sm text-(--coklat)">
          Perbarui informasi buku di koleksi Pustaka Senja.
        </p>

        {error && (
          <p className="mb-4 rounded-lg border border-red-300 bg-red-50 p-3 text-sm font-semibold text-red-700">
            {error}
          </p>
        )}

        <form action={ubahBuku} className="space-y-4">
          {/* Hidden input ID untuk proses update di server action */}
          <input type="hidden" name="id" value={buku.id} />

          <div>
            <label className={labelClass}>Judul Buku</label>
            <input
              name="judul"
              type="text"
              defaultValue={buku.judul}
              placeholder="Contoh: Clean Code"
              maxLength={150}
              required
              className={inputClass}
            />
          </div>

          <div>
            <label className={labelClass}>Penulis</label>
            <input
              name="penulis"
              type="text"
              defaultValue={buku.penulis}
              placeholder="Contoh: Robert C. Martin"
              maxLength={100}
              required
              className={inputClass}
            />
          </div>

          <div>
            <label className={labelClass}>Kategori</label>
            <select
              name="kategori"
              defaultValue={buku.kategori}
              required
              className={inputClass}
            >
              <option value="" disabled>
                -- Pilih kategori --
              </option>
              {daftarKategori.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label className={labelClass}>Tahun Terbit</label>
              <input
                name="tahun"
                type="number"
                defaultValue={buku.tahun}
                placeholder="Contoh: 2008"
                min="1000"
                max={tahunSekarang}
                required
                className={inputClass}
              />
            </div>

            <div>
              <label className={labelClass}>Status Ketersediaan</label>
              <select
                name="tersedia"
                defaultValue={String(buku.tersedia)}
                className={inputClass}
              >
                <option value="true">Tersedia</option>
                <option value="false">Sedang Dipinjam</option>
              </select>
            </div>
          </div>

          <div>
            <label className={labelClass}>Sinopsis</label>
            <textarea
              name="sinopsis"
              rows={5}
              defaultValue={buku.sinopsis}
              placeholder="Ceritakan singkat isi buku ini..."
              required
              className={inputClass}
            />
          </div>

          <div className="flex flex-wrap items-center gap-3 pt-2">
            <button
              type="submit"
              className="cursor-pointer rounded-full bg-(--merah) px-6 py-2.5 font-semibold text-white transition hover:bg-(--maroon)"
            >
              Simpan Perubahan
            </button>
            <Link
              href="/katalog"
              className="rounded-full border border-(--merah) bg-white px-6 py-2.5 font-semibold text-(--maroon) transition hover:bg-(--pink)"
            >
              Batal
            </Link>
          </div>
        </form>
      </div>
    </section>
  );
}
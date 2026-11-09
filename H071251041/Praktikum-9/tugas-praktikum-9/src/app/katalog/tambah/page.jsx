import Link from "next/link";
import { tambahBuku } from "../action";

const daftarKategori = ["Teknologi", "Fiksi", "Pengembangan Diri"];

export default function TambahBuku() {
  const tahunSekarang = new Date().getFullYear();

  const inputClass =
    "w-full rounded-lg border border-(--merah) bg-white px-4 py-2 text-(--coklat)";
  const labelClass = "mb-1 block text-sm font-semibold text-(--maroon)";

  return (
    <section className="mx-auto max-w-lg">
      <div className="rounded-2xl border border-(--merah) bg-white p-6 shadow-md md:p-8">
        <h1 className="mb-1 text-2xl font-bold text-(--maroon)">
          Tambah Buku Baru
        </h1>
        <p className="mb-6 text-sm text-(--coklat)">
          Isi data buku, lalu simpan ke koleksi Pustaka Senja.
        </p>

        <form action={tambahBuku} className="space-y-4">
          <div>
            <label className={labelClass}>Judul Buku</label>
            <input
              name="judul"
              type="text"
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
              defaultValue=""
              required
              className={inputClass}
            >
              <option value="" disabled>
                -- Pilih kategori --
              </option>
              {daftarKategori.map((item) => (
                <option
                key={item}
                value={item}>
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
                defaultValue="true"
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
              Simpan Buku
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
import Link from "next/link";
import BukuCard from "@/components/BukuCard";
import { ambilSemuaBuku, ambilStatistik } from "@/lib/queries";
import { daftarKategori } from "@/lib/kategori";

export const dynamic = "force-dynamic";

const daftarFilter = ["Semua", ...daftarKategori];

function buatHrefKategori(kategori, pencarian) {
  const params = new URLSearchParams();

  if (kategori !== "Semua") params.set("kategori", kategori);
  if (pencarian) params.set("q", pencarian);

  const query = params.toString();
  return query ? `/katalog?${query}` : "/katalog";
}

export default async function KatalogPage({ searchParams }) {
  const params = await searchParams;
  const kategoriParam = typeof params.kategori === "string" ? params.kategori : "";
  const queryParam = typeof params.q === "string" ? params.q : "";
  const kategoriAktif = daftarFilter.includes(kategoriParam) ? kategoriParam : "Semua";
  const pencarian = queryParam.trim();

  const [daftarBuku, statistik] = await Promise.all([
    ambilSemuaBuku(kategoriAktif, pencarian),
    ambilStatistik(),
  ]);

  return (
    <section className="space-y-6">
      <div className="rounded-[28px] border border-[#d9d0c4] bg-[#f8f3ee] p-6 shadow-[0_18px_45px_rgba(64,46,35,0.08)] sm:p-7">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#a64f37]">
              Koleksi Kami
            </p>
            <h1 className="mt-2 font-serif text-4xl font-semibold text-[#2a241f]">
              Katalog Buku
            </h1>
            <p className="mt-2 text-sm text-[#695f57]">
              {pencarian || kategoriAktif !== "Semua"
                ? `Ditemukan ${daftarBuku.length} dari ${statistik.total} buku.`
                : `Menampilkan ${daftarBuku.length} dari ${statistik.total} buku.`}
            </p>
          </div>

          <Link
            href="/katalog/tambah"
            className="rounded-xl bg-[#a64f37] px-4 py-2.5 text-sm font-medium text-white transition hover:bg-[#873d2b]"
          >
            + Tambah Buku
          </Link>
        </div>
      </div>

      <div className="rounded-[24px] border border-[#d9d0c4] bg-[#f8f3ee] p-4 shadow-sm">
        <form action="/katalog" className="mb-4 flex flex-col gap-3 sm:flex-row">
          {kategoriAktif !== "Semua" && (
            <input type="hidden" name="kategori" value={kategoriAktif} />
          )}
          <label htmlFor="pencarian-buku" className="sr-only">
            Cari judul atau penulis buku
          </label>
          <input
            id="pencarian-buku"
            type="search"
            name="q"
            defaultValue={pencarian}
            placeholder="Cari judul atau penulis..."
            className="min-w-0 flex-1 rounded-xl border border-[#d6c8bb] bg-[#fffdfb] px-4 py-3 text-sm text-[#2d2623] shadow-sm placeholder:text-[#9d9187] focus:border-[#a64f37] focus:outline-none focus:ring-2 focus:ring-[#f0d8c3]"
          />
          <button
            type="submit"
            className="rounded-xl bg-[#a64f37] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#873d2b]"
          >
            Cari Buku
          </button>
          {pencarian && (
            <Link
              href={buatHrefKategori(kategoriAktif, "")}
              className="rounded-xl border border-[#d0c5b7] px-5 py-3 text-center text-sm font-medium text-[#453d34] transition hover:bg-[#eee8df]"
            >
              Hapus Pencarian
            </Link>
          )}
        </form>

        <div className="flex flex-wrap gap-2">
          {daftarFilter.map((item) => (
            <Link
              key={item}
              href={buatHrefKategori(item, pencarian)}
              className={
                kategoriAktif === item
                  ? "rounded-full bg-[#a64f37] px-4 py-2 text-sm font-semibold text-white shadow-sm"
                  : "rounded-full border border-[#d0c5b7] bg-white px-4 py-2 text-sm font-medium text-[#504740] transition hover:border-[#b89b84] hover:bg-[#f5eee9]"
              }
            >
              {item}
            </Link>
          ))}
        </div>
      </div>

      {daftarBuku.length === 0 ? (
        <div className="rounded-[24px] border border-dashed border-[#d0c5b7] bg-[#f8f3ee] px-6 py-12 text-center text-[#5e554f]">
          <p className="text-lg font-medium text-[#2d2723]">
            {pencarian ? "Buku yang dicari tidak ditemukan." : "Belum ada buku pada kategori ini."}
          </p>
          <p className="mt-2 text-sm">
            {pencarian
              ? "Coba kata kunci lain atau hapus pencarian."
              : "Coba pilih kategori lain atau tambahkan buku baru."}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
          {daftarBuku.map((buku) => (
            <BukuCard
              key={buku.id}
              id={buku.id}
              judul={buku.judul}
              penulis={buku.penulis}
              kategori={buku.kategori}
              tahun={buku.tahun}
              tersedia={buku.tersedia}
            />
          ))}
        </div>
      )}
    </section>
  );
}

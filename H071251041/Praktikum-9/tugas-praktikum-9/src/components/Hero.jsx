import Link from "next/link";

function Hero({
  nama = "Pustaka Senja",
  deskripsi = "Ruang baca dan perpustakaan komunitas di dekat kampus. Temukan buku favoritmu, simpan, dan kelola koleksi bersama kami.",
  lokasi = "Dekat Kampus",
  jamBuka = "Senin - Sabtu, 09.00 - 20.00",
}) {
  return (
    <section className="rounded-3xl border border-(--merah) bg-(--pink--muda) p-8 shadow-md md:p-12">
      <div className="grid grid-cols-1 items-center gap-8 md:grid-cols-3">
        
        {/* Sisi Kiri (2 Kolom): Judul, Deskripsi Utuh, & Tombol Katalog */}
        <div className="space-y-4 text-left md:col-span-2">
          <h1 className="text-3xl font-extrabold leading-tight text-(--maroon) md:text-5xl">
            Selamat Datang di {nama}
          </h1>

          <p className="max-w-xl text-sm leading-relaxed text-(--coklat) md:text-base">
            {deskripsi}
          </p>

          <div className="pt-2 flex flex-wrap gap-2 md:gap-4">
            <Link
              href="/katalog"
              className="inline-flex items-center gap-2 rounded-full border border-(--merah) bg-white px-6 py-3 text-sm font-semibold text-(--maroon) shadow-xs transition hover:bg-(--putih) hover:shadow-md motion-safe:hover:scale-[1.02]"
            >
              <span>Lihat Katalog Buku</span>
              <span className="text-base font-bold text-(--merah)">→</span>
            </Link>
            <Link
              href="/usulan"
              className="rounded-full border border-(--merah) bg-white px-6 py-3 font-semibold text-(--maroon) hover:bg-(--pink)">
                Usulkan Buku
            </Link>
          </div>
        </div>

        {/* Sisi Kanan (1 Kolom): Kartu Informasi Lokasi & Jam (Menyatu Lembut) */}
        <div className="flex flex-col gap-4 rounded-2xl border border-(--merah)/20 bg-(--putih) p-6 shadow-xs">
          <div className="border-b border-(--pink) pb-3">
            <p className="text-xs font-bold uppercase tracking-wider text-(--merah)">
              Lokasi
            </p>
            <p className="mt-1 text-sm font-semibold text-(--maroon)">
              {lokasi}
            </p>
          </div>

          <div>
            <p className="text-xs font-bold uppercase tracking-wider text-(--merah)">
              Jam Operasional
            </p>
            <p className="mt-1 text-sm font-semibold text-(--maroon)">
              {jamBuka}
            </p>
          </div>
        </div>

      </div>
    </section>
  );
}

export default Hero;
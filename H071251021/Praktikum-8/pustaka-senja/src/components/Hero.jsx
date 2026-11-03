import Link from "next/link";

export default function Hero({
  nama = "Pustaka Senja",
  slogan = "Ruang baca dan perpustakaan komunitas terbuka bagi siapa saja yang ingin belajar, bertukar ide, dan bertumbuh.",
  lokasi = "Jl. Pendidikan No. 12 (Dekat Kampus) • Buka Setiap Hari: 09.00 - 21.00",
}) {
  return (
    <section className="bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-10 text-center shadow-sm">
      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-800 border border-slate-700 text-blue-400 text-xs font-medium mb-4">
        <span>Ruang Baca &amp; Perpustakaan Komunitas</span>
      </div>

      <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mb-3">
        Selamat Datang di <span className="text-blue-400">{nama}</span>
      </h1>

      <p className="text-slate-300 max-w-2xl mx-auto text-base sm:text-lg mb-4">
        {slogan}
      </p>

      <p className="text-xs sm:text-sm text-slate-400 max-w-xl mx-auto mb-8 flex items-center justify-center gap-1.5">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          className="w-4 h-4 text-slate-400 shrink-0 inline-block"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
          />
        </svg>
        <span>{lokasi}</span>
      </p>

      <div className="flex flex-wrap items-center justify-center gap-3">
        <Link
          href="/katalog"
          className="bg-blue-600 hover:bg-blue-500 text-white font-medium px-5 py-2.5 rounded-lg text-sm transition"
        >
          Jelajahi Katalog Buku
        </Link>
        <Link
          href="/usulan"
          className="bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-200 font-medium px-5 py-2.5 rounded-lg text-sm transition"
        >
          Usulkan Buku Baru
        </Link>
      </div>
    </section>
  );
}


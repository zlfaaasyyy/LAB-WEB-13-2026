import Link from "next/link";

function Hero({ nama, deskripsi, lokasi, jamBuka }) {
  return (
    <section className="bg-indigo-100 rounded-2xl border border-indigo-200 px-6 py-8 shadow-lg flex flex-col md:flex-row items-center gap-6">
      <img
        src="/hero.svg"
        alt="Ilustrasi ruang baca"
        className="w-56 md:w-64 shrink-0"
      />
      <div className="text-center md:text-left">
        <span className="inline-block bg-indigo-200 text-indigo-700 text-xs font-semibold px-3 py-1 rounded-full mb-3">
          Ruang Baca Komunitas
        </span>
        <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-2">
          {nama}
        </h1>
        <p className="text-slate-600 mb-3">{deskripsi}</p>
        <p className="text-sm text-slate-500 mb-5">
          {lokasi} • {jamBuka}
        </p>
        <div className="flex flex-wrap justify-center md:justify-start gap-3">
          <Link
            href="/katalog"
            className="bg-orange-400 hover:bg-orange-500 text-white font-medium px-5 py-2.5 rounded-lg transition"
          >
            Lihat Katalog
          </Link>
          <Link
            href="/usulan"
            className="border border-indigo-300 hover:bg-indigo-200 text-slate-800 font-medium px-5 py-2.5 rounded-lg transition"
          >
            Usulkan Buku
          </Link>
        </div>
      </div>
    </section>
  );
}

export default Hero;

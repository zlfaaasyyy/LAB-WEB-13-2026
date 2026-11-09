function Hero({ nama, deskripsi, lokasi, jamBuka }) {
  return (
    <section className="hero-abstract relative isolate overflow-hidden border-y border-[#cfc2b2] px-6 py-12 sm:px-12 sm:py-16">
      <div className="hero-orbit z-0" aria-hidden="true" />
      <div className="relative z-10">
        <p className="mb-7 text-xs font-semibold uppercase tracking-[0.24em] text-[#8b4b37]">
          Ruang baca · Makassar
        </p>
        <h1 className="max-w-3xl font-serif text-5xl font-normal leading-[0.98] tracking-[-0.06em] text-[#29251f] sm:text-7xl">
          {nama}
          <span className="block italic text-[#a64f37]">di antara halaman.</span>
        </h1>
        <p className="mt-6 max-w-lg text-base leading-7 text-[#5b5349] sm:text-lg">
          {deskripsi}
        </p>
        <dl className="mt-10 flex flex-col gap-4 border-t border-[#cfc2b2] pt-5 text-sm sm:flex-row sm:gap-16">
          <div>
            <dt className="text-[#8b8174]">Lokasi</dt>
            <dd className="mt-1 font-medium text-[#29251f]">{lokasi}</dd>
          </div>
          <div>
            <dt className="text-[#8b8174]">Jam buka</dt>
            <dd className="mt-1 font-medium text-[#29251f]">{jamBuka}</dd>
          </div>
        </dl>
      </div>
    </section>
  );
}

export default Hero;

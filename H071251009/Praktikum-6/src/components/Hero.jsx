function Hero() {
  const handleClick = () => {
    console.log('Tombol "Lihat Galeri" diklik')
    document.getElementById('galeri')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section
      id="beranda"
      className="mx-auto grid min-h-screen max-w-6xl items-center gap-12 px-5 pb-28 pt-12 md:grid-cols-[1.2fr_1fr] md:px-8 md:pt-28"
    >
      <div className="order-2 md:order-1">
        <p className="mb-4 text-lg text-amber">Halo, saya Naufal Alim.</p>
        <h1 className="font-display text-4xl font-extrabold leading-tight sm:text-5xl lg:text-6xl">
          Mahasiswa yang suka tidur dan kerja tuprak.
        </h1>
        <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted">
          Saya saat ini belajar React dan Vite. Di halaman ini saya
          mengumpulkan profil, keahlian, dan dokumentasi kegiatan saya.
        </p>
        <button
          type="button"
          onClick={handleClick}
          className="mt-8 rounded-full bg-mint px-7 py-3 font-bold text-ink transition-colors hover:bg-amber focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-mint"
        >
          Lihat Galeri
        </button>
      </div>

      <div className="relative order-1 mx-auto w-3/4 max-w-sm md:order-2 md:w-full">
        <div
          aria-hidden="true"
          className="absolute -bottom-4 -right-4 h-full w-full rounded-[2rem] border-2 border-amber"
        />
        <img
          src="/profile.jpg"
          alt="Foto profil Nama Kamu"
          className="relative aspect-[4/5] w-full rounded-[2rem] object-cover"
        />
      </div>
    </section>
  )
}

export default Hero

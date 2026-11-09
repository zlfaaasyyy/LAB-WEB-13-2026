function Hero() {
  const handleClick = () => {
    console.log('Tombol Lihat Galeri diklik!')
  }

  return (
    <section id="beranda" className="relative overflow-hidden">
      <div className="pointer-events-none absolute -top-20 right-0 h-96 w-96 rounded-full bg-brand-light/40 blur-3xl" />
      <div className="pointer-events-none absolute bottom-0 left-0 h-72 w-72 rounded-full bg-accent/10 blur-3xl" />

      <div className="relative mx-auto flex max-w-6xl flex-col-reverse items-center gap-12 px-5 py-16 md:flex-row md:py-28">
        <div className="text-center md:w-3/5 md:text-left">
          <p className="mb-4 text-sm font-medium uppercase tracking-[0.35em] text-accent">
            Halo, selamat datang 👋
          </p>
          <h1 className="text-4xl font-extrabold uppercase leading-tight tracking-wide sm:text-5xl lg:text-6xl">
            Saya <br />
            <span className="text-accent drop-shadow-[0_0_25px_rgba(215,220,73,0.55)]">Zahwa Dwi Putri</span>
          </h1>
          <p className="mx-auto mt-6 max-w-xl text-sm leading-relaxed text-white/75 sm:text-base md:mx-0">
            Hi, I'm a creative mind behind the visuals.
            I turn ideas into visuals, stories, and digital experiences.
          </p>
          <button
            type="button"
            onClick={handleClick}
            className="mt-9 rounded-full border-2 border-accent px-10 py-3 font-semibold text-white shadow-[0_0_25px_rgba(215,220,73,0.35)] transition hover:bg-accent hover:text-brand-dark"
          >
            Lihat Galeri
          </button>
        </div>

        <div className="flex justify-center md:w-2/5">
          <div className="rounded-[2.5rem] border border-white/20 bg-white/10 p-3 shadow-[0_0_70px_rgba(123,44,214,0.7)] backdrop-blur-xl">
            <img
              src="/profil.png"
              alt="Foto profil Zahwa"
              className="h-64 w-64 rounded-[2rem] border-2 border-accent/70 object-cover sm:h-80 sm:w-80"
            />
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero

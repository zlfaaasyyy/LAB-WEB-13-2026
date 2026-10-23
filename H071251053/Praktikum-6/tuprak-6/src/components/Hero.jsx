function Hero() {
  function handleClick() {
    console.log('Thank you for visiting my portfolio!')
    document.getElementById('Gallery')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section id="Home" className="bg-forest text-cream">
      <div className="mx-auto grid w-full max-w-295 items-center gap-10 px-5 py-12 md:px-6 md:py-16 lg:grid-cols-2 lg:gap-14 lg:py-20">
        <div>
          <p className="mb-4 font-mono text-[.8rem] tracking-[.1em] text-sun">Halo!</p>
          <h1 className="font-head text-[clamp(2.8rem,6vw,5rem)] leading-[1.02]">
            Hi, I'm <br />
            <span className="italic">Firah Nuraisyah</span>
          </h1>
          <p className="mb-1.5 mt-5 flex items-center gap-3 font-mono text-[.8rem] uppercase tracking-[.12em] text-ember">
            <i className="block h-0.5 w-7.5 bg-ember"></i> Full-Stack Development Enthusiast
          </p>
          <p className="mb-4 text-[.95rem] text-cream/90">
            Mahasiswa Sistem Informasi · Universitas Hasanuddin
          </p>
          <p className="mb-8 max-w-120 text-[.98rem] text-cream/90">
            Mahasiswa yang tertarik pada pengembangan aplikasi dan teknologi
            informasi. Saya sedang belajar bagaimana berbagai komponen teknologi
            saling terhubung untuk membangun aplikasi yang fungsional dan
            terstruktur.
          </p>
          <button
            type="button"
            onClick={handleClick}
            className="inline-flex w-full cursor-pointer items-center justify-center gap-2 bg-ember px-6 py-3.5 font-mono text-[.78rem] font-bold uppercase tracking-[.08em] text-white transition-all duration-300 ease-out hover:-translate-y-1 hover:bg-sun hover:text-night hover:shadow-[0_8px_0_rgba(0,0,0,.2)] active:translate-y-0 sm:w-auto"
          >
            View Gallery →
          </button>
        </div>

        <div className="relative mx-auto w-full max-w-sm lg:max-w-md">
          <figure className="group m-0 h-105 overflow-hidden rounded-t-full bg-cream2 sm:h-125">
            <img
              src="/profile.jpeg"
              alt="Foto profil Firah Nuraisyah"
              className="h-full w-full object-cover transition-transform duration-900 ease-out group-hover:scale-105"
            />
          </figure>
          <div className="absolute -bottom-4 left-0 bg-ember p-4 font-head text-lg leading-tight text-white sm:-left-6 sm:text-xl">
            <span className="mb-1.5 block text-4xl leading-[.6] text-sun">“</span>
            Code is my <em className="text-sun">sketchbook</em>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero

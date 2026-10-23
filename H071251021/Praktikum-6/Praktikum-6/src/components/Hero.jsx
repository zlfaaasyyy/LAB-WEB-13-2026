function Hero() {
  const handleButtonClick = () => {
    console.log("Tombol 'Kenali Saya' diklik!");
  };

  return (
    <section
      id="home"
      className="mx-auto flex max-w-5xl scroll-mt-20 flex-col-reverse items-center gap-10 px-6 py-16 md:flex-row md:py-24"
    >
      <div className="text-center md:w-3/5 md:text-left">
        <p className="mb-2 font-medium text-indigo-400">Halo, selamat datang!</p>
        <h1 className="mb-4 text-4xl font-extrabold text-white md:text-6xl">
          Saya Aren
        </h1>
        <p className="mb-8 text-lg leading-relaxed text-slate-400">
          Mahasiswa yang sedang belajar membangun website dengan React.
          Saya suka memadukan teknologi dan ilmu sosial untuk membuat sesuatu
          yang berguna bagi banyak orang.
        </p>
        <button
          onClick={handleButtonClick}
          className="rounded-full bg-indigo-500 px-8 py-3 font-semibold text-white shadow-lg shadow-indigo-500/30 transition hover:scale-105 hover:bg-indigo-400 active:scale-95"
        >
          Kenali Saya
        </button>
      </div>

      <div className="md:w-2/5">
        {/* Foto diambil dari folder public/images/ (tanpa import) */}
        <img
          src="/images/Foto Porto 2.png"
          alt="Foto profil Aren"
          className="mx-auto h-64 w-64 rounded-full object-cover ring-4 ring-indigo-500/60 ring-offset-4 ring-offset-slate-950 transition duration-300 hover:scale-105 hover:ring-indigo-300 md:h-80 md:w-80"
        />
      </div>
    </section>
  );
}

export default Hero;

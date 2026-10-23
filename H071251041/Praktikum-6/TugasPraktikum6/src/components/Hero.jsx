function Hero() {
  return (
    <section id="Home" className="bg-(--putih) flex flex-col-reverse md:flex-row justify-center md:justify-between items-center py-16 px-12 md:px-24 gap-10 md:gap-12 scroll-mt-20">
      <div className="w-full md:w-1/2 flex flex-col gap-5 items-center md:items-start text-center md:text-left">
        <p className="text-sm md:text-base font-bold text-(--coklat)">Hello! I'm</p>
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-(--maroon)">Mawaddah Fajri L</h2>
        <p className="font-medium text-(--maroon) text-sm md:text-base">
          I’m an Information Systems student at Universitas Hasanuddin who enjoys learning new things, especially about website development and UI design. I’m still learning and improving my skills, one step at a time.
        </p>
        <button
          className="mt-2 py-3 px-8 bg-(--pink) hover:bg-(--merah) hover:text-white transition-colors text-(--coklat) font-bold rounded-full md:rounded-md text-sm w-fit shadow-sm cursor-pointer"
          onClick={() => console.log("Hello Addah!")}>
            Say hi to me!
        </button>
      </div>
      
      <img
        className="object-cover w-56 h-56 md:w-80 md:h-80 rounded-full md:rounded-2xl border-4 border-(--pink--muda) shadow-md hover:shadow-lg hover:border-(--pink) hover:scale-105 transition-all duration-300"
        src="/src/assets/gallery/fotoku.jpeg"
        alt="Foto Profil"
      />
    </section>
  );
}

export default Hero;